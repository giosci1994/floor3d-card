// type3d: tracker: a person seen by a presence radar (or by any x and y sensors), a pin over the floor
// that glides to each new position and fades in and out, with the zone written over it.
import * as THREE from 'three';
import type { HassEntity } from 'home-assistant-js-websocket';
import { EntityHandler, EntityHost } from './entity-types';
import type { Floor3dCardConfig } from './types';

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
  height: number;
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
  private _create(entity: Floor3dCardConfig, i: number): void {
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

    const group = new THREE.Group();
    group.name = entity.object_id + '_tracker';
    group.visible = false;
    group.add(head, stem, halo);
    group.traverse((o) => {
      o.castShadow = false;
      o.receiveShadow = false;
    });
    this.host.scene.add(group);

    this._views[i] = {
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

  // A tracker moves when one of its entities changes.
  private _refresh(entity: Floor3dCardConfig, i: number): boolean {
    // Only when an entity of the tracker changed (Home Assistant replaces the state object of an
    // entity that changes), not at every update of any entity.
    const tr = entity.tracker || {};
    const deps = [entity.entity, tr.sensor_x, tr.sensor_y, tr.zone].map((id) =>
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

  private _update(item: Floor3dCardConfig, index: number): void {
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
    // Appearing: start where the person is, not from where the previous track ended.
    if (tv.opacity == 0) tv.group.position.copy(tv.target);

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

  // Every frame while needed: glide towards the last position and fade in or out.
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
        (tv.opacity != (tv.present ? 1 : 0) || (tv.present && tv.group.position.distanceToSquared(tv.target) > 0.25)),
    );
  }
}
