/* eslint-disable @typescript-eslint/ban-types */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup, render } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  fireEvent,
  forwardHaptic,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
// The editor is loaded on demand by getConfigElement(): devices that only show the card never download it.
import { HassEntity } from 'home-assistant-js-websocket';
import { createConfigArray, createObjectGroupConfigArray, getLovelace } from './helpers';
import { matchObjects, normalizeConfig, objectPattern } from './config';
import type { Floor3dCardConfig } from './types';
import { CARD_VERSION, EDITOR_EVENT, PREVIEW_EVENT } from './const';
import { localize } from './localize/localize';
//import three.js libraries for 3D rendering
import * as TWEEN from '@tweenjs/tween.js';
import { mdiAlertCircleOutline, mdiCubeOutline } from '@mdi/js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D } from 'three';
import '../elements/button';

// three.js >= 0.155 always uses physical light units, and the model is in centimetres. These
// factors keep the brightness close to the three.js 0.130 build at typical room distances (a lamp
// seen from about 1.5 m); light_power, exposure, sun_power and sky_power in the config adjust them.
const LAMP_INTENSITY_PER_LUMEN = 47; // 0.130 build: 0.003 per lumen with the legacy light model
const TORCH_SCALE = 0.66; // camera-following light: globalLightPower x this
const SUN_INTENSITY = 2.4; // full daylight, multiplied by sun_power
const SKY_INTENSITY = 1; // light of the sky on a floor, multiplied by sky_power
const SKY_COLOR = '#e6eeff'; // light of the sky from above, when sky_color is missing
const GROUND_COLOR = '#706458'; // light from below (reflected by the ground), when ground_color is missing
const SCREEN_EMISSIVE_SCALE = 0.25; // TV screen glow: image.lumens x this
const TRACKER_SMOOTHING = 0.25; // seconds: trackers glide to each new position instead of jumping
const TRACKER_FADE = 0.35; // seconds to appear or disappear
const LIGHT_ANIMATION_FRAME_MS = 33; // only trackers or the shower moving: at most 30 frames per second
const MOVING_SHADOW_MS = 300; // shadows of a moving door: redrawn at most this often, and at the end
const ROTATE_RAMP = 1.5; // seconds for a fan to reach full speed or to stop, when rotate.ramp is missing
// Decoder of Draco-compressed models, when draco_decoder_path is missing (the version of three.js 0.186).
const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/';

// Quantized models (gltf-transform meshopt adds KHR_mesh_quantization) keep their positions as
// integers, with a scale and an offset on each node. The card moves doors, covers and fans by
// changing the geometry and the position of the objects, as if every object had no transform of its
// own: the geometry goes back to floats with the transforms of the nodes in it, like any other model.
function bakeNodeTransforms(root: THREE.Object3D): void {
  root.updateMatrixWorld(true);
  const meshes: THREE.Mesh[] = [];
  const users = new Map<THREE.BufferGeometry, number>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    meshes.push(mesh);
    users.set(mesh.geometry, (users.get(mesh.geometry) || 0) + 1);
  });
  meshes.forEach((mesh) => {
    // A geometry used by several objects is copied first, so that each gets its own transform.
    const geometry = floatGeometry(users.get(mesh.geometry) > 1 ? mesh.geometry.clone() : mesh.geometry);
    geometry.applyMatrix4(mesh.matrixWorld);
    mesh.geometry = geometry;
  });
  root.traverse((object) => {
    if (object === root) return;
    object.position.set(0, 0, 0);
    object.quaternion.identity();
    object.scale.set(1, 1, 1);
  });
  root.updateMatrixWorld(true);
}

// The same geometry with float attributes (quantized ones are integers, normalized or not).
function floatGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  Object.keys(geometry.attributes).forEach((name) => {
    const attribute = geometry.attributes[name] as THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
    if (!(attribute instanceof THREE.InterleavedBufferAttribute) && attribute.array instanceof Float32Array) return;
    const array = new Float32Array(attribute.count * attribute.itemSize);
    for (let i = 0; i < attribute.count; i++) {
      for (let k = 0; k < attribute.itemSize; k++) {
        array[i * attribute.itemSize + k] = attribute.getComponent(i, k);
      }
    }
    geometry.setAttribute(name, new THREE.BufferAttribute(array, attribute.itemSize));
  });
  return geometry;
}

// The glTF extensions a .glb file uses, read from its JSON chunk (the decoders it needs).
function glbExtensions(buffer: ArrayBuffer): string[] {
  try {
    const view = new DataView(buffer);
    if (buffer.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67) return []; // 'glTF'
    if (view.getUint32(16, true) !== 0x4e4f534a) return []; // 'JSON'
    const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, view.getUint32(12, true))));
    return [...(json.extensionsUsed || []), ...(json.extensionsRequired || [])];
  } catch {
    return [];
  }
}

// Runs the code of an entity_template (between [[[ and ]]]) with the state as a value, $entity,
// instead of pasting the state into the code: a state such as "unavailable", or one with quotes,
// no longer breaks the template or runs as code. The eval inside gives back the value of the last
// statement, as in `if ($entity > 25) { "hot" } else { "cool" }`.
const runTemplate = new Function('$entity', '$f3dState', '$f3dCode', 'return eval($f3dCode);');

const TONE_MAPPINGS: { [name: string]: THREE.ToneMapping } = {
  neutral: THREE.NeutralToneMapping,
  agx: THREE.AgXToneMapping,
  aces: THREE.ACESFilmicToneMapping,
  linear: THREE.LinearToneMapping,
};

type ShadowLight = THREE.PointLight | THREE.SpotLight | THREE.DirectionalLight;

// Share of daylight for an elevation of the sun, in degrees: night below -3, full light from 8.
function daylight(elevation: number): number {
  return THREE.MathUtils.smoothstep(elevation, -3, 8);
}

interface RoomView {
  name: string;
  material: THREE.MeshBasicMaterial; // translucent copy of the floor, above it
  overlays: THREE.Mesh[];
  center: THREE.Vector3; // for the temperature label (world coordinates)
  temperature?: string;
  presence: string[];
  label?: THREE.Sprite;
  labelText?: string;
}

interface TrackerView {
  group: THREE.Group;
  materials: [THREE.Material, number][]; // material and its opacity when fully visible
  target: THREE.Vector3;
  present: boolean; // the sensors report a position
  opacity: number; // 0..1, fades towards present ? 1 : 0
  label?: THREE.Sprite;
  labelText?: string;
  height: number;
}

/* eslint no-console: 0 */
console.info(
  `%c  FLOOR3D-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'floor3d-card',
  name: 'Floor3d Card',
  preview: true,
  description: 'A custom card to visualize and activate entities in a live 3D model',
});
class ModelSource {
  public static OBJ = 0;
  public static GLB = 1;
}

// TODO Name your custom element
@customElement('floor3d-card')
export class Floor3dCard extends LitElement {
  private _scene?: THREE.Scene;
  private _camera?: THREE.PerspectiveCamera;
  private _renderer?: THREE.WebGLRenderer;
  private _levelbar?: HTMLElement;
  private _zoombar?: HTMLElement;
  private _selectionbar?: HTMLElement;
  private _controls?: OrbitControls;
  private _skyLight?: THREE.HemisphereLight; // sky_power: light of the sky, without shadows
  private _modelX?: number;
  private _modelY?: number;
  private _modelZ?: number;
  private _to_animate: boolean;
  private _bboxmodel: THREE.Object3D;
  private _levels: THREE.Object3D[];
  private _displaylevels: boolean[];
  private _zoom: any[];
  private _selectedlevel: number;
  private _states?: string[];
  private _color?: number[][];
  private _raycasting: THREE.Object3D[];
  private _raycastinglevels: THREE.Object3D[][];
  private _initialmaterial?: THREE.Material[][];
  private _clonedmaterial?: THREE.Material[][];
  private _selectedmaterial?: THREE.Material;
  private _initialobjectmaterials: { [key: string]: THREE.Material };
  private _selectedobjects: string[];
  private _selectionModeEnabled: boolean;
  private _brightness?: number[];
  private _lights?: string[];
  private _rooms?: string[];
  private _sprites?: string[];
  private _canvas?: HTMLCanvasElement[];
  private _unit_of_measurement?: string[];
  private _text?: string[];
  private _spritetext?: string[];
  private _objposition: number[][];
  private _slidingdoorposition: THREE.Vector3[][];
  private _objects_to_rotate: THREE.Group[];
  private _pivot: THREE.Vector3[];
  private _degrees: number[];
  private _axis_for_door: THREE.Vector3[];
  private _axis_to_rotate: string[];
  private _round_per_seconds: number[];
  private _rotation_state: number[]; // target speed: 1 full, a fraction with percentage, negative in reverse
  private _rotation_speed: number[] = []; // speed now, on its way to the target (rotate.ramp)
  private _rotation_ramp: number[] = []; // seconds from stopped to full speed
  private _rotation_index: number[];
  private _animated_transitions: any[];
  private _lastFrameTime?: number | null; // timestamp of the previous animation frame
  private _lastRenderTime = 0;
  private _lastShadowTime = 0;
  private _slidingdoor: THREE.Group[];
  private _overlay_entity: string;
  private _overlay_state: string;

  private _templateErrors = new Set<string>();
  private _firstcall?: boolean;
  private _resizeTimeout?: number;
  private _resizeObserver: ResizeObserver;
  private _zIndexInterval: number;
  private _performActionListener: EventListener;
  private _pointerDownListener: EventListener;
  private _pointerMoveListener: EventListener;
  private _pointerUpListener: EventListener;
  private _pointerCancelListener: EventListener;
  private _contextRestoredListener = (): void => this._onContextRestored();
  private _loadingEl?: HTMLElement;
  private _urlListener = (): void => this._applyUrlView(true);
  private _urlView?: string | null; // value of the url_parameters.zoom parameter last applied
  private _longpressTimeout: any;
  // A press on the model: becomes a tap or a long press unless the finger moves (then it is a drag).
  private _tap?: { id: number; x: number; y: number; t: number; long: boolean } | null;
  private _changeListener: () => void;
  private _controlsStartListener: () => void;
  private _zoomSelect?: HTMLSelectElement;
  private _cameraTweens: any[] = [];
  private _shadowLights: ShadowLight[] = [];
  private _sunTarget?: THREE.Object3D;
  private _sunRoof: THREE.Mesh[] = []; // invisible roof: shadow for the sun only
  private _sunKey?: string;
  private _modelCenter?: THREE.Vector3;
  private _modelRadius?: number;
  private _trackers: TrackerView[] = [];
  private _roomViews: RoomView[] = [];
  private _mapMode = 'none'; // rooms coloured by: none, temperature, presence
  private _colorDeps?: HassEntity[];
  private _alarmPulse = false; // alarm triggered with something open: the openings blink
  private _cardObscured: boolean;
  private _card?: HTMLElement;
  private _content?: HTMLElement;
  private _modeltype?: ModelSource;
  private _config!: Floor3dCardConfig;
  private _configArray: Floor3dCardConfig[] = [];
  private _object_ids?: Floor3dCardConfig[] = [];
  private _isVisible = true;
  // Set by Home Assistant's hui-card (2024+): layout of the hosting view ('panel', 'grid', ...).
  @property({ attribute: false }) public layout?: string;
  @property({ attribute: false }) public isPanel?: boolean;
  @property({ attribute: false }) public editMode?: boolean;
  // Set by Home Assistant on the card shown next to the card editor.
  @property({ attribute: false }) public preview?: boolean;
  // Editor of the card (only in the preview): a tap picks an object, and some objects are highlighted.
  private _pickMode = false;
  private _highlightHelpers: THREE.Object3D[] = [];
  private _editorListener = (ev: Event): void => this._onEditor((ev as CustomEvent).detail);
  private _intersectionObserver?: IntersectionObserver;
  private _showers?: THREE.Group[];
  private _info?: string[];
  private _zoommenu?: HTMLElement;
  private _trackerPrev?: HassEntity[][];
  private _renderPending?: boolean;
  private _missingLogged?: { [entity: string]: boolean };
  private _overlay: HTMLDivElement;
  private _hass?: HomeAssistant;
  private _haShadowRoot: any;
  private _position: number[];
  private _card_id: string;
  private _torch: THREE.DirectionalLight;
  private _torchTarget: THREE.Object3D;
  private _sun: THREE.DirectionalLight;
  _helper: THREE.DirectionalLightHelper;
  private _modelready: boolean;
  private _maxtextureimage: number;

  constructor() {
    super();

    this._tap = null;
    this._initialobjectmaterials = {};
    this._selectedobjects = [];

    this._cardObscured = false;
    this._resizeObserver = new ResizeObserver(() => {
      this._resizeCanvasDebounce();
    });
    this._performActionListener = (evt) => {
      this._performAction(evt);
    };
    this._pointerDownListener = (evt) => this._onPointerDown(evt as PointerEvent);
    this._pointerMoveListener = (evt) => this._onPointerMove(evt as PointerEvent);
    this._pointerUpListener = (evt) => this._onPointerUp(evt as PointerEvent);
    this._pointerCancelListener = () => this._cancelTap();
    this._changeListener = () => {
      this._updateNearPlane();
      this._scheduleRender();
    };
    // The user moved the camera: the views menu no longer shows where the camera is.
    this._controlsStartListener = () => {
      this._stopCameraTweens();
      if (this._zoomSelect) this._zoomSelect.value = '';
    };
    this._haShadowRoot = document.querySelector('home-assistant')?.shadowRoot;
    this._card_id = 'ha-card-1';

    console.log('New Card');
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(EDITOR_EVENT, this._editorListener);
    // Home Assistant fires location-changed when it navigates; popstate is the back button.
    window.addEventListener('location-changed', this._urlListener);
    window.addEventListener('popstate', this._urlListener);

    this._intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this._isVisible = entry.isIntersecting;
          this._startOrStopAnimationLoop();
        });
      },
      { threshold: 0.1 },
    );
    this._intersectionObserver.observe(this);

    if (this._modelready) {
      if (this._ispanel() || this._issidebar()) {
        this._resizeObserver.observe(this._card);
      }
      this._zIndexInterval = window.setInterval(() => {
        this._zIndexChecker();
      }, 250);

      this._startOrStopAnimationLoop();

      if (this._ispanel() || this._issidebar()) {
        this._resizeCanvas();
      }
      // The page may have been navigated to another view while the card was not shown.
      this._applyUrlView(false);
    }
  }

  public disconnectedCallback(): void {
    window.removeEventListener(EDITOR_EVENT, this._editorListener);
    window.removeEventListener('location-changed', this._urlListener);
    window.removeEventListener('popstate', this._urlListener);
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
    super.disconnectedCallback();

    this._resizeObserver.disconnect();
    window.clearInterval(this._zIndexInterval);

    this._cancelTap();
    if (this._modelready) {
      // _to_animate stays as it is: connectedCallback restarts the loop if it is still needed.
      this._lastFrameTime = null;
      this._renderer.setAnimationLoop(null);
    }
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('floor3d-card-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[], entitiesFallback: string[]): object {
    console.log('Stub started');

    const entityFilter = (stateObj: HassEntity): boolean => {
      return !isNaN(Number(stateObj.state));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _arrayFilter = (array: any[], conditions: Array<(value: any) => boolean>, maxSize: number) => {
      if (!maxSize || maxSize > array.length) {
        maxSize = array.length;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredArray: any[] = [];

      for (let i = 0; i < array.length && filteredArray.length < maxSize; i++) {
        let meetsConditions = true;

        for (const condition of conditions) {
          if (!condition(array[i])) {
            meetsConditions = false;
            break;
          }
        }

        if (meetsConditions) {
          filteredArray.push(array[i]);
        }
      }

      return filteredArray;
    };

    const _findEntities = (
      hass: HomeAssistant,
      maxEntities: number,
      entities: string[],
      entitiesFallback: string[],
      includeDomains?: string[],
      entityFilter?: (stateObj: HassEntity) => boolean,
    ) => {
      const conditions: Array<(value: string) => boolean> = [];

      if (includeDomains?.length) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        conditions.push((eid) => includeDomains!.includes(eid.split('.')[0]));
      }

      if (entityFilter) {
        conditions.push((eid) => hass.states[eid] && entityFilter(hass.states[eid]));
      }

      const entityIds = _arrayFilter(entities, conditions, maxEntities);

      if (entityIds.length < maxEntities && entitiesFallback.length) {
        const fallbackEntityIds = _findEntities(
          hass,
          maxEntities - entityIds.length,
          entitiesFallback,
          [],
          includeDomains,
          entityFilter,
        );

        entityIds.push(...fallbackEntityIds);
      }

      return entityIds;
    };

    //build a valid stub config

    let includeDomains = ['binary_sensor'];
    let maxEntities = 2;

    let foundEntities = _findEntities(hass, maxEntities, entities, entitiesFallback, includeDomains);

    const url = new URL(import.meta.url);
    let asset = url.pathname.split('/').pop();
    let path = url.pathname.replace(asset, '');

    if (path.includes('hacsfiles')) {
      path = '/local/community/floor3d-card/';
    }

    const conf = {
      path: path,
      name: 'Home',
      objfile: 'home.glb',
      backgroundColor: '#aaaaaa',
      globalLightPower: 0.8,
      overlay_alignment: 'top-left',
      north: { x: 0, z: -1 },
      camera_position: { x: 609.3072605703628, y: 905.5330092468828, z: 376.66437610591277 },
      camera_rotate: { x: -1.0930244719682243, y: 0.5200808414019678, z: 0.7648717152512469 },
      camera_target: { x: 37.36890424945437, y: 18.64464320782064, z: -82.55051697031719 },
      object_groups: [
        {
          object_group: 'RoundTable',
          objects: ['Round_table_1', 'Round_table_2', 'Round_table_3'],
        },
        {
          object_group: 'EntranceDoor',
          objects: ['Door_9', 'Door_7', 'Door_5'],
        },
      ],
      entities: [],
    };

    if (foundEntities[0]) {
      conf.entities.push({
        entity: foundEntities[0],
        type3d: 'door',
        object_id: '<EntranceDoor>',
        door: { doortype: 'swing', direction: 'inner', hinge: 'Door_3', percentage: 90 },
      });
    }
    if (foundEntities[1]) {
      conf.entities.push({
        entity: foundEntities[1],
        type3d: 'hide',
        object_id: '<RoundTable>',
        hide: { state: 'off' },
      });
    }

    includeDomains = ['light'];
    maxEntities = 1;

    let foundLights = _findEntities(hass, maxEntities, entities, entitiesFallback, includeDomains);

    if (foundLights[0]) {
      conf.entities.push({
        entity: foundLights[0],
        type3d: 'light',
        object_id: 'Bowl_2',
        light: { lumens: 800 },
      });
    }

    console.log(conf);

    console.log('Stub ended');
    return conf;
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit-element.polymer-project.org/guide/properties
  //@property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: Floor3dCardConfig;

  // https://lit-element.polymer-project.org/guide/properties#accessors-custom
  public setConfig(config: Floor3dCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    console.log('floor3d-card: Set Config Start');

    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    // Short forms (true/false, object_id strings in object_groups, missing options block) become
    // the long ones the rest of the card reads.
    this._config = normalizeConfig(config);
    this._configArray = createConfigArray(this._config);
    this._object_ids = createObjectGroupConfigArray(this._config);
    this._initialmaterial = [];
    this._clonedmaterial = [];
    let i = 0;

    this._selectionModeEnabled = this._config.selectionMode === 'yes';

    this._object_ids.forEach((entity) => {
      this._initialmaterial.push([]);
      this._clonedmaterial.push([]);

      entity.objects.forEach(() => {
        this._initialmaterial[i].push(null);
        this._clonedmaterial[i].push(null);
      });
      i += 1;
    });

    console.log('floor3d-card: Set Config End');

    if (this._config.show_warning) {
      render(this._showWarning(localize('common.show_warning')), this._card);
      return;
    }

    if (this._config.show_error) {
      render(this._showError(localize('common.show_error')), this._card);
      return;
    }
  }

  public rerender(): void {
    // Nothing to rebuild yet: the model is shown for the first time when the card is displayed.
    if (!this._renderer || !this._controls) return;
    this._removeInputListeners();
    this._controls.removeEventListener('change', this._changeListener);
    this._controls.removeEventListener('start', this._controlsStartListener);
    this._shadowLights = [];
    this._trackers = [];
    this._sun = null;

    this._renderer.setAnimationLoop(null);
    this._resizeObserver.disconnect();
    window.clearInterval(this._zIndexInterval);

    this._renderer.domElement.remove();
    this._disposeScene();
    this._renderer = null;

    this._states = null;
    this.hass = this._hass;
    this.display3dmodel();
  }

  // Frees what the GPU holds for the model before it is loaded again. Before, every reload (in the
  // card editor, for example) kept its WebGL context until the browser went past its limit (about
  // 16) and dropped the oldest one, which could be another card of the dashboard.
  private _disposeScene(): void {
    const textures = new Set<THREE.Texture>();
    this._scene.traverse((object: any) => {
      if (object.geometry) object.geometry.dispose();
      const materials: THREE.Material[] = Array.isArray(object.material)
        ? object.material
        : object.material
          ? [object.material]
          : [];
      materials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
        material.dispose();
      });
      if (object.isLight) object.dispose(); // its shadow map
    });
    textures.forEach((texture) => texture.dispose());
    this._renderer.domElement.removeEventListener('webglcontextrestored', this._contextRestoredListener);
    this._renderer.dispose();
    this._renderer.forceContextLoss();
  }

  // The browser can take the WebGL context away (an app in the background on a phone, a GPU
  // reset) and give it back later. three.js uploads the model again by itself, but the card
  // draws only when something changes: without this the canvas stayed empty until a touch.
  private _onContextRestored(): void {
    if (!this._renderer || !this._modelready) return;
    for (const light of this._shadowLights) {
      if (light.castShadow) {
        light.shadow.needsUpdate = true;
        light.userData.shadowStale = false;
      }
    }
    this._renderer.shadowMap.needsUpdate = true;
    this._render();
  }

  // Dashboard in edit mode: passed by Home Assistant (2024+), otherwise read from the page.
  private _isEditMode(): boolean {
    if (this.editMode !== undefined) {
      return this.editMode;
    }
    const lovelace = getLovelace();
    return !!(lovelace && lovelace.editMode);
  }

  private _ispanel(): boolean {
    if (this.isPanel !== undefined) {
      return this.isPanel;
    }
    // Older Home Assistant versions: look for the panel view in the page structure.

    let root: any = document.querySelector('home-assistant');
    root = root && root.shadowRoot;
    root = root && root.querySelector('home-assistant-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('ha-panel-lovelace');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('hui-root');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('hui-view');

    const panel: [] = root && root.getElementsByTagName('HUI-PANEL-VIEW');

    if (panel) {
      if (panel.length == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

  private _issidebar(): boolean {

    let root: any = document.querySelector('home-assistant');
    root = root && root.shadowRoot;
    root = root && root.querySelector('home-assistant-main');
    root = root && root.shadowRoot;
    root = root && root.querySelector('app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('ha-panel-lovelace');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('hui-root');
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector('hui-view');

    const sidebar: [] = root && root.getElementsByTagName('HUI-SIDEBAR-VIEW');

    if (sidebar) {
      if (sidebar.length == 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getCardSize(): number {
    console.log('Get Card Size Called');
    if (this._renderer) {
      //return this._renderer.domElement.height / 50;
      return 10;
    } else {
      return 10;
    }
  }

  firstUpdated(): void {
    //called after the model has been loaded into the Renderer and first render
    console.log('First updated start');

    this._card = this.shadowRoot.getElementById(this._card_id);
    if (this._card) {
      if (!this._content) {
        this._content = document.createElement('div');
        this._content.style.width = '100%';
        this._content.style.height = '100%';
        this._content.style.alignContent = 'center';
        this._card.appendChild(this._content);
      }

      if (!this._ispanel()) {
        const show_header = this._config.header ? this._config.header : 'yes';

        if (show_header == 'yes') {
          (this._card as any).header = this._config.name ? this._config.name : 'Floor 3d';
        } else {
          (this._card as any).header = '';
        }
      }

      if (this._content && !this._renderer) {
        this.display3dmodel();
      }

      if (!this._zoommenu) {
        this._zoommenu = document.createElement('div');
        this._zoommenu.style.position = 'absolute';
        this._zoommenu.style.top = '10px';
        this._zoommenu.style.right = '10px';
        this._zoommenu.style.zIndex = '1000';
        this._zoommenu.style.display = 'flex';
        this._zoommenu.style.gap = '6px';
        this._zoommenu.style.flexWrap = 'wrap';
        this._zoommenu.style.justifyContent = 'flex-end';
        this._card.appendChild(this._zoommenu);
      }

      console.log('First updated end');
    }
  }

  private _render(): void {
    //render the model
    if (this._torch) this._aimTorch();
    this._renderer.render(this._scene, this._camera);
  }

  // The torch lights what the camera looks at: its target is a point in front of the camera.
  // (getWorldDirection alone gives a unit vector, i.e. a point next to the centre of the model,
  // so the light always went from the camera towards the centre, whatever the view.)
  private _aimTorch(): void {
    this._torch.position.copy(this._camera.position);
    this._camera.getWorldDirection(this._torch.target.position);
    this._torch.target.position.add(this._camera.position);
  }

  // Objects of the model under a point of the screen (client coordinates), nearest first.
  private _getintersect(clientX: number, clientY: number): THREE.Intersection[] {
    if (!this._renderer || !this._camera || clientX === undefined || clientY === undefined) return [];
    const rect = this._renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return [];
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this._camera);
    return raycaster.intersectObjects(this._raycasting, false);
  }

  private _addInputListeners(): void {
    const el = this._content;
    el.addEventListener('pointerdown', this._pointerDownListener);
    el.addEventListener('pointermove', this._pointerMoveListener);
    el.addEventListener('pointerup', this._pointerUpListener);
    el.addEventListener('pointercancel', this._pointerCancelListener);
    el.addEventListener('keydown', this._performActionListener);
    // With click on, a double click would toggle a light three times (two taps and the double click).
    if (this._config.click != 'yes') {
      el.addEventListener('dblclick', this._performActionListener);
    }
  }

  private _removeInputListeners(): void {
    const el = this._content;
    if (!el) return;
    el.removeEventListener('pointerdown', this._pointerDownListener);
    el.removeEventListener('pointermove', this._pointerMoveListener);
    el.removeEventListener('pointerup', this._pointerUpListener);
    el.removeEventListener('pointercancel', this._pointerCancelListener);
    el.removeEventListener('keydown', this._performActionListener);
    el.removeEventListener('dblclick', this._performActionListener);
    this._cancelTap();
  }

  // Touch and mouse alike: a press that neither moves nor lasts is a tap, one held still is a long
  // press, anything else (rotating, panning, pinching) belongs to the camera controls.
  private _onPointerDown(e: PointerEvent): void {
    this._cancelTap();
    if (!e.isPrimary || (e.pointerType == 'mouse' && e.button != 0)) return;
    this._tap = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), long: false };
    this._longpressTimeout = setTimeout(() => this._onLongPress(), 550);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._tap) return;
    if (!e.isPrimary) {
      this._cancelTap(); // second finger: pinch
    } else if (e.pointerId == this._tap.id && Math.hypot(e.clientX - this._tap.x, e.clientY - this._tap.y) > 10) {
      this._cancelTap();
    }
  }

  private _onPointerUp(e: PointerEvent): void {
    const tap = this._tap;
    if (!tap || e.pointerId != tap.id) return;
    this._cancelTap();
    if (this._pickMode) {
      // Picking objects for the card editor: the object goes to the editor, no action runs.
      const hit = this._getintersect(tap.x, tap.y).find((i) => i.object.name);
      if (!tap.long && hit) this._toEditor({ picked: hit.object.name });
      return;
    }
    if (!tap.long && performance.now() - tap.t < 500 && (this._config.click == 'yes' || this._selectionModeEnabled)) {
      this._firEvent(this._getintersect(tap.x, tap.y));
    }
  }

  private _onLongPress(): void {
    this._longpressTimeout = null;
    if (!this._tap || this._pickMode) return;
    this._tap.long = true;
    this._longPressEvent(this._getintersect(this._tap.x, this._tap.y));
  }

  private _cancelTap(): void {
    if (this._longpressTimeout) {
      clearTimeout(this._longpressTimeout);
      this._longpressTimeout = null;
    }
    this._tap = null;
  }

  // Index of the first entity bound to an object of the model, or -1.
  private _entityIndexForObject(name: string): number {
    for (let i = 0; i < this._config.entities.length; i++) {
      const ids = this._object_ids[i];
      if (ids && ids.objects.some((o) => o.object_id == name)) return i;
    }
    return -1;
  }

  // Tap on the model (click: yes, or selection mode in the editor).
  private _firEvent(intersects: THREE.Intersection[]): void {
    if (intersects.length == 0 || intersects[0].object.name == '') return;
    if (this._selectionModeEnabled) {
      this._defaultaction(intersects);
      return;
    }
    const i = this._entityIndexForObject(intersects[0].object.name);
    if (i < 0) return;
    const entity = this._config.entities[i];
    switch (entity.action) {
      case 'more-info':
        fireEvent(this, 'hass-more-info', { entityId: entity.entity });
        break;
      case 'overlay':
        if (this._overlay) {
          this._setoverlaycontent(entity.entity);
        }
        break;
      case 'default':
      default:
        this._defaultaction(intersects);
    }
  }

  // Long press on an object: its long_press_action or, with click on, the details of the entity.
  private _longPressEvent(intersects: THREE.Intersection[]): void {
    if (intersects.length == 0 || intersects[0].object.name == '' || this._selectionModeEnabled) return;
    const i = this._entityIndexForObject(intersects[0].object.name);
    if (i < 0) return;
    const entity = this._config.entities[i];
    const action = entity.long_press_action || (this._config.click == 'yes' ? 'more-info' : undefined);
    switch (action) {
      case 'more-info':
        forwardHaptic('medium');
        fireEvent(this, 'hass-more-info', { entityId: entity.entity });
        break;
      case 'overlay':
        if (this._overlay) {
          this._setoverlaycontent(entity.entity);
        }
        break;
      case 'default':
        this._defaultaction(intersects);
        break;
    }
  }

  private _setoverlaycontent(entity_id: string): void {
    this._overlay_entity = entity_id;
    const name = this._hass.states[entity_id].attributes['friendly_name']
      ? this._hass.states[entity_id].attributes['friendly_name']
      : entity_id;
    this._overlay.textContent = name + ': ' + this._hass.states[entity_id].state;
    this._overlay_state = this._hass.states[entity_id].state;
  }

  private _defaultaction(intersects: THREE.Intersection[]): void {
    if (intersects.length > 0 && intersects[0].object && intersects[0].object.name != '') {
      const objectName = intersects[0].object.name;

      if (this._isEditMode() && this._config.editModeNotifications != 'no') {
        window.prompt('Object:', objectName);
      }
      console.log('Object:', objectName);

      if (this._selectionModeEnabled) {
        // Color objects blue when we click them, so we can build a list of
        // rooms and walls to control a light
        const object: any = intersects[0].object;
        if (!this._selectedmaterial) {
          const newMaterial: any = new THREE.MeshStandardMaterial({ color: 0x7777ff });
          this._selectedmaterial = newMaterial;
        }
        if (!this._initialobjectmaterials[objectName]) {
          this._initialobjectmaterials[objectName] = object.material;
        }
        if (this._selectedobjects.includes(objectName)) {
          this._selectedobjects = this._selectedobjects.filter((e) => e !== objectName);
          object.material = this._initialobjectmaterials[objectName];
        } else {
          this._selectedobjects.push(objectName);
          object.material = this._selectedmaterial;
        }
        this._selectedobjects = this._selectedobjects.sort();
        console.log('Selected object IDs:', this._selectedobjects);
        this._render();
        render(this._getSelectionBar(), this._selectionbar);
        return;
      }

      this._config.entities.forEach((entity, i) => {
        if (entity.type3d == 'light' || entity.type3d == 'gesture' || entity.type3d == 'camera') {
          for (let j = 0; this._object_ids[i] && j < this._object_ids[i].objects.length; j++) {
            if (this._object_ids[i].objects[j].object_id == intersects[0].object.name) {
              if (entity.type3d == 'light') {
                forwardHaptic('light');
                this._hass.callService(entity.entity.split('.')[0], 'toggle', {
                  entity_id: entity.entity,
                });
              } else if (entity.type3d == 'gesture') {
                this._hass.callService(entity.gesture.domain, entity.gesture.service, {
                  entity_id: entity.entity,
                });
              } else if (entity.type3d == 'camera') {
                fireEvent(this, 'hass-more-info', { entityId: entity.entity });
                //this._hass.states[entity.entity].attributes["entity_picture"]
              }
              break;
            }
          }
        }
      });
    } else {
      const cameraData =
        'camera_position: { x: ' +
        this._camera.position.x +
        ', y: ' +
        this._camera.position.y +
        ', z: ' +
        this._camera.position.z +
        ' }\n' +
        'camera_rotate: { x: ' +
        this._camera.rotation.x +
        ', y: ' +
        this._camera.rotation.y +
        ', z: ' +
        this._camera.rotation.z +
        ' }\n' +
        'camera_target: { x: ' +
        this._controls.target.x +
        ', y: ' +
        this._controls.target.y +
        ', z: ' +
        this._controls.target.z +
        ' }';
      if (this._isEditMode() && this._config.editModeNotifications != 'no') {
        window.prompt('YAML:', cameraData);
      }
      console.log('YAML:', cameraData);
    }
  }

  // Double click (with click off) and keys: a key has no position, so it only logs the camera.
  private _performAction(e: any): void {
    if (this._pickMode) return;
    const intersects = e && e.clientX !== undefined ? this._getintersect(e.clientX, e.clientY) : [];
    this._defaultaction(intersects);
  }

  // A model file that doesn't load (wrong path or name), or an error while it is set up: the loaders
  // report both here. The error used to be thrown again without its message.
  private _loadError(file: string): (error: any) => void {
    return (error: any): void => {
      console.error('floor3d-card: cannot load ' + file + ': ' + ((error && error.message) || error));
      this._showLoadError(file, error);
    };
  }

  // --- Editor (only the card in the preview of the card editor listens) ---------------------------

  private _toEditor(detail: any): void {
    window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail }));
  }

  private _onEditor(detail: any): void {
    if (!this.preview || !detail) return;
    if (detail.request === 'objects' && this._modelready) {
      this._toEditor({ objects: this._modelObjectNames() });
    }
    if (detail.request === 'camera' && this._camera && this._controls) {
      const { position, rotation } = this._camera;
      const target = this._controls.target;
      this._toEditor({
        camera: {
          camera_position: { x: position.x, y: position.y, z: position.z },
          camera_target: { x: target.x, y: target.y, z: target.z },
          camera_rotate: { x: rotation.x, y: rotation.y, z: rotation.z },
        },
      });
    }
    if ('pick' in detail) {
      this._pickMode = !!detail.pick;
      if (this._renderer) this._renderer.domElement.style.cursor = this._pickMode ? 'crosshair' : '';
    }
    if ('highlight' in detail) this._setHighlight(detail.highlight || []);
    if (detail.request === 'reload') this.rerender();
  }

  // Names of the objects of the model (without the level prefix), for the object menus of the editor.
  // Object ids with * (Lamp_*) become the objects of the model they match, as for an object group.
  // One that matches nothing stays as it is: the entity is then left out as for a missing object.
  private _expandObjectPatterns(): void {
    const names = this._modelObjectNames();
    (this._object_ids || []).forEach((item) => {
      if (!item.objects.some((o) => objectPattern(o.object_id))) return;
      item.objects = item.objects.flatMap((o) => {
        if (!objectPattern(o.object_id)) return [o];
        const found = matchObjects(o.object_id, names);
        if (found.length === 0) {
          console.warn('floor3d-card: no object of the model matches <' + o.object_id + '> (' + item.entity + ')');
          return [o];
        }
        return found.map((object_id) => ({ ...o, object_id }));
      });
    });
  }

  private _modelObjectNames(): string[] {
    const names = new Set<string>();
    (this._raycastinglevels || []).forEach((level) => (level || []).forEach((o) => o.name && names.add(o.name)));
    return Array.from(names);
  }

  // A box around each object (a group <name> stands for its objects), drawn over everything.
  private _setHighlight(ids: string[]): void {
    if (!this._scene) return;
    this._highlightHelpers.forEach((helper) => {
      this._scene.remove(helper);
      (helper as THREE.BoxHelper).geometry.dispose();
      ((helper as THREE.BoxHelper).material as THREE.Material).dispose();
    });
    this._highlightHelpers = [];
    const names = new Set<string>();
    const modelNames = this._modelObjectNames();
    const add = (id: string) => matchObjects(id, modelNames).forEach((name) => names.add(name));
    ids.forEach((id) => {
      const group = /^<(.*)>$/.exec(id);
      if (!group) add(id);
      else {
        const found = (this._config.object_groups || []).find((g) => g.object_group === group[1]);
        ((found && found.objects) || []).forEach((o) => add(o.object_id));
      }
    });
    names.forEach((name) => {
      const object = this._scene.getObjectByName(name);
      if (!object) return;
      const helper = new THREE.BoxHelper(object, 0x03a9f4);
      const material = helper.material as THREE.LineBasicMaterial;
      material.depthTest = false;
      material.transparent = true;
      helper.renderOrder = 999;
      this._scene.add(helper);
      this._highlightHelpers.push(helper);
    });
    if (this._renderer && this._camera) this._render();
  }

  private _zIndexChecker(): void {
    // Disabled: with the current Home Assistant DOM it reports false "obscured" states on
    // mobile, stopping the animation loop while _to_animate stays true (doors and trackers
    // froze). Visibility is handled by the IntersectionObserver in connectedCallback.
  }

  private _getZIndex(toCheck: any): string {
    let returnVal: string;

    if (toCheck == null) {
      returnVal = '0';
    }

    if (toCheck.parentNode == null) {
      return '0';
    }

    returnVal = getComputedStyle(toCheck).getPropertyValue('--dialog-z-index');
    if (returnVal == '') {
      returnVal = getComputedStyle(toCheck).getPropertyValue('z-index');
    }

    if (returnVal == '' || returnVal == 'auto') {
      if (toCheck.parentNode.constructor != null) {
        if (toCheck.parentNode.constructor.name == 'ShadowRoot') {
          return this._getZIndex(toCheck.parentNode.host);
        } else if (toCheck.parentNode.constructor.name == 'HTMLDocument') {
          return '0';
        } else {
          return this._getZIndex(toCheck.parentNode);
        }
      } else {
        returnVal = '0';
      }
    }
    return returnVal;
  }

  private _resizeCanvasDebounce(): void {
    window.clearTimeout(this._resizeTimeout);
    this._resizeTimeout = window.setTimeout(() => {
      this._resizeCanvas();
    }, 50);
  }

  private _resizeCanvas(): void {
    console.log('Resize canvas start');
    if (
      this._renderer.domElement.parentElement.clientWidth !== this._renderer.domElement.width ||
      this._renderer.domElement.parentElement.clientHeight !== this._renderer.domElement.height
    ) {
      this._camera.aspect =
        this._renderer.domElement.parentElement.clientWidth / this._renderer.domElement.parentElement.clientHeight;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(
        this._renderer.domElement.parentElement.clientWidth,
        this._renderer.domElement.parentElement.clientHeight,
        !this._issidebar(),
      );
      this._renderer.render(this._scene, this._camera);
    }
    console.log('Resize canvas end');
  }

  private _statewithtemplate(entity: Floor3dCardConfig): string {
    if (this._hass.states[entity.entity]) {
      let state = this._hass.states[entity.entity].state;

      if (entity.entity_template) {
        const trimmed = entity.entity_template.trim();

        if (trimmed.substring(0, 3) === '[[[' && trimmed.slice(-3) === ']]]' && trimmed.includes('$entity')) {
          // A numeric state is a number, as when it was pasted into the code ($entity > 25), and
          // '$entity' or "$entity" in quotes is still the text of the state.
          const code = trimmed.slice(3, -3).replace(/(['"])\$entity\1/g, '$f3dState');
          const value = state.trim() !== '' && !isNaN(Number(state)) ? Number(state) : state;
          try {
            state = runTemplate(value, state, code);
          } catch (error) {
            if (!this._templateErrors.has(entity.entity_template)) {
              this._templateErrors.add(entity.entity_template);
              console.warn('floor3d-card: entity_template of <' + entity.entity + '> failed: ' + error);
            }
          }
        }
      }
      return state;
    } else {
      return '';
    }
  }

  public set hass(hass: HomeAssistant) {
    try {
      //called by Home Assistant Lovelace when a change of state is detected in entities
      this._hass = hass;
      if (this._config.entities) {
        if (!this._states) {
          //prepares to save the state
          this._states = [];
          this._unit_of_measurement = [];
          this._color = [];
          this._brightness = [];
          this._lights = [];
          this._rooms = [];
          this._sprites = [];
          this._canvas = [];
          this._text = [];
          this._spritetext = [];
          this._position = [];
          this._info = [];
          this._showers = [];

          this._config.entities.forEach((entity) => {
            if (hass.states[entity.entity]) {
              this._states.push(this._statewithtemplate(entity));
              this._canvas.push(null);
              this._showers.push(null);
              if (hass.states[entity.entity].attributes['unit_of_measurement']) {
                this._unit_of_measurement.push(hass.states[entity.entity].attributes['unit_of_measurement']);
              } else {
                this._unit_of_measurement.push('');
              }
              if (entity.type3d == 'text') {
                if (entity.text.attribute) {
                  if (hass.states[entity.entity].attributes[entity.text.attribute]) {
                    this._text.push(hass.states[entity.entity].attributes[entity.text.attribute]);
                  } else {
                    this._text.push(this._statewithtemplate(entity));
                  }
                } else {
                  this._text.push(this._statewithtemplate(entity));
                }
              } else {
                this._text.push('');
              }
              if (entity.type3d == 'room') {
                this._rooms.push(entity.object_id + '_room');
                this._sprites.push(entity.object_id + '_sprites');
                if (entity.room.attribute) {
                  if (hass.states[entity.entity].attributes[entity.room.attribute]) {
                    this._spritetext.push(hass.states[entity.entity].attributes[entity.room.attribute]);
                  } else {
                    this._spritetext.push(this._statewithtemplate(entity));
                  }
                } else {
                  if (entity.room.label_text) {
                    if (entity.room.label_text == 'template') {
                      this._spritetext.push(this._statewithtemplate(entity));
                      this._unit_of_measurement.pop();
                      this._unit_of_measurement.push('');
                    } else {
                      this._spritetext.push(this._hass.states[entity.entity].state);
                    }
                  } else {
                    this._spritetext.push('');
                  }
                }
              } else {
                this._spritetext.push('');
                this._rooms.push('');
                this._sprites.push('');
              }
              if (entity.type3d == 'info') {
                this._info.push(this._statewithtemplate(entity));
              } else {
                this._info.push('');
              }
              this._position.push(entity.type3d == 'cover' ? this._coverPosition(hass.states[entity.entity]) : null);
              if (entity.type3d == 'light') {
                this._lights.push(entity.object_id + '_light');
              } else {
                this._lights.push('');
              }
              let i = this._color.push([255, 255, 255]) - 1;
              // Un tempo qui c'era "color_mode = ..." (assegnazione, non confronto): modificava lo
              // stato condiviso di HA letto anche dalle altre card. Il colore risultante e' lo stesso.
              if (hass.states[entity.entity].attributes['color_mode']) {
                this._color[i] = this._TemperatureToRGB(parseInt(hass.states[entity.entity].attributes['color_temp']));
              }
              if (hass.states[entity.entity].attributes['rgb_color'] !== this._color[i]) {
                this._color[i] = hass.states[entity.entity].attributes['rgb_color'];
              }
              let j = this._brightness.push(-1) - 1;
              if (hass.states[entity.entity].attributes['brightness']) {
                this._brightness[j] = hass.states[entity.entity].attributes['brightness'];
              }
            } else {
              console.log('Entity <' + entity.entity + '> not found');
              // Every array is read by the position of the entity in the config: keep them aligned.
              this._states.push('');
              this._canvas.push(null);
              this._showers.push(null);
              this._unit_of_measurement.push('');
              this._text.push('');
              this._spritetext.push('');
              this._rooms.push('');
              this._sprites.push('');
              this._info.push('');
              this._position.push(null);
              this._lights.push('');
              this._color.push([255, 255, 255]);
              this._brightness.push(-1);
            }
          });
          this._firstcall = false;
        }

        if (this._renderer && this._modelready) {
          let torerender = false;
          if (this._config.overlay) {
            if (this._config.overlay == 'yes') {
              if (this._overlay_entity) {
                if (this._overlay_state) {
                  if (this._overlay_state != hass.states[this._overlay_entity].state) {
                    this._setoverlaycontent(this._overlay_entity);
                  }
                }
              }
            }
          }
          this._config.entities.forEach((entity, i) => {
            if (hass.states[entity.entity]) {
              let state = this._statewithtemplate(entity);
              if (entity.type3d == 'cover') {
                // Both can change: the position while the cover moves, the state when it starts or stops.
                const position = this._coverPosition(hass.states[entity.entity]);
                if (state != this._states[i] || position !== this._position[i]) {
                  this._states[i] = state;
                  this._position[i] = position;
                  this._updatecover(entity, state, i);
                  torerender = true;
                }
              }
              if (entity.type3d == 'light') {
                let toupdate = false;
                if (this._states[i] !== state) {
                  this._states[i] = state;
                  toupdate = true;
                }
                if (hass.states[entity.entity].attributes['color_mode']) {
                  if (hass.states[entity.entity].attributes['color_mode'] == 'color_temp') {
                    if (
                      String(this._TemperatureToRGB(parseInt(hass.states[entity.entity].attributes['color_temp']))) !==
                      String(this._color[i])
                    ) {
                      toupdate = true;
                      this._color[i] = this._TemperatureToRGB(
                        parseInt(hass.states[entity.entity].attributes['color_temp']),
                      );
                    }
                  }
                  if (hass.states[entity.entity].attributes['color_mode'] == 'rgb') {
                    if (hass.states[entity.entity].attributes['rgb_color'] !== this._color[i]) {
                      toupdate = true;
                      this._color[i] = hass.states[entity.entity].attributes['rgb_color'];
                    }
                  }
                }
                if (hass.states[entity.entity].attributes['brightness']) {
                  if (hass.states[entity.entity].attributes['brightness'] !== this._brightness[i]) {
                    toupdate = true;
                    this._brightness[i] = hass.states[entity.entity].attributes['brightness'];
                  }
                }
                if (toupdate) {
                  this._updatelight(entity, i);
                  torerender = true;
                }
              } else if (entity.type3d == 'door') {
                if (this._states[i] !== state) {
                  this._states[i] = state;
                  this._updatedoor(entity, i);
                  torerender = true;
                }
              } else if (entity.type3d == 'image') {
                const stateObj = hass.states[entity.entity];
                const key = stateObj.attributes['entity_picture'] + '|' + stateObj.state;
                if (key !== this._text[i]) {
                  this._text[i] = key;
                  this._updateimage(entity, i);
                  torerender = true;
                }
              } else if (entity.type3d == 'tracker') {
                // Solo se sono cambiate le entita' del tracker (HA sostituisce l'oggetto stato
                // quando un'entita' cambia), non a ogni aggiornamento di qualsiasi entita'.
                const tr = entity.tracker || {};
                const deps = [entity.entity, tr.sensor_x, tr.sensor_y, tr.zone].map((id) =>
                  id ? hass.states[id] : undefined,
                );
                if (!this._trackerPrev) this._trackerPrev = [];
                const prev = this._trackerPrev[i];
                if (!prev || deps.some((s, k) => s !== prev[k])) {
                  this._trackerPrev[i] = deps;
                  this._updatetracker(entity, i);
                }
              } else if (entity.type3d == 'text') {
                let toupdate = false;
                if (entity.text.attribute) {
                  if (hass.states[entity.entity].attributes[entity.text.attribute]) {
                    if (this._text[i] != hass.states[entity.entity].attributes[entity.text.attribute]) {
                      this._text[i] = hass.states[entity.entity].attributes[entity.text.attribute];
                      toupdate = true;
                    }
                  } else if (this._text[i] !== '') {
                    // Only once: Home Assistant calls this at every change of any entity.
                    this._text[i] = '';
                    toupdate = true;
                  }
                } else {
                  if (this._text[i] != this._statewithtemplate(entity)) {
                    this._text[i] = this._statewithtemplate(entity);
                    toupdate = true;
                  }
                }
                if (this._canvas[i] && toupdate) {
                  this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
                  torerender = true;
                }
              } else if (entity.type3d == 'rotate') {
                this._states[i] = state;
                this._rotatecalc(entity, i);
              } else if (entity.type3d == 'shower') {
                if (this._states[i] !== state) {
                  this._states[i] = state;
                  this._updateshowerstate(entity, i);
                  torerender = true;
                }
              } else if (this._states[i] !== state) {
                this._states[i] = state;
                if (entity.type3d == 'color') {
                  this._updatecolor(entity, i);
                  torerender = true;
                } else if (entity.type3d == 'hide') {
                  this._updatehide(entity, i);
                  torerender = true;
                } else if (entity.type3d == 'show') {
                  this._updateshow(entity, i);
                  torerender = true;
                } else if (entity.type3d == 'room') {
                  let toupdate = false;
                  if (entity.room.attribute) {
                    if (hass.states[entity.entity].attributes[entity.room.attribute]) {
                      if (this._spritetext[i] != hass.states[entity.entity].attributes[entity.room.attribute]) {
                        this._spritetext[i] = hass.states[entity.entity].attributes[entity.room.attribute];
                        toupdate = true;
                      }
                    } else {
                      this._spritetext[i] = '';
                      toupdate = true;
                    }
                  } else {
                    if (entity.room.label_text) {
                      if (entity.room.label_text == 'template') {
                        if (this._spritetext[i] != this._statewithtemplate(entity)) {
                          this._spritetext[i] = this._statewithtemplate(entity);
                          toupdate = true;
                        }
                      } else {
                        if (this._spritetext[i] != this._states[i]) {
                          this._spritetext[i] = this._states[i];
                          toupdate = true;
                        }
                      }
                    }
                  }

                  if (this._canvas[i] && toupdate) {
                    this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
                    this._updateroomcolor(entity, i);
                    torerender = true;
                  }
                }
              }
            } else {
              if (!this._missingLogged) this._missingLogged = {};
              if (entity.entity && !this._missingLogged[entity.entity]) {
                this._missingLogged[entity.entity] = true;
                console.log('Entity <' + entity.entity + '> not found');
              }
            }
          });
          this._updateTorch();
          this._updateSky();
          this._updateSun();
          this._updateStateColors();
          if (torerender) {
            this._render();
          }
        }
      }
    } catch (e) {
      console.log(e);
      throw new Error('Error in hass: ' + e);
    }
  }

  private _initTorch(): void {
    this._torch = new THREE.DirectionalLight(0xffffff, 0.2 * TORCH_SCALE);
    this._torchTarget = new THREE.Object3D();
    this._torchTarget.name = 'Torch Target';
    this._torch.target = this._torchTarget;
    this._torch.matrixAutoUpdate = true;
    this._scene.add(this._torch);
    this._scene.add(this._torchTarget);

    this._torch.castShadow = false;

    this._aimTorch();
    this._updateTorch();
  }

  // globalLightPower can be a numeric sensor: read at every update (before, only at startup).
  private _updateTorch(): void {
    if (!this._torch) return;
    const intensity = this._power('globalLightPower', 0.2) * TORCH_SCALE;
    if (intensity === this._torch.intensity) return;
    this._torch.intensity = intensity;
    this._scheduleRender();
  }

  // Light of the sky (sky_power): a hemisphere light without shadows, sky_color from above and
  // ground_color from below, that fills the shade the sun leaves. There is no ambient light on
  // purpose: with sky_power missing or 0 there is no sky light either, and the render is the same.
  private _initSky(): void {
    this._skyLight?.removeFromParent();
    this._skyLight = undefined;
    const power = this._config.sky_power;
    if (power === undefined || power === null || Number(power) === 0) return;
    this._skyLight = new THREE.HemisphereLight(SKY_COLOR, GROUND_COLOR, 0);
    this._skyLight.name = 'f3d_sky';
    if (this._config.sky_color) this._skyLight.color.set(this._config.sky_color);
    if (this._config.ground_color) this._skyLight.groundColor.set(this._config.ground_color);
    this._scene.add(this._skyLight);
    this._updateSky();
  }

  // sky_power can be a numeric sensor (from the diffuse radiation, for example): read at every
  // update. With the sun (sun: yes) the sky follows the day like the sun: no sky light at night.
  private _updateSky(): void {
    if (!this._skyLight) return;
    let intensity = SKY_INTENSITY * this._power('sky_power', 0);
    if (this._config.sun == 'yes') {
      const elevation = this._sunAngles()[1];
      if (!isNaN(elevation)) intensity *= daylight(elevation);
    }
    if (intensity === this._skyLight.intensity) return;
    this._skyLight.intensity = intensity;
    this._scheduleRender();
  }

  // A light power of the config: a number, or the id of a numeric sensor whose state is read at
  // every update. An unavailable sensor (or a state that isn't a number) gives the default, and a
  // negative value counts as 0.
  private _power(option: 'globalLightPower' | 'sun_power' | 'sky_power', fallback: number): number {
    const value = this._config[option];
    const entity = typeof value === 'string' && this._hass ? this._hass.states[value] : undefined;
    if (!entity && typeof value === 'string' && value.trim() !== '' && isNaN(Number(value))) {
      if (!this._missingLogged) this._missingLogged = {};
      if (!this._missingLogged[value]) {
        this._missingLogged[value] = true;
        console.warn('floor3d-card: ' + option + ': entity not found: ' + value + ', the default ' + fallback + ' is used');
      }
    }
    return Math.max(0, this._num(entity ? entity.state : value, fallback));
  }

  protected display3dmodel(): void {
    //load the model into the GL Renderer

    console.log('Start Build Renderer');
    this._modelready = false;

    //create and initialize scene and camera

    this._scene = new THREE.Scene();

    // The near plane follows the distance from the target (_updateNearPlane): 0.1 cm with a
    // standard depth buffer made coplanar surfaces flicker.
    this._camera = new THREE.PerspectiveCamera(45, 1, 5, 20000);

    // create and initialize renderer

    // The logarithmic depth buffer is costly on phones (no early depth test): it is off unless
    // log_depth: yes. Where EXT_clip_control exists a reversed depth buffer adds precision for free.
    const logDepth = this._config.log_depth == 'yes';
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: logDepth,
      reversedDepthBuffer: !logDepth && this._config.reversed_depth != 'no',
    });
    this._maxtextureimage = this._renderer.capabilities.maxTextures;
    console.log('Max Texture Image Units: ' + this._maxtextureimage);
    console.log('Max Texture Image Units: number of lights casting shadow should be less than the above number');

    this._renderer.domElement.style.width = '100%';
    this._renderer.domElement.style.height = '100%';
    this._renderer.domElement.style.display = 'block';
    this._renderer.domElement.addEventListener('webglcontextrestored', this._contextRestoredListener);

    if (this._config.backgroundColor) {
      if (this._config.backgroundColor == 'transparent') {
        this._renderer.setClearColor(0x000000, 0);
      } else {
        this._scene.background = new THREE.Color(this._config.backgroundColor);
      }
    } else {
      this._scene.background = new THREE.Color('#aaaaaa');
    }

    // Colours in sRGB with light computed in linear space (three.js default since 0.152); the tone
    // mapping rolls off the highlights instead of clipping them.
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.toneMapping = TONE_MAPPINGS[this._config.tone_mapping] ?? THREE.NeutralToneMapping;
    this._renderer.toneMappingExposure = this._num(this._config.exposure, 1);
    this._renderer.localClippingEnabled = true;

    if (this._config.path && this._config.path != '') {
      let path = this._config.path;
      const lastChar = path.charAt(path.length - 1);
      if (lastChar == '.') {
        path = '';
      } else if (lastChar != '/') {
        path = path + '/';
      }
      console.log('Path: ' + path);

      let fileExt = this._config.objfile.split('?')[0].split('.').pop();

      this._showLoading(fileExt == 'obj' && this._config.mtlfile ? 'loading_materials' : 'loading_model');

      if (fileExt == 'obj') {
        //waterfront format
        if (this._config.mtlfile && this._config.mtlfile != '') {
          const mtlLoader: MTLLoader = new MTLLoader();
          mtlLoader.setPath(path);
          mtlLoader.load(
            this._config.mtlfile,
            this._onLoaded3DMaterials.bind(this),
            this._onLoadMaterialProgress.bind(this),
            this._loadError(path + this._config.mtlfile),
          );
        } else {
          this._loadOBJ(path);
        }
        this._modeltype = ModelSource.OBJ;
      } else if (fileExt == 'glb') {
        //glb format
        this._loadGLB(path);
        this._modeltype = ModelSource.GLB;
      }
    } else {
      throw new Error('Path is empty');
    }
    console.log('End Build Renderer');
  }

  // A .glb model, also one compressed with Draco or meshopt (gltf-transform draco / meshopt, 5 to 10
  // times smaller). The file is read first, and the decoder it needs is loaded only then: meshopt
  // from a chunk of the card, Draco from draco_decoder_path (Google's CDN by default). Idea from
  // Steven-D-Morgan/hass-3d-floorplan.
  private _loadGLB(path: string): void {
    const file = path + this._config.objfile;
    const onError = this._loadError(file);
    const fileLoader = new THREE.FileLoader();
    fileLoader.setResponseType('arraybuffer');
    fileLoader.load(
      file,
      async (data) => {
        let draco: { dispose(): void } | undefined;
        const done = (): void => draco?.dispose(); // its workers
        try {
          await this._showPreparing();
          const buffer = data as ArrayBuffer;
          const extensions = glbExtensions(buffer);
          const loader = new GLTFLoader();
          if (extensions.includes('EXT_meshopt_compression')) {
            const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');
            loader.setMeshoptDecoder(MeshoptDecoder);
          }
          if (extensions.includes('KHR_draco_mesh_compression')) {
            const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
            let decoderPath = this._config.draco_decoder_path || DRACO_DECODER_PATH;
            if (!decoderPath.endsWith('/')) decoderPath += '/';
            const dracoLoader = new DRACOLoader().setDecoderPath(decoderPath);
            draco = dracoLoader;
            loader.setDRACOLoader(dracoLoader);
          }
          loader.parse(
            buffer,
            path,
            (gltf) => {
              done();
              if (extensions.includes('KHR_mesh_quantization')) bakeNodeTransforms(gltf.scene);
              this._onLoadedGLTF3DModel(gltf);
            },
            (error) => {
              done();
              onError(error);
            },
          );
        } catch (error) {
          done();
          onError(error);
        }
      },
      this._onloadedGLTF3DProgress.bind(this),
      onError,
    );
  }

  // An .obj model: read as text, then parsed once the loading screen says so (parsing a big OBJ takes
  // a while, and the screen used to stay at 100% meanwhile).
  private _loadOBJ(path: string, materials?: MTLLoader.MaterialCreator): void {
    const file = path + this._config.objfile;
    const onError = this._loadError(file);
    new THREE.FileLoader().load(
      file,
      async (text) => {
        try {
          await this._showPreparing();
          const objLoader = new OBJLoader();
          if (materials) objLoader.setMaterials(materials);
          this._onLoaded3DModel(objLoader.parse(text as string));
        } catch (error) {
          onError(error);
        }
      },
      this._onLoadObjectProgress.bind(this),
      onError,
    );
  }

  // --- Loading screen: what the card is doing, a bar and the megabytes --------------------------

  private _loadingScreen(): HTMLElement {
    if (!this._loadingEl || !this._content.contains(this._loadingEl)) {
      const el = document.createElement('div');
      el.className = 'f3d-loading';
      el.innerHTML =
        '<svg class="f3d-icon" viewBox="0 0 24 24" aria-hidden="true"><path></path></svg>' +
        '<div class="f3d-title"></div><div class="f3d-bar"><div class="f3d-fill"></div></div><div class="f3d-detail"></div>';
      el.setAttribute('role', 'status');
      this._content.replaceChildren(el);
      this._loadingEl = el;
    }
    return this._loadingEl;
  }

  private _showLoading(step: string, progress?: ProgressEvent): void {
    if (!this._content || this._modelready) return;
    const el = this._loadingScreen();
    el.classList.remove('error');
    el.querySelector('path').setAttribute('d', mdiCubeOutline);
    el.querySelector('.f3d-title').textContent = this._t(step);
    // Without a Content-Length (a compressing proxy, for example) only the megabytes are known.
    const known = !!progress && progress.lengthComputable && progress.total > 0;
    const percent = known ? Math.min(100, (progress.loaded / progress.total) * 100) : 0;
    el.querySelector('.f3d-bar').classList.toggle('indeterminate', !known);
    (el.querySelector('.f3d-fill') as HTMLElement).style.width = known ? percent + '%' : '';
    const mb = (bytes: number): string =>
      (bytes / 1048576).toLocaleString(this._hass?.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    el.querySelector('.f3d-detail').textContent = !progress
      ? ''
      : known
        ? Math.round(percent) + '% · ' + mb(progress.loaded) + ' / ' + mb(progress.total) + ' MB'
        : mb(progress.loaded) + ' MB';
  }

  // Before the long work on the model: the screen says so, and is drawn before that work starts.
  private async _showPreparing(): Promise<void> {
    this._showLoading('preparing');
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 100); // a hidden page draws no frames
      requestAnimationFrame(() =>
        setTimeout(() => {
          clearTimeout(timer);
          resolve();
        }, 0),
      );
    });
  }

  private _showLoadError(file: string, error: any): void {
    if (!this._content) return;
    const el = this._loadingScreen();
    el.classList.add('error');
    el.querySelector('path').setAttribute('d', mdiAlertCircleOutline);
    el.querySelector('.f3d-title').textContent = this._t('load_error');
    const reason = (error && error.message) || String(error || '');
    el.querySelector('.f3d-detail').textContent = file + (reason ? ': ' + reason : '');
  }

  private _onLoadError(event: ErrorEvent): void {
    this._showError(event.error);
  }

  private _onloadedGLTF3DProgress(_progress: ProgressEvent): void {
    this._showLoading('loading_model', _progress);
  }

  private _onLoadMaterialProgress(_progress: ProgressEvent): void {
    //progress function called at regular intervals during material loading process
    this._showLoading('loading_materials', _progress);
  }

  private _onLoadObjectProgress(_progress: ProgressEvent): void {
    //progress function called at regular intervals during object loading process
    this._showLoading('loading_model', _progress);
  }

  private _onLoadedGLTF3DModel(gltf: GLTF) {
    this._onLoaded3DModel(gltf.scene);
  }

  private _onLoaded3DModel(object: Object3D): void {
    // Object Loaded Event: last root object passed to the function

    console.log('Object loaded start');

    this._initobjects(object);

    this._bboxmodel = new THREE.Object3D();

    this._levels.forEach((element) => {
      this._bboxmodel.add(element);
    });

    this._scene.add(this._bboxmodel);

    this._bboxmodel.updateMatrixWorld(true);

    // Shown only if setting up the model stops with an error; replaced by the model otherwise.
    this._showLoadError(this._config.objfile, this._t('setup_error'));

    if (this._config.show_axes) {
      if (this._config.show_axes == 'yes') {
        this._scene.add(new THREE.AxesHelper(300));
      }
    }

    if (this._config.shadow && this._config.shadow == 'yes') {
      console.log('Shadow On');
      // Shadow maps are redrawn only when something changes, and only for the lights that are on
      // (see _invalidateShadows). PCF with a radius gives the soft edges PCFSoftShadowMap gave.
      this._renderer.shadowMap.enabled = true;
      this._renderer.shadowMap.type = THREE.PCFShadowMap;
      this._renderer.shadowMap.autoUpdate = false;
    } else {
      console.log('Shadow Off');
      this._renderer.shadowMap.enabled = false;
    }

    this._expandObjectPatterns();
    this._add3dObjects();

    console.log('Object loaded end');

    if (this._content && this._renderer) {
      this._modelready = true;
      if (this.preview) this._toEditor({ objects: this._modelObjectNames() });
      console.log('Show canvas');
      this._levelbar = document.createElement('div');
      this._zoombar = document.createElement('div');
      this._selectionbar = document.createElement('div');
      this._content.innerText = '';
      this._content.appendChild(this._levelbar);
      this._content.appendChild(this._zoombar);
      this._content.appendChild(this._selectionbar);
      this._content.appendChild(this._renderer.domElement);
      this._selectedlevel = -1;

      render(this._getSelectionBar(), this._selectionbar);

      this._addInputListeners();

      this._setCamera();

      this._controls = new OrbitControls(this._camera, this._renderer.domElement);

      // Phones report 3x or more: 9 times the pixels of 1x for a difference hard to see.
      this._renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, this._num(this._config.max_pixel_ratio, 2)),
      );

      this._controls.maxPolarAngle = (0.85 * Math.PI) / 2;
      this._controls.addEventListener('change', this._changeListener);
      this._controls.addEventListener('start', this._controlsStartListener);

      this._setLookAt();

      this._controls.update();
      this._updateNearPlane();
      this._computeModelBounds();

      if (this._config.lock_camera == 'yes') {
        /*
                this._controls.enableRotate = false;
                this._controls.enableZoom = false;
                this._controls.enablePan = false;
        */
        this._controls.enabled = false;
      }

      this._initTorch();

      this._initSky();

      this._initSun();

      this._applyShadowBudget();

      this._initRooms();

      this._getOverlay();

      this._manageZoom();
      this._renderMenus();
      this._updateStateColors(true);

      const initialLevel = typeof this._config.initialLevel === 'undefined' ? -1 : this._config.initialLevel;
      this._setVisibleLevel(initialLevel);

      this._urlView = undefined; // a new model: the view of the page applies again
      this._applyUrlView(false);

      this._resizeCanvas();

      /*
      this._zoom.forEach(element => {

        this._bboxmodel.localToWorld(element.position);
        this._bboxmodel.localToWorld(element.target);

      });
      */

      this._zIndexInterval = window.setInterval(() => {
        this._zIndexChecker();
      }, 250);

      if (this._ispanel() || this._issidebar()) {
        this._resizeObserver.observe(this._card);
      }
    }
  }

  private _initobjects(object: THREE.Object3D) {
    console.log('Ïnit Objects, Levels and Raycasting');

    let level = 0;
    this._levels = [];
    this._raycasting = [];
    this._raycastinglevels = [];
    //TODO: explore solution with layers

    console.log('Found level 0');

    this._levels[0] = new THREE.Object3D();
    this._raycastinglevels[0] = [];

    const regex = /lvl(\d{3})/;

    let imported_objects: THREE.Object3D[] = [];

    object.traverse((element) => {
      imported_objects.push(element);
    });

    imported_objects.forEach((element) => {
      let found;

      found = element.name.match(regex);

      if (found) {
        if (!this._levels[Number(found[1])]) {
          console.log('Found level ' + found[1]);
          this._levels[Number(found[1])] = new THREE.Object3D();
          this._raycastinglevels[Number(found[1])] = [];
        }

        element.userData = { level: Number(found[1]) };
        element.name = element.name.slice(6);
        this._levels[Number(found[1])].add(element);
        level = Number(found[1]);
      } else {
        element.userData = { level: 0 };
        this._levels[0].add(element);
        level = 0;
      }

      element.receiveShadow = true;

      if (element.name.includes('transparent_slab')) {
        element.castShadow = true;
        if ((element as THREE.Mesh).material instanceof THREE.MeshPhongMaterial) {
          ((element as THREE.Mesh).material as THREE.MeshPhongMaterial).depthWrite = false;
        } else if ((element as THREE.Mesh).material instanceof THREE.MeshBasicMaterial) {
          ((element as THREE.Mesh).material as THREE.MeshBasicMaterial).depthWrite = false;
        } else if ((element as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
          ((element as THREE.Mesh).material as THREE.MeshStandardMaterial).transparent = true;
          ((element as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0;
          ((element as THREE.Mesh).material as THREE.MeshStandardMaterial).depthWrite = false;
        }
        return;
      }

      if (this._modeltype == ModelSource.GLB) {
        if (element.name.includes('_hole_')) {
          element.castShadow = false;
          if ((element as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
            ((element as THREE.Mesh).material as THREE.MeshStandardMaterial).transparent = true;
            ((element as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0;
          }
          return;
        }
      }

      this._raycastinglevels[level].push(element);
      //this._raycasting.push(element);

      if (element instanceof THREE.Mesh) {
        if (!Array.isArray((element as THREE.Mesh).material)) {
          if (((element as THREE.Mesh).material as THREE.Material).opacity != 1) {
            if ((element as THREE.Mesh).material instanceof THREE.MeshPhongMaterial) {
              ((element as THREE.Mesh).material as THREE.MeshPhongMaterial).depthWrite = false;
            } else if ((element as THREE.Mesh).material instanceof THREE.MeshBasicMaterial) {
              ((element as THREE.Mesh).material as THREE.MeshBasicMaterial).depthWrite = false;
            } else if ((element as THREE.Mesh).material instanceof THREE.MeshStandardMaterial) {
              ((element as THREE.Mesh).material as THREE.MeshBasicMaterial).depthWrite = false;
            }
            element.castShadow = false;
            return;
          }
        }
      }

      const shadow = this._config.shadow ? this._config.shadow : 'no';

      if (shadow == 'no') {
        element.castShadow = false;
      } else {
        element.castShadow = true;
      }

      return;
    });

    this._displaylevels = [];
    this._levels.forEach((level, index) => {
      if (level) {
        this._displaylevels.push(true);
        this._raycasting = this._raycasting.concat(this._raycastinglevels[index]);
      }
    });
    console.log('End Init Objects. Number of levels found: ' + this._levels.length);
  }

  private _setVisibleLevel(level: number) {
    this._levels.forEach((element, i) => {
      if (level == -1) {
        this._displaylevels[i] = true;
      } else {
        this._displaylevels[i] = i == level;
      }
      element.visible = this._displaylevels[i];
    });
    this._updateRaycasting();
    render(this._getLevelBar(), this._levelbar);
  }

  private _toggleVisibleLevel(level: number): void {
    this._levels.forEach((element, i) => {
      if (level == -1) {
        this._displaylevels[i] = true;
      } else if (level == i) {
        this._displaylevels[i] = !this._displaylevels[i];
      }
      element.visible = this._displaylevels[i];
    });
    this._updateRaycasting();
  }

  private _updateRaycasting() {
    this._raycasting = [];
    this._displaylevels.forEach((visible, index) => {
      if (visible) {
        this._raycasting = this._raycasting.concat(this._raycastinglevels[index]);
      }
    });
  }

  private _getZoomBar(): TemplateResult {
    if (this._levels) {
      // The original button bar, only when the views menu is hidden: they do the same thing.
      if (this._zoom.length > 0 && this._config.hideZoomMenu == 'yes') {
        return html`
          <div class="category" style="opacity: 0.5; position: absolute; bottom: 0px; left: 0px">
            ${this._getZoomButtons()}
          </div>
        `;
      } else {
        return html``;
      }
    } else {
      return html``;
    }
  }

  private _getZoomButtons(): TemplateResult[] {
    const iconArray: TemplateResult[] = [];

    iconArray.push(html`
      <div class="row" style="background-color:black;">
        <font color="white">
          <floor3d-button style="opacity: 100%;" label="reset" .index=${-1} @click=${this._handleZoomClick.bind(this)}>
          </floor3d-button>
        </font>
      </div>
    `);

    this._zoom.forEach((element, index) => {
      if (element) {
        iconArray.push(html`
          <div class="row" style="background-color:black;">
            <font color="white">
              <floor3d-button label=${element.name} .index=${index} @click=${this._handleZoomClick.bind(this)}>
              </floor3d-button>
            </font>
          </div>
        `);
      }
    });

    return iconArray;
  }

  private _getZoomMenu(): TemplateResult {
    if (this._config.hideZoomMenu == 'yes' || !this._levels || this._zoom.length == 0) {
      return html``;
    }
    // The placeholder comes back when the camera is moved by hand, so the same view can be picked again.
    return html`
      <select
        aria-label=${this._t('views')}
        @change=${this._handleZoomChange.bind(this)}
        style="font: inherit; font-size: 14px; padding: 6px 10px; border-radius: 8px; color-scheme: dark;
          background: rgba(0, 0, 0, 0.55); color: white; border: 1px solid rgba(255, 255, 255, 0.6);
          max-width: 60vw; cursor: pointer;"
      >
        <option value="" selected disabled hidden>${this._t('views')}</option>
        <option value="-1">${this._t('initial_view')}</option>
        ${this._zoom.map((zoom, index) => html`<option value="${index}">${zoom.name}</option>`)}
      </select>
    `;
  }

  private _handleZoomChange(ev: Event): void {
    ev.stopPropagation();
    const select = ev.target as HTMLSelectElement;
    this._zoomSelect = select;
    const index = parseInt(select.value);
    if (isNaN(index)) return;
    this._goToView(index);
  }

  // Shows a view (zoom area); -1 is the initial view. With animate the camera flies there.
  private _goToView(index: number, animate = true): void {
    if (index == -1) {
      if (this._config.camera_position && this._config.camera_target) {
        this._flyTo(this._config.camera_position, this._config.camera_target);
      } else {
        this._setCamera();
        this._setLookAt();
        this._controls.update();
        this._render();
      }
      return;
    }
    const zoom = this._zoom[index];
    if (!zoom) return;
    if (zoom.level != null) {
      this._setVisibleLevel(zoom.level);
    }
    if (animate) {
      this._flyTo(zoom.position, zoom.target);
      return;
    }
    this._stopCameraTweens();
    this._camera.position.set(zoom.position.x, zoom.position.y, zoom.position.z);
    this._controls.target.set(zoom.target.x, zoom.target.y, zoom.target.z);
    this._controls.update();
    this._updateNearPlane();
    this._render();
  }

  // url_parameters.zoom names a query parameter of the page: with zoom: area, ?area=kitchen shows
  // the view called kitchen (case, spaces, _ and - don't count), for example after a button that
  // navigates to /dashboard/home?area=kitchen. The camera moves only when the parameter changes, so
  // it isn't pulled back when a dialog opens or closes. Idea from MephistoJB/floor3d-card.
  private _applyUrlView(animate: boolean): void {
    const param = this._config.url_parameters && this._config.url_parameters.zoom;
    if (!param || !this._modelready) return;
    const value = new URLSearchParams(window.location.search).get(String(param).trim());
    if (value === this._urlView) return;
    this._urlView = value;
    if (!value) return;
    const key = (name: string): string =>
      String(name)
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+/g, '_');
    const index = this._zoom.findIndex((zoom) => zoom && key(zoom.name) === key(value));
    if (index < 0) {
      console.warn('floor3d-card: no view (zoom area) called <' + value + '>, from ?' + param + '=' + value);
      return;
    }
    this._goToView(index, animate);
  }

  // Smooth camera move to a view: position and target together.
  private _flyTo(position: { x: number; y: number; z: number }, target: { x: number; y: number; z: number }): void {
    this._stopCameraTweens();
    const update = () => this._controls.update();
    const done = () => {
      this._cameraTweens = this._cameraTweens.filter((t) => t.isPlaying());
      this._updateNearPlane();
      this._startOrStopAnimationLoop();
    };
    this._cameraTweens = [
      new TWEEN.Tween(this._camera.position).to({ x: position.x, y: position.y, z: position.z }, 700),
      new TWEEN.Tween(this._controls.target).to({ x: target.x, y: target.y, z: target.z }, 700),
    ];
    this._cameraTweens.forEach((t) => t.easing(TWEEN.Easing.Cubic.InOut).onUpdate(update).onComplete(done).start());
    this._startOrStopAnimationLoop();
  }

  private _stopCameraTweens(): void {
    this._cameraTweens.forEach((t) => t.stop());
    this._cameraTweens = [];
  }

  private _t(key: string): string {
    return localize('common.' + key, '', '', this._hass && this._hass.language);
  }
  private _getLevelBar(): TemplateResult {
    if (this._levels) {
      if (this._levels.length > 1 && (this._config.hideLevelsMenu == null || this._config.hideLevelsMenu == 'no')) {
        return html` <div class="category" style="opacity: 0.5; position: absolute">${this._getLevelIcons()}</div> `;
      } else {
        return html``;
      }
    } else {
      return html``;
    }
  }

  private _getLevelIcons(): TemplateResult[] {
    const iconArray: TemplateResult[] = [];

    iconArray.push(html`
      <div class="row" style="background-color:black;">
        <font color="white">
          <ha-icon
            .icon=${`mdi:format-list-numbered`}
            style="opacity: 100%;"
            class="ha-icon-large"
            .index=${-1}
            @click=${this._handleLevelClick.bind(this)}
          >
          </ha-icon>
        </font>
      </div>
    `);

    this._levels.forEach((element, index) => {
      if (element) {
        iconArray.push(html`
          <div class="row" style="background-color:black;">
            <font color="white">
              <ha-icon
                .icon=${`mdi:numeric-${index}-box-multiple`}
                style=${this._displaylevels[index] ? 'opacity: 100%;' : 'opacity: 60%;'}
                class="ha-icon-large"
                .index=${index}
                @click=${this._handleLevelClick.bind(this)}
              >
              </ha-icon>
            </font>
          </div>
        `);
      }
    });

    return iconArray;
  }

  private _getSelectionBar(): TemplateResult {
    if (this._config.selectionMode == 'yes') {
      const buttonArray: TemplateResult[] = [];
      buttonArray.push(html`
        <div class="row" style="background-color:black;">
          <font color="white">
            <floor3d-button
              style="opacity: 100%;"
              label="clear selections (${this._selectedobjects.length})"
              @click=${this._handleClearSelectionsClick.bind(this)}
            >
            </floor3d-button>
          </font>
        </div>
      `);

      buttonArray.push(html`
        <div class="row" style="background-color:black;">
          <font color="white">
            <floor3d-button
              style="opacity: 100%;"
              label="${this._selectionModeEnabled ? 'Disable Selection' : 'Enable Selection'}"
              @click=${this._handleToggleSelectionMode.bind(this)}
            >
            </floor3d-button>
          </font>
        </div>
      `);

      return html`
        <div class="category" style="opacity: 0.5; position: absolute; bottom: 0px; right: 0px">${buttonArray}</div>
      `;
    } else {
      return html``;
    }
  }

  private _setSelectionMaterials(show: boolean): void {
    this._selectedobjects.forEach((objectName) => {
      let object: any = this._scene.getObjectByName(objectName);
      if (object) {
        object.material = show ? this._selectedmaterial : this._initialobjectmaterials[objectName];
      }
    });
    this._render();
  }

  private _handleClearSelectionsClick(ev): void {
    ev.stopPropagation();
    this._setSelectionMaterials(false);
    this._selectedobjects = [];
    console.log('Cleared selected objects');
    render(this._getSelectionBar(), this._selectionbar);
  }

  private _handleToggleSelectionMode(ev): void {
    ev.stopPropagation();
    this._selectionModeEnabled = !this._selectionModeEnabled;
    this._setSelectionMaterials(this._selectionModeEnabled);
    render(this._getSelectionBar(), this._selectionbar);
  }

  private _handleZoomClick(ev): void {
    ev.stopPropagation();

    if (ev.target.index == -1) {
      this._setCamera();

      this._setLookAt();

      this._controls.update();

      this._render();

      return;
    }

    const zoom = this._zoom[ev.target.index];

    if (zoom.level != null) {
      this._setVisibleLevel(zoom.level);
    }

    this._camera.position.set(
      this._zoom[ev.target.index].position.x,
      this._zoom[ev.target.index].position.y,
      this._zoom[ev.target.index].position.z,
    );

    this._camera.rotation.set(
      this._zoom[ev.target.index].rotation.x,
      this._zoom[ev.target.index].rotation.y,
      this._zoom[ev.target.index].rotation.z,
    );

    this._controls.target.set(
      this._zoom[ev.target.index].target.x,
      this._zoom[ev.target.index].target.y,
      this._zoom[ev.target.index].target.z,
    );

    this._camera.updateProjectionMatrix();

    this._controls.update();

    this._render();
  }

  private _handleLevelClick(ev): void {
    ev.stopPropagation();

    this._toggleVisibleLevel(ev.target.index);

    render(this._getLevelBar(), this._levelbar);

    this._render();
  }

  private _getOverlay(): void {
    if (this._config.overlay == 'yes') {
      console.log('Start config Overlay');
      const overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.className = 'overlay';
      overlay.style.setProperty('position', 'absolute');
      if (this._config.overlay_alignment) {
        switch (this._config.overlay_alignment) {
          case 'top-left':
            overlay.style.setProperty('top', '0px');
            overlay.style.setProperty('left', '0px');
            break;
          case 'top-right':
            overlay.style.setProperty('top', '0px');
            overlay.style.setProperty('right', '0px');
            break;
          case 'bottom-left':
            overlay.style.setProperty('bottom', '0px');
            overlay.style.setProperty('left', '0px');
            break;
          case 'bottom-right':
            overlay.style.setProperty('bottom', '0px');
            overlay.style.setProperty('right', '0px');
            break;
          default:
            overlay.style.setProperty('top', '0px');
            overlay.style.setProperty('left', '0px');
        }
      }
      if (this._config.overlay_width) {
        overlay.style.setProperty('width', this._config.overlay_width + '%');
      } else {
        overlay.style.setProperty('width', '33%');
      }
      if (this._config.overlay_height) {
        overlay.style.setProperty('height', this._config.overlay_height + '%');
      } else {
        overlay.style.setProperty('height', '20%');
      }

      if (this._config.overlay_bgcolor) {
        overlay.style.setProperty('background-color', this._config.overlay_bgcolor);
      } else {
        overlay.style.setProperty('background-color', 'transparent');
      }
      if (this._config.overlay_fgcolor) {
        overlay.style.setProperty('color', this._config.overlay_fgcolor);
      } else {
        overlay.style.setProperty('color', 'black');
      }
      if (this._config.overlay_font) {
        overlay.style.fontFamily = this._config.overlay_font;
      }
      if (this._config.overlay_fontsize) {
        overlay.style.fontSize = this._config.overlay_fontsize;
      }

      overlay.style.setProperty('overflow', 'hidden');
      overlay.style.setProperty('white-space', 'nowrap');
      let zindex = '';

      try {
        zindex = this._getZIndex(this._renderer.domElement.parentNode);
      } catch (error) {
        console.log(error);
      }

      if (zindex) {
        overlay.style.setProperty('z-index', (Number(zindex) + 1).toString(10));
      } else {
        overlay.style.setProperty('z-index', '999');
      }

      (this._renderer.domElement.parentNode as HTMLElement).style.setProperty('position', 'relative');
      this._renderer.domElement.parentNode.appendChild(overlay);
      this._overlay = overlay;
      console.log('End config Overlay');
    }
  }

  private _setCamera(): void {
    const box: THREE.Box3 = new THREE.Box3().setFromObject(this._bboxmodel);

    this._modelX = this._bboxmodel.position.x = -(box.max.x - box.min.x) / 2;
    this._modelY = this._bboxmodel.position.y = -box.min.y;
    this._modelZ = this._bboxmodel.position.z = -(box.max.z - box.min.z) / 2;

    if (this._config.camera_position) {
      this._camera.position.set(
        this._config.camera_position.x,
        this._config.camera_position.y,
        this._config.camera_position.z,
      );
    } else {
      this._camera.position.set(box.max.x * 1.3, box.max.y * 5, box.max.z * 1.3);
    }

    if (this._config.camera_rotate) {
      this._camera.rotation.set(
        this._config.camera_rotate.x,
        this._config.camera_rotate.y,
        this._config.camera_rotate.z,
      );
    } else {
      this._camera.rotation.set(0, 0, 0);
    }

    this._camera.updateProjectionMatrix();
  }

  private _setLookAt(): void {
    const box: THREE.Box3 = new THREE.Box3().setFromObject(this._bboxmodel);

    if (this._config.camera_target) {
      this._controls.target.set(
        this._config.camera_target.x,
        this._config.camera_target.y,
        this._config.camera_target.z,
      );
    } else {
      this._camera.lookAt(box.max.multiplyScalar(0.5));
    }
    this._camera.updateProjectionMatrix();
  }

  private _setNoShadowLight(object: THREE.Object3D): void {
    object.receiveShadow = true;
    object.castShadow = false;

    return;
  }

  private _onLoaded3DMaterials(materials: MTLLoader.MaterialCreator): void {
    // Materials Loaded Event: last root material passed to the function
    console.log('Material loaded start');
    materials.preload();
    let path = this._config.path;
    const lastChar = path.substr(-1);
    if (lastChar != '/') {
      path = path + '/';
    }
    this._loadOBJ(path, materials);
    console.log('Material loaded end');
  }

  private _add3dObjects(): void {
    try {
      // Add-Modify the objects bound to the entities in the card config
      console.log('Add Objects Start');
      if (this._states && this._config.entities) {
        this._round_per_seconds = [];
        this._axis_to_rotate = [];
        this._rotation_state = [];
        this._rotation_speed = [];
        this._rotation_ramp = [];
        this._rotation_index = [];
        this._animated_transitions = [];
        this._pivot = [];
        this._axis_for_door = [];
        this._degrees = [];
        this._slidingdoor = [];
        this._objposition = [];
        this._slidingdoorposition = [];
        this._to_animate = false;
        this._zoom = [];

        this._config.entities.forEach((entity, i) => {
          try {
            this._objposition.push([0, 0, 0]);
            this._pivot.push(null);
            this._axis_for_door.push(null);
            this._degrees.push(0);
            this._slidingdoor.push(null);
            this._slidingdoorposition.push([]);
            if (this._hass.states[entity.entity]) {
              if (entity.type3d == 'rotate') {
                this._round_per_seconds.push(entity.rotate.round_per_second);
                this._axis_to_rotate.push(entity.rotate.axis);
                this._rotation_state.push(0);
                this._rotation_speed.push(0);
                this._rotation_ramp.push(Math.max(0, this._num(entity.rotate.ramp, ROTATE_RAMP)));
                this._rotation_index.push(i);
                let bbox: THREE.Box3;
                let hinge: any;
                if (entity.rotate.hinge) {
                  hinge = this._scene.getObjectByName(entity.rotate.hinge);
                } else {
                  hinge = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id);
                }
                bbox = new THREE.Box3().setFromObject(hinge);
                this._pivot[i] = new THREE.Vector3();
                this._pivot[i].subVectors(bbox.max, bbox.min).multiplyScalar(0.5);
                this._pivot[i].add(bbox.min);

                this._object_ids[i].objects.forEach((element) => {
                  let _obj: any = this._scene.getObjectByName(element.object_id);
                  this._centerobjecttopivot(_obj, this._pivot[i]);
                  _obj.geometry.applyMatrix4(
                    new THREE.Matrix4().makeTranslation(-this._pivot[i].x, -this._pivot[i].y, -this._pivot[i].z),
                  );
                });
              }
              if (entity.type3d == 'door') {
                if (entity.door.doortype != 'swing' && entity.door.doortype != 'slide') {
                  throw new Error('Invalid door type: ' + entity.door.doortype + '. Valid types are: swing, slide');
                }

                if (entity.door.doortype == 'swing') {
                  // console.log("Start Add Door Swing");
                  let position = new THREE.Vector3();
                  if (entity.door.hinge) {
                    let hinge: THREE.Mesh = this._scene.getObjectByName(entity.door.hinge) as THREE.Mesh;
                    hinge.geometry.computeBoundingBox();
                    let boundingBox = hinge.geometry.boundingBox;
                    position.subVectors(boundingBox.max, boundingBox.min);
                    switch (Math.max(position.x, position.y, position.z)) {
                      case position.x:
                        this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
                        break;
                      case position.z:
                        this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
                        break;
                      case position.y:
                      default:
                        this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
                    }
                    position.multiplyScalar(0.5);
                    position.add(boundingBox.min);
                    position.applyMatrix4(hinge.matrixWorld);
                  } else {
                    let pane: THREE.Mesh;

                    if (entity.door.pane) {
                      pane = this._scene.getObjectByName(entity.door.pane) as THREE.Mesh;
                    } else {
                      pane = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id) as THREE.Mesh;
                    }

                    pane.geometry.computeBoundingBox();
                    let boundingBox = pane.geometry.boundingBox;
                    position.subVectors(boundingBox.max, boundingBox.min);
                    const side = entity.door.swing_side || entity.door.side;

                    if (side) {
                      switch (side) {
                        case 'up':
                          position.x = position.x / 2;
                          position.z = position.z / 2;
                          position.y = position.y;
                          if (position.x > position.z) {
                            this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
                          } else {
                            this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
                          }
                          break;
                        case 'down':
                          position.x = position.x / 2;
                          position.z = position.z / 2;
                          position.y = 0;
                          if (position.x > position.z) {
                            this._axis_for_door[i] = new THREE.Vector3(1, 0, 0);
                          } else {
                            this._axis_for_door[i] = new THREE.Vector3(0, 0, 1);
                          }
                          break;
                        case 'left':
                          if (position.x > position.z) {
                            position.x = 0;
                            position.z = position.z / 2;
                          } else {
                            position.z = 0;
                            position.x = position.x / 2;
                          }
                          this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
                          position.y = 0;
                          break;
                        case 'right':
                          if (position.x > position.z) {
                            position.z = position.z / 2;
                          } else {
                            position.x = position.x / 2;
                          }
                          this._axis_for_door[i] = new THREE.Vector3(0, 1, 0);
                          position.y = 0;
                          break;
                        default:
                          throw new Error('Invalid side: ' + side + '. Valid sides are: up, down, left, right');
                      }
                    }
                    position.add(boundingBox.min);
                    position.applyMatrix4(pane.matrixWorld);
                  }

                  this._pivot[i] = position;
                  if (typeof entity.door.swing_degrees !== 'undefined') {
                    this._degrees[i] = entity.door.swing_degrees;
                  } else if (typeof entity.door.degrees !== 'undefined') {
                    this._degrees[i] = entity.door.degrees;
                  } else {
                    this._degrees[i] = 90;
                  }

                  this._object_ids[i].objects.forEach((element) => {
                    let _obj: any = this._scene.getObjectByName(element.object_id);

                    this._centerobjecttopivot(_obj, this._pivot[i]);

                    _obj.geometry.applyMatrix4(
                      new THREE.Matrix4().makeTranslation(-this._pivot[i].x, -this._pivot[i].y, -this._pivot[i].z),
                    );
                  });

                  // console.log("End Add Door Swing");
                }
                if (entity.door.doortype == 'slide') {
                  // if (entity.door.doortype == 'slide') {
                  // console.log("Start Add Door Slide");

                  this._object_ids[i].objects.forEach((element) => {
                    let _obj: any = this._scene.getObjectByName(element.object_id);
                    let objbbox = new THREE.Box3().setFromObject(_obj);
                    this._slidingdoorposition[i].push(objbbox.min);
                    this._centerobjecttopivot(_obj, objbbox.min);
                    _obj.geometry.applyMatrix4(
                      new THREE.Matrix4().makeTranslation(-objbbox.min.x, -objbbox.min.y, -objbbox.min.z),
                    );
                  });

                  // console.log("End Add Door Slide");
                }
              }
              if (entity.type3d == 'cover') {
                // Without pane the first object is the pane, as in _updatecover. Before, such a cover
                // was not set up and its first update stopped every other update of the card.
                const pane: THREE.Mesh = (this._scene.getObjectByName(entity.cover.pane) ||
                  this._scene.getObjectByName(this._object_ids[i].objects[0]?.object_id)) as THREE.Mesh;

                if (pane) {
                  this._object_ids[i].objects.forEach((element) => {
                    let _obj: any = this._scene.getObjectByName(element.object_id);
                    let objbbox = new THREE.Box3().setFromObject(_obj);
                    this._slidingdoorposition[i].push(objbbox.min);
                    this._centerobjecttopivot(_obj, objbbox.min);
                    _obj.geometry.applyMatrix4(
                      new THREE.Matrix4().makeTranslation(-objbbox.min.x, -objbbox.min.y, -objbbox.min.z),
                    );
                  });

                  let boxpane: THREE.Box3 = new THREE.Box3().setFromObject(pane);

                  let panevertices: THREE.Vector3[] = [];

                  switch (entity.cover.side) {
                    case 'up':
                      panevertices = [
                        new THREE.Vector3(boxpane.min.x, boxpane.max.y, boxpane.min.z), // 000
                        new THREE.Vector3(boxpane.min.x, boxpane.max.y, boxpane.max.z), // 001
                        new THREE.Vector3(boxpane.max.x, boxpane.max.y, boxpane.min.z), // 010
                        new THREE.Vector3(boxpane.max.x, boxpane.max.y, boxpane.max.z), // 011
                      ];
                      break;
                    case 'down':
                      panevertices = [
                        new THREE.Vector3(boxpane.min.x, boxpane.min.y, boxpane.min.z), // 000
                        new THREE.Vector3(boxpane.min.x, boxpane.min.y, boxpane.max.z), // 001
                        new THREE.Vector3(boxpane.max.x, boxpane.min.y, boxpane.min.z), // 010
                        new THREE.Vector3(boxpane.max.x, boxpane.min.y, boxpane.max.z), // 011
                      ];
                      break;
                  }

                  panevertices.sort((firstel, secondel) => {
                    if (firstel.x < secondel.x) {
                      return -1;
                    }
                    if (firstel.x > secondel.x) {
                      return 1;
                    }
                    return 0;
                  });

                  const coverplane = new THREE.Plane();

                  coverplane.setFromCoplanarPoints(panevertices[2], panevertices[1], panevertices[0]);

                  const clipPlanes = [coverplane];

                  this._object_ids[i].objects.forEach((element) => {
                    let _obj: any = this._scene.getObjectByName(element.object_id);
                    (_obj.material as THREE.Material).clippingPlanes = clipPlanes;
                  });

                  //(pane.material as THREE.Material).clippingPlanes = clipPlanes;

                  if (this._config.shadow) {
                    if (this._config.shadow == 'yes') {
                      (pane.material as THREE.Material).clipShadows = true;
                    } else {
                      (pane.material as THREE.Material).clipShadows = false;
                    }
                  }

                  //const planehelper = new THREE.PlaneHelper(coverplane, 200);
                  //this._scene.add(planehelper);

                  this._updatecover(entity, this._states[i], i);
                }
              }
              if (entity.type3d == 'light') {
                // Add Virtual Light Objects
                this._object_ids[i].objects.forEach((element) => {
                  const _foundobject: any = this._scene.getObjectByName(element.object_id);
                  if (_foundobject) {
                    const box: THREE.Box3 = new THREE.Box3();
                    box.setFromObject(_foundobject);

                    let light: THREE.PointLight | THREE.SpotLight;

                    let x: number, y: number, z: number;

                    x = (box.max.x - box.min.x) / 2 + box.min.x;
                    z = (box.max.z - box.min.z) / 2 + box.min.z;
                    y = (box.max.y - box.min.y) / 2 + box.min.y;

                    if (entity.light.vertical_alignment) {
                      switch (entity.light.vertical_alignment) {
                        case 'top':
                          y = box.max.y;
                          break;
                        case 'middle':
                          y = (box.max.y - box.min.y) / 2 + box.min.y;
                          break;
                        case 'bottom':
                          y = box.min.y;
                          break;
                      }
                    }

                    let decay: number;
                    let distance: number;

                    if (entity.light.decay) {
                      decay = Number(entity.light.decay);
                    } else {
                      decay = 2;
                    }

                    if (entity.light.distance) {
                      distance = Number(entity.light.distance);
                    } else {
                      distance = 600;
                    }

                    if (entity.light.light_target || entity.light.light_direction) {
                      const angle = entity.light.angle ? THREE.MathUtils.degToRad(entity.light.angle) : Math.PI / 10;

                      const slight: THREE.SpotLight = new THREE.SpotLight(
                        new THREE.Color('#ffffff'),
                        0,
                        distance,
                        angle,
                        0.5,
                        decay,
                      );
                      //this._bboxmodel.add(slight);
                      this._levels[_foundobject.userData.level].add(slight);
                      let target = new THREE.Object3D();
                      //this._bboxmodel.add(target);
                      this._levels[_foundobject.userData.level].add(target);
                      slight.position.set(x, y, z);
                      if (entity.light.light_direction) {
                        target.position.set(
                          x + entity.light.light_direction.x,
                          y + entity.light.light_direction.y,
                          z + entity.light.light_direction.z,
                        );
                      } else {
                        const tobj: THREE.Object3D = this._scene.getObjectByName(entity.light.light_target);

                        if (tobj) {
                          const tbox: THREE.Box3 = new THREE.Box3();
                          tbox.setFromObject(tobj);

                          let tx: number, ty: number, tz: number;

                          tx = (tbox.max.x - tbox.min.x) / 2 + tbox.min.x;
                          tz = (tbox.max.z - tbox.min.z) / 2 + tbox.min.z;
                          ty = (tbox.max.y - tbox.min.y) / 2 + tbox.min.y;

                          target.position.set(tx, ty, tz);
                        }
                      }

                      if (target) {
                        slight.target = target;
                      }

                      light = slight;
                    } else {
                      const plight: THREE.PointLight = new THREE.PointLight(
                        new THREE.Color('#ffffff'),
                        0,
                        distance,
                        decay,
                      );
                      this._levels[_foundobject.userData.level].add(plight);
                      plight.position.set(x, y, z);
                      light = plight;
                    }

                    this._setNoShadowLight(_foundobject);
                    _foundobject.traverseAncestors(this._setNoShadowLight.bind(this));

                    if (entity.light.shadow == 'no') {
                      light.castShadow = false;
                    } else {
                      this._enableShadow(light, -0.0001);
                    }
                    light.name = element.object_id + '_light';
                  }
                });
              }
              if (entity.type3d == 'image') {
                this._object_ids[i].objects.forEach((element) => {
                  if (entity.image && entity.image.lighting_lumens && Number(entity.image.lighting_lumens) > 0) {
                    const _foundobject: any = this._scene.getObjectByName(element.object_id);
                    if (_foundobject) {
                      // One point light in front of the screen, tinted with the picture. The first
                      // version also added a spot light with the same name: only this light was
                      // ever found by name, so the spot stayed at 0 while still drawing shadows.
                      const screenBox = new THREE.Box3();
                      screenBox.setFromObject(_foundobject);
                      const center = new THREE.Vector3();
                      screenBox.getCenter(center);
                      const local = _foundobject.worldToLocal(center.clone());
                      const lightingDirection = entity.image.lighting_direction || 'positive_z';
                      const offset = 20;
                      let lx = local.x;
                      let ly = local.y;
                      let lz = local.z;
                      switch (lightingDirection) {
                        case 'positive_z':
                          lz += offset;
                          break;
                        case 'negative_z':
                          lz -= offset;
                          break;
                        case 'positive_x':
                          lx += offset;
                          break;
                        case 'negative_x':
                          lx -= offset;
                          break;
                        case 'positive_y':
                          ly += offset;
                          break;
                        case 'negative_y':
                          ly -= offset;
                          break;
                      }
                      const ambient = new THREE.PointLight(
                        new THREE.Color('#ffffff'),
                        0,
                        this._num(entity.image.lighting_distance, 800),
                        2,
                      );
                      ambient.name = element.object_id + '_light';
                      if (entity.image.lighting_shadow == 'no') {
                        ambient.castShadow = false;
                      } else {
                        this._enableShadow(ambient, -0.0001);
                      }
                      _foundobject.add(ambient);
                      ambient.position.set(lx, ly, lz);
                    }
                  }
                });
              }
              if (entity.type3d == 'color') {
                // Clone Material to allow object color changes based on Color Conditions Objects
                let j = 0;
                this._object_ids[i].objects.forEach((element) => {
                  let _foundobject: any = this._scene.getObjectByName(element.object_id);
                  this._initialmaterial[i][j] = _foundobject.material;
                  if (!Array.isArray(_foundobject.material)) {
                    this._clonedmaterial[i][j] = _foundobject.material.clone();
                  }
                  j = j + 1;
                });
              }
              if (entity.type3d == 'text') {
                // Clone object to print the text
                this._object_ids[i].objects.forEach((element) => {
                  let _foundobject: any = this._scene.getObjectByName(element.object_id);

                  let box: THREE.Box3 = new THREE.Box3();
                  box.setFromObject(_foundobject);

                  let _newobject = _foundobject.clone();

                  //(_newobject as Mesh).scale.set(1.005, 1.005, 1.005);
                  _newobject.name = 'f3dobj_' + _foundobject.name;
                  //this._bboxmodel.add(_newobject);
                  this._levels[_foundobject.userData.level].add(_newobject);
                });
              }
              if (entity.type3d == 'tracker') {
                this._createTracker(entity, i);
              }
              if (entity.type3d == 'info') {
                const sprite = new THREE.Sprite();
                sprite.name = entity.object_id + '_info';
                this._sprites[i] = sprite.name;
                const info = entity.info || {};
                this._canvas[i] = this._createTextCanvas(info, this._info[i], this._unit_of_measurement[i]);
                const size = entity.info && entity.info.size ? entity.info.size : 100;
                const aspect = this._canvas[i].width / this._canvas[i].height;
                sprite.scale.set(size * aspect, size, 1);
                if (entity.info && entity.info.position) {
                  sprite.position.set(entity.info.position[0], entity.info.position[1], entity.info.position[2]);
                } else if (entity.object_id) {
                  const _foundobject = this._scene.getObjectByName(entity.object_id);
                  if (_foundobject) {
                    const box = new THREE.Box3().setFromObject(_foundobject);
                    const center = new THREE.Vector3();
                    box.getCenter(center);
                    sprite.position.copy(center);
                    sprite.position.y = box.max.y + size / 2 + 10;
                  }
                }
                this._scene.add(sprite);
              }
              if (entity.type3d == 'shower') {
                const group = new THREE.Group();
                group.name = entity.object_id + '_shower_group';
                this._bboxmodel.add(group);
                this._showers[i] = group;
                group.visible = false;
                this._object_ids[i].objects.forEach((element) => {
                  const _foundobject = this._scene.getObjectByName(element.object_id);
                  if (_foundobject) {
                    const count = entity.shower && entity.shower.count ? entity.shower.count : 200;
                    const geometry = new THREE.BufferGeometry();
                    const vertices = [];
                    const width = entity.shower && entity.shower.width ? entity.shower.width : 20;
                    for (let p = 0; p < count; p++) {
                      vertices.push((Math.random() - 0.5) * width, Math.random() * 5, (Math.random() - 0.5) * width);
                    }
                    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                    const material = new THREE.PointsMaterial({
                      color: entity.shower && entity.shower.color ? new THREE.Color(entity.shower.color) : 0xaaaaaa,
                      size: entity.shower && entity.shower.size ? entity.shower.size : 1,
                      transparent: true,
                      opacity: 0.8,
                    });
                    const points = new THREE.Points(geometry, material);
                    points.name = element.object_id + '_shower_points';
                    const box = new THREE.Box3().setFromObject(_foundobject);
                    const center = new THREE.Vector3();
                    box.getCenter(center);
                    points.position.copy(center);
                    points.position.y = box.min.y;
                    group.add(points);
                  } else {
                    console.warn('F3D: Shower target NOT matched:', element.object_id);
                  }
                });
                this._updateshowerstate(entity, i);
              }
            }
          } catch (error) {
            // An entity set up wrongly (a door without its type, for example) is left out and the
            // rest of the model is shown. The card editor makes such entities while they are filled in.
            console.warn('floor3d-card: entity <' + entity.entity + '> left out: ' + error);
          }
        });
        this._config.entities.forEach((entity, i) => {
          if (entity.entity === '') return;
          try {
            if (entity.type3d == 'light') {
              this._updatelight(entity, i);
            } else if (entity.type3d == 'color') {
              this._updatecolor(entity, i);
            } else if (entity.type3d == 'hide') {
              this._updatehide(entity, i);
            } else if (entity.type3d == 'show') {
              this._updateshow(entity, i);
            } else if (entity.type3d == 'door') {
              this._updatedoor(entity, i);
            } else if (entity.type3d == 'text') {
              this._canvas[i] = this._createTextCanvas(entity.text, this._text[i], this._unit_of_measurement[i]);
              this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
            } else if (entity.type3d == 'rotate') {
              this._rotatecalc(entity, i);
            } else if (entity.type3d == 'room') {
              this._createroom(entity, i);
              this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
            } else if (entity.type3d == 'info') {
              this._updateinfo(entity, this._info[i], this._unit_of_measurement[i], i);
            } else if (entity.type3d == 'shower') {
              this._updateshowerstate(entity, i);
            } else if (entity.type3d == 'tracker') {
              this._updatetracker(entity, i);
            }
          } catch (error) {
            console.warn('floor3d-card: entity <' + entity.entity + '> not updated: ' + error);
          }
        });
      }
      console.log('Add 3D Object End');
    } catch (e) {
      console.log(e);
      throw new Error('Error adding 3D Object: ' + e);
    }
  }

  // manage all entity types

  private _manageZoom(): void {
    if (this._config.zoom_areas) {
      this._config.zoom_areas.forEach((element) => {
        // For each element of the Zoom Area array calculate zoom position and initialize zoom array

        if (element.object_id && element.object_id != '') {
          let _foundobject: any = this._scene.getObjectByName(element.object_id);

          if (_foundobject && _foundobject instanceof THREE.Mesh) {
            const _targetMesh: THREE.Mesh = _foundobject as THREE.Mesh;
            let targetBox = new THREE.Box3().setFromObject(_targetMesh);

            /*this._centerobjecttopivot(_targetMesh, targetBox.min);
            _targetMesh.geometry.applyMatrix4(
              new THREE.Matrix4().makeTranslation(-targetBox.min.x, -targetBox.min.y, -targetBox.min.z),
            );
            targetBox = new THREE.Box3().setFromObject(_targetMesh);
            */

            let targetVector: THREE.Vector3 = new THREE.Vector3();
            targetVector.addVectors(targetBox.min, targetBox.max.sub(targetBox.min).multiplyScalar(0.5));

            let positionVector: THREE.Vector3;
            if (element.direction) {
              positionVector = new THREE.Vector3(element.direction.x, element.direction.y, element.direction.z);
            } else {
              positionVector = new THREE.Vector3(0, 1, 0);
            }
            positionVector.normalize();
            positionVector.multiplyScalar(element.distance ? element.distance : 500);
            positionVector.add(targetVector);

            let rotationVector: THREE.Vector3;
            if (element.rotation) {
              rotationVector = new THREE.Vector3(element.rotation.x, element.rotation.y, element.rotation.z);
            } else {
              rotationVector = new THREE.Vector3(0, 0, 0);
            }

            this._zoom.push({
              name: element.zoom,
              target: targetVector,
              position: positionVector,
              rotation: rotationVector,
              level: element.level,
            });
          }
        } else if (element.camera_position && element.camera_target) {
          const positionVector = new THREE.Vector3(
            element.camera_position.x,
            element.camera_position.y,
            element.camera_position.z,
          );
          const targetVector = new THREE.Vector3(
            element.camera_target.x,
            element.camera_target.y,
            element.camera_target.z,
          );
          let rotationVector: THREE.Vector3;
          if (element.camera_rotate) {
            rotationVector = new THREE.Vector3(
              element.camera_rotate.x,
              element.camera_rotate.y,
              element.camera_rotate.z,
            );
          } else {
            rotationVector = new THREE.Vector3(0, 0, 0);
          }
          this._zoom.push({
            name: element.zoom,
            target: targetVector,
            position: positionVector,
            rotation: rotationVector,
            level: element.level,
          });
        }
      });

      render(this._getZoomBar(), this._zoombar);
    }
  }

  private _createroom(entity: Floor3dCardConfig, i: number): void {
    // createroom

    console.log('Create Room');

    const elevation: number = entity.room.elevation ? entity.room.elevation : 250;
    const transparency: number = entity.room.transparency ? entity.room.transparency : 50;
    const color: string = entity.room.color ? entity.room.color : '#ffffff';

    const _foundroom: THREE.Object3D = this._scene.getObjectByName(entity.object_id);

    if (_foundroom) {
      if (_foundroom.name.includes('room') && _foundroom instanceof THREE.Mesh) {
        const _roomMesh: THREE.Mesh = _foundroom as THREE.Mesh;

        if (_roomMesh.geometry instanceof THREE.BufferGeometry) {
          let oldRoomBox = new THREE.Box3().setFromObject(_roomMesh);
          this._centerobjecttopivot(_roomMesh, oldRoomBox.min);
          _roomMesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-oldRoomBox.min.x, -oldRoomBox.min.y, -oldRoomBox.min.z),
          );

          let newRoomBox: THREE.Box3 = new THREE.Box3().setFromObject(_roomMesh);

          const expansion: THREE.Vector3 = new THREE.Vector3(0, elevation / 2, 0);
          newRoomBox.expandByVector(expansion);

          const dimensions = new THREE.Vector3().subVectors(newRoomBox.max, newRoomBox.min);
          const newRoomGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
            dimensions.x - 4,
            dimensions.y - 4,
            dimensions.z - 4,
          );

          //const meshPosition = dimensions.addVectors(newRoomBox.min, newRoomBox.max).multiplyScalar(0.5);
          const meshPosition = oldRoomBox.min.clone();
          // move new mesh center so it's aligned with the original object
          meshPosition.y += 2;
          meshPosition.x += 2;
          meshPosition.z += 2;

          //TBD work on position bug
          //const matrixmesh = new THREE.Matrix4().setPosition(meshPosition);
          //newRoomGeometry.applyMatrix4(matrixmesh);

          const newRoomMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            opacity: 0,
            transparent: true,
          });

          newRoomMaterial.depthWrite = false;
          newRoomMaterial.color.set(new THREE.Color(color));
          newRoomMaterial.emissive.set(new THREE.Color(color));
          newRoomMaterial.opacity = (100 - transparency) / 100;

          newRoomMaterial.needsUpdate = true;

          const newRoomMesh: THREE.Mesh = new THREE.Mesh(newRoomGeometry, newRoomMaterial);

          newRoomMesh.name = this._rooms[i];

          const newSprite: THREE.Sprite = new THREE.Sprite();

          newSprite.name = this._sprites[i];

          this._canvas[i] = this._createTextCanvas(entity.room, this._spritetext[i], this._unit_of_measurement[i]);

          const sprite_width: number = entity.room.width ? entity.room.width : 150;
          const sprite_height: number = entity.room.height ? entity.room.height : 75;
          newSprite.scale.set(sprite_width, sprite_height, 5);

          //TBD work on position bug

          const spritePosition = new THREE.Vector3(
            meshPosition.x + dimensions.x / 2,
            newRoomBox.max.y + elevation / 2 + sprite_height / 2,
            meshPosition.z + dimensions.z / 2,
          );
          newSprite.visible = false;

          if (entity.room.label) {
            if (entity.room.label == 'yes') {
              newSprite.visible = true;
            }
          }

          //this._bboxmodel.add(newSprite);
          this._levels[_roomMesh.userData.level].add(newSprite);
          this._levels[_roomMesh.userData.level].add(newRoomMesh);

          newRoomBox = new THREE.Box3().setFromObject(newRoomMesh);
          this._centerobjecttopivot(newRoomMesh, newRoomBox.min);
          newRoomMesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-newRoomBox.min.x, -newRoomBox.min.y, -newRoomBox.min.z),
          );

          //const matrixsprite = new THREE.Matrix4().setPosition(new THREE.Vector3(meshPosition.x,newRoomBox.max.y+(elevation / 2)+(sprite_height / 2), meshPosition.z));
          //newSprite.applyMatrix4(matrixsprite);

          newRoomMesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
          newSprite.position.set(spritePosition.x, spritePosition.y, spritePosition.z);

          this._updateroomcolor(entity, i);
        }
      }
    }

    return;
  }

  private _updateroom(entity: Floor3dCardConfig, text: string, uom: string, i: number): void {
    //update sprite text and other change conditions

    const _roomMesh: THREE.Object3D = this._scene.getObjectByName(this._rooms[i]);
    const _roomSprite: THREE.Object3D = this._scene.getObjectByName(this._sprites[i]);
    const _roomCanvas: HTMLCanvasElement = this._canvas[i];

    if (_roomMesh && entity) {
      let roomsprite: THREE.Sprite = _roomSprite as THREE.Sprite;

      this._updateTextCanvas(entity.room, _roomCanvas, text + uom);

      this._applyTextCanvasSprite(_roomCanvas, roomsprite);
    }
  }

  private _updateinfo(item: Floor3dCardConfig, text: string, uom: string, index: number): void {
    const sprite: any = this._scene.getObjectByName(this._sprites[index]);
    const canvas = this._canvas[index];
    if (sprite && canvas) {
      const info = item.info || {};
      this._updateTextCanvas(info, canvas, text + uom);
      this._applyTextCanvasSprite(canvas, sprite);
      const size = item.info && item.info.size ? item.info.size : 100;
      const aspect = canvas.width / canvas.height;
      sprite.scale.set(size * aspect, size, 1);
    }
  }

  private _updateshowerstate(_item: Floor3dCardConfig, index: number) {
    if (this._showers[index]) {
      const state = this._states[index] ? String(this._states[index]).toLowerCase() : '';
      if (['on', 'active', 'true', '1'].includes(state)) {
        this._showers[index].visible = true;
      } else {
        this._showers[index].visible = false;
      }
      this._startOrStopAnimationLoop();
    } else {
      console.warn('F3D: Shower object not found for index:', index);
    }
  }

  private _animateshowers(step?: number) {
    step = step > 0 ? Math.min(step, 4) : 1;
    if (this._showers) {
      this._showers.forEach((shower, index) => {
        if (shower && shower.visible) {
          shower.children.forEach((child) => {
            const points = child as THREE.Points;
            const positions = points.geometry.attributes.position.array as Float32Array;
            const velocity =
              this._config.entities[index].shower && this._config.entities[index].shower.velocity
                ? this._config.entities[index].shower.velocity
                : 5;
            const height =
              this._config.entities[index].shower && this._config.entities[index].shower.height
                ? this._config.entities[index].shower.height
                : 100;
            for (let i = 1; i < positions.length; i += 3) {
              positions[i] -= velocity * step;
              if (positions[i] < -height) {
                positions[i] = 0;
              }
            }
            points.geometry.attributes.position.needsUpdate = true;
          });
        }
      });
    }
  }
  private _updatecover(item: Floor3dCardConfig, state: string, i: number): void {
    let pane = this._scene.getObjectByName(item.cover.pane);

    if (!pane) {
      pane = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id);
    }
    // A cover that reports current_position is drawn there, also while it is opening or closing
    // (0 is closed); the others are fully open or fully closed.
    const percentage = this._position[i] != null ? this._position[i] : this._isOpen(state) ? 100 : 0;
    this._translatedoor(pane, percentage, item.cover.side, i, percentage > 0 ? 'open' : 'closed');
    // Shadows follow the tween in the animation loop.
  }

  private _createTextCanvas(entity: Floor3dCardConfig, text: string, uom: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    this._updateTextCanvas(entity, canvas, text + uom);

    return canvas;
  }

  private _updateTextCanvas(entity: Floor3dCardConfig, canvas: HTMLCanvasElement, text: string): void {
    //Manages the update of the text entities according to their configuration and the new text of the entity state

    const ctx = canvas.getContext('2d');

    // Prepare the font to be able to measure
    let fontSize = 56;
    ctx.font = `${fontSize}px ${entity.font ? entity.font : 'monospace'}`;

    const textMetrics = ctx.measureText(text);

    let width = textMetrics.width;
    let height = fontSize;

    let perct = 1.0;
    if (entity.span) {
      perct = parseFloat(entity.span) / 100.0;
    }
    // Resize canvas to match text size

    width = width / perct;
    height = height / perct;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Re-apply font since canvas is resized.
    ctx.font = `${fontSize}px ${entity.font ? entity.font : 'monospace'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = entity.textbgcolor ? entity.textbgcolor : 'transparent';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = entity.textfgcolor ? entity.textfgcolor : 'white';

    ctx.fillText(text, width / 2, height / 2);
  }

  private _applyTextCanvas(canvas: HTMLCanvasElement, object: THREE.Object3D) {
    // put the canvas texture with the text on top of the generic object: consider merge with the applyTextCanvasSprite
    const _foundobject: any = object;
    let fileExt = this._config.objfile.split('?')[0].split('.').pop();

    if (_foundobject instanceof THREE.Mesh) {
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace; // canvas colours are sRGB
      texture.repeat.set(1, 1);

      if (fileExt == 'glb') {
        texture.flipY = false;
      }
      if (((_foundobject as THREE.Mesh).material as THREE.MeshBasicMaterial).name.startsWith('f3dmat')) {
        const material = (_foundobject as THREE.Mesh).material as THREE.MeshBasicMaterial;
        // The texture of the previous text stays on the GPU until it is disposed: one per update.
        if (material.map) material.map.dispose();
        material.map = texture;
      } else {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        material.name = 'f3dmat' + _foundobject.name;

        (_foundobject as THREE.Mesh).material = material;
      }
    }
  }

  private _applyTextCanvasSprite(canvas: HTMLCanvasElement, object: THREE.Sprite) {
    // put the canvas texture with the text on top of the Sprite object: consider merge with the applyTextCanvas

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace; // canvas colours are sRGB
    texture.repeat.set(1, 1);

    if (object.material.name.startsWith('f3dmat')) {
      const material = object.material as THREE.SpriteMaterial;
      if (material.map) material.map.dispose(); // see _applyTextCanvas
      material.map = texture;
    } else {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      material.name = 'f3dmat' + object.name;

      object.material = material;
    }
  }

  private _TemperatureToRGB(t: number): number[] {
    let temp = 10000 / t; //kelvins = 1,000,000/mired (and that /100)
    let r: number, g: number, b: number;
    let rgb: number[] = [0, 0, 0];

    if (temp <= 66) {
      r = 255;
      g = temp;
      g = 99.470802 * Math.log(g) - 161.119568;

      if (temp <= 19) {
        b = 0;
      } else {
        b = temp - 10;
        b = 138.517731 * Math.log(b) - 305.044793;
      }
    } else {
      r = temp - 60;
      r = 329.698727 * Math.pow(r, -0.13320476);

      g = temp - 60;
      g = 288.12217 * Math.pow(g, -0.07551485);

      b = 255;
    }
    rgb = [Math.floor(r), Math.floor(g), Math.floor(b)];
    return rgb;
  }

  private _RGBToHex(r: number, g: number, b: number): string {
    // RGB Color array to hex string converter
    let rs: string = r.toString(16);
    let gs: string = g.toString(16);
    let bs: string = b.toString(16);

    if (rs.length == 1) rs = '0' + rs;
    if (gs.length == 1) gs = '0' + gs;
    if (bs.length == 1) bs = '0' + bs;

    return '#' + rs + gs + bs;
  }

  private _updatetext(entity: Floor3dCardConfig, state: string, canvas: HTMLCanvasElement, uom: string): void {
    const _foundobject: any = this._scene.getObjectByName(entity.object_id);

    if (_foundobject) {
      this._updateTextCanvas(entity.text, canvas, state + uom);
      this._applyTextCanvas(canvas, _foundobject);
    }
  }

  private _updatelight(entity: Floor3dCardConfig, i: number): void {
    // Illuminate the light object when, for the bound device, one of its attribute gets modified in HA. See set hass property

    this._object_ids[i].objects.forEach((element) => {
      const light: any = this._scene.getObjectByName(element.object_id + '_light');

      if (!light) {
        return;
      }
      const max = this._lampIntensity(entity.light.lumens ? entity.light.lumens : 800);

      if (this._states[i] == 'on') {
        if (this._brightness[i] != -1) {
          light.intensity = max * (this._brightness[i] / 255);
        } else {
          light.intensity = max;
        }
        if (!this._color[i]) {
          if (entity.light.color) {
            light.color = new THREE.Color(entity.light.color);
          } else {
            light.color = new THREE.Color('#ffffff');
          }
        } else {
          light.color = new THREE.Color(this._RGBToHex(this._color[i][0], this._color[i][1], this._color[i][2]));
        }
      } else {
        light.intensity = 0;
        //light.color = new THREE.Color('#000000');
      }
      if (this._config.extralightmode == 'yes') {
        this._manage_light_shadows(light);
      }
      // Brightness and colour do not change the shadow map: it is redrawn only if it is out of date.
      this._refreshLightShadow(light);
    });
  }

  // Applies the rendering settings of the config without reloading the model (the dashboard
  // recreates the card when its config changes; this is for test pages that tune them live).
  private _applyTuning(): void {
    if (!this._renderer) return;
    this._renderer.toneMapping = TONE_MAPPINGS[this._config.tone_mapping] ?? THREE.NeutralToneMapping;
    this._renderer.toneMappingExposure = this._num(this._config.exposure, 1);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._num(this._config.max_pixel_ratio, 2)));
    this._updateTorch();
    this._initSky();
    this._config.entities.forEach((entity, i) => {
      if (entity.type3d == 'light') this._updatelight(entity, i);
      else if (entity.type3d == 'image' && this._hass.states[entity.entity]) this._updateimage(entity, i);
    });
    this._sunKey = undefined;
    this._updateSun();
    this._render();
  }

  // Intensity of a lamp in three.js units (the model is in centimetres), light_power included.
  private _lampIntensity(lumens: number | string): number {
    return Number(lumens) * LAMP_INTENSITY_PER_LUMEN * this._num(this._config.light_power, 1);
  }

  private _num(value: any, fallback: number): number {
    const n = Number(value);
    return value === undefined || value === null || value === '' || isNaN(n) ? fallback : n;
  }

  // Let a light cast shadows. Its shadow map is drawn once now and then only when needed, see
  // _invalidateShadows.
  private _enableShadow(light: ShadowLight, bias: number): void {
    light.castShadow = true;
    light.shadow.bias = bias;
    light.shadow.radius = 2; // soft edges with PCF
    light.shadow.autoUpdate = false;
    // Even for a light that is off: the shadow of a point light that was never drawn leaves its
    // cube sampler bound to a plain texture, and WebGL 2 then refuses every lit draw call (the
    // house disappeared, only the room colours and labels were left).
    light.shadow.needsUpdate = true;
    light.userData.shadowStale = false;
    if (this._renderer) this._renderer.shadowMap.needsUpdate = true;
    if (light instanceof THREE.PointLight || light instanceof THREE.SpotLight) {
      // Default near 0.5 wastes depth precision in a model in centimetres; nothing is drawn past the light's reach.
      light.shadow.camera.near = 2;
      light.shadow.camera.far = light.distance > 0 ? light.distance : 1000;
    }
    this._shadowLights.push(light);
  }

  // Each shadow is a texture unit in the shaders: past the limit of the GPU (16 on phones) they no
  // longer compile. Two units stay for the textures of a material (picture and glow of the TV); the
  // sun comes first, then the lights in config order.
  private _shadowBudget(): number {
    return Math.max(2, this._renderer.capabilities.maxTextures - 2);
  }

  private _applyShadowBudget(): void {
    const budget = this._shadowBudget();
    const ordered = this._shadowLights.filter((l) => l === this._sun).concat(this._shadowLights.filter((l) => l !== this._sun));
    if (this._config.extralightmode == 'yes') {
      // Every light keeps its shadow set up, and only the lights that are on cast it, up to the
      // budget (see _manage_light_shadows).
      let casting = 0;
      ordered.forEach((light) => {
        light.castShadow = (light === this._sun || light.intensity > 0) && casting < budget;
        if (light.castShadow) casting++;
      });
      this._shadowLights = ordered;
      return;
    }
    const dropped = ordered.slice(budget);
    dropped.forEach((light) => {
      light.castShadow = false;
    });
    if (dropped.length > 0) {
      console.warn(
        'floor3d-card: ' + dropped.length + ' lights over the limit of ' + budget + ' shadows, without shadow: ' +
          dropped.map((l) => l.name).join(', '),
      );
    }
    this._shadowLights = ordered.slice(0, budget);
  }

  // Something moved (a door, a cover, an object shown or hidden): the shadow maps of the lights
  // that are on are redrawn at the next frame, the others as soon as they are switched on.
  private _invalidateShadows(): void {
    for (const light of this._shadowLights) {
      if (light.intensity > 0) {
        light.shadow.needsUpdate = true;
        light.userData.shadowStale = false;
      } else {
        light.userData.shadowStale = true;
      }
    }
    if (this._renderer) this._renderer.shadowMap.needsUpdate = true;
  }

  // A light was switched on or changed: redraw its shadow map only if it is out of date
  // (or always, with force, when the light itself moved).
  private _refreshLightShadow(light: ShadowLight, force = false): void {
    if (!light.castShadow || !light.shadow) return;
    const missing = !light.shadow.map; // never drawn: it must exist even while the light is off
    if (!missing && light.intensity <= 0) return;
    if (missing || force || light.userData.shadowStale !== false) {
      light.shadow.needsUpdate = true;
      light.userData.shadowStale = false;
      if (this._renderer) this._renderer.shadowMap.needsUpdate = true;
    }
  }

  // extralightmode: a light casts its shadow only while it is on, and only if the lights already
  // casting one leave room in the budget of the GPU. Before, a light could go past the budget and
  // the shaders no longer compiled. A light switched off leaves its place to one that is on
  // without shadow.
  private _manage_light_shadows(light: THREE.Light): void {
    if (this._config.shadow != 'yes' || !this._shadowLights.includes(light as ShadowLight)) return;
    if (light.intensity <= 0) {
      if (!light.castShadow) return;
      light.castShadow = false;
      const waiting = this._shadowLights.find((l) => l !== light && !l.castShadow && l.intensity > 0);
      if (waiting) {
        waiting.castShadow = true;
        this._refreshLightShadow(waiting, true);
      }
    } else if (!light.castShadow) {
      const casting = this._shadowLights.filter((l) => l.castShadow).length;
      light.castShadow = casting < this._shadowBudget();
    }
  }

  private _updatedoor(entity: Floor3dCardConfig, i: number): void {
    // perform action on door objects
    // console.log("Update Door Start");

    const _obj: any = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id);

    let door: THREE.Mesh;

    door = _obj;

    if (door) {
      if (entity.door.doortype) {
        if (entity.door.doortype != 'swing' && entity.door.doortype != 'slide') {
          throw new Error('Invalid door type: ' + entity.door.doortype + '. Valid types are: swing, slide');
        }

        if (entity.door.doortype == 'swing') {
          this._rotatedoorpivot(entity, i);
        }
        if (entity.door.doortype == 'slide') {
          // if (entity.door.doortype == 'slide') {
          let pane = this._scene.getObjectByName(entity.door.pane);
          if (!pane) {
            pane = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id);
          }
          let percentage: number;
          if (typeof entity.door.slide_percentage !== 'undefined') {
            percentage = entity.door.slide_percentage;
          } else {
            percentage = entity.door.percentage;
          }
          this._translatedoor(
            pane,
            percentage != null ? percentage : 100,
            entity.door.slide_side || entity.door.side,
            i,
            this._states[i],
          );
        }
      }
    }
    // The door moves with a tween: the animation loop redraws the shadows while it moves.
    // console.log("Update Door End");
  }

  private _updateimage(item: Floor3dCardConfig, index: number): void {
    let _foundobject: any;
    if (this._object_ids[index].objects.length > 0) {
      _foundobject = this._scene.getObjectByName(this._object_ids[index].objects[0].object_id);
    }
    if (_foundobject) {
      const picture = this._hass.states[item.entity].attributes['entity_picture'];
      if (picture && !['off', 'standby', 'unavailable', 'unknown'].includes(this._hass.states[item.entity].state)) {
        const texture = new THREE.TextureLoader().load(picture);
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        if ((item.image && item.image.rotate) || (item.image && item.image.mirror)) {
          texture.center.set(0.5, 0.5);
        }
        if (item.image && item.image.rotate) {
          texture.rotation = (item.image.rotate * Math.PI) / 180;
        }
        if (item.image && item.image.mirror) {
          texture.wrapS = THREE.RepeatWrapping;
          texture.repeat.x = -1;
        }
        if (_foundobject instanceof THREE.Mesh) {
          let material: any;
          if (_foundobject.material.name.startsWith('f3dmat')) {
            material = _foundobject.material;
            if (material.map && material.map !== texture) material.map.dispose();
            material.map = texture;
          } else {
            material = _foundobject.material.clone();
            material.map = texture;
            material.name = 'f3dmat' + _foundobject.name;
            material.transparent = true;
            _foundobject.material = material;
          }
          material.needsUpdate = true;
          if (item.image && item.image.lumens) {
            material.emissive = new THREE.Color(0xffffff);
            material.emissiveMap = texture;
            material.emissiveIntensity = Number(item.image.lumens) * SCREEN_EMISSIVE_SCALE;
            const light: any = this._scene.getObjectByName(this._object_ids[index].objects[0].object_id + '_light');
            if (light && item.image.lighting_lumens) {
              light.intensity = this._lampIntensity(item.image.lighting_lumens);
              this._refreshLightShadow(light);
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => {
                try {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    canvas.width = 16;
                    canvas.height = 16;
                    ctx.drawImage(img, 0, 0, 16, 16);
                    const data = ctx.getImageData(0, 0, 16, 16).data;
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    const count = data.length / 4;
                    for (let i = 0; i < data.length; i += 4) {
                      r += data[i];
                      g += data[i + 1];
                      b += data[i + 2];
                    }
                    r = Math.floor(r / count);
                    g = Math.floor(g / count);
                    b = Math.floor(b / count);
                    // Picture bytes are sRGB: converted to the linear working space.
                    light.color.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
                    this._render();
                  }
                } catch (e) {
                  console.log('Ambient light color extraction failed (CORS?), using white');
                  light.color.setRGB(1, 1, 1);
                }
              };
              img.onerror = () => {
                light.color.setRGB(1, 1, 1);
              };
              img.src = picture;
            } else if (light) {
              light.intensity = 0;
            }
          } else {
            material.emissive = new THREE.Color(0x000000);
            material.emissiveIntensity = 0;
            const light: any = this._scene.getObjectByName(this._object_ids[index].objects[0].object_id + '_light');
            if (light) {
              light.intensity = 0;
            }
          }
        }
      } else {
        const state = this._hass.states[item.entity].state;
        const offState = item.image && item.image.lighting_off_state ? item.image.lighting_off_state : 'unavailable';
        const light: any = this._scene.getObjectByName(this._object_ids[index].objects[0].object_id + '_light');
        if (state === offState || ['off', 'standby', 'unavailable', 'unknown'].includes(state)) {
          if (light) {
            light.intensity = 0;
          }
          if (_foundobject instanceof THREE.Mesh) {
            const material: any = _foundobject.material;
            if (material && material.name && material.name.startsWith('f3dmat')) {
              if (material.map) material.map.dispose();
              material.map = null;
              material.emissiveMap = null;
              material.color.setHex(0x000000);
              material.emissive = new THREE.Color(0x000000);
              material.emissiveIntensity = 0;
              material.needsUpdate = true;
            }
          }
          this._render();
        } else if (light && item.image && item.image.lighting_lumens) {
          light.intensity = this._lampIntensity(item.image.lighting_lumens);
          this._refreshLightShadow(light);
        }
      }
    }
  }

  // One render per frame even when many updates arrive together. None while the animation loop
  // runs: it renders anyway.
  private _scheduleRender(): void {
    if (this._renderPending || this._to_animate) return;
    this._renderPending = true;
    requestAnimationFrame(() => {
      this._renderPending = false;
      if (this._renderer) this._render();
    });
  }

  // Tracker: a glowing head at the configured height, a thin stem and a halo on the floor, all in
  // the colour of the tracker. It glides to each new position and fades in and out.
  private _createTracker(entity: Floor3dCardConfig, i: number): void {
    const tracker = entity.tracker || {};
    const size = this._num(tracker.size, 15);
    const height = this._num(tracker.height, 150);
    const color = new THREE.Color(tracker.color || '#FF5500');

    const headMaterial = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      roughness: 0.4,
      transparent: true,
      opacity: 0,
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(size, 24, 16), headMaterial);
    head.position.y = height;

    const stemHeight = Math.max(height - size, 1);
    const stemMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.12, size * 0.12, stemHeight, 8), stemMaterial);
    stem.position.y = stemHeight / 2;

    const haloMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(new THREE.RingGeometry(size * 1.1, size * 2.6, 48), haloMaterial);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 1;

    const group = new THREE.Group();
    group.name = entity.object_id + '_tracker';
    group.visible = false;
    group.add(head, stem, halo);
    group.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = false;
    });
    this._scene.add(group);

    this._trackers[i] = {
      group,
      materials: [
        [headMaterial, 0.95],
        [stemMaterial, 0.35],
        [haloMaterial, 0.5],
      ],
      target: new THREE.Vector3(),
      present: false,
      opacity: 0,
      height,
    };
  }

  private _updatetracker(item: Floor3dCardConfig, index: number): void {
    const tv = this._trackers[index];
    if (!tv) return;
    const tracker = item.tracker || {};
    const value = (id: string): number => {
      const s = this._hass.states[id];
      if (!s || ['unavailable', 'unknown', 'none', ''].includes(String(s.state))) return NaN;
      return parseFloat(s.state);
    };
    const stateObj = this._hass.states[item.entity];
    let x = NaN;
    let y = 0;
    if (tracker.sensor_x) {
      x = value(tracker.sensor_x);
    } else if (stateObj && stateObj.attributes && stateObj.attributes.x !== undefined) {
      x = parseFloat(stateObj.attributes.x);
    } else {
      x = value(item.entity);
    }
    if (tracker.sensor_y) {
      y = value(tracker.sensor_y);
    } else if (stateObj && stateObj.attributes && stateObj.attributes.y !== undefined) {
      y = parseFloat(stateObj.attributes.y);
    }
    // Radar slots report 0,0 when nobody is there; the tracking sensors become unavailable.
    if (isNaN(x) || isNaN(y) || (x === 0 && y === 0)) {
      this._setTrackerPresent(tv, false);
      return;
    }

    // Sensor coordinates to millimetres (unit: mm, cm or m), optionally mirrored, then scaled,
    // rotated and moved to the position of the sensor in the model.
    const toMm = tracker.unit == 'm' ? 1000 : tracker.unit == 'cm' ? 10 : 1;
    let xMm = x * toMm;
    let yMm = y * toMm;
    if (tracker.flip_x === true || tracker.flip_x == 'yes') xMm = -xMm;
    if (tracker.flip_y === true || tracker.flip_y == 'yes') yMm = -yMm;
    const scale = this._num(tracker.scale, 0.001);
    const rotation = (this._num(tracker.sensor_rotation, 0) * Math.PI) / 180;
    const sensorPos = tracker.sensor_position || [0, 0, 0];
    const x3d = xMm * scale;
    const z3d = yMm * scale;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    tv.target.set(
      Number(sensorPos[0]) + x3d * cos - z3d * sin,
      Number(sensorPos[1]) || 0,
      Number(sensorPos[2]) + x3d * sin + z3d * cos,
    );
    // Appearing: start where the person is, not from where the previous track ended.
    if (tv.opacity == 0) tv.group.position.copy(tv.target);

    const zone = tracker.zone ? this._hass.states[tracker.zone] : undefined;
    const zoneText = zone && !['unavailable', 'unknown', '-', ''].includes(String(zone.state)) ? String(zone.state) : '';
    this._setTrackerLabel(tv, tracker.label == 'no' ? '' : zoneText, tracker.color || '#FF5500', this._num(tracker.size, 15));

    this._setTrackerPresent(tv, true);
    this._startOrStopAnimationLoop();
    this._scheduleRender();
  }

  private _setTrackerPresent(tv: TrackerView, present: boolean): void {
    if (tv.present === present) return;
    tv.present = present;
    if (present) tv.group.visible = true;
    this._startOrStopAnimationLoop();
    this._scheduleRender();
  }

  // Name of the zone above the head (tracker.zone), always the same size on screen.
  private _setTrackerLabel(tv: TrackerView, text: string, color: string, size: number): void {
    if (text === (tv.labelText || '')) return;
    tv.labelText = text;
    if (!text) {
      if (tv.label) tv.label.visible = false;
      return;
    }
    if (!tv.label) {
      const material = new THREE.SpriteMaterial({ transparent: true, opacity: 0, depthTest: false, sizeAttenuation: false });
      tv.label = new THREE.Sprite(material);
      tv.label.renderOrder = 20;
      tv.label.position.y = tv.height + size * 2.8;
      tv.group.add(tv.label);
      tv.materials.push([material, 1]);
      material.opacity = tv.opacity;
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = '600 40px Roboto, Arial, sans-serif';
    ctx.font = font;
    const width = Math.ceil(ctx.measureText(text).width) + 56;
    canvas.width = width;
    canvas.height = 64;
    ctx.font = font;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.roundRect(0, 0, width, 64, 16);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(24, 32, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 42, 34);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = tv.label.material as THREE.SpriteMaterial;
    if (material.map) material.map.dispose();
    material.map = texture;
    material.needsUpdate = true;
    const h = 0.045; // fraction of the height of the view
    tv.label.scale.set((h * width) / 64, h, 1);
    tv.label.visible = true;
  }

  // Every frame while needed: glide towards the last position and fade in or out.
  private _animateTrackers(dt: number): void {
    const k = 1 - Math.exp(-dt / TRACKER_SMOOTHING);
    const fade = dt / TRACKER_FADE;
    for (const tv of this._trackers) {
      if (!tv) continue;
      if (tv.present) {
        if (tv.group.position.distanceToSquared(tv.target) > 0.25) {
          tv.group.position.lerp(tv.target, k);
        } else {
          tv.group.position.copy(tv.target);
        }
      }
      const goal = tv.present ? 1 : 0;
      if (tv.opacity != goal) {
        tv.opacity = goal > tv.opacity ? Math.min(goal, tv.opacity + fade) : Math.max(goal, tv.opacity - fade);
        for (const [material, full] of tv.materials) material.opacity = full * tv.opacity;
        tv.group.visible = tv.opacity > 0;
      }
    }
  }

  private _trackersNeedAnimation(): boolean {
    return this._trackers.some(
      (tv) =>
        tv &&
        (tv.opacity != (tv.present ? 1 : 0) ||
          (tv.present && tv.group.position.distanceToSquared(tv.target) > 0.25)),
    );
  }

  // Centre and radius of the model, once it has been placed by _setCamera.
  private _computeModelBounds(): void {
    const sphere = new THREE.Box3().setFromObject(this._bboxmodel).getBoundingSphere(new THREE.Sphere());
    this._modelCenter = sphere.center;
    this._modelRadius = Math.max(sphere.radius, 100);
  }

  // Near plane proportional to the distance from the target: with a standard depth buffer a
  // fixed 0.1 cm near plane made nearby surfaces flicker.
  private _updateNearPlane(): void {
    if (!this._camera || !this._controls) return;
    const near = THREE.MathUtils.clamp(this._camera.position.distanceTo(this._controls.target) / 150, 1, 25);
    if (Math.abs(near - this._camera.near) > 0.1) {
      this._camera.near = near;
      this._camera.updateProjectionMatrix();
    }
  }

  // Sun (sun: yes): a directional light placed like sun.sun (azimuth and elevation), using the north
  // of the config. Its shadow covers the whole model and is redrawn when the sun moves.
  private _initSun(): void {
    if (this._config.sun != 'yes' || !this._modelCenter) return;
    this._sun = new THREE.DirectionalLight(0xffffff, 0);
    this._sun.name = 'f3d_sun';
    this._sunTarget = new THREE.Object3D();
    this._sun.target = this._sunTarget;
    this._scene.add(this._sun);
    this._scene.add(this._sunTarget);
    if (this._config.sun_shadow != 'no') {
      const r = this._modelRadius;
      const camera = this._sun.shadow.camera;
      camera.left = -r;
      camera.right = r;
      camera.top = r;
      camera.bottom = -r;
      camera.near = r * 0.5;
      camera.far = r * 3.5;
      camera.updateProjectionMatrix();
      this._sun.shadow.mapSize.set(2048, 2048);
      this._sun.shadow.normalBias = 1.5;
      this._enableShadow(this._sun, -0.0003);
      this._buildSunRoof();
    }
    this._sunKey = undefined;
    this._updateSun();
  }

  // The model has no ceilings, so that the rooms can be seen from above, and the sun would light
  // every floor as if there were no roof. sun_roof lists the indoor floors: copies of them at the
  // top of the walls form a roof that only the sun sees (not the camera, not the lamps: a lamp at
  // ceiling height would be switched off by it). Light then comes in through windows and doors.
  private _buildSunRoof(): void {
    this._sunRoof = [];
    const ids: string[] = Array.isArray(this._config.sun_roof) ? this._config.sun_roof : [];
    if (ids.length == 0) return;
    const top = new THREE.Box3().setFromObject(this._bboxmodel).max.y;
    const material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, side: THREE.DoubleSide });
    material.shadowSide = THREE.DoubleSide;
    ids.forEach((id) => {
      const floor = this._scene.getObjectByName(id) as THREE.Mesh;
      if (!floor || !floor.geometry) {
        console.warn('floor3d-card: sun_roof: object not found: ' + id);
        return;
      }
      floor.updateWorldMatrix(true, false);
      const geometry = floor.geometry.clone().applyMatrix4(floor.matrixWorld);
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      // A few centimetres wider on each side, so that no light slips in along the walls.
      geometry.translate(-center.x, -box.min.y, -center.z);
      geometry.scale((size.x + 8) / Math.max(size.x, 1), 1, (size.z + 8) / Math.max(size.z, 1));
      geometry.translate(center.x, top - 1, center.z);
      const roof = new THREE.Mesh(geometry, material);
      roof.name = id + '_sun_roof';
      roof.castShadow = true;
      roof.receiveShadow = false;
      roof.visible = false; // shown only while the sun's shadow map is drawn
      this._scene.add(roof);
      this._sunRoof.push(roof);
    });
    if (this._sunRoof.length == 0) return;

    // Shadow maps are drawn in one call for all the lights: the sun gets its own, with the roof.
    const shadowMap = this._renderer.shadowMap;
    const renderShadows = shadowMap.render.bind(shadowMap);
    shadowMap.render = (lights, scene, camera) => {
      if (!lights.includes(this._sun)) return renderShadows(lights, scene, camera);
      const needsUpdate = shadowMap.needsUpdate;
      this._sunRoof.forEach((roof) => (roof.visible = true));
      renderShadows([this._sun], scene, camera);
      this._sunRoof.forEach((roof) => (roof.visible = false));
      shadowMap.needsUpdate = needsUpdate; // the call above resets it
      renderShadows(
        lights.filter((light) => light !== this._sun),
        scene,
        camera,
      );
    };
  }

  // Azimuth and elevation of the sun entity, in degrees: NaN without it.
  private _sunAngles(): [number, number] {
    const sun = this._hass && this._hass.states[this._config.sun_entity || 'sun.sun'];
    return sun ? [Number(sun.attributes.azimuth), Number(sun.attributes.elevation)] : [NaN, NaN];
  }

  private _updateSun(): void {
    if (!this._sun || !this._hass) return;
    const [azimuth, elevation] = this._sunAngles();
    const known = !isNaN(azimuth) && !isNaN(elevation);
    const key = azimuth + '|' + elevation;
    const moved = key !== this._sunKey;
    this._sunKey = key;
    if (moved && known) {
      const north = new THREE.Vector3(
        this._num(this._config.north && this._config.north.x, 0),
        0,
        this._num(this._config.north && this._config.north.z, -1),
      ).normalize();
      const east = new THREE.Vector3().crossVectors(north, new THREE.Vector3(0, 1, 0));
      const az = THREE.MathUtils.degToRad(azimuth);
      const el = THREE.MathUtils.degToRad(elevation);
      const direction = north
        .multiplyScalar(Math.cos(az))
        .addScaledVector(east, Math.sin(az))
        .multiplyScalar(Math.cos(el));
      direction.y = Math.sin(el);
      direction.normalize();
      this._sunTarget.position.copy(this._modelCenter);
      this._sun.position.copy(this._modelCenter).addScaledVector(direction, this._modelRadius * 2);
      this._sunTarget.updateMatrixWorld();
      this._sun.updateMatrixWorld();
      // Warmer near the horizon.
      const warm = 1 - THREE.MathUtils.smoothstep(elevation, 2, 25);
      this._sun.color.setRGB(1, 1 - 0.25 * warm, 1 - 0.5 * warm, THREE.SRGBColorSpace);
    }
    // sun_power can be a numeric sensor (from the direct radiation, for example): read at every
    // update, so that clouds dim the sun and its shadows.
    const intensity = known ? SUN_INTENSITY * this._power('sun_power', 1) * daylight(elevation) : 0;
    if (!moved && intensity === this._sun.intensity) return;
    this._sun.intensity = intensity;
    // The brightness doesn't change the shadow map, the position does: redrawn now if the sun
    // shines, otherwise as soon as it does (it can move behind the clouds, with sun_power at 0).
    if (moved) this._sun.userData.shadowStale = true;
    this._refreshLightShadow(this._sun);
    this._scheduleRender();
  }

  // Menus at the top right: views and, with rooms configured, the room colours.
  private _renderMenus(): void {
    if (this._zoommenu) render(html`${this._getZoomMenu()}${this._getMapMenu()}`, this._zoommenu);
  }

  private _getMapMenu(): TemplateResult {
    if (this._roomViews.length == 0) return html``;
    const option = (value: string, key: string) =>
      html`<option value=${value} ?selected=${this._mapMode == value}>${this._t(key)}</option>`;
    return html`
      <select
        aria-label=${this._t('map')}
        @change=${(ev: Event) => this._setMapMode((ev.target as HTMLSelectElement).value)}
        style="font: inherit; font-size: 14px; padding: 6px 10px; border-radius: 8px; color-scheme: dark;
          background: rgba(0, 0, 0, 0.55); color: white; border: 1px solid rgba(255, 255, 255, 0.6); cursor: pointer;"
      >
        ${option('none', 'map_none')} ${option('temperature', 'map_temperature')} ${option('presence', 'map_presence')}
      </select>
    `;
  }

  private _setMapMode(mode: string): void {
    this._mapMode = ['temperature', 'presence'].includes(mode) ? mode : 'none';
    this._updateStateColors(true);
  }

  // rooms: [{ name, object_id (floor object or <group>), temperature, presence }]: a translucent
  // copy of each floor, coloured by temperature or presence, with the temperature written on it.
  private _initRooms(): void {
    this._roomViews = [];
    const rooms = Array.isArray(this._config.rooms) ? this._config.rooms : [];
    rooms.forEach((room: any) => {
      const ids: string[] = [];
      const id = String(room.object_id || '');
      if (id.startsWith('<') && id.endsWith('>')) {
        const group = (this._config.object_groups || []).find((g: any) => '<' + g.object_group + '>' == id);
        if (group) group.objects.forEach((o: any) => ids.push(o.object_id));
      } else if (id) {
        ids.push(id);
      }
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      const overlays: THREE.Mesh[] = [];
      const box = new THREE.Box3();
      ids.forEach((objectId) => {
        const floor = this._scene.getObjectByName(objectId) as THREE.Mesh;
        if (!floor || !floor.geometry) return;
        const overlay = new THREE.Mesh(floor.geometry, material);
        overlay.name = objectId + '_room_color';
        overlay.position.y = 0.6;
        overlay.renderOrder = 5;
        overlay.visible = false;
        floor.add(overlay);
        overlays.push(overlay);
        box.expandByObject(floor);
      });
      if (overlays.length == 0) {
        console.warn('floor3d-card: room ' + room.name + ': floor object not found (' + id + ')');
        return;
      }
      const presence = room.presence ? (Array.isArray(room.presence) ? room.presence : [room.presence]) : [];
      this._roomViews.push({
        name: room.name || id,
        material,
        overlays,
        // Level with the top of the walls: seen from above it sits inside the outline of the room.
        center: box.getCenter(new THREE.Vector3()).setY(box.max.y + 250),
        temperature: room.temperature,
        presence,
      });
    });
    const initial = this._config.room_colors;
    this._mapMode = ['temperature', 'presence'].includes(initial) ? initial : 'none';
  }

  // current_position of a cover, null when the cover doesn't report it.
  private _coverPosition(stateObj: HassEntity): number | null {
    const position = stateObj.attributes['current_position'];
    if (position === undefined || position === null || position === '') return null;
    const n = Number(position);
    return isNaN(n) ? null : n;
  }

  private _isOpen(state: string): boolean {
    return state == 'on' || state == 'open' || state == 'opening';
  }

  // Doors and windows (state_colors: yes) and room colours: recomputed when one of their
  // entities, or the alarm, changes.
  private _updateStateColors(force = false): void {
    if (!this._hass || !this._scene || !this._modelready) return;
    const doors = this._config.state_colors == 'yes' ? this._config.entities.filter((e) => e.type3d == 'door') : [];
    const ids: string[] = [this._config.alarm_entity, ...doors.map((e) => e.entity)];
    this._roomViews.forEach((r) => ids.push(r.temperature, ...r.presence));
    const deps = ids.map((id) => (id ? this._hass.states[id] : undefined));
    if (!force && this._colorDeps && deps.every((d, k) => d === this._colorDeps[k])) return;
    this._colorDeps = deps;

    // Openings: amber when open, red with the alarm armed, blinking red when it goes off.
    const alarm = this._config.alarm_entity ? this._hass.states[this._config.alarm_entity] : undefined;
    const alarmState = alarm ? alarm.state : '';
    const armed = alarmState.startsWith('armed') || ['arming', 'pending', 'triggered'].includes(alarmState);
    const openColor = new THREE.Color(armed ? this._config.alarm_color || '#ff3b30' : this._config.open_color || '#ffb020');
    let anyOpen = false;
    this._config.entities.forEach((entity, i) => {
      if (!doors.includes(entity)) return;
      const open = this._isOpen(this._states[i]);
      anyOpen = anyOpen || open;
      this._tintObjects(i, open ? openColor : null, armed ? 0.9 : 0.6);
    });
    const pulse = alarmState == 'triggered' && anyOpen;
    if (pulse != this._alarmPulse) {
      this._alarmPulse = pulse;
      this._startOrStopAnimationLoop();
    }

    // Rooms
    this._roomViews.forEach((room) => {
      let color: THREE.Color | null = null;
      let opacity = 0.35;
      let label = '';
      if (this._mapMode == 'temperature' && room.temperature) {
        const s = this._hass.states[room.temperature];
        const t = s ? parseFloat(s.state) : NaN;
        if (!isNaN(t)) {
          color = this._temperatureColor(t);
          const unit = (s.attributes && s.attributes.unit_of_measurement) || '°';
          label = t.toLocaleString(this._hass.language || 'it', { maximumFractionDigits: 1 }) + ' ' + unit;
        }
      } else if (this._mapMode == 'presence') {
        const present = room.presence.some((id) => this._hass.states[id] && this._hass.states[id].state == 'on');
        if (present) {
          color = new THREE.Color(this._config.presence_color || '#34d399');
          opacity = 0.32;
        }
      }
      if (color) room.material.color.copy(color);
      room.material.opacity = opacity;
      room.overlays.forEach((o) => (o.visible = !!color));
      this._setRoomLabel(room, label);
    });
    this._scheduleRender();
  }

  // Blue (temperature_min, 17 by default) to red (temperature_max, 27), green in the middle.
  private _temperatureColor(t: number): THREE.Color {
    const min = this._num(this._config.temperature_min, 17);
    const max = this._num(this._config.temperature_max, 27);
    const k = THREE.MathUtils.clamp((t - min) / (max - min || 1), 0, 1);
    return new THREE.Color().setHSL(((1 - k) * 220) / 360, 0.85, 0.55, THREE.SRGBColorSpace);
  }

  private _setRoomLabel(room: RoomView, text: string): void {
    if (text === (room.labelText || '')) return;
    room.labelText = text;
    if (!text) {
      if (room.label) room.label.visible = false;
      return;
    }
    if (!room.label) {
      room.label = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthTest: false, sizeAttenuation: false }));
      room.label.renderOrder = 20;
      room.label.position.copy(room.center);
      this._scene.add(room.label);
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = '600 40px Roboto, Arial, sans-serif';
    ctx.font = font;
    const width = Math.ceil(ctx.measureText(text).width) + 32;
    canvas.width = width;
    canvas.height = 60;
    ctx.font = font;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.roundRect(0, 0, width, 60, 14);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 16, 32);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = room.label.material as THREE.SpriteMaterial;
    if (material.map) material.map.dispose();
    material.map = texture;
    material.needsUpdate = true;
    const h = 0.04;
    room.label.scale.set((h * width) / 60, h, 1);
    room.label.visible = true;
  }

  // Glow on the objects of an entity (null: back to their own materials). The tinted materials are
  // copies, so objects sharing a material with the rest of the house are not affected.
  private _tintObjects(index: number, color: THREE.Color | null, intensity: number): void {
    if (!this._object_ids[index]) return;
    this._object_ids[index].objects.forEach((o) => {
      const obj: any = this._scene.getObjectByName(o.object_id);
      if (!obj || !obj.material) return;
      if (!obj.userData.baseMaterial) obj.userData.baseMaterial = obj.material;
      if (!color) {
        obj.material = obj.userData.baseMaterial;
        return;
      }
      if (!obj.userData.tintMaterial) {
        const base = obj.userData.baseMaterial;
        obj.userData.tintMaterial = Array.isArray(base) ? base.map((m) => m.clone()) : base.clone();
      }
      const materials = Array.isArray(obj.userData.tintMaterial) ? obj.userData.tintMaterial : [obj.userData.tintMaterial];
      materials.forEach((m) => {
        if (m.emissive) {
          m.emissive.copy(color);
          m.emissiveIntensity = intensity;
          m.userData.tintIntensity = intensity;
        }
      });
      obj.material = obj.userData.tintMaterial;
    });
  }

  // Alarm triggered: the open doors and windows blink (about once per second).
  private _pulseOpenings(now: number): void {
    const k = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((now / 1000) * Math.PI * 2));
    this._config.entities.forEach((entity, i) => {
      if (entity.type3d != 'door' || !this._isOpen(this._states[i]) || !this._object_ids[i]) return;
      this._object_ids[i].objects.forEach((o) => {
        const obj: any = this._scene.getObjectByName(o.object_id);
        const tint = obj && obj.userData.tintMaterial;
        if (!tint) return;
        (Array.isArray(tint) ? tint : [tint]).forEach((m) => {
          if (m.emissive) m.emissiveIntensity = (m.userData.tintIntensity || 0.9) * k;
        });
      });
    });
  }

  private _centerobjecttopivot(object: THREE.Mesh, pivot: THREE.Vector3) {
    //Center a Mesh  along is defined pivot point

    object.applyMatrix4(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z));
    object.position.copy(pivot);
  }

  private _rotatedoorpivot(entity: Floor3dCardConfig, index: number) {
    // console.log("Rotate Door Start");

    //For a swing door, rotate the objects along the configured axis and the degrees of opening
    this._object_ids[index].objects.forEach((element) => {
      let _obj: any = this._scene.getObjectByName(element.object_id);

      //this._centerobjecttopivot(_obj, this._pivot[index]);
      const targetRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
      const direction = entity.door.swing_direction || entity.door.direction;

      if (this._states[index] == 'on') {
        if (direction == 'inner') {
          //_obj.rotateOnAxis(this._axis_for_door[index], -Math.PI * this._degrees[index] / 180);
          if (this._axis_for_door[index].y == 1) {
            targetRotation.y = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].x == 1) {
            targetRotation.x = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].z == 1) {
            targetRotation.z = (-Math.PI * this._degrees[index]) / 180;
          }
        } else if (direction == 'outer') {
          //_obj.rotateOnAxis(this._axis_for_door[index], Math.PI * this._degrees[index] / 180);
          if (this._axis_for_door[index].y == 1) {
            targetRotation.y = (Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].x == 1) {
            targetRotation.x = (Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].z == 1) {
            targetRotation.z = (Math.PI * this._degrees[index]) / 180;
          }
        } else {
          throw new Error('Invalid swing direction: ' + direction + '. Valid directions are: inner, outer');
        }
      }

      if (targetRotation.equals(_obj.rotation)) return;

      new TWEEN.Tween(_obj.rotation)
        .to(targetRotation, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => {
          // Stop animation loop if all tweens finished
          this._startOrStopAnimationLoop();
        })
        .start();
      this._startOrStopAnimationLoop();
    });

    // console.log("Rotate Door End");
  }

  private _translatedoor(pane: THREE.Object3D, percentage: number, side: string, index: number, doorstate: string) {
    // console.log("Translate Door Start");
    //For a slide door, translate the objects according to the configured directions and percentage of opening

    let translate: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    let size: THREE.Vector3 = new THREE.Vector3();
    let center: THREE.Vector3 = new THREE.Vector3();

    //TBD let pane = this._scene.getObjectByName(item.door.pane);

    let bbox = new THREE.Box3().setFromObject(pane);

    size.subVectors(bbox.max, bbox.min);

    if (doorstate == 'on' || doorstate == 'open') {
      if (side == 'left') {
        if (size.x > size.z) {
          translate.z += 0;
          translate.x += (-size.x * percentage) / 100;
          translate.y = 0;
        } else {
          translate.z += (-size.z * percentage) / 100;
          translate.x += 0;
          translate.y += 0;
        }
      } else if (side == 'right') {
        if (size.x > size.z) {
          translate.z += 0;
          translate.x += (+size.x * percentage) / 100;
          translate.y += 0;
        } else {
          translate.z += (+size.z * percentage) / 100;
          translate.x += 0;
          translate.y += 0;
        }
      } else if (side == 'down') {
        translate.y += (-size.y * percentage) / 100;
        translate.x += 0;
        translate.z += 0;
      } else if (side == 'up') {
        translate.y += (+size.y * percentage) / 100;
        translate.x += 0;
        translate.z += 0;
      } else {
        throw new Error('Invalid side: ' + side + '. Valid sides are: up, down, left, right');
      }
    }

    this._object_ids[index].objects.forEach((element, i) => {
      let _obj: any = this._scene.getObjectByName(element.object_id);
      const originalPosition = this._slidingdoorposition[index][i];
      if (!_obj || !originalPosition) return; // an object missing from the model

      let targetPosition: THREE.Vector3 = new THREE.Vector3(
        originalPosition.x + translate.x,
        originalPosition.y + translate.y,
        originalPosition.z + translate.z,
      );

      if (targetPosition.equals(_obj.position)) return;

      new TWEEN.Tween(_obj.position)
        .to(targetPosition, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => {
          // Stop animation loop if all tweens finished
          this._startOrStopAnimationLoop();
        })
        .start();
    });

    this._startOrStopAnimationLoop();
    // console.log("Translate Door End");
  }

  private _updateroomcolor(item: any, index: number): void {
    // Change the color of the room when, for the bound entity, when the state matches the condition

    let _room: any = this._scene.getObjectByName(this._rooms[index]);

    const color: string = item.room.color ? item.room.color : '#ffffff';

    if (_room && _room instanceof THREE.Mesh) {
      let i: any;
      let defaultcolor = true;

      const _object: any = _room;

      for (i in item.colorcondition) {
        if (this._states[index] == item.colorcondition[i].state) {
          const colorcond: THREE.Color = new THREE.Color(item.colorcondition[i].color);
          _object.material.color.set(colorcond);
          _object.material.emissive.set(colorcond);
          defaultcolor = false;
          break;
        }
      }
      if (defaultcolor) {
        _object.material.color.set(color);
        _object.material.emissive.set(color);
      }
    }
  }

  private _updatecolor(item: any, index: number): void {
    // Change the color of the object when, for the bound device, the state matches the condition

    let j = 0;
    this._object_ids[index].objects.forEach((element) => {
      let _object: any = this._scene.getObjectByName(element.object_id);

      if (_object) {
        let i: any;
        let defaultcolor = true;
        for (i in item.colorcondition) {
          if (this._states[index] == item.colorcondition[i].state) {
            const colorarray = item.colorcondition[i].color.split(',');
            let color = '';
            if (colorarray.length == 3) {
              color = this._RGBToHex(Number(colorarray[0]), Number(colorarray[1]), Number(colorarray[2]));
            } else {
              color = item.colorcondition[i].color;
            }
            if (!Array.isArray(_object.material)) {
              _object.material = this._clonedmaterial[index][j];
              _object.material.color.set(color);
            }
            defaultcolor = false;
            break;
          }
        }
        if (defaultcolor) {
          if (this._initialmaterial[index][j]) {
            _object.material = this._initialmaterial[index][j];
          }
        }
      }
      j += 1;
    });
  }

  private _updatehide(entity: Floor3dCardConfig, index: number): void {
    // hide the object when the state is equal to the configured value
    this._object_ids[index].objects.forEach((element) => {
      //object clickable: check layers solution
      const _object: any = this._scene.getObjectByName(element.object_id);

      if (_object) {
        if (this._states[index] == entity.hide.state) {
          //TODO: Layers to hide ?
          _object.visible = false;
        } else {
          _object.visible = true;
        }
      }
    });
    this._invalidateShadows();
  }

  private _updateshow(entity: Floor3dCardConfig, index: number): void {
    // hide the object when the state is equal to the configured value
    this._object_ids[index].objects.forEach((element) => {
      const _object: any = this._scene.getObjectByName(element.object_id);

      if (_object) {
        if (this._states[index] == entity.show.state) {
          _object.visible = true;
        } else {
          //TODO: Layers to hide ?
          _object.visible = false;
        }
      }
    });
    this._invalidateShadows();
  }

  // end of manage entity types

  // https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
  protected shouldUpdate(_changedProps: PropertyValues): boolean {
    return true;
    //return hasConfigOrEntityChanged(this, _changedProps, false);
  }

  private _rotatecalc(entity: Floor3dCardConfig, i: number) {
    let j = this._rotation_index.indexOf(i);

    //1 if the entity is on, 0 if the entity is off
    this._rotation_state[j] = this._states[i] == 'on' ? 1 : 0;

    //If the entity is on and it has the 'percentage' attribute, convert the percentage integer
    //into a decimal and store it as the rotation state
    if (this._rotation_state[j] != 0 && this._hass.states[entity.entity].attributes['percentage']) {
      this._rotation_state[j] = this._hass.states[entity.entity].attributes['percentage'] / 100;
    }

    //If the entity is on and it is reversed, set the rotation state to the negative value of itself
    if (
      this._rotation_state[j] != 0 &&
      this._hass.states[entity.entity].attributes['direction'] &&
      this._hass.states[entity.entity].attributes['direction'] == 'reverse'
    ) {
      this._rotation_state[j] = 0 - this._rotation_state[j];
    }

    this._startOrStopAnimationLoop();
  }

  // A fan turning, or still speeding up or slowing down.
  private _rotating(): boolean {
    return (
      !!(this._rotation_state && this._rotation_state.some((s) => s !== 0)) ||
      this._rotation_speed.some((s) => s !== 0)
    );
  }

  private _needsAnimationLoop() {
    // Showers, rotations, tweens (doors, covers, camera moves) and trackers still gliding or
    // fading (the model may not be loaded yet)
    return (
      !!(this._showers && this._showers.some((shower) => shower && shower.visible)) ||
      this._rotating() ||
      TWEEN.getAll().length > 0 ||
      this._trackersNeedAnimation() ||
      this._alarmPulse
    );
  }

  // If every rotating entity and Tween is stopped, disable animation
  private _startOrStopAnimationLoop() {
    if (!this._renderer) return;
    // The loop runs only while the card is visible. It is (re)armed every time it is
    // needed: setAnimationLoop is idempotent, and _to_animate alone could be stale.
    if (this._isVisible !== false && this._needsAnimationLoop()) {
      if (!this._to_animate) {
        this._lastFrameTime = null;
        this._lastShadowTime = performance.now(); // nothing has moved yet
      }
      this._to_animate = true;
      this._renderer.setAnimationLoop((time) => this._animationLoop(time));
    } else {
      this._to_animate = false;
      this._lastFrameTime = null;
      if (this._renderer) {
        this._renderer.setAnimationLoop(null);
      }
    }
  }

  private _animationLoop(time?: number) {
    const now = time !== undefined ? time : performance.now();
    // Seconds since the previous frame, capped so that a pause does not make things jump.
    const clockDelta = this._lastFrameTime != null ? Math.min((now - this._lastFrameTime) / 1000, 0.1) : 1 / 60;
    this._lastFrameTime = now;
    let rotateBy = clockDelta * Math.PI * 2;

    // What moves in this frame, read before TWEEN.update() removes the tweens that end now.
    const rotating = this._rotating();
    const tweening = TWEEN.getAll().length > 0;
    const objectTweens = tweening && TWEEN.getAll().some((t) => !this._cameraTweens.includes(t));
    const showering = !!(this._showers && this._showers.some((shower) => shower && shower.visible));

    (this._rotation_state || []).forEach((target, index) => {
      // Spin up and coast down at a constant rate: full speed in rotate.ramp seconds (0: at once).
      const ramp = this._rotation_ramp[index] || 0;
      const current = this._rotation_speed[index] || 0;
      const step = ramp > 0 ? clockDelta / ramp : Infinity;
      const speed = Math.abs(target - current) <= step ? target : current + Math.sign(target - current) * step;
      this._rotation_speed[index] = speed;
      if (speed == 0) return;

      this._object_ids[this._rotation_index[index]].objects.forEach((element) => {
        let _obj = this._scene.getObjectByName(element.object_id);
        if (_obj) {
          switch (this._axis_to_rotate[index]) {
            case 'x':
              _obj.rotation.x += this._round_per_seconds[index] * speed * rotateBy;
              break;
            case 'y':
              _obj.rotation.y += this._round_per_seconds[index] * speed * rotateBy;
              break;
            case 'z':
              _obj.rotation.z += this._round_per_seconds[index] * speed * rotateBy;
              break;
          }
        }
      });
    });

    // Step proportional to elapsed time (60 fps = 1 step), capped after long pauses.
    this._animateshowers(clockDelta * 60);

    TWEEN.update();

    this._animateTrackers(clockDelta);
    if (this._alarmPulse) this._pulseOpenings(now);

    // Only moving objects change the shadows (not the shower, the trackers or the camera). Redrawing
    // every shadow map at every frame of a door is dozens of passes over the whole model per frame:
    // they follow the door a few times per second and take its final position when it stops.
    const objectsStopped = objectTweens && !TWEEN.getAll().some((t) => !this._cameraTweens.includes(t));
    if ((rotating || objectTweens) && (objectsStopped || now - this._lastShadowTime >= MOVING_SHADOW_MS)) {
      this._lastShadowTime = now;
      this._invalidateShadows();
    }

    // Trackers and the shower do not need every frame of the display (the last one is always drawn).
    const light = !rotating && !tweening;
    const throttled =
      light &&
      now - this._lastRenderTime < LIGHT_ANIMATION_FRAME_MS &&
      (showering || this._alarmPulse || this._trackersNeedAnimation());
    if (!throttled && (this._isVisible || this._needsAnimationLoop())) {
      this._lastRenderTime = now;
      this._render();
    }

    // Tween onComplete runs while the tween is still listed: stop here once nothing is left.
    if (!this._needsAnimationLoop()) {
      this._startOrStopAnimationLoop();
    }
  }

  // https://lit-element.polymer-project.org/guide/templates

  protected render(): TemplateResult | void {
    if (this._config.show_error) {
      return this._showError(localize('common.show_error'));
    }

    let htmlHeight: string;
    if (this._ispanel()) htmlHeight = 'calc(100vh - var(--header-height))';
    else htmlHeight = 'auto';

    return html`
      <ha-card
        tabindex="0"
        .style=${`${
          this._config.style || 'overflow: hidden; width: auto; height: ' + htmlHeight + '; position: relative;'
        }`}
        id="${this._card_id}"
      >
      </ha-card>
    `;
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    //not implemented to not interfere with  the Action handler of the Three.js canvas object
    if (this.hass && this._config && ev.detail.action) {
      handleAction(this, this.hass, this._config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html`<hui-warning>${warning}</hui-warning>`;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this._config,
    });

    return html`${errorCard}`;
  }

  // https://lit-element.polymer-project.org/guide/styles
  static get styles(): CSSResultGroup {
    return css`
      .f3d-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-height: 200px;
        height: 100%;
        padding: 24px;
        box-sizing: border-box;
        text-align: center;
        color: var(--secondary-text-color, #727272);
        font-size: 14px;
      }
      .f3d-icon {
        width: 44px;
        height: 44px;
        fill: var(--primary-color, #03a9f4);
        animation: f3d-float 2.4s ease-in-out infinite;
      }
      .f3d-title {
        color: var(--primary-text-color, #212121);
        font-size: 15px;
        font-weight: 500;
      }
      .f3d-bar {
        position: relative;
        width: min(260px, 70%);
        height: 4px;
        border-radius: 2px;
        overflow: hidden;
        background: var(--divider-color, rgba(127, 127, 127, 0.25));
      }
      .f3d-fill {
        height: 100%;
        width: 0;
        border-radius: 2px;
        background: var(--primary-color, #03a9f4);
        transition: width 0.25s ease;
      }
      .f3d-bar.indeterminate .f3d-fill {
        position: absolute;
        width: 35%;
        animation: f3d-slide 1.3s ease-in-out infinite;
      }
      .f3d-detail {
        min-height: 1.3em;
        font-size: 12px;
        opacity: 0.85;
        font-variant-numeric: tabular-nums;
        overflow-wrap: anywhere;
      }
      .f3d-loading.error .f3d-icon {
        fill: var(--error-color, #db4437);
        animation: none;
      }
      .f3d-loading.error .f3d-title {
        color: var(--error-color, #db4437);
      }
      .f3d-loading.error .f3d-bar {
        display: none;
      }
      @keyframes f3d-slide {
        from {
          left: -35%;
        }
        to {
          left: 100%;
        }
      }
      @keyframes f3d-float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-4px) rotate(-8deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .f3d-icon {
          animation: none;
        }
        .f3d-bar.indeterminate .f3d-fill {
          animation-duration: 3s;
        }
      }
    `;
  }
}
