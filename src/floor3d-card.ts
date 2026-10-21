import { LitElement, html, TemplateResult, CSSResultGroup, render } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor, fireEvent, forwardHaptic } from './ha';
// The editor is loaded on demand by getConfigElement(): devices that only show the card never download it.
import { HassEntity } from 'home-assistant-js-websocket';
import { createObjectGroupConfigArray, getLovelace } from './helpers';
import { matchObjects, normalizeConfig, objectPattern } from './config';
import type { Floor3dCardConfig } from './types';
import { CARD_VERSION, EDITOR_EVENT, PREVIEW_EVENT } from './const';
import DRACO_DECODER from 'virtual:draco-decoder';
import { previewState } from './preview';
import { cardStyles } from './styles';
import { BoxesHost, CornerBoxes } from './corner-boxes';
import { CameraOverlay, CamerasHost } from './camera-overlay';
import { Environment, EnvironmentHost } from './environment';
import { RoomMaps, RoomsHost, RoomView } from './rooms';
import { EntityHandler, EntityHost, onNewState } from './entity-types';
import { Trackers } from './trackers';
import { Showers } from './showers';
import { Lamps, rgbToHex } from './lamps';
import { Screens } from './screens';
import { CLIMATE_COLORS, activeAlarms, climateAction } from './maps';
import { localize, pickLanguage } from './localize/localize';
import { findSlats, slatAngle, Slat, tiltSlats } from './slats';
import { fitText, textLayout } from './textmap';
import { rotationAngle, sensorNumber, turnToward } from './rotate';
import { point } from './cameras';
import { STATUS_COLORS, StatusKind } from './boxes';
//import three.js libraries for 3D rendering
import * as TWEEN from '@tweenjs/tween.js';
import { mdiAlertCircleOutline, mdiCubeOutline } from '@mdi/js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D } from 'three';

const LIGHT_ANIMATION_FRAME_MS = 33; // only trackers or the shower moving: at most 30 frames per second
const MOVING_SHADOW_MS = 300; // shadows of a moving door: redrawn at most this often, and at the end
const ROTATE_RAMP = 1.5; // seconds for a fan to reach full speed or to stop, when rotate.ramp is missing

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

// Elements of a dashboard: Home Assistant sets preview on its cards while it is in edit mode.
const DASHBOARD_TAGS = [
  'HUI-VIEW',
  'HUI-SECTION',
  'HUI-MASONRY-VIEW',
  'HUI-SECTIONS-VIEW',
  'HUI-PANEL-VIEW',
  'HUI-SIDEBAR-VIEW',
];

// A mesh with slats (cover.slats): its own geometry, its slats, and its positions and normals as
// in the model.
interface SlatSet {
  geometry: THREE.BufferGeometry;
  slats: Slat[];
  positions: Float32Array;
  normals?: Float32Array;
}

/* eslint no-console: 0 */
console.info(
  `%c  FLOOR3D-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// The camera going to objects or a room (boxes in the corners, alarm_view) comes from at least this
// many degrees above them.
const MIN_FLIGHT_ELEVATION = 65;

class ModelSource {
  public static OBJ = 0;
  public static GLB = 1;
}

// The pictures of several texts in one, one under the other, each in the middle of the line.
function stackCanvases(canvases: HTMLCanvasElement[], background?: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, ...canvases.map((c) => c.width));
  canvas.height = Math.max(
    1,
    canvases.reduce((h, c) => h + c.height, 0),
  );
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background || 'transparent';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let y = 0;
  canvases.forEach((c) => {
    if (c.width > 0 && c.height > 0) ctx.drawImage(c, (canvas.width - c.width) / 2, y);
    y += c.height;
  });
  return canvas;
}

export class Floor3dCard extends LitElement {
  private _scene?: THREE.Scene;
  private _camera?: THREE.PerspectiveCamera;
  private _renderer?: THREE.WebGLRenderer;
  private _levelbar?: HTMLElement;
  private _zoombar?: HTMLElement;
  private _selectionbar?: HTMLElement;
  private _controls?: OrbitControls;
  private _to_animate: boolean;
  private _bboxmodel: THREE.Object3D;
  private _levels: THREE.Object3D[];
  private _displaylevels: boolean[];
  private _zoom: any[];
  private _states?: string[];
  private _raycasting: THREE.Object3D[];
  private _raycastinglevels: THREE.Object3D[][];
  private _initialmaterial?: THREE.Material[][];
  private _clonedmaterial?: THREE.Material[][];
  private _selectedmaterial?: THREE.Material;
  private _initialobjectmaterials: { [key: string]: THREE.Material };
  private _selectedobjects: string[];
  private _selectionModeEnabled: boolean;
  private _rooms?: string[];
  private _sprites?: string[];
  private _canvas?: HTMLCanvasElement[];
  private _unit_of_measurement?: string[];
  private _text?: string[];
  private _spritetext?: string[];
  private _objposition: number[][];
  private _slidingdoorposition: THREE.Vector3[][];
  // Covers: the size of each pane before it moves (motion: shrink), the meshes with slats
  // (cover.slats), the angle they show, their tilt and their running tween, by entity.
  private _paneSizes = new Map<number, THREE.Vector3>();
  private _slatSets = new Map<number, SlatSet[]>();
  private _slatAngles = new Map<number, number>();
  private _slatTweens = new Map<number, TWEEN.Tween<{ angle: number }>>();
  private _tilts = new Map<number, number | null>();
  // Clipping planes of the sliding covers: in the space of the model, and in the space of the scene
  // for the materials, placed again when the model moves.
  private _coverPlanes: { local: THREE.Plane; world: THREE.Plane }[] = [];
  // Boxes in the corners (corner-boxes.ts), and the kind of the status box whose objects are outlined
  // in the model, with the timer that ends it.
  private _boxes = new CornerBoxes(this._boxesHost());
  private _shownStatus?: StatusKind;
  private _shownTimer?: number;
  // The levels before the first tap on the status box, and those the taps left: at its end the
  // levels go back, unless they were changed meanwhile (see _toggleStatus).
  private _levelsBefore?: boolean[];
  private _levelsShown?: boolean[];
  private _levelMiddles?: number[]; // the middle of the height of each level (see _levelsUpTo)
  // Torch, sky light, sun, sky behind the canvas and ground (environment.ts).
  private _env = new Environment(this._environmentHost());
  // The rooms coloured by a map, their labels, the Map menu and its legend (rooms.ts).
  private _roomMaps = new RoomMaps(this._roomsHost());
  // The entity types in modules of their own (see entity-types.ts).
  private _trackers = new Trackers(this._entityHost());
  private _showers = new Showers(this._entityHost());
  private _lamps = new Lamps(this._entityHost());
  private _screens = new Screens(this._entityHost(), this._lamps);
  // The cameras on screen (camera-overlay.ts): their icons over the model, the picture that pops up.
  private _cameras = new CameraOverlay(this._camerasHost(), this._boxes);
  private _pivot: THREE.Vector3[];
  private _degrees: number[];
  private _axis_for_door: THREE.Vector3[];
  private _axis_to_rotate: string[];
  private _round_per_seconds: number[];
  private _rotation_state: number[]; // target speed: 1 full, a fraction with percentage, negative in reverse
  private _rotation_speed: number[] = []; // speed now, on its way to the target (rotate.ramp)
  private _rotation_ramp: number[] = []; // seconds from stopped to full speed
  private _rotation_index: number[];
  // angle_entity (rotate.ts): the angle to turn to, the angle turned to now (radians, null: none yet),
  // and whether the range is a whole turn.
  private _rotation_angle: (number | null)[] = [];
  private _rotation_turned: (number | null)[] = [];
  private _rotation_wrap: boolean[] = [];
  // The objects each rotate entity turns, found once (a search of the scene at every frame was slow
  // on a large model).
  private _rotation_objects: THREE.Object3D[][] = [];
  private _lastFrameTime?: number | null; // timestamp of the previous animation frame
  private _lastRenderTime = 0;
  private _lastShadowTime = 0;
  private _slidingdoor: THREE.Group[];
  private _overlay_entity: string;
  private _overlay_state: string;

  private _templateErrors = new Set<string>();
  // TV screens: the picture being loaded for each entity (a newer one, or the TV switched off,
  // drops it), and the entities whose picture failed to load (logged once).
  private _resizeTimeout?: number;
  private _resizeObserver: ResizeObserver;
  private _performActionListener: EventListener;
  private _pointerDownListener: EventListener;
  private _pointerMoveListener: EventListener;
  private _pointerUpListener: EventListener;
  private _pointerCancelListener: EventListener;
  private _contextRestoredListener = (): void => this._onContextRestored();
  private _loadingEl?: HTMLElement;
  private _pausedEl?: HTMLElement; // paused preview of the card editor: its last picture
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
  private _shadowStatus?: {
    budget: number;
    lights: number;
    dropped: number[];
    extralightmode: boolean;
    textures: number; // texture units of the richest material of the model (see _materialTextures)
    material: string;
  };
  private _textureUnits?: { units: number; material: string };
  private _modelCenter?: THREE.Vector3;
  private _modelRadius?: number;
  private _colorDeps?: HassEntity[];
  private _alarmPulse = false; // alarm triggered with something open: the openings blink
  private _roomAlarms = false; // a room or an object of type alarm blinks: an alarm is on
  private _card?: HTMLElement;
  private _content?: HTMLElement;
  private _modeltype?: ModelSource;
  private _config!: Floor3dCardConfig;
  private _object_ids?: Floor3dCardConfig[] = [];
  private _isVisible = true;
  // Set by Home Assistant's hui-card (2024+): layout of the hosting view ('panel', 'grid', ...).
  @property({ attribute: false }) public layout?: string;
  @property({ attribute: false }) public isPanel?: boolean;
  @property({ attribute: false }) public editMode?: boolean;
  // Set by Home Assistant on the card shown next to the card editor, and on every card of a dashboard
  // in edit mode: see _isEditorPreview.
  @property({ attribute: false }) public preview?: boolean;
  private _wasEditorPreview?: boolean;
  // Editor of the card (only in the preview): a tap picks an object, and some objects are highlighted.
  private _pickMode = false;
  private _highlightHelpers: THREE.Object3D[] = [];
  private _editorListener = (ev: Event): void => this._onEditor((ev as CustomEvent).detail);
  private _intersectionObserver?: IntersectionObserver;
  private _info?: string[];
  private _zoommenu?: HTMLElement;
  private _renderPending?: boolean;
  private _missingLogged?: { [entity: string]: boolean };
  private _overlay: HTMLDivElement;
  private _hass?: HomeAssistant;
  private _position: number[];
  private _card_id: string;
  _helper: THREE.DirectionalLightHelper;
  private _modelready: boolean;

  constructor() {
    super();

    this._tap = null;
    this._initialobjectmaterials = {};
    this._selectedobjects = [];

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
      this._rememberCamera();
    };
    // The user moved the camera: the views menu no longer shows where the camera is.
    this._controlsStartListener = () => {
      this._stopCameraTweens();
      if (this._zoomSelect) this._zoomSelect.value = '';
    };
    this._card_id = 'ha-card-1';
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
      this._startOrStopAnimationLoop();

      if (this._ispanel() || this._issidebar()) {
        this._resizeCanvas();
      }
      // The page may have been navigated to another view while the card was not shown.
      this._applyUrlView(false);
      this._boxes.subscribeWeather();
      this._boxes.connect();
      this._renderBoxes(true); // the pictures of the cameras start again
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

    this._cancelTap();
    this._boxes.disconnect();
    this._cameras.disconnect();
    // The preview going away while the editor is paused (Home Assistant replaces it at every change
    // of the config): the next one shows its last picture, with the camera where it was.
    if (previewState.paused && this._modelready && this._isEditorPreview()) this._snapshot();
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

  // The configuration of a card added from the card picker of Home Assistant: the folder the editor
  // suggests and no model yet, so the card says what to set (see _showNoModel). Before 2.12.2 it
  // was the example of the original card, a home.glb and objects that nobody has, and the new card
  // showed an error.
  public static getStubConfig(): object {
    return { path: '/local/floor3d/', objfile: '' };
  }

  public setConfig(config: Floor3dCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration', config && config.language));
    }

    // Short forms (true/false, object_id strings in object_groups, missing options block) become
    // the long ones the rest of the card reads.
    this._config = normalizeConfig(config);
    // A card with only rooms (maps, alarms) may have no entities: the states were never read then,
    // so the rooms didn't change and the canvas kept its first size.
    if (!Array.isArray(this._config.entities)) this._config.entities = [];
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

    if (this._config.show_warning) {
      render(this._showWarning(this._t('show_warning')), this._card);
      return;
    }

    if (this._config.show_error) {
      render(this._showError(this._t('show_error')), this._card);
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
    this._shadowStatus = undefined;
    this._textureUnits = undefined;
    this._trackers.reset();
    this._env.reset();

    this._renderer.setAnimationLoop(null);
    this._resizeObserver.disconnect();

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
    // Without isPanel from Home Assistant (in the other views it doesn't pass it): the panel view in
    // the page structure.

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
    if (this._renderer) {
      return 10;
    } else {
      return 10;
    }
  }

  firstUpdated(): void {
    //called after the model has been loaded into the Renderer and first render

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
        if (this._isEditorPreview() && previewState.paused) this._showPausedPreview();
        else this.display3dmodel();
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
    }
  }

  private _render(): void {
    //render the model
    this._env.aimTorch();
    this._renderer.render(this._scene, this._camera);
    this._cameras.placePins();
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
      if (!tap.long && hit) this._toEditor({ picked: hit.object.name, ...this._pickedPoint(hit) });
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
        const details = ['camera', 'climate', 'alarm'].includes(entity.type3d); // the tap opens the entity
        if (entity.type3d == 'light' || entity.type3d == 'gesture' || details) {
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
              } else if (details) {
                // A camera shows its picture; a thermostat its temperature, to change it.
                fireEvent(this, 'hass-more-info', { entityId: entity.entity });
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
    if (!this._isEditorPreview()) return;
    window.dispatchEvent(new CustomEvent(PREVIEW_EVENT, { detail }));
  }

  // The card next to the card editor. Home Assistant sets preview on it, but also on every card of
  // the dashboard in edit mode (hui-view: element.preview = lovelace.editMode): those are inside a
  // view or a section, and must not answer the editor (they did, and "Use the current view" could
  // take the camera of the card behind the dialog) nor stay paused (after Save, the dashboard showed
  // "Preview paused"). Once disconnected, the answer of the last time it was connected.
  private _isEditorPreview(): boolean {
    if (!this.preview) return false;
    if (!this.isConnected) return !!this._wasEditorPreview;
    let node: any = this.parentNode || (this.getRootNode() as any).host;
    while (node) {
      if (DASHBOARD_TAGS.includes(node.nodeName)) {
        this._wasEditorPreview = false;
        return false;
      }
      node = node.parentNode || node.host;
    }
    this._wasEditorPreview = true;
    return true;
  }

  private _onEditor(detail: any): void {
    if (!detail || !this._isEditorPreview()) return;
    if (detail.request === 'objects' && this._modelready) {
      this._toEditor({ objects: this._modelObjectNames() });
      if (this._shadowStatus) this._toEditor({ shadows: this._shadowStatus });
    }
    if (detail.request === 'camera') {
      // A paused preview has no camera: where the camera of the last live preview was.
      if (this._camera && this._controls) this._toEditor({ camera: this._cameraView() });
      else if (previewState.camera) this._toEditor({ camera: previewState.camera.view });
    }
    if ('pick' in detail) {
      this._pickMode = !!detail.pick;
      if (this._renderer) this._renderer.domElement.style.cursor = this._pickMode ? 'crosshair' : '';
      // The icons of the cameras let the taps through to the model.
      this._cameras.setPicking(this._pickMode);
    }
    if ('highlight' in detail) this._setHighlight(detail.highlight || []);
    if (detail.request === 'snapshot') {
      // The preview is being paused: its picture stays on show in the cards created meanwhile.
      previewState.image = undefined;
      if (this._renderer && this._modelready) this._snapshot();
    }
    if (detail.request === 'reload' && this._renderer) {
      this.rerender();
    } else if (['reload', 'live', 'resume'].includes(detail.request) && this._pausedEl) {
      // The model, in place of the picture: to pick an object while the preview stays paused
      // (live), or because the pause ended (resume, reload).
      this._pausedEl.remove();
      this._pausedEl = undefined;
      this.display3dmodel();
    }
  }

  // The point of the model that was tapped, to place a camera there, and its level when the model has
  // more than one.
  private _pickedPoint(hit: THREE.Intersection): { point: number[]; level?: number } {
    this._bboxmodel.updateMatrixWorld(true);
    const p = this._bboxmodel.worldToLocal(hit.point.clone());
    const levels = (this._levels || []).filter((level) => level).length;
    const level = hit.object.userData ? hit.object.userData.level : undefined;
    return {
      point: [p.x, p.y, p.z].map((n) => Math.round(n)),
      ...(levels > 1 && level !== undefined ? { level } : {}),
    };
  }

  // The picture of the preview, kept for the cards created while it is paused.
  private _snapshot(): void {
    try {
      this._render(); // the drawing buffer can be read only in the task that draws it
      previewState.image = this._renderer.domElement.toDataURL('image/jpeg', 0.85);
    } catch {
      previewState.image = undefined;
    }
  }

  // Where the camera is, as the initial view and the views write it.
  private _cameraView(): { camera_position: any; camera_target: any; camera_rotate: any } {
    const { position, rotation } = this._camera;
    const target = this._controls.target;
    return {
      camera_position: { x: position.x, y: position.y, z: position.z },
      camera_target: { x: target.x, y: target.y, z: target.z },
      camera_rotate: { x: rotation.x, y: rotation.y, z: rotation.z },
    };
  }

  // The model and the initial view a remembered camera is for (see _rememberCamera).
  private _cameraKey(): string {
    const c = this._config;
    return JSON.stringify([c.path, c.objfile, c.camera_position, c.camera_target, c.camera_rotate]);
  }

  // The preview remembers where its camera is: Home Assistant creates the preview again at every
  // change of the configuration, and the new one went back to the initial view, so zoom and camera
  // had to be set again after each change (or each object picked). See _restoreCamera.
  private _rememberCamera(): void {
    if (!this._camera || !this._controls || !this._modelready || !this._isEditorPreview()) return;
    previewState.camera = { key: this._cameraKey(), view: this._cameraView() };
  }

  // A new preview goes back to the camera of the previous one, unless the initial view or the model
  // changed (then it shows the new initial view, as "Use the current view" does).
  private _restoreCamera(): void {
    const remembered = previewState.camera;
    if (!remembered || remembered.key !== this._cameraKey() || !this._isEditorPreview()) return;
    const { camera_position: p, camera_target: t } = remembered.view;
    this._camera.position.set(p.x, p.y, p.z);
    this._controls.target.set(t.x, t.y, t.z);
    this._controls.update();
    this._updateNearPlane();
  }

  // The preview of the card editor while it is paused (see preview.ts): the last picture of the
  // preview, or an empty box, with a label; the model loads when the editor asks for a reload.
  private _showPausedPreview(): void {
    const box = document.createElement('div');
    box.style.cssText = 'position: relative; width: 100%; min-height: 200px;';
    box.style.background =
      this._config.backgroundColor == 'sky' ? this._env.skyBackground() : this._config.backgroundColor || '#aaaaaa';
    if (previewState.image) {
      const img = document.createElement('img');
      img.src = previewState.image;
      img.alt = '';
      img.style.cssText = 'display: block; width: 100%;';
      box.appendChild(img);
    }
    const label = document.createElement('div');
    label.textContent = this._t('preview_paused');
    label.style.cssText =
      'position: absolute; top: 10px; left: 10px; padding: 6px 10px; border-radius: 8px; font-size: 14px;' +
      ' background: rgba(0, 0, 0, 0.55); color: white; border: 1px solid rgba(255, 255, 255, 0.6);';
    box.appendChild(label);
    this._content.appendChild(box);
    this._pausedEl = box;
    // The editor may be picking objects (those of a group, one tap after the other): it asks then
    // for the model.
    this._toEditor({ paused: true });
  }

  // An entity with objects of the model to act on (see createObjectGroupConfigArray): those without
  // are left out, the others go on. A tracker draws its own marker and needs none.
  private _hasObjects(entity: Floor3dCardConfig, i: number): boolean {
    return entity.type3d == 'tracker' || !!(this._object_ids[i] && this._object_ids[i].objects.length);
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

  // The objects of the model that ids name: plain names, names with * and groups <name>.
  private _objectNamesFor(ids: string[]): string[] {
    const names = new Set<string>();
    const modelNames = this._modelObjectNames();
    const add = (id: string) => matchObjects(String(id), modelNames).forEach((name) => names.add(name));
    ids.forEach((id) => {
      const group = /^<(.*)>$/.exec(String(id));
      if (!group) add(id);
      else {
        const found = (this._config.object_groups || []).find((g) => g.object_group === group[1]);
        ((found && found.objects) || []).forEach((o) => add(o.object_id));
      }
    });
    return Array.from(names);
  }

  // A box around each object (a group <name> stands for its objects), drawn over everything.
  private _setHighlight(ids: string[], color: number | string = 0x03a9f4): void {
    if (!this._scene) return;
    this._highlightHelpers.forEach((helper) => {
      this._scene.remove(helper);
      (helper as THREE.BoxHelper).geometry.dispose();
      ((helper as THREE.BoxHelper).material as THREE.Material).dispose();
    });
    this._highlightHelpers = [];
    this._objectNamesFor(ids).forEach((name) => {
      const object = this._scene.getObjectByName(name);
      if (!object) return;
      const helper = new THREE.BoxHelper(object, color);
      const material = helper.material as THREE.LineBasicMaterial;
      material.depthTest = false;
      material.transparent = true;
      helper.renderOrder = 999;
      this._scene.add(helper);
      this._highlightHelpers.push(helper);
    });
    if (this._renderer && this._camera) this._render();
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
    this._cameras.placePins();
    this._boxes.place();
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

  // The text of an info box: the state (with entity_template), or info.text, a template [[[ ]]] as
  // entity_template or a text where $entity is the state.
  private _infoText(entity: Floor3dCardConfig): string {
    const own = entity.info && entity.info.text ? String(entity.info.text).trim() : '';
    if (!own) return this._statewithtemplate(entity);
    if (own.startsWith('[[[') && own.endsWith(']]]'))
      return this._statewithtemplate({ ...entity, entity_template: own });
    const stateObj = this._hass.states[entity.entity];
    return own.replace(/\$entity/g, stateObj ? stateObj.state : '');
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
          this._rooms = [];
          this._sprites = [];
          this._canvas = [];
          this._text = [];
          this._spritetext = [];
          this._position = [];
          this._info = [];
          this._showers.reset();
          this._screens.reset();
          this._lamps.prepare();

          this._config.entities.forEach((entity) => {
            if (hass.states[entity.entity]) {
              this._states.push(this._statewithtemplate(entity));
              this._canvas.push(null);
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
                this._info.push(this._infoText(entity));
                // A text of its own (info.text) has its unit in it, if it wants one.
                if (entity.info && entity.info.text)
                  this._unit_of_measurement[this._unit_of_measurement.length - 1] = '';
              } else {
                this._info.push('');
              }
              this._position.push(entity.type3d == 'cover' ? this._coverPosition(hass.states[entity.entity]) : null);
            } else {
              console.warn('floor3d-card: entity <' + entity.entity + '> not found');
              // Every array is read by the position of the entity in the config: keep them aligned.
              this._states.push('');
              this._canvas.push(null);
              this._unit_of_measurement.push('');
              this._text.push('');
              this._spritetext.push('');
              this._rooms.push('');
              this._sprites.push('');
              this._info.push('');
              this._position.push(null);
            }
          });
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
            if (hass.states[entity.entity] && this._hasObjects(entity, i)) {
              let state = this._statewithtemplate(entity);
              const handler = this._entityTypes[entity.type3d];
              if (handler && handler.refresh) {
                if (handler.refresh(entity, i, state)) torerender = true;
              } else if (this._states[i] !== state) {
                this._states[i] = state;
              }
            } else {
              if (!this._missingLogged) this._missingLogged = {};
              if (entity.entity && !this._missingLogged[entity.entity]) {
                this._missingLogged[entity.entity] = true;
                console.warn('floor3d-card: entity <' + entity.entity + '> not found');
              }
            }
          });
          this._env.update();
          this._boxes.subscribeWeather();
          this._renderBoxes();
          this._updateStateColors();
          if (torerender) {
            this._render();
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw new Error('Error in hass: ' + e);
    }
  }

  protected display3dmodel(): void {
    //load the model into the GL Renderer

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

    this._renderer.domElement.style.width = '100%';
    this._renderer.domElement.style.height = '100%';
    this._renderer.domElement.style.display = 'block';
    this._renderer.domElement.addEventListener('webglcontextrestored', this._contextRestoredListener);

    // transparent: the card shows through; sky: a gradient behind the canvas that follows the sun.
    if (this._config.backgroundColor == 'transparent' || this._config.backgroundColor == 'sky') {
      this._renderer.setClearColor(0x000000, 0);
      this._env.updateSkyBackground(true);
    } else {
      this._scene.background = new THREE.Color(this._config.backgroundColor || '#aaaaaa');
    }

    // Colours in sRGB with light computed in linear space (three.js default since 0.152); the tone
    // mapping rolls off the highlights instead of clipping them.
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.toneMapping = TONE_MAPPINGS[this._config.tone_mapping] ?? THREE.NeutralToneMapping;
    this._renderer.toneMappingExposure = this._num(this._config.exposure, 1);
    this._renderer.localClippingEnabled = true;

    if (!this._config.path || !this._config.objfile) {
      this._showNoModel();
      return;
    }
    let path = this._config.path;
    const lastChar = path.charAt(path.length - 1);
    if (lastChar == '.') {
      path = '';
    } else if (lastChar != '/') {
      path = path + '/';
    }

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
  }

  // A .glb model, also one compressed with Draco or meshopt (gltf-transform draco / meshopt, 5 to 10
  // times smaller). The file is read first, and the decoder it needs is loaded only then: meshopt
  // from a chunk of the card, Draco from the files that come with the card, or from
  // draco_decoder_path when set. Idea from Steven-D-Morgan/hass-3d-floorplan.
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
            let decoderPath = this._config.draco_decoder_path;
            if (decoderPath && !decoderPath.endsWith('/')) decoderPath += '/';
            const dracoLoader = new DRACOLoader().setDecoderPath(decoderPath || DRACO_DECODER);
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
      (bytes / 1048576).toLocaleString(this._language(), { minimumFractionDigits: 1, maximumFractionDigits: 1 });
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

  // A card without its model yet (just added from the card picker, or path or objfile left empty):
  // where to set it, in place of the loading screen.
  private _showNoModel(): void {
    if (!this._content) return;
    const el = this._loadingScreen();
    el.classList.remove('error');
    el.classList.add('setup');
    el.querySelector('path').setAttribute('d', mdiCubeOutline);
    el.querySelector('.f3d-title').textContent = this._t('no_model');
    el.querySelector('.f3d-detail').textContent = this._t('no_model_detail');
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
      // Shadow maps are redrawn only when something changes, and only for the lights that are on
      // (see _invalidateShadows). PCF with a radius gives the soft edges PCFSoftShadowMap gave.
      this._renderer.shadowMap.enabled = true;
      this._renderer.shadowMap.type = THREE.PCFShadowMap;
      this._renderer.shadowMap.autoUpdate = false;
    } else {
      this._renderer.shadowMap.enabled = false;
    }

    this._expandObjectPatterns();
    this._add3dObjects();

    if (this._content && this._renderer) {
      this._modelready = true;
      this._toEditor({ objects: this._modelObjectNames() });
      this._levelbar = document.createElement('div');
      this._zoombar = document.createElement('div');
      this._selectionbar = document.createElement('div');
      this._content.innerText = '';
      this._content.appendChild(this._levelbar);
      this._content.appendChild(this._zoombar);
      this._content.appendChild(this._selectionbar);
      this._content.appendChild(this._renderer.domElement);

      render(this._getSelectionBar(), this._selectionbar);

      this._addInputListeners();

      this._setCamera();
      this._placeInfoSprites();

      this._controls = new OrbitControls(this._camera, this._renderer.domElement);

      // Phones report 3x or more: 9 times the pixels of 1x for a difference hard to see.
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._num(this._config.max_pixel_ratio, 2)));

      this._controls.maxPolarAngle = (0.85 * Math.PI) / 2;
      this._controls.addEventListener('change', this._changeListener);
      this._controls.addEventListener('start', this._controlsStartListener);

      this._setLookAt();

      this._controls.update();
      this._updateNearPlane();
      this._computeModelBounds();

      if (this._config.lock_camera == 'yes') {
        this._controls.enabled = false;
      }

      this._env.init();

      this._applyShadowBudget();

      this._roomMaps.init();

      this._getOverlay();

      this._manageZoom();
      this._renderMenus();
      this._updateStateColors(true);

      this._setVisibleLevel(this._viewLevel(this._config.initialLevel));

      this._urlView = undefined; // a new model: the view of the page applies again
      this._applyUrlView(false);
      this._restoreCamera();
      this._rememberCamera();
      this._boxes.subscribeWeather();
      this._renderBoxes(true);

      this._resizeCanvas();

      if (this._ispanel() || this._issidebar()) {
        this._resizeObserver.observe(this._card);
      }
    }
  }

  private _initobjects(object: THREE.Object3D) {
    let level = 0;
    this._levels = [];
    this._levelMiddles = undefined;
    this._raycasting = [];
    this._raycastinglevels = [];
    //TODO: explore solution with layers

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
  }

  // The level of a view or of initialLevel: -1 (all the levels) when it is empty.
  private _viewLevel(level: unknown): number {
    const n = level === undefined || level === null || String(level).trim() === '' ? NaN : Number(level);
    return Number.isInteger(n) && n >= 0 ? n : -1;
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
    this._showWithLevels();
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
    this._showWithLevels();
  }

  // Shows the levels for which shown(level) is true and hides the others; false when nothing changed.
  private _applyLevels(shown: (level: number) => boolean): boolean {
    let changed = false;
    this._levels.forEach((element, i) => {
      const visible = shown(i);
      if (this._displaylevels[i] !== visible) changed = true;
      this._displaylevels[i] = visible;
      element.visible = visible;
    });
    if (!changed) return false;
    this._updateRaycasting();
    this._showWithLevels();
    if (this._levelbar) render(this._getLevelBar(), this._levelbar);
    this._scheduleRender();
    return true;
  }

  // The levels of some objects and those under them shown, the levels above hidden, so that the
  // objects can be seen (#28). A level is above when the middle of its height is higher than the
  // middle of the highest of their levels: the rule of the ground (see _showWithLevels), so that the
  // stairs of a basement that reach the ground floor don't make it a level above.
  private _levelsUpTo(levels: number[]): void {
    if (!this._displaylevels || !this._levels || this._levels.length < 2 || !levels.length) return;
    const middles = this._middles();
    const top = Math.max(...levels.map((level) => middles[level] ?? -Infinity));
    this._applyLevels((i) => levels.includes(i) || middles[i] <= top);
  }

  // The middle of the height of each level (-Infinity for an empty one), computed once per model.
  private _middles(): number[] {
    if (!this._levelMiddles) {
      this._levelMiddles = this._levels.map((level) => {
        const box = level ? new THREE.Box3().setFromObject(level) : null;
        return box && !box.isEmpty() ? (box.min.y + box.max.y) / 2 : -Infinity;
      });
    }
    return this._levelMiddles;
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
        <button class="f3d-bar-button" .index=${-1} @click=${this._handleZoomClick.bind(this)}>
          ${this._t('reset')}
        </button>
      </div>
    `);

    this._zoom.forEach((element, index) => {
      if (element) {
        iconArray.push(html`
          <div class="row" style="background-color:black;">
            <button class="f3d-bar-button" .index=${index} @click=${this._handleZoomClick.bind(this)}>
              ${element.name}
            </button>
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

  // Shows a view (zoom area); -1 is the initial view. With animate the camera flies there. The
  // levels follow: the level of the view, or all of them when it has none; the initial view shows
  // initialLevel again.
  private _goToView(index: number, animate = true): void {
    if (index == -1) {
      this._setVisibleLevel(this._viewLevel(this._config.initialLevel));
      if (animate && this._config.camera_position && this._config.camera_target) {
        this._flyTo(this._config.camera_position, this._config.camera_target);
      } else {
        this._stopCameraTweens();
        this._setCamera();
        this._setLookAt();
        this._controls.update();
        this._render();
      }
      return;
    }
    const zoom = this._zoom[index];
    if (!zoom) return;
    this._setVisibleLevel(this._viewLevel(zoom.level));
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

  // The language of the card (see pickLanguage): its language option, else the one of the user.
  private _language(): string {
    return pickLanguage(
      this._config && this._config.language,
      this._hass && this._hass.locale && this._hass.locale.language,
      this._hass && this._hass.language,
    );
  }

  private _t(key: string, vars: { [name: string]: string | number } = {}): string {
    return localize('common.' + key, this._language(), vars);
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
          <button class="f3d-bar-button" @click=${this._handleClearSelectionsClick.bind(this)}>
            ${this._t('clear_selections', { count: this._selectedobjects.length })}
          </button>
        </div>
      `);

      buttonArray.push(html`
        <div class="row" style="background-color:black;">
          <button class="f3d-bar-button" @click=${this._handleToggleSelectionMode.bind(this)}>
            ${this._t(this._selectionModeEnabled ? 'disable_selection' : 'enable_selection')}
          </button>
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
    render(this._getSelectionBar(), this._selectionbar);
  }

  private _handleToggleSelectionMode(ev): void {
    ev.stopPropagation();
    this._selectionModeEnabled = !this._selectionModeEnabled;
    this._setSelectionMaterials(this._selectionModeEnabled);
    render(this._getSelectionBar(), this._selectionbar);
  }

  // The buttons of the views (hideZoomMenu: yes) jump to the view, the menu flies there.
  private _handleZoomClick(ev): void {
    ev.stopPropagation();
    this._goToView(ev.currentTarget.index, false);
  }

  private _handleLevelClick(ev): void {
    ev.stopPropagation();

    this._toggleVisibleLevel(ev.target.index);

    render(this._getLevelBar(), this._levelbar);

    this._render();
  }

  private _getOverlay(): void {
    if (this._config.overlay == 'yes') {
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
      } catch {
        // No z-index found up the page: the default below.
      }

      if (zindex) {
        overlay.style.setProperty('z-index', (Number(zindex) + 1).toString(10));
      } else {
        overlay.style.setProperty('z-index', '999');
      }

      (this._renderer.domElement.parentNode as HTMLElement).style.setProperty('position', 'relative');
      this._renderer.domElement.parentNode.appendChild(overlay);
      this._overlay = overlay;
    }
  }

  private _setCamera(): void {
    // The box of the model in its own coordinates: the initial view centres it as the loading did,
    // also once it is centred (the bottom was lifted again to the height it has in the file).
    const box: THREE.Box3 = new THREE.Box3()
      .setFromObject(this._bboxmodel)
      .translate(this._bboxmodel.position.clone().negate());

    this._bboxmodel.position.x = -(box.max.x - box.min.x) / 2;
    this._bboxmodel.position.y = -box.min.y;
    this._bboxmodel.position.z = -(box.max.z - box.min.z) / 2;
    this._placeCoverPlanes();

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

  private _onLoaded3DMaterials(materials: MTLLoader.MaterialCreator): void {
    // Materials Loaded Event: last root material passed to the function
    materials.preload();
    let path = this._config.path;
    const lastChar = path.substr(-1);
    if (lastChar != '/') {
      path = path + '/';
    }
    this._loadOBJ(path, materials);
  }

  // What the card does with the entities of each type3d: setup when the model is loaded, show once
  // all of them are set up, refresh when Home Assistant sends new states (true: something changed,
  // render again). The state of a type without refresh is kept (alarm and climate are tinted by
  // _updateStateColors, gesture and camera are read on a tap).
  private _entityTypes: { [type3d: string]: EntityHandler } = {
    light: this._lamps.handler,
    color: {
      setup: (_, i) => this._setupColor(i),
      show: (entity, i) => this._updatecolor(entity, i),
      refresh: this._onNewState((entity, i) => this._updatecolor(entity, i)),
    },
    hide: {
      show: (entity, i) => this._updatehide(entity, i),
      refresh: this._onNewState((entity, i) => this._updatehide(entity, i)),
    },
    show: {
      show: (entity, i) => this._updateshow(entity, i),
      refresh: this._onNewState((entity, i) => this._updateshow(entity, i)),
    },
    door: {
      setup: (entity, i) => this._setupDoor(entity, i),
      show: (entity, i) => this._updatedoor(entity, i),
      refresh: this._onNewState((entity, i) => this._updatedoor(entity, i)),
    },
    cover: {
      setup: (entity, i) => this._setupCover(entity, i),
      refresh: (entity, i, state) => this._refreshCover(entity, i, state),
    },
    text: {
      setup: (_, i) => this._setupText(i),
      show: (entity, i) => {
        this._canvas[i] = this._createTextCanvas(entity.text, this._text[i], this._unit_of_measurement[i]);
        this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
      },
      refresh: (entity, i) => this._refreshText(entity, i),
    },
    rotate: {
      setup: (entity, i) => this._setupRotate(entity, i),
      show: (entity, i) => this._rotatecalc(entity, i),
      refresh: (entity, i, state) => this._refreshRotate(entity, i, state),
    },
    room: {
      show: (entity, i) => {
        this._createroom(entity, i);
        this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
      },
      refresh: this._onNewState((entity, i) => this._refreshRoom(entity, i)),
    },
    info: {
      setup: (entity, i) => this._setupInfo(entity, i),
      show: (entity, i) => this._updateinfo(entity, this._info[i], this._unit_of_measurement[i], i),
      refresh: (entity, i, state) => this._refreshInfo(entity, i, state),
    },
    shower: this._showers.handler,
    tracker: this._trackers.handler,
    image: this._screens.handler,
  };

  // The refresh of a type whose objects follow only the state (see entity-types.ts).
  private _onNewState(apply: (entity: Floor3dCardConfig, i: number) => boolean | void): EntityHandler['refresh'] {
    return onNewState(this._entityHost(), apply);
  }

  // What the modules of the entity types read of the card.
  private _entityHost(): EntityHost {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const card = this;
    return {
      get config() {
        return card._config;
      },
      get hass() {
        return card._hass;
      },
      get scene() {
        return card._scene;
      },
      get model() {
        return card._bboxmodel;
      },
      get objectIds() {
        return card._object_ids;
      },
      get states() {
        return card._states;
      },
      num: (value, fallback) => card._num(value, fallback),
      scheduleRender: () => card._scheduleRender(),
      animate: () => card._startOrStopAnimationLoop(),
      get levels() {
        return card._levels;
      },
      render: () => card._render(),
      enableShadow: (light, bias) => card._enableShadow(light, bias),
      refreshLightShadow: (light) => card._refreshLightShadow(light as ShadowLight),
      manageLightShadows: (light) => card._manage_light_shadows(light),
    };
  }

  private _add3dObjects(): void {
    try {
      // Add-Modify the objects bound to the entities in the card config
      if (this._states && this._config.entities) {
        this._round_per_seconds = [];
        this._axis_to_rotate = [];
        this._rotation_state = [];
        this._rotation_speed = [];
        this._rotation_ramp = [];
        this._rotation_index = [];
        this._rotation_angle = [];
        this._rotation_turned = [];
        this._rotation_wrap = [];
        this._rotation_objects = [];
        this._pivot = [];
        this._axis_for_door = [];
        this._degrees = [];
        this._slidingdoor = [];
        this._objposition = [];
        this._slidingdoorposition = [];
        this._coverPlanes = [];
        this._slatTweens.forEach((tween) => tween.stop());
        this._slatTweens.clear();
        this._slatSets.clear();
        this._slatAngles.clear();
        this._tilts.clear();
        this._paneSizes.clear();
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
            if (this._hass.states[entity.entity] && this._hasObjects(entity, i)) {
              const handler = this._entityTypes[entity.type3d];
              if (handler && handler.setup) handler.setup(entity, i);
            }
          } catch (error) {
            // An entity set up wrongly (a door without its type, for example) is left out and the
            // rest of the model is shown. The card editor makes such entities while they are filled in.
            console.warn('floor3d-card: entity <' + entity.entity + '> left out: ' + error);
          }
        });
        this._config.entities.forEach((entity, i) => {
          if (entity.entity === '' || !this._hasObjects(entity, i)) return;
          try {
            const handler = this._entityTypes[entity.type3d];
            if (handler && handler.show) handler.show(entity, i);
          } catch (error) {
            console.warn('floor3d-card: entity <' + entity.entity + '> not updated: ' + error);
          }
        });
      }
    } catch (e) {
      console.error(e);
      throw new Error('Error adding 3D Object: ' + e);
    }
  }

  // rotate: the speed of each rotating entity, and the objects turned around the middle of the hinge.
  private _setupRotate(entity: Floor3dCardConfig, i: number): void {
    // Empty (only a sensor sets the speed): 1, as NaN made the object vanish.
    this._round_per_seconds.push(this._num(entity.rotate.round_per_second, 1));
    this._axis_to_rotate.push(entity.rotate.axis);
    this._rotation_state.push(0);
    this._rotation_speed.push(0);
    this._rotation_ramp.push(Math.max(0, this._num(entity.rotate.ramp, ROTATE_RAMP)));
    this._rotation_index.push(i);
    this._rotation_angle.push(null);
    this._rotation_turned.push(null);
    this._rotation_wrap.push(false);
    this._rotation_objects.push([]);
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
      const _obj: any = this._scene.getObjectByName(element.object_id);
      if (!_obj) return;
      this._pivotObject(_obj, this._pivot[i]);
      _obj.userData.f3dRotationBase = _obj.rotation[entity.rotate.axis] || 0; // the angle 0 of angle_entity
      this._rotation_objects[this._rotation_objects.length - 1].push(_obj);
    });
  }

  // door: the hinge of a swing door, the axis and the angle it opens by; a sliding door slides from the
  // corner of its box.
  private _setupDoor(entity: Floor3dCardConfig, i: number): void {
    if (entity.door.doortype != 'swing' && entity.door.doortype != 'slide') {
      throw new Error('Invalid door type: ' + entity.door.doortype + '. Valid types are: swing, slide');
    }

    if (entity.door.doortype == 'swing') {
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

      // Around the hinge, in the frame of each object (see _pivotObject).
      this._object_ids[i].objects.forEach((element) => {
        const _obj = this._scene.getObjectByName(element.object_id);
        if (_obj) this._pivotObject(_obj, this._pivot[i]);
      });
    }
    if (entity.door.doortype == 'slide') {
      this._object_ids[i].objects.forEach((element) => {
        const _obj = this._scene.getObjectByName(element.object_id);
        if (!_obj) return;
        // From the corner of its box, where it is when closed (see _pivotObject).
        this._pivotObject(_obj, new THREE.Box3().setFromObject(_obj).min);
        this._slidingdoorposition[i].push(_obj.position.clone());
      });
    }
  }

  // cover: the panes slide or shrink from the corner of their box, cut by a plane at the edge they go to;
  // then the slats, and the position of the cover now.
  private _setupCover(entity: Floor3dCardConfig, i: number): void {
    // Without pane the first object is the pane, as in _updatecover. Before, such a cover
    // was not set up and its first update stopped every other update of the card.
    const pane: THREE.Mesh = (this._scene.getObjectByName(entity.cover.pane) ||
      this._scene.getObjectByName(this._object_ids[i].objects[0]?.object_id)) as THREE.Mesh;

    if (pane) {
      this._object_ids[i].objects.forEach((element) => {
        const _obj = this._scene.getObjectByName(element.object_id);
        if (!_obj) return;
        // From the corner of its box: a roller shade shortens toward it (see _pivotObject).
        this._pivotObject(_obj, new THREE.Box3().setFromObject(_obj).min);
        this._slidingdoorposition[i].push(_obj.position.clone());
      });

      const boxpane: THREE.Box3 = new THREE.Box3().setFromObject(pane);
      this._paneSizes.set(i, boxpane.getSize(new THREE.Vector3()));

      // motion: slide (the pane slides into its box, hidden past the edge of the side it
      // goes to), shrink (it gets shorter toward that side) or none (only the slats turn).
      if ((entity.cover.motion || 'slide') == 'slide') {
        // The plane is kept in the space of the model too: the model is centred after
        // this, and the plane moves with it (_placeCoverPlanes).
        const coverplane = this._coverPlane(boxpane, entity.cover.side);
        const clipPlanes = coverplane ? [coverplane] : [];
        if (coverplane) {
          this._bboxmodel.updateMatrixWorld(true);
          const local = coverplane.clone().applyMatrix4(this._bboxmodel.matrixWorld.clone().invert());
          this._coverPlanes.push({ local, world: coverplane });
        }
        // The materials of a cover are its own: a GLB model can share them with other
        // objects, which the plane would cut too. The shadows are cut the same way.
        this._object_ids[i].objects.forEach((element) => {
          const _obj = this._scene.getObjectByName(element.object_id) as THREE.Mesh;
          if (!_obj || !_obj.material) return;
          const own = (m: THREE.Material) => {
            const copy = m.clone();
            copy.clippingPlanes = clipPlanes;
            copy.clipShadows = this._config.shadow == 'yes';
            return copy;
          };
          _obj.material = Array.isArray(_obj.material) ? _obj.material.map(own) : own(_obj.material);
        });
      }

      this._initSlats(entity, i);
      this._updatecover(entity, this._states[i], i);
      this._updateSlats(entity, i, false);
    }
  }

  // color: the materials of the objects, kept to go back to them, and copies to colour.
  private _setupColor(i: number): void {
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

  // text: a copy of each object, to write on.
  private _setupText(i: number): void {
    // Clone object to print the text
    this._object_ids[i].objects.forEach((element) => {
      let _foundobject: any = this._scene.getObjectByName(element.object_id);

      let box: THREE.Box3 = new THREE.Box3();
      box.setFromObject(_foundobject);

      let _newobject = _foundobject.clone();

      //(_newobject as Mesh).scale.set(1.005, 1.005, 1.005);
      _newobject.name = 'f3dobj_' + _foundobject.name;
      this._levels[_foundobject.userData.level].add(_newobject);
    });
  }

  // info: the sprite with the text of the box, over its object or at its own position.
  private _setupInfo(entity: Floor3dCardConfig, i: number): void {
    const sprite = new THREE.Sprite();
    sprite.name = entity.object_id + '_info';
    this._sprites[i] = sprite.name;
    // The font and the colours are in the info block, as in _updateinfo.
    const info = entity.info || {};
    this._canvas[i] = this._createTextCanvas(info, this._info[i], this._unit_of_measurement[i]);
    const size = info.size ? info.size : 100;
    const aspect = this._canvas[i].width / this._canvas[i].height;
    sprite.scale.set(size * aspect, size, 1);
    // The box hides with the level of its object, also when it has a position of its own.
    const object = entity.object_id ? this._scene.getObjectByName(entity.object_id) : undefined;
    if (object && object.userData.level !== undefined) sprite.userData.level = object.userData.level;
    const position = point(info.position);
    if (position) {
      // A point of the scene, as the camera_position.
      sprite.position.set(...position);
    } else if (object) {
      // Over its object once the model is centred (_placeInfoSprites): the model isn't yet.
      sprite.userData.above = object.name;
    }
    this._scene.add(sprite);
  }

  // A new state or position of a cover, a new tilt of its slats.
  private _refreshCover(entity: Floor3dCardConfig, i: number, state: string): boolean {
    let changed = false;
    // Both can change: the position while the cover moves, the state when it starts or stops.
    const position = this._coverPosition(this._hass.states[entity.entity]);
    if (state != this._states[i] || position !== this._position[i]) {
      this._states[i] = state;
      this._position[i] = position;
      this._updatecover(entity, state, i);
      changed = true;
    }
    if (this._slatSets.has(i) && this._coverTilt(this._hass.states[entity.entity]) !== this._tilts.get(i)) {
      this._updateSlats(entity, i);
      changed = true;
    }
    return changed;
  }

  // A new text, from the state (with entity_template) or from an attribute.
  private _refreshText(entity: Floor3dCardConfig, i: number): boolean {
    let toupdate = false;
    if (entity.text.attribute) {
      if (this._hass.states[entity.entity].attributes[entity.text.attribute]) {
        if (this._text[i] != this._hass.states[entity.entity].attributes[entity.text.attribute]) {
          this._text[i] = this._hass.states[entity.entity].attributes[entity.text.attribute];
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
    if (!this._canvas[i] || !toupdate) return false;
    this._updatetext(entity, this._text[i], this._canvas[i], this._unit_of_measurement[i]);
    return true;
  }

  // A new text or unit of an info box.
  private _refreshInfo(entity: Floor3dCardConfig, i: number, state: string): boolean {
    // The box follows the state (before 2.11.4 it kept the one of the opening of the card).
    this._states[i] = state;
    const text = this._infoText(entity);
    const own = entity.info && entity.info.text;
    const uom = own ? '' : String(this._hass.states[entity.entity].attributes['unit_of_measurement'] || '');
    if (text === this._info[i] && uom === this._unit_of_measurement[i]) return false;
    this._info[i] = text;
    this._unit_of_measurement[i] = uom;
    this._updateinfo(entity, text, uom, i);
    return true;
  }

  // The speed or the angle of a rotating object.
  private _refreshRotate(entity: Floor3dCardConfig, i: number, state: string): boolean {
    this._states[i] = state;
    this._rotatecalc(entity, i);
    return false;
  }

  // A new label of a room (type3d: room), from the state or an attribute.
  private _refreshRoom(entity: Floor3dCardConfig, i: number): boolean {
    let toupdate = false;
    if (entity.room.attribute) {
      if (this._hass.states[entity.entity].attributes[entity.room.attribute]) {
        if (this._spritetext[i] != this._hass.states[entity.entity].attributes[entity.room.attribute]) {
          this._spritetext[i] = this._hass.states[entity.entity].attributes[entity.room.attribute];
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

    if (!this._canvas[i] || !toupdate) return false;
    this._updateroom(entity, this._spritetext[i], this._unit_of_measurement[i], i);
    this._updateroomcolor(entity, i);
    return true;
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

          const meshPosition = oldRoomBox.min.clone();
          // move new mesh center so it's aligned with the original object
          meshPosition.y += 2;
          meshPosition.x += 2;
          meshPosition.z += 2;

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

          this._levels[_roomMesh.userData.level].add(newSprite);
          this._levels[_roomMesh.userData.level].add(newRoomMesh);

          newRoomBox = new THREE.Box3().setFromObject(newRoomMesh);
          this._centerobjecttopivot(newRoomMesh, newRoomBox.min);
          newRoomMesh.geometry.applyMatrix4(
            new THREE.Matrix4().makeTranslation(-newRoomBox.min.x, -newRoomBox.min.y, -newRoomBox.min.z),
          );

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
      sprite.visible = this._levelShown(sprite.userData.level);
    }
  }

  // A level shown now (undefined: no level, always shown).
  private _levelShown(level: number | undefined): boolean {
    return level === undefined || !this._displaylevels || this._displaylevels[level] !== false;
  }

  // The boxes of the info type without a position of their own: over the middle of their object, now
  // that the model is centred (_setCamera), at size / 2 + 10 above its top.
  private _placeInfoSprites(): void {
    this._bboxmodel.updateMatrixWorld(true);
    (this._sprites || []).forEach((name, i) => {
      const sprite =
        name && this._config.entities[i] && this._config.entities[i].type3d == 'info'
          ? this._scene.getObjectByName(name)
          : undefined;
      const object = sprite && sprite.userData.above ? this._scene.getObjectByName(sprite.userData.above) : undefined;
      if (!object) return;
      const box = new THREE.Box3().setFromObject(object);
      if (box.isEmpty()) return;
      box.getCenter(sprite.position);
      sprite.position.y = box.max.y + sprite.scale.y / 2 + 10;
    });
  }

  // What follows the levels shown: the boxes of the info type, and the ground, which opens over the
  // levels under it when only those are shown (a basement under ground_floor_level), so that they can
  // be seen with the ground around the house (until 2.12.1 all of it hid). A level is under the
  // ground when the middle of its height is: in 2.11.3 its top had to be, and the stairs or the walls
  // of a basement that reach a little above the ground kept the ground over it.
  private _showWithLevels(): void {
    (this._sprites || []).forEach((name, i) => {
      const sprite =
        name && this._config.entities[i] && this._config.entities[i].type3d == 'info'
          ? this._scene.getObjectByName(name)
          : undefined;
      if (sprite) sprite.visible = this._levelShown(sprite.userData.level);
    });
    this._env.followLevels(this._levels, (level) => this._levelShown(level));
  }

  private _updatecover(item: Floor3dCardConfig, state: string, i: number): void {
    let pane = this._scene.getObjectByName(item.cover.pane);

    if (!pane) {
      pane = this._scene.getObjectByName(this._object_ids[i].objects[0].object_id);
    }
    // A cover that reports current_position is drawn there, also while it is opening or closing
    // (0 is closed); the others are fully open or fully closed.
    const percentage = this._position[i] != null ? this._position[i] : this._isOpen(state) ? 100 : 0;
    const motion = item.cover.motion || 'slide';
    if (motion == 'none') return;
    if (motion == 'shrink') this._shrinkcover(pane, percentage, item.cover.side, i);
    else this._translatedoor(pane, percentage, item.cover.side, i, percentage > 0 ? 'open' : 'closed');
    // Shadows follow the tween in the animation loop.
  }

  // The model moved (it is centred once loaded): the planes of the sliding covers go with it.
  // Before, they stayed where the model was before, which cut the covers in the wrong place.
  private _placeCoverPlanes(): void {
    if (!this._bboxmodel || !this._coverPlanes.length) return;
    this._bboxmodel.updateMatrixWorld(true);
    this._coverPlanes.forEach(({ local, world }) => world.copy(local).applyMatrix4(this._bboxmodel.matrixWorld));
  }

  // The plane that hides a sliding cover past the edge of its side: what is beyond is cut.
  private _coverPlane(box: THREE.Box3, side: string): THREE.Plane | null {
    const alongX = box.max.x - box.min.x > box.max.z - box.min.z;
    switch (side) {
      case 'up':
        return new THREE.Plane(new THREE.Vector3(0, -1, 0), box.max.y);
      case 'down':
        return new THREE.Plane(new THREE.Vector3(0, 1, 0), -box.min.y);
      case 'left':
        return alongX
          ? new THREE.Plane(new THREE.Vector3(1, 0, 0), -box.min.x)
          : new THREE.Plane(new THREE.Vector3(0, 0, 1), -box.min.z);
      case 'right':
        return alongX
          ? new THREE.Plane(new THREE.Vector3(-1, 0, 0), box.max.x)
          : new THREE.Plane(new THREE.Vector3(0, 0, -1), box.max.z);
    }
    return null;
  }

  // motion: shrink. The pane gets shorter toward its side (a roller shade toward its roller, a
  // curtain toward its side), without sliding: no plane cuts it. The other objects of the cover
  // (a bottom bar, for example) follow its edge.
  private _shrinkcover(pane: THREE.Object3D, percentage: number, side: string, index: number): void {
    const size = this._paneSizes.get(index);
    const objects = this._object_ids[index].objects;
    const paneIndex = objects.findIndex((o) => o.object_id === pane.name);
    if (!size || paneIndex < 0) {
      this._translatedoor(pane, percentage, side, index, percentage > 0 ? 'open' : 'closed');
      return;
    }
    const share = Math.min(100, Math.max(0, percentage)) / 100;
    const scale = Math.max(1 - share, 0.001);
    const axis: 'x' | 'y' | 'z' = side == 'up' || side == 'down' ? 'y' : size.x > size.z ? 'x' : 'z';
    const sign = side == 'up' || side == 'right' ? 1 : -1;
    const shift = sign * size[axis] * share; // where the free edge goes
    objects.forEach((element, k) => {
      const object = this._scene.getObjectByName(element.object_id);
      const original = this._slidingdoorposition[index][k];
      if (!object || !original) return;
      const position = original.clone();
      if (k === paneIndex) {
        // Scaled from the edge on its side: the far one for up and right, its origin otherwise.
        if (sign > 0) position[axis] += size[axis] * (1 - scale);
        const targetScale = { x: 1, y: 1, z: 1 };
        targetScale[axis] = scale;
        new TWEEN.Tween(object.scale)
          .to(targetScale, 1200)
          .easing(TWEEN.Easing.Cubic.InOut)
          .onComplete(() => this._startOrStopAnimationLoop())
          .start();
      } else position[axis] += shift;
      if (position.equals(object.position)) return;
      new TWEEN.Tween(object.position)
        .to({ x: position.x, y: position.y, z: position.z }, 1200)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onComplete(() => this._startOrStopAnimationLoop())
        .start();
    });
    this._startOrStopAnimationLoop();
  }

  // cover.slats: the slats of the objects named there (a blind exported as one object included,
  // see slats.ts), each mesh with a geometry of its own and its first positions.
  private _initSlats(item: Floor3dCardConfig, i: number): void {
    const ids = item.cover && item.cover.slats;
    if (!ids) return;
    const sets: SlatSet[] = [];
    this._objectNamesFor(Array.isArray(ids) ? ids : [ids]).forEach((name) => {
      const object = this._scene.getObjectByName(name);
      if (!object) return;
      object.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const source = mesh.geometry as THREE.BufferGeometry;
        const position = source.getAttribute('position');
        if (!position || position.count > 500000) return;
        // Plain float copies (a GLB can interleave or quantize them, and share them with other objects).
        const plain = (attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute): Float32Array => {
          const array = new Float32Array(attribute.count * 3);
          for (let v = 0; v < attribute.count; v++) {
            array[3 * v] = attribute.getX(v);
            array[3 * v + 1] = attribute.getY(v);
            array[3 * v + 2] = attribute.getZ(v);
          }
          return array;
        };
        const positions = plain(position);
        const slats = findSlats(positions, source.index ? source.index.array : null);
        if (!slats.length) return;
        const geometry = source.clone();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
        const normal = source.getAttribute('normal');
        const normals = normal ? plain(normal) : undefined;
        if (normals) geometry.setAttribute('normal', new THREE.BufferAttribute(normals.slice(), 3));
        mesh.geometry = geometry;
        sets.push({ geometry, slats, positions, normals });
      });
    });
    if (sets.length) this._slatSets.set(i, sets);
    else
      console.warn(
        'floor3d-card: no slats found in <' + ids + '> (' + item.entity + '): each slat must be a separate piece',
      );
  }

  // The slats turn with current_tilt_position: tilt_closed degrees at 0, tilt_open at 100 (from
  // the model, 80 and 0 by default). Without the attribute they stay as in the model.
  private _updateSlats(item: Floor3dCardConfig, i: number, animate = true): void {
    const sets = this._slatSets.get(i);
    const stateObj = this._hass && this._hass.states[item.entity];
    if (!sets || !stateObj) return;
    const tilt = this._coverTilt(stateObj);
    this._tilts.set(i, tilt);
    if (tilt === null) return;
    const target = slatAngle(tilt, this._num(item.cover.tilt_closed, 80), this._num(item.cover.tilt_open, 0));
    const from = this._slatAngles.get(i) || 0;
    const running = this._slatTweens.get(i);
    if (running) running.stop();
    this._slatTweens.delete(i);
    if (target === from) return;
    const apply = (degrees: number) => {
      this._slatAngles.set(i, degrees);
      const angle = THREE.MathUtils.degToRad(degrees);
      sets.forEach(({ geometry, slats, positions, normals }) => {
        const position = geometry.getAttribute('position') as THREE.BufferAttribute;
        tiltSlats(slats, angle, positions, position.array as Float32Array);
        position.needsUpdate = true;
        const normal = geometry.getAttribute('normal') as THREE.BufferAttribute;
        if (normals && normal) {
          tiltSlats(slats, angle, normals, normal.array as Float32Array, true);
          normal.needsUpdate = true;
        }
        geometry.computeBoundingSphere();
        geometry.boundingBox = null;
      });
    };
    if (!animate) {
      apply(target);
      this._invalidateShadows();
      return;
    }
    const value = { angle: from };
    const tween = new TWEEN.Tween(value)
      .to({ angle: target }, 1200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => apply(value.angle))
      .onComplete(() => {
        this._slatTweens.delete(i);
        this._startOrStopAnimationLoop();
      })
      .start();
    this._slatTweens.set(i, tween);
    this._startOrStopAnimationLoop();
  }

  // current_tilt_position of a cover, null when the cover doesn't report it.
  private _coverTilt(stateObj: HassEntity): number | null {
    const tilt = stateObj.attributes['current_tilt_position'];
    if (tilt === undefined || tilt === null || tilt === '') return null;
    const n = Number(tilt);
    return isNaN(n) ? null : n;
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

  // The text on its object. mapping: flat (the default) lays it on the largest face of the object and
  // on the one opposite, readable from both sides, in the middle of the face with its proportions,
  // also on an object of several meshes; the rest of the object in the colour of the background (see
  // textmap.ts). mapping: model uses the mapping (UV) of the model, as before 2.11.3: often mirrored,
  // stretched, or nowhere.
  private _applyTextCanvas(canvas: HTMLCanvasElement, object: THREE.Object3D, style: any = {}) {
    if (style.mapping == 'model') {
      if (object instanceof THREE.Mesh) {
        const texture = new THREE.CanvasTexture(canvas);
        if (this._config.objfile.split('?')[0].split('.').pop() == 'glb') texture.flipY = false;
        this._setTextTexture(object, texture);
      }
      return;
    }
    const meshes: THREE.Mesh[] = [];
    object.traverse((o) => {
      if (o instanceof THREE.Mesh) meshes.push(o);
    });
    if (!meshes.length) return;
    if (object.userData.f3dTextAspect === undefined) {
      // Once: the mapping of the text, from the triangles of all its meshes in the scene.
      object.updateWorldMatrix(true, true);
      const v = new THREE.Vector3();
      const parts = meshes.map((mesh) => {
        const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
        const position = geometry.getAttribute('position');
        const world = new Float32Array(position.count * 3);
        for (let k = 0; k < position.count; k++) {
          v.fromBufferAttribute(position, k).applyMatrix4(mesh.matrixWorld);
          world.set([v.x, v.y, v.z], k * 3);
        }
        return { mesh, geometry, world };
      });
      const all = new Float32Array(parts.reduce((n, p) => n + p.world.length, 0));
      let at = 0;
      parts.forEach((p) => {
        all.set(p.world, at);
        at += p.world.length;
      });
      const layout = textLayout(all);
      object.userData.f3dTextAspect = layout ? layout.width / layout.height : null;
      if (layout) {
        at = 0;
        parts.forEach(({ mesh, geometry, world }) => {
          // A copy of the geometry: another object may share it.
          geometry.setAttribute(
            'uv',
            new THREE.BufferAttribute(layout.uv.slice((at / 3) * 2, ((at + world.length) / 3) * 2), 2),
          );
          at += world.length;
          mesh.geometry = geometry;
        });
      }
    }
    const aspect = object.userData.f3dTextAspect;
    const fit = fitText(canvas.width, canvas.height, aspect || canvas.width / Math.max(canvas.height, 1));
    const picture = document.createElement('canvas');
    picture.width = fit.width;
    picture.height = fit.height;
    const ctx = picture.getContext('2d');
    ctx.fillStyle = style.textbgcolor ? style.textbgcolor : 'transparent';
    ctx.fillRect(0, 0, fit.width, fit.height);
    if (canvas.width > 0 && canvas.height > 0)
      ctx.drawImage(canvas, fit.x, fit.y, canvas.width * fit.scale, canvas.height * fit.scale);
    const texture = new THREE.CanvasTexture(picture);
    meshes.forEach((mesh) => this._setTextTexture(mesh, texture));
  }

  // The picture of a text as the material of a mesh: a material of the card (f3dmat), made once.
  private _setTextTexture(mesh: THREE.Mesh, texture: THREE.Texture): void {
    texture.colorSpace = THREE.SRGBColorSpace; // canvas colours are sRGB
    const material = mesh.material as THREE.MeshBasicMaterial;
    if (!Array.isArray(material) && material.name.startsWith('f3dmat')) {
      // The texture of the previous text stays on the GPU until it is disposed: one per update.
      if (material.map && material.map !== texture) material.map.dispose();
      material.map = texture;
    } else {
      const own = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      own.name = 'f3dmat' + mesh.name;
      mesh.material = own;
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

  private _updatetext(entity: Floor3dCardConfig, state: string, canvas: HTMLCanvasElement, uom: string): void {
    const _foundobject: any = this._scene.getObjectByName(entity.object_id);

    if (_foundobject) {
      this._updateTextCanvas(entity.text, canvas, state + uom);
      // Several text entities on one object: their texts one under the other, in the order of the
      // configuration, laid as the first of them says (before, only the last one updated showed).
      const same = this._config.entities
        .map((e, k) => (e.type3d == 'text' && e.object_id == entity.object_id && this._canvas[k] ? k : -1))
        .filter((k) => k >= 0);
      if (same.length > 1) {
        const first = this._config.entities[same[0]].text || {};
        this._applyTextCanvas(
          stackCanvases(
            same.map((k) => this._canvas[k]),
            first.textbgcolor,
          ),
          _foundobject,
          first,
        );
      } else {
        this._applyTextCanvas(canvas, _foundobject, entity.text);
      }
    }
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
  // longer compile, and the objects of that material vanish. The units the materials of the model
  // take stay for them (see _materialTextures): at least two, for a TV screen showing a picture
  // (see _showPicture). Each shadow also takes a varying (a vec4 passed from the vertex to the
  // fragment shader), and the position and normal take 2 more, clipping planes one, the texture
  // coordinates one for every two textures: at least 6 stay for them. With 32 texture units and 31
  // varyings (some desktop GPUs) the varyings were the limit, and from 28 shadows the shaders failed.
  // The sun comes first, then the lights in config order.
  private _shadowBudget(): number {
    const caps = this._renderer.capabilities;
    const textures = this._textureUnits ? this._textureUnits.units : 2;
    return Math.max(
      2,
      Math.min(caps.maxTextures - textures, caps.maxVaryings - Math.max(6, 4 + Math.ceil(textures / 2))),
    );
  }

  // The texture units of the material of the model that takes the most, among those lit by the
  // lamps (and so drawn with their shadows): its textures, and the lookup table of the lighting of
  // the standard material (GLB models). A GLB material with base colour, normal, roughness,
  // metalness, occlusion and emissive textures takes 7: with the 14 shadows of a phone it went past
  // the 16 units and its objects vanished.
  private _materialTextures(): { units: number; material: string } {
    const most = { units: 2, material: '' };
    const lit = (m: any): boolean =>
      m.isMeshLambertMaterial || m.isMeshPhongMaterial || m.isMeshStandardMaterial || m.isMeshToonMaterial;
    this._scene.traverse((object: any) => {
      const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      materials.forEach((material: any) => {
        if (!lit(material)) return;
        let units = material.isMeshStandardMaterial ? 1 : 0; // the lookup table (dfgLUT)
        if (material.transmission > 0) units++; // what is behind a transparent material
        // displacementMap is read by the vertex shader, which has units of its own.
        Object.keys(material).forEach((key) => {
          if (key !== 'displacementMap' && material[key] && material[key].isTexture) units++;
        });
        if (units > most.units) {
          most.units = units;
          most.material = material.name || material.type;
        }
      });
    });
    return most;
  }

  private _applyShadowBudget(): void {
    this._textureUnits = this._materialTextures();
    const budget = this._shadowBudget();
    const ordered = this._shadowLights
      .filter((l) => l === this._env.sun)
      .concat(this._shadowLights.filter((l) => l !== this._env.sun));
    const extralightmode = this._config.extralightmode == 'yes';
    let dropped: ShadowLight[] = [];
    if (extralightmode) {
      // Every light keeps its shadow set up, and only the lights that are on cast it, up to the
      // budget (see _manage_light_shadows).
      let casting = 0;
      ordered.forEach((light) => {
        light.castShadow = (light === this._env.sun || light.intensity > 0) && casting < budget;
        if (light.castShadow) casting++;
      });
      this._shadowLights = ordered;
    } else {
      dropped = ordered.slice(budget);
      dropped.forEach((light) => {
        light.castShadow = false;
      });
      if (dropped.length > 0) {
        const material =
          this._textureUnits.units > 2
            ? ' (the material ' +
              this._textureUnits.material +
              ' of the model takes ' +
              this._textureUnits.units +
              ' texture units)'
            : '';
        console.warn(
          'floor3d-card: ' +
            dropped.length +
            ' lights over the limit of ' +
            budget +
            ' shadows' +
            material +
            ', without shadow: ' +
            dropped.map((l) => l.name).join(', '),
        );
      }
      this._shadowLights = ordered.slice(0, budget);
    }
    // For the editor: the entities whose lights are left without shadow, by their position in the
    // config (-1: a light of no entity).
    this._shadowStatus = {
      budget,
      lights: ordered.length,
      dropped: Array.from(new Set(dropped.map((l) => (l.userData.entityIndex ?? -1) as number))),
      extralightmode,
      textures: this._textureUnits.units,
      material: this._textureUnits.material,
    };
    this._toEditor({ shadows: this._shadowStatus });
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

  // --- Boxes in the corners (corner-boxes.ts) --------------------------------------------------------

  // Weather, what is on or open, energy, people, alarm panel and chips, then the picture of the
  // cameras. Each is drawn again only when what it shows changes.
  private _renderBoxes(force = false): void {
    if (!this._card || !this._hass || !this._modelready) return;
    this._boxes.renderAll(force);
    this._cameras.render(force);
    this._boxes.placeIfChanged(force);
  }

  // What the boxes in the corners read of the card, and what a tap on them asks of the model.
  private _boxesHost(): BoxesHost {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const card = this;
    return {
      get element() {
        return card;
      },
      get config() {
        return card._config;
      },
      get hass() {
        return card._hass;
      },
      get connected() {
        return card.isConnected;
      },
      get card() {
        return card._card;
      },
      get content() {
        return card._content;
      },
      get levelbar() {
        return card._levelbar;
      },
      get zoommenu() {
        return card._zoommenu;
      },
      get zoombar() {
        return card._zoombar;
      },
      get selectionbar() {
        return card._selectionbar;
      },
      get rooms() {
        return card._roomMaps.views;
      },
      get shownStatus() {
        return card._shownStatus;
      },
      t: (key, vars) => card._t(key, vars),
      language: () => card._language(),
      num: (value, fallback) => card._num(value, fallback),
      toggleStatus: (kind, indices) => card._toggleStatus(kind, indices),
      showRoom: (room, ids) => card._showRoom(room as RoomView, ids),
      roomView: (name) => card._roomView(name),
      renderBoxes: (force) => card._renderBoxes(force),
      beforePlace: () => card._cameras.sizePopup(),
    };
  }

  private _toggleStatus(kind: StatusKind, indices: number[]): void {
    if (this._shownStatus === kind) {
      this._endShown();
      return;
    }
    const ids = indices.flatMap((i) =>
      ((this._object_ids && this._object_ids[i] && this._object_ids[i].objects) || []).map((o) => o.object_id),
    );
    // The levels as they were before the first tap: they come back at the end (decided with #28).
    if (!this._shownStatus && this._displaylevels) this._levelsBefore = this._displaylevels.slice();
    this._showObjects(ids, STATUS_COLORS[kind]);
    if (this._displaylevels) this._levelsShown = this._displaylevels.slice();
    this._shownStatus = kind;
    this._boxes.renderStatus(true);
  }

  // Outlines objects of the model (drawn over everything) and flies the camera to them, for ten
  // seconds or until the next one.
  private _showObjects(ids: string[], color: string): void {
    window.clearTimeout(this._shownTimer);
    this._setHighlight(ids, color);
    this._flyToObjects(ids);
    this._shownTimer = window.setTimeout(() => this._endShown(), 10000);
  }

  private _endShown(): void {
    window.clearTimeout(this._shownTimer);
    this._shownTimer = undefined;
    this._setHighlight([]);
    if (this._shownStatus) {
      // The end of the status box: the levels go back as they were, unless they were changed
      // meanwhile (the buttons of the levels, a view, a tap on the energy or people box).
      const before = this._levelsBefore;
      const unchanged = JSON.stringify(this._displaylevels) === JSON.stringify(this._levelsShown);
      if (before && unchanged) this._applyLevels((i) => before[i] !== false);
      this._levelsBefore = this._levelsShown = undefined;
      this._shownStatus = undefined;
      this._boxes.renderStatus(true);
    }
    this._render();
  }

  private _flyToObjects(ids: string[]): void {
    const box = new THREE.Box3();
    const levels = new Set<number>();
    this._objectNamesFor(ids).forEach((name) => {
      const object = this._scene.getObjectByName(name);
      if (!object) return;
      box.union(new THREE.Box3().setFromObject(object));
      if (object.userData && object.userData.level !== undefined) levels.add(object.userData.level);
    });
    if (!box.isEmpty()) this._flyToBox(box, Array.from(levels));
  }

  // The room of the card with this name: its floor, to go to it.
  private _roomView(name: string): RoomView | undefined {
    return this._roomMaps.find(name);
  }

  private _showRoom(room: RoomView | undefined, ids: string[]): void {
    if (!room) return;
    window.clearTimeout(this._shownTimer);
    this._setHighlight(ids, '#ffffff');
    this._flyToRoom(room);
    this._shownTimer = window.setTimeout(() => this._endShown(), 10000);
  }

  // What the torch, the sky, the sun and the ground read of the card (environment.ts).
  private _environmentHost(): EnvironmentHost {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const card = this;
    return {
      get config() {
        return card._config;
      },
      get hass() {
        return card._hass;
      },
      get scene() {
        return card._scene;
      },
      get camera() {
        return card._camera;
      },
      get renderer() {
        return card._renderer;
      },
      get model() {
        return card._bboxmodel;
      },
      get modelCenter() {
        return card._modelCenter;
      },
      get modelRadius() {
        return card._modelRadius;
      },
      num: (value, fallback) => card._num(value, fallback),
      levelMiddles: () => card._middles(),
      scheduleRender: () => card._scheduleRender(),
      enableShadow: (light, bias) => card._enableShadow(light, bias),
      refreshLightShadow: (light) => card._refreshLightShadow(light),
    };
  }

  // --- Rooms (rooms.ts) ----------------------------------------------------------------------------

  // What the rooms read of the card.
  private _roomsHost(): RoomsHost {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const card = this;
    return {
      get config() {
        return card._config;
      },
      get hass() {
        return card._hass;
      },
      get scene() {
        return card._scene;
      },
      t: (key, vars) => card._t(key, vars),
      language: () => card._language(),
      num: (value, fallback) => card._num(value, fallback),
      renderMenus: () => card._renderMenus(),
      setMapMode: (mode) => card._setMapMode(mode),
    };
  }

  // --- Cameras (camera-overlay.ts) -----------------------------------------------------------------

  // What the cameras on screen read of the card.
  private _camerasHost(): CamerasHost {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const card = this;
    return {
      get config() {
        return card._config;
      },
      get hass() {
        return card._hass;
      },
      get connected() {
        return card.isConnected;
      },
      get card() {
        return card._card;
      },
      get content() {
        return card._content;
      },
      get canvas() {
        return card._renderer ? card._renderer.domElement : undefined;
      },
      get camera() {
        return card._camera;
      },
      get model() {
        return card._bboxmodel;
      },
      get picking() {
        return !!card._pickMode;
      },
      t: (key, vars) => card._t(key, vars),
      language: () => card._language(),
      num: (value, fallback) => card._num(value, fallback),
      levelShown: (level) => card._levelShown(level),
      renderBoxes: (force) => card._renderBoxes(force),
    };
  }

  // Menus at the top right: views and, with rooms configured, the room colours.
  private _renderMenus(): void {
    if (this._zoommenu)
      render(
        html`${this._getZoomMenu()}${this._roomMaps.menu()}${this._cameras.button(() => this._renderMenus())}`,
        this._zoommenu,
      );
    this._boxes.place();
  }

  private _setMapMode(mode: string): void {
    this._roomMaps.setMode(mode);
    this._updateStateColors(true);
    this._renderMenus();
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

  // Doors and windows (state_colors: yes), alarm and climate objects, and room colours: recomputed
  // when one of their entities, or the alarm, changes. Only the sensors of the map on show count,
  // so that plugs reporting their power every second don't redraw the card while it shows another map.
  private _updateStateColors(force = false): void {
    if (!this._hass || !this._scene || !this._modelready) return;
    const doors = this._config.state_colors == 'yes' ? this._config.entities.filter((e) => e.type3d == 'door') : [];
    const marked = this._config.entities.filter((e) => e.type3d == 'alarm' || e.type3d == 'climate');
    const ids = [
      this._config.alarm_entity,
      ...doors.map((e) => e.entity),
      ...marked.map((e) => e.entity),
      ...this._roomMaps.watched(),
    ];
    const deps = ids.map((id) => (id ? this._hass.states[id] : undefined));
    if (
      !force &&
      this._colorDeps &&
      deps.length == this._colorDeps.length &&
      deps.every((d, k) => d === this._colorDeps[k])
    )
      return;
    this._colorDeps = deps;

    // Openings: amber when open, red with the alarm armed, blinking red when it goes off.
    const alarm = this._config.alarm_entity ? this._hass.states[this._config.alarm_entity] : undefined;
    const alarmState = alarm ? alarm.state : '';
    const armed = alarmState.startsWith('armed') || ['arming', 'pending', 'triggered'].includes(alarmState);
    const openColor = new THREE.Color(
      armed ? this._config.alarm_color || '#ff3b30' : this._config.open_color || '#ffb020',
    );
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

    // Objects of an alarm (a leak sensor under the dishwasher) blink in the colour of its kind;
    // heaters and coolers glow while they heat or cool.
    let alarmObjects = false;
    this._config.entities.forEach((entity, i) => {
      const stateObj = this._hass.states[entity.entity];
      if (entity.type3d == 'alarm') {
        const on = activeAlarms([stateObj]);
        alarmObjects = alarmObjects || on.length > 0;
        const color = on.length ? (entity.alarm && entity.alarm.color) || on[0].color : null;
        this._tintObjects(i, color ? new THREE.Color(color) : null, 1.2);
      } else if (entity.type3d == 'climate') {
        const options = entity.climate || {};
        const action = climateAction(stateObj, options.mode == 'cool' ? 'cool' : 'heat');
        const colors = { heat: options.heat_color, cool: options.cool_color, dry: options.dry_color };
        const color = action ? colors[action] || CLIMATE_COLORS[action] : null;
        this._tintObjects(i, color ? new THREE.Color(color) : null, this._num(options.glow, 0.8));
      }
    });

    // Rooms
    const alarmed = this._roomMaps.color();
    const blinking = alarmObjects || this._roomMaps.alarm;
    if (blinking != this._roomAlarms) {
      this._roomAlarms = blinking;
      this._startOrStopAnimationLoop();
    }
    // alarm_view: the camera goes to the first room whose alarm goes on.
    if (alarmed.length && this._config.alarm_view == 'yes' && this._camera && this._controls)
      this._flyToRoom(alarmed[0]);
    this._scheduleRender();
  }

  // The camera goes to a room (an alarm went on there), seen from the same side as before, from
  // high enough to see all of it; the level of the room is shown if it was hidden.
  private _flyToRoom(room: RoomView): void {
    this._flyToBox(room.box, room.level !== undefined ? [room.level] : []);
  }

  // The camera above a box, from the side it was looking from, high enough to see all of it, and
  // from at least 65° above it, so that the walls of the room don't hide what is inside (37° until
  // 2.12.1). The levels of the box and those under it are shown, the levels above hidden (#28).
  private _flyToBox(box: THREE.Box3, levels: number[]): void {
    const target = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const direction = this._camera.position.clone().sub(this._controls.target);
    if (direction.lengthSq() < 1e-6) direction.set(0, 1, 1);
    direction.normalize();
    const lowest = THREE.MathUtils.degToRad(MIN_FLIGHT_ELEVATION);
    if (direction.y < Math.sin(lowest)) {
      // The same side, higher up.
      const side = new THREE.Vector2(direction.x, direction.z);
      if (side.lengthSq() < 1e-6) side.set(0, 1);
      side.normalize().multiplyScalar(Math.cos(lowest));
      direction.set(side.x, Math.sin(lowest), side.y);
    }
    const position = target.clone().add(direction.multiplyScalar(Math.max(size.x, size.z, 300) * 1.8));
    this._levelsUpTo(levels);
    this._flyTo(position, target);
  }

  // Alarms on: the rooms blink between faint and strong, the objects of type alarm glow in step,
  // about once per second.
  private _pulseAlarms(now: number): void {
    const k = 0.5 + 0.5 * Math.sin((now / 1000) * Math.PI * 2);
    this._roomMaps.pulse(k);
    this._config.entities.forEach((entity, i) => {
      if (entity.type3d != 'alarm' || !this._object_ids[i]) return;
      this._object_ids[i].objects.forEach((o) => {
        const obj: any = this._scene.getObjectByName(o.object_id);
        const tint = obj && obj.material === obj.userData.tintMaterial ? obj.userData.tintMaterial : null;
        if (!tint) return;
        (Array.isArray(tint) ? tint : [tint]).forEach((m) => {
          if (m.emissive) m.emissiveIntensity = (m.userData.tintIntensity || 1) * (0.25 + 0.75 * k);
        });
      });
    });
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
      const materials = Array.isArray(obj.userData.tintMaterial)
        ? obj.userData.tintMaterial
        : [obj.userData.tintMaterial];
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

  // An object that turns or slides (rotate, door, cover) turns around pivot, a point of the scene: its
  // geometry moves so that the pivot is its origin, and the object moves to the pivot, so that it stays
  // where it is. In the frame
  // of the object: a mesh of a GLB has a position (and a rotation) of its own, and the pivot is worked
  // out on the object as it is in the scene; before, the object jumped away and turned around a corner.
  // A copy of the geometry: identical objects may share it, and they moved with it. An object of
  // several meshes (a group) moves its children. Once per object: a second entity on it turns it around
  // the same pivot (before, it jumped again). Doors and covers since 2.12.0, rotate since 2.11.4.
  private _pivotObject(object: THREE.Object3D, pivot: THREE.Vector3): void {
    if (object.userData.f3dPivoted) return;
    object.userData.f3dPivoted = true;
    object.updateWorldMatrix(true, false);
    const local = object.worldToLocal(pivot.clone());
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry = mesh.geometry.clone();
      mesh.geometry.translate(-local.x, -local.y, -local.z);
    } else {
      object.children.forEach((child) => child.position.sub(local));
    }
    object.position.copy(local.applyMatrix4(object.matrix));
  }

  private _centerobjecttopivot(object: THREE.Mesh, pivot: THREE.Vector3) {
    //Center a Mesh  along is defined pivot point

    object.applyMatrix4(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z));
    object.position.copy(pivot);
  }

  private _rotatedoorpivot(entity: Floor3dCardConfig, index: number) {
    //For a swing door, rotate the objects along the configured axis and the degrees of opening
    this._object_ids[index].objects.forEach((element) => {
      let _obj: any = this._scene.getObjectByName(element.object_id);

      const targetRotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
      const direction = entity.door.swing_direction || entity.door.direction;

      if (this._states[index] == 'on') {
        if (direction == 'inner') {
          if (this._axis_for_door[index].y == 1) {
            targetRotation.y = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].x == 1) {
            targetRotation.x = (-Math.PI * this._degrees[index]) / 180;
          } else if (this._axis_for_door[index].z == 1) {
            targetRotation.z = (-Math.PI * this._degrees[index]) / 180;
          }
        } else if (direction == 'outer') {
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
  }

  private _translatedoor(pane: THREE.Object3D, percentage: number, side: string, index: number, doorstate: string) {
    //For a slide door, translate the objects according to the configured directions and percentage of opening

    let translate: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    let size: THREE.Vector3 = new THREE.Vector3();

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
              color = rgbToHex(Number(colorarray[0]), Number(colorarray[1]), Number(colorarray[2]));
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

  private _rotatecalc(entity: Floor3dCardConfig, i: number) {
    let j = this._rotation_index.indexOf(i);

    // angle_entity: turns to the angle of the sensor, and stays there while it has none.
    if (entity.rotate.angle_entity) {
      const stateObj = this._hass.states[entity.rotate.angle_entity];
      const turn = rotationAngle(
        stateObj && stateObj.state,
        entity.rotate.angle_min,
        entity.rotate.angle_max,
        entity.rotate.angle_offset,
      );
      if (turn) {
        this._rotation_angle[j] = turn.angle;
        this._rotation_wrap[j] = turn.wrap;
      }
      this._rotation_state[j] = 0;
      this._startOrStopAnimationLoop();
      return;
    }

    // speed_entity: a sensor from 0 to 100 (times speed_multiplier) is the fraction of round_per_second;
    // without one, the entity itself when its state is a number (a sensor, an input_number), not on
    // or off. Negative: the other way.
    const speedState = this._hass.states[entity.rotate.speed_entity || entity.entity];
    const speed = speedState ? sensorNumber(speedState.state) : null;
    if (speed !== null) {
      const multiplier = this._num(entity.rotate.speed_multiplier, 1) || 1;
      this._rotation_state[j] = (speed * multiplier) / 100;
      this._startOrStopAnimationLoop();
      return;
    }
    if (entity.rotate.speed_entity) {
      // Its sensor has no number (unavailable): stopped.
      this._rotation_state[j] = 0;
      this._startOrStopAnimationLoop();
      return;
    }

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

  // A fan turning, or still speeding up or slowing down; an object still turning to its angle.
  private _rotating(): boolean {
    return (
      !!(this._rotation_state && this._rotation_state.some((s) => s !== 0)) ||
      this._rotation_speed.some((s) => s !== 0) ||
      this._rotation_angle.some((angle, index) => angle !== null && this._rotation_turned[index] !== angle)
    );
  }

  private _needsAnimationLoop() {
    // Showers, rotations, tweens (doors, covers, camera moves) and trackers still gliding or
    // fading (the model may not be loaded yet)
    return (
      this._showers.running ||
      this._rotating() ||
      TWEEN.getAll().length > 0 ||
      this._trackers.needAnimation() ||
      this._alarmPulse ||
      this._roomAlarms
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
    const showering = this._showers.running;

    (this._rotation_state || []).forEach((target, index) => {
      // Spin up and coast down at a constant rate: full speed in rotate.ramp seconds (0: at once).
      const ramp = this._rotation_ramp[index] || 0;
      const current = this._rotation_speed[index] || 0;
      const step = ramp > 0 ? clockDelta / ramp : Infinity;
      const speed = Math.abs(target - current) <= step ? target : current + Math.sign(target - current) * step;
      this._rotation_speed[index] = speed;
      if (speed == 0) return;

      const axis = this._axis_to_rotate[index];
      if (axis != 'x' && axis != 'y' && axis != 'z') return;
      (this._rotation_objects[index] || []).forEach((_obj) => {
        _obj.rotation[axis] += this._round_per_seconds[index] * speed * rotateBy;
      });
    });

    // angle_entity: towards the angle at round_per_second (1 by default), at once the first time.
    this._rotation_angle.forEach((target, index) => {
      const current = this._rotation_turned[index];
      if (target === null || current === target) return;
      const step = Math.abs(this._num(this._round_per_seconds[index], 0.5)) * rotateBy;
      const turned =
        current === null ? target : turnToward(current, target, step || Infinity, this._rotation_wrap[index]);
      this._rotation_turned[index] = turned;
      const axis = this._axis_to_rotate[index];
      if (axis != 'x' && axis != 'y' && axis != 'z') return;
      (this._rotation_objects[index] || []).forEach((_obj) => {
        // Clockwise seen from the positive end of the axis (from above for y), as a compass.
        _obj.rotation[axis] = (_obj.userData.f3dRotationBase || 0) - turned;
      });
    });

    // Step proportional to elapsed time (60 fps = 1 step), capped after long pauses.
    this._showers.animate(clockDelta * 60);

    TWEEN.update();

    this._trackers.animate(clockDelta);
    if (this._alarmPulse) this._pulseOpenings(now);
    if (this._roomAlarms) this._pulseAlarms(now);

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
      (showering || this._alarmPulse || this._roomAlarms || this._trackers.needAnimation());
    if (!throttled && (this._isVisible || this._needsAnimationLoop())) {
      this._lastRenderTime = now;
      this._render();
    }

    // Tween onComplete runs while the tween is still listed: stop here once nothing is left.
    if (!this._needsAnimationLoop()) {
      this._startOrStopAnimationLoop();
    }
  }

  protected render(): TemplateResult | void {
    if (this._config.show_error) {
      return this._showError(this._t('show_error'));
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

  static get styles(): CSSResultGroup {
    return cardStyles;
  }
}

// The original card (adizanni/floor3d-card) defines the same elements: when both are loaded, the first
// one stays and the other one leaves it alone instead of failing. The card picker of Home Assistant
// lists this card under its name in HACS, and only when it is the one defined: until 2.12.1 it also
// listed it when the original was, with the same name as the original.
if (!customElements.get('floor3d-card')) {
  customElements.define('floor3d-card', Floor3dCard);
  (window as any).customCards = (window as any).customCards || [];
  (window as any).customCards.push({
    type: 'floor3d-card',
    name: 'floor3d-card mod',
    preview: true,
    description: 'A custom card to visualize and activate entities in a live 3D model',
  });
} else {
  console.warn(
    'floor3d-card mod: custom:floor3d-card is already defined by another resource, probably the original card',
  );
}
