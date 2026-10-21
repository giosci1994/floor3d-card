// type3d: light: the lights of a lamp (a point light, or a spot with light_target or
// light_direction), on, dimmed and coloured as the light entity reports, and the colour of a light
// entity in RGB.
import * as THREE from 'three';
import type { HassEntity } from 'home-assistant-js-websocket';
import { EntityHandler, EntityHost } from './entity-types';
import type { EntityConfig } from './types';

// three.js >= 0.155 always uses physical light units, and the model is in centimetres. This factor
// keeps the brightness close to the three.js 0.130 build at typical room distances (a lamp seen from
// about 1.5 m); light_power and exposure in the config adjust it.
const LAMP_INTENSITY_PER_LUMEN = 47; // 0.130 build: 0.003 per lumen with the legacy light model

// Colour of a light as [r, g, b]: rgb_color, that Home Assistant gives in every colour mode
// (computed from the temperature in color_temp mode), else the temperature in kelvin, or in the
// mireds of Home Assistant before 2026.3. Undefined while the light is off.
export function lightColor(stateObj: HassEntity): number[] | undefined {
  const attributes = stateObj.attributes;
  if (Array.isArray(attributes.rgb_color) && attributes.rgb_color.length >= 3) {
    return attributes.rgb_color.slice(0, 3).map(Number);
  }
  if (Number(attributes.color_temp_kelvin) > 0) return temperatureToRGB(1000000 / Number(attributes.color_temp_kelvin));
  if (Number(attributes.color_temp) > 0) return temperatureToRGB(Number(attributes.color_temp));
  return undefined;
}

// t in mireds
export function temperatureToRGB(t: number): number[] {
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
  rgb = [r, g, b].map((v) => Math.max(0, Math.min(255, Math.floor(v)))); // the formula goes past 255 near 6600 K
  return rgb;
}

// RGB Color array to hex string converter
export function rgbToHex(r: number, g: number, b: number): string {
  let rs: string = r.toString(16);
  let gs: string = g.toString(16);
  let bs: string = b.toString(16);

  if (rs.length == 1) rs = '0' + rs;
  if (gs.length == 1) gs = '0' + gs;
  if (bs.length == 1) bs = '0' + bs;

  return '#' + rs + gs + bs;
}

// The parts of a lamp don't stop its light.
function noShadow(object: THREE.Object3D): void {
  object.receiveShadow = true;
  object.castShadow = false;
}

export class Lamps {
  // The colour and brightness of each light entity (-1: not reported), by its position in the config.
  private _color: number[][] = [];
  private _brightness: number[] = [];

  constructor(private host: EntityHost) {}

  public readonly handler: EntityHandler = {
    setup: (entity, i) => this._setup(entity, i),
    show: (entity, i) => this.update(entity, i),
    refresh: (entity, i, state) => this._refresh(entity, i, state),
  };

  // The states are read again: the colour and brightness each entity reports now (white and not
  // reported for an entity that is missing).
  public prepare(): void {
    this._color = [];
    this._brightness = [];
    this.host.config.entities.forEach((entity) => {
      const stateObj = this.host.hass.states[entity.entity];
      this._color.push(stateObj ? lightColor(stateObj) : [255, 255, 255]);
      this._brightness.push(stateObj && stateObj.attributes['brightness'] ? stateObj.attributes['brightness'] : -1);
    });
  }

  // light: the light of each object of the lamp, or one for all of them.
  private _setup(entity: EntityConfig, i: number): void {
    // Add Virtual Light Objects
    const parts: THREE.Object3D[] = this.host.objectIds[i].objects
      .map((element) => this.host.scene.getObjectByName(element.object_id))
      .filter((part) => part);
    // The parts of the lamp don't stop its light.
    parts.forEach((part) => {
      noShadow(part);
      part.traverseAncestors(noShadow);
    });
    if (parts.length > 0 && (entity.light.single == 'yes' || entity.light.light_object)) {
      // One light for all the objects of the lamp (a chandelier, a row of spots): on
      // light_object, or in the middle of them all. Each light costs GPU time, and with
      // shadows a texture unit: five spots of a lamp were five lights.
      const on = entity.light.light_object ? this.host.scene.getObjectByName(entity.light.light_object) : undefined;
      if (entity.light.light_object && !on) {
        console.warn(
          'floor3d-card: light_object ' + entity.light.light_object + ' of ' + entity.entity + ' is not in the model',
        );
      }
      const box = new THREE.Box3();
      if (on) box.setFromObject(on);
      else parts.forEach((part) => box.expandByObject(part));
      // Named after the first object: _updatelight finds it through the objects of the entity.
      this._addLight(entity, i, box, (on || parts[0]).userData.level, parts[0].name + '_light');
    } else {
      parts.forEach((part) => {
        this._addLight(entity, i, new THREE.Box3().setFromObject(part), part.userData.level, part.name + '_light');
      });
    }
  }

  // A light switched, or a new colour or brightness.
  private _refresh(entity: EntityConfig, i: number, state: string): boolean {
    let toupdate = false;
    if (this.host.states[i] !== state) {
      this.host.states[i] = state;
      toupdate = true;
    }
    // Every colour mode, the temperature of Adaptive Lighting included. Before, only rgb
    // and color_temp were read, the latter from the mireds Home Assistant dropped in
    // 2026.3: a lamp changing temperature turned white, and xy or hs lamps kept the
    // colour they had when the card was loaded.
    const color = lightColor(this.host.hass.states[entity.entity]);
    if (color && String(color) !== String(this._color[i])) {
      toupdate = true;
      this._color[i] = color;
    }
    if (this.host.hass.states[entity.entity].attributes['brightness']) {
      if (this.host.hass.states[entity.entity].attributes['brightness'] !== this._brightness[i]) {
        toupdate = true;
        this._brightness[i] = this.host.hass.states[entity.entity].attributes['brightness'];
      }
    }
    if (toupdate) this.update(entity, i);
    return toupdate;
  }

  // The light of a lamp in the middle of box (at its top or bottom with vertical_alignment): a spot
  // with light_target or light_direction, otherwise a point light. Off until _updatelight.
  private _addLight(entity: EntityConfig, i: number, box: THREE.Box3, level: number, name: string): void {
    const x = (box.max.x - box.min.x) / 2 + box.min.x;
    const z = (box.max.z - box.min.z) / 2 + box.min.z;
    let y = (box.max.y - box.min.y) / 2 + box.min.y;
    if (entity.light.vertical_alignment == 'top') y = box.max.y;
    else if (entity.light.vertical_alignment == 'bottom') y = box.min.y;

    const decay = entity.light.decay ? Number(entity.light.decay) : 2;
    const distance = entity.light.distance ? Number(entity.light.distance) : 600;

    let light: THREE.PointLight | THREE.SpotLight;
    if (entity.light.light_target || entity.light.light_direction) {
      const angle = entity.light.angle ? THREE.MathUtils.degToRad(entity.light.angle) : Math.PI / 10;
      const slight = new THREE.SpotLight(new THREE.Color('#ffffff'), 0, distance, angle, 0.5, decay);
      this.host.levels[level].add(slight);
      const target = new THREE.Object3D();
      this.host.levels[level].add(target);
      slight.position.set(x, y, z);
      if (entity.light.light_direction) {
        target.position.set(
          x + entity.light.light_direction.x,
          y + entity.light.light_direction.y,
          z + entity.light.light_direction.z,
        );
      } else {
        const tobj = this.host.scene.getObjectByName(entity.light.light_target);
        if (tobj) new THREE.Box3().setFromObject(tobj).getCenter(target.position);
      }
      slight.target = target;
      light = slight;
    } else {
      const plight = new THREE.PointLight(new THREE.Color('#ffffff'), 0, distance, decay);
      this.host.levels[level].add(plight);
      plight.position.set(x, y, z);
      light = plight;
    }

    light.userData.entityIndex = i; // for the shadows the editor reports (see _shadowReport)
    if (entity.light.shadow == 'no') {
      light.castShadow = false;
    } else {
      this.host.enableShadow(light, -0.0001);
    }
    light.name = name;
  }

  public update(entity: EntityConfig, i: number): void {
    // Illuminate the light object when, for the bound device, one of its attribute gets modified in HA. See set hass property

    this.host.objectIds[i].objects.forEach((element) => {
      const light: any = this.host.object(element.object_id + '_light');

      if (!light) {
        return;
      }
      const max = this.intensity(entity.light.lumens ? entity.light.lumens : 800);

      if (this.host.states[i] == 'on') {
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
          light.color = new THREE.Color(rgbToHex(this._color[i][0], this._color[i][1], this._color[i][2]));
        }
      } else {
        light.intensity = 0;
      }
      if (this.host.config.extralightmode == 'yes') {
        this.host.manageLightShadows(light);
      }
      // Brightness and colour do not change the shadow map: it is redrawn only if it is out of date.
      this.host.refreshLightShadow(light);
    });
  }

  // Intensity of a lamp in three.js units (the model is in centimetres), light_power included.
  public intensity(lumens: number | string): number {
    return Number(lumens) * LAMP_INTENSITY_PER_LUMEN * this.host.num(this.host.config.light_power, 1);
  }
}
