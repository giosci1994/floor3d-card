// type3d: tracker: a person seen by a presence radar (or by any x and y sensors), a pin over the floor
// that glides to each new position and fades in and out, with the zone written over it. With
// tracker.model, a model of its own (a robot vacuum) in place of the pin, turned by sensor_heading.
import * as THREE from 'three';
import type { HassEntity } from 'home-assistant-js-websocket';
import { EntityHandler, EntityHost } from './entity-types';
import { parseGLB } from './glb';
import type { EntityConfig, TrackerConfig } from './types';

const TRACKER_SMOOTHING = 0.25; // seconds: trackers glide to each new position instead of jumping
const TRACKER_FADE = 0.35; // seconds to appear or disappear

interface TrackerView {
  group: THREE.Group;
  materials: [THREE.Material, number][]; // material and its opacity when fully visible
  target: THREE.Vector3;
  present: boolean; // the sensors report a position
  opacity: number; // 0..1, fades towards present ? 1 : 0
  label?: THREE.Sprite;
  labelText?: string;
  height: number; // where the label goes, under size * 2.8: the head of the pin, the top of a model
  pivot: THREE.Group; // turns with sensor_heading (the pin, or the model)
  yaw: number; // rotation.y of the pivot now, and the one it turns to
  yawTarget: number;
}

// The angle (radians) from a to b the shorter way, between -PI and PI.
const shortestTurn = (a: number, b: number): number => Math.atan2(Math.sin(b - a), Math.cos(b - a));

// The direction of sensor_heading (degrees from x towards y, as sensor_x and sensor_y) mirrored and
// turned as the position is, as rotation.y of three.js: an angle from +X towards +Z is -angle.
export function headingYaw(heading: number, tracker: TrackerConfig, sensorRotation: number): number {
  let h = heading;
  if (tracker.flip_x === true || tracker.flip_x == 'yes') h = 180 - h;
  if (tracker.flip_y === true || tracker.flip_y == 'yes') h = -h;
  return (-(h + sensorRotation) * Math.PI) / 180;
}

export class Trackers {
  private _views: TrackerView[] = [];
  private _prev?: HassEntity[][]; // the states of the entities of each tracker, at its last update

  constructor(private host: EntityHost) {}

  public readonly handler: EntityHandler = {
    setup: (entity, i) => this._create(entity, i),
    show: (entity, i) => this._update(entity, i),
    refresh: (entity, i) => this._refresh(entity, i),
  };

  // The model is loaded again: its trackers are made again.
  public reset(): void {
    this._views = [];
  }

  // Tracker: a glowing head at the configured height, a thin stem and a halo on the floor, all in
  // the colour of the tracker. It glides to each new position and fades in and out.
  private _create(entity: EntityConfig, i: number): void {
    const tracker = entity.tracker || {};
    const size = this.host.num(tracker.size, 15);
    const height = this.host.num(tracker.height, 150);
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

    const pivot = new THREE.Group();
    pivot.add(head, stem);
    const group = new THREE.Group();
    group.name = entity.object_id + '_tracker';
    group.visible = false;
    group.add(pivot, halo);
    group.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = false;
    });
    this.host.scene.add(group);

    const view: TrackerView = {
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
      pivot,
      yaw: 0,
      yawTarget: 0,
    };
    this._views[i] = view;
    if (tracker.model) this._loadModel(view, tracker, [head, stem]);
  }

  // tracker.model: the pin is hidden while the model loads, and the model takes its place; the halo and
  // the label stay. A model that doesn't load gives a warning, and the pin is back.
  private _loadModel(tv: TrackerView, tracker: TrackerConfig, pin: THREE.Mesh[]): void {
    pin.forEach((mesh) => (mesh.visible = false));
    const url = this._modelUrl(String(tracker.model));
    const loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');
    const failed = (error: any): void => {
      console.warn('floor3d-card: cannot load the tracker model ' + url + ': ' + ((error && error.message) || error));
      pin.forEach((mesh) => (mesh.visible = true));
      this.host.scheduleRender();
    };
    loader.load(
      url,
      async (data) => {
        try {
          const gltf = await parseGLB(
            data as ArrayBuffer,
            THREE.LoaderUtils.extractUrlBase(url),
            this.host.config.draco_decoder_path,
          );
          if (!this._views.includes(tv)) return; // the model of the card was loaded again meanwhile
          this._placeModel(tv, gltf.scene, tracker, pin);
        } catch (error) {
          failed(error);
        }
      },
      undefined,
      failed,
    );
  }

  // Relative to the folder of the model of the card (path), or an address of its own.
  private _modelUrl(model: string): string {
    if (/^(\/|https?:)/i.test(model)) return model;
    let path = this.host.config.path || '';
    if (path.endsWith('.')) path = '';
    else if (path && !path.endsWith('/')) path += '/';
    return path + model;
  }

  // The model, in metres as glTF wants it, times model_scale (100 for a house in centimetres), turned by
  // model_rotation, with the middle of its base on the point of the tracker. Its materials are copies
  // that fade with the tracker.
  private _placeModel(tv: TrackerView, model: THREE.Object3D, tracker: TrackerConfig, pin: THREE.Mesh[]): void {
    const scale = this.host.num(tracker.model_scale, 1);
    model.scale.multiplyScalar(scale > 0 ? scale : 1);
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    if (box.isEmpty()) throw new Error('the model is empty');
    const centre = box.getCenter(new THREE.Vector3());
    model.position.sub(new THREE.Vector3(centre.x, box.min.y, centre.z));
    const turned = new THREE.Group();
    turned.rotation.y = (-this.host.num(tracker.model_rotation, 0) * Math.PI) / 180;
    turned.add(model);

    const materials = new Map<THREE.Material, THREE.Material>();
    const copy = (m: THREE.Material): THREE.Material => {
      if (!materials.has(m)) {
        const c = m.clone();
        tv.materials.push([c, m.opacity]);
        c.transparent = true;
        c.opacity = m.opacity * tv.opacity;
        materials.set(m, c);
      }
      return materials.get(m);
    };
    model.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = false;
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        mesh.material = Array.isArray(mesh.material) ? mesh.material.map(copy) : copy(mesh.material);
      }
    });

    // The pin goes: its meshes and their materials.
    pin.forEach((mesh) => {
      tv.pivot.remove(mesh);
      mesh.geometry.dispose();
      const material = mesh.material as THREE.Material;
      material.dispose();
      tv.materials = tv.materials.filter(([m]) => m !== material);
    });
    tv.pivot.add(turned);
    tv.height = box.max.y - box.min.y;
    if (tv.label) tv.label.position.y = tv.height + this.host.num(tracker.size, 15) * 2.8;
    this.host.scheduleRender();
  }

  // A tracker moves when one of its entities changes.
  private _refresh(entity: EntityConfig, i: number): boolean {
    // Only when an entity of the tracker changed (Home Assistant replaces the state object of an
    // entity that changes), not at every update of any entity.
    const tr = entity.tracker || {};
    const deps = [entity.entity, tr.sensor_x, tr.sensor_y, tr.zone, tr.sensor_heading].map((id) =>
      id ? this.host.hass.states[id] : undefined,
    );
    if (!this._prev) this._prev = [];
    const prev = this._prev[i];
    if (!prev || deps.some((s, k) => s !== prev[k])) {
      this._prev[i] = deps;
      this._update(entity, i);
    }
    return false;
  }

  private _update(item: EntityConfig, index: number): void {
    const tv = this._views[index];
    if (!tv) return;
    const tracker = item.tracker || {};
    const value = (id: string): number => {
      const s = this.host.hass.states[id];
      if (!s || ['unavailable', 'unknown', 'none', ''].includes(String(s.state))) return NaN;
      return parseFloat(s.state);
    };
    const stateObj = this.host.hass.states[item.entity];
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
      this._setPresent(tv, false);
      return;
    }

    // Sensor coordinates to millimetres (unit: mm, cm or m), optionally mirrored, then scaled,
    // rotated and moved to the position of the sensor in the model.
    const toMm = tracker.unit == 'm' ? 1000 : tracker.unit == 'cm' ? 10 : 1;
    let xMm = x * toMm;
    let yMm = y * toMm;
    if (tracker.flip_x === true || tracker.flip_x == 'yes') xMm = -xMm;
    if (tracker.flip_y === true || tracker.flip_y == 'yes') yMm = -yMm;
    const scale = this.host.num(tracker.scale, 0.001);
    const rotation = (this.host.num(tracker.sensor_rotation, 0) * Math.PI) / 180;
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
    // The direction of a model (a robot vacuum), when its sensor reports one.
    const heading = tracker.sensor_heading ? value(tracker.sensor_heading) : NaN;
    if (!isNaN(heading)) tv.yawTarget = headingYaw(heading, tracker, this.host.num(tracker.sensor_rotation, 0));
    // Appearing: start where the person is, not from where the previous track ended.
    if (tv.opacity == 0) {
      tv.group.position.copy(tv.target);
      tv.yaw = tv.yawTarget;
      tv.pivot.rotation.y = tv.yaw;
    }

    const zone = tracker.zone ? this.host.hass.states[tracker.zone] : undefined;
    const zoneText =
      zone && !['unavailable', 'unknown', '-', ''].includes(String(zone.state)) ? String(zone.state) : '';
    this._setLabel(
      tv,
      tracker.label == 'no' ? '' : zoneText,
      tracker.color || '#FF5500',
      this.host.num(tracker.size, 15),
    );

    this._setPresent(tv, true);
    this.host.animate();
    this.host.scheduleRender();
  }

  private _setPresent(tv: TrackerView, present: boolean): void {
    if (tv.present === present) return;
    tv.present = present;
    if (present) tv.group.visible = true;
    this.host.animate();
    this.host.scheduleRender();
  }

  // Name of the zone above the head (tracker.zone), always the same size on screen.
  private _setLabel(tv: TrackerView, text: string, color: string, size: number): void {
    if (text === (tv.labelText || '')) return;
    tv.labelText = text;
    if (!text) {
      if (tv.label) tv.label.visible = false;
      return;
    }
    if (!tv.label) {
      const material = new THREE.SpriteMaterial({
        transparent: true,
        opacity: 0,
        depthTest: false,
        sizeAttenuation: false,
      });
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

  // Every frame while needed: glide towards the last position and direction, and fade in or out.
  public animate(dt: number): void {
    const k = 1 - Math.exp(-dt / TRACKER_SMOOTHING);
    const fade = dt / TRACKER_FADE;
    for (const tv of this._views) {
      if (!tv) continue;
      if (tv.present) {
        if (tv.group.position.distanceToSquared(tv.target) > 0.25) {
          tv.group.position.lerp(tv.target, k);
        } else {
          tv.group.position.copy(tv.target);
        }
      }
      if (tv.yaw !== tv.yawTarget) {
        const turn = shortestTurn(tv.yaw, tv.yawTarget);
        tv.yaw = Math.abs(turn) < 0.002 ? tv.yawTarget : tv.yaw + turn * k;
        tv.pivot.rotation.y = tv.yaw;
      }
      const goal = tv.present ? 1 : 0;
      if (tv.opacity != goal) {
        tv.opacity = goal > tv.opacity ? Math.min(goal, tv.opacity + fade) : Math.max(goal, tv.opacity - fade);
        for (const [material, full] of tv.materials) material.opacity = full * tv.opacity;
        tv.group.visible = tv.opacity > 0;
      }
    }
  }

  public needAnimation(): boolean {
    return this._views.some(
      (tv) =>
        tv &&
        (tv.opacity != (tv.present ? 1 : 0) ||
          tv.yaw !== tv.yawTarget ||
          (tv.present && tv.group.position.distanceToSquared(tv.target) > 0.25)),
    );
  }
}
