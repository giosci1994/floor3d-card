// The rooms of the card (rooms): a translucent copy of each floor, coloured by the map chosen in
// the Map menu (the maps are in maps.ts), with the value written on it, blinking while an alarm of
// the room is on; the Map menu and its legend. The card is reached only through RoomsHost; it keeps
// the colours of the doors and of the alarm and climate objects, and the camera going to an alarm.
import { html, TemplateResult } from 'lit';
import * as THREE from 'three';
import { HomeAssistant } from './ha';
import { switchOn } from './config';
import {
  CLIMATE_COLORS,
  MapScale,
  PRESET_MAPS,
  Stops,
  activeAlarms,
  climateAction,
  climateTarget,
  colorAt,
  legendGradient,
  mapScales,
  roomReading,
  roomSensors,
} from './maps';

// What the rooms can be coloured by (room_colors and the Map menu), besides none.
// The maps of the rooms that are always in the Map menu; the sensor maps (see maps.ts) are there once a
// room has a sensor for them, or the configuration defines them.
const MAP_MODES = ['temperature', 'presence', 'illuminance'];
const LABEL_BACKGROUND = 'rgba(0, 0, 0, 0.55)'; // behind the text of a room label, without alarm or thermostat

export interface RoomView {
  name: string;
  material: THREE.MeshBasicMaterial; // translucent copy of the floor, above it
  overlays: THREE.Mesh[];
  center: THREE.Vector3; // for the label of the map (world coordinates)
  box: THREE.Box3; // of its floor, for the camera going to an alarm
  level?: number; // of its floor
  temperature?: string;
  illuminance?: string;
  presence: string[];
  sensors: { [map: string]: string[] }; // sensors of the sensor maps, by key
  alarms: string[]; // smoke, gas, water... sensors: the room blinks while one is on
  climate?: string; // thermostat: target on the temperature map, its temperature without a sensor
  alarm?: boolean; // an alarm is on
  label?: THREE.Sprite;
  labelText?: string;
  labelBackground?: string;
}

export interface RoomsHost {
  readonly config: any;
  readonly hass: HomeAssistant;
  readonly scene: THREE.Scene;
  t(key: string, vars?: { [name: string]: string | number }): string;
  language(): string;
  num(value: unknown, fallback: number): number;
  renderMenus(): void;
  setMapMode(mode: string): void; // a map chosen in the menu: the rooms coloured again, the menu drawn again
}

export class RoomMaps {
  private _views: RoomView[] = [];
  private _mode = 'none'; // rooms coloured by: none, temperature, presence, illuminance, a sensor map
  private _mapScales: MapScale[] = [];
  private _legend?: { gradient: string; min: string; max: string };

  constructor(private host: RoomsHost) {}

  public get views(): RoomView[] {
    return this._views;
  }

  public get mode(): string {
    return this._mode;
  }

  // An alarm of a room is on: the room blinks.
  public get alarm(): boolean {
    return this._views.some((r) => r.alarm);
  }

  // The room with this name: its floor, to go to it.
  public find(name: string): RoomView | undefined {
    return this._views.find((room) => room.name === name);
  }

  // A map of the Map menu, else none.
  public setMode(mode: string): void {
    this._mode = this.modes().includes(mode) ? mode : 'none';
  }

  // The entities the colours of the rooms depend on: their alarms, and the sensors of the map on show.
  public watched(): string[] {
    const ids: string[] = [];
    const mode = this._mode;
    this._views.forEach((r) => {
      ids.push(...r.alarms);
      if (mode == 'temperature') ids.push(r.temperature, r.climate);
      else if (mode == 'illuminance') ids.push(r.illuminance);
      else if (mode == 'presence') ids.push(...r.presence);
      else if (r.sensors[mode]) ids.push(...r.sensors[mode]);
    });
    return ids;
  }

  // The rooms coloured by the map on show, their labels written and the legend updated. The rooms
  // whose alarm has just gone on are returned, for alarm_view.
  public color(): RoomView[] {
    const mode = this._mode;
    const fmt = (n: number, digits: number): string =>
      n.toLocaleString(this.host.language(), { maximumFractionDigits: digits });
    const scale = this._mapScales.find((s) => s.key == mode);
    let legend: { stops: Stops; unit: string } | undefined;
    const alarmed: RoomView[] = [];
    this._views.forEach((room) => {
      let color: THREE.Color | null = null;
      let opacity = 0.35;
      let label = '';
      let background = LABEL_BACKGROUND;
      if (mode == 'temperature' && (room.temperature || room.climate)) {
        const s = room.temperature ? this.host.hass.states[room.temperature] : undefined;
        const thermostat = room.climate ? this.host.hass.states[room.climate] : undefined;
        let t = s ? parseFloat(s.state) : NaN;
        let unit = (s && s.attributes && s.attributes.unit_of_measurement) || '°';
        // Without a sensor, the temperature the thermostat measures.
        if (isNaN(t) && thermostat && thermostat.attributes) {
          t = parseFloat(thermostat.attributes.current_temperature);
          unit =
            (this.host.hass.config &&
              this.host.hass.config.unit_system &&
              this.host.hass.config.unit_system.temperature) ||
            '°';
        }
        if (!isNaN(t)) {
          color = this._temperatureColor(t);
          label = fmt(t, 1) + ' ' + unit;
          const target = climateTarget(thermostat, (n) => fmt(n, 1));
          if (target) label += ' → ' + target + ' ' + unit;
          const action = climateAction(thermostat);
          if (action) background = this._labelColor(CLIMATE_COLORS[action]);
        }
      } else if (mode == 'illuminance' && room.illuminance) {
        const s = this.host.hass.states[room.illuminance];
        const lux = s ? parseFloat(s.state) : NaN;
        if (!isNaN(lux)) {
          color = this._illuminanceColor(lux);
          const unit = (s.attributes && s.attributes.unit_of_measurement) || 'lx';
          label = fmt(lux, 0) + ' ' + unit;
        }
      } else if (mode == 'presence') {
        const present = room.presence.some(
          (id) => this.host.hass.states[id] && this.host.hass.states[id].state == 'on',
        );
        if (present) {
          color = new THREE.Color(this.host.config.presence_color || '#34d399');
          opacity = 0.32;
        }
      } else if (scale && room.sensors[mode]) {
        const reading = roomReading(
          scale,
          room.sensors[mode].map((id) => this.host.hass.states[id]),
        );
        if (reading) {
          color = new THREE.Color(colorAt(reading.stops, reading.value));
          label = fmt(reading.value, scale.decimals) + (reading.unit ? ' ' + reading.unit : '');
          if (!legend) legend = { stops: reading.stops, unit: reading.unit };
        }
      }
      // An alarm of the room shows over any map, blinking (see pulse).
      const alarms = activeAlarms(room.alarms.map((id) => this.host.hass.states[id]));
      const wasAlarmed = !!room.alarm;
      room.alarm = alarms.length > 0;
      if (room.alarm) {
        color = new THREE.Color(alarms[0].color);
        opacity = 0.6;
        label = Array.from(new Set(alarms.map((a) => this.host.t('alarm_' + a.key)))).join(', ');
        background = this._labelColor(alarms[0].color);
        if (!wasAlarmed) alarmed.push(room);
      }
      if (color) room.material.color.copy(color);
      room.material.opacity = opacity;
      room.overlays.forEach((o) => (o.visible = !!color));
      this._setRoomLabel(room, label, background);
    });
    this._setLegend(mode, scale, legend);
    return alarmed;
  }

  // Alarms on: the rooms blink between faint and strong; k goes from 0 to 1 and back.
  public pulse(k: number): void {
    this._views.forEach((room) => {
      if (room.alarm) room.material.opacity = 0.15 + 0.6 * k;
    });
  }

  // The maps of the Map menu: temperature, presence and illuminance, then the sensor maps that a
  // room has sensors for or that the configuration defines.
  public modes(): string[] {
    const configured = (Array.isArray(this.host.config.maps) ? this.host.config.maps : []).map((m: any) => m && m.key);
    const sensorMaps = this._mapScales
      .filter((scale) => configured.includes(scale.key) || this._views.some((room) => room.sensors[scale.key]))
      .map((scale) => scale.key);
    return [...MAP_MODES, ...sensorMaps];
  }

  // The name a map of the configuration gives, else the text of a ready map, else its key.
  private _mapName(key: string): string {
    const scale = this._mapScales.find((s) => s.key === key);
    if (scale && scale.name) return scale.name;
    return MAP_MODES.includes(key) || PRESET_MAPS.some((p) => p.key === key) ? this.host.t('map_' + key) : key;
  }

  // hideMapMenu: yes hides the menu and its legend; the map of room_colors stays.
  public menu(): TemplateResult {
    if (this._views.length == 0 || switchOn(this.host.config, 'hideMapMenu', false)) return html``;
    const option = (value: string, text: string) =>
      html`<option value=${value} ?selected=${this._mode == value}>${text}</option>`;
    const legend = this._mode !== 'none' && this._mode !== 'presence' ? this._legend : undefined;
    return html`
      <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
        <select
          name="f3d-map"
          aria-label=${this.host.t('map')}
          @change=${(ev: Event) => this.host.setMapMode((ev.target as HTMLSelectElement).value)}
          style="font: inherit; font-size: 14px; padding: 6px 10px; border-radius: 8px; color-scheme: dark;
            background: rgba(0, 0, 0, 0.55); color: white; border: 1px solid rgba(255, 255, 255, 0.6); cursor: pointer;"
        >
          ${option('none', this.host.t('map_none'))} ${this.modes().map((mode) => option(mode, this._mapName(mode)))}
        </select>
        ${
          legend
            ? html`<div
                class="f3d-legend"
                style="padding: 5px 8px 3px; border-radius: 8px; background: rgba(0, 0, 0, 0.55); color: white;
                font-size: 11px; line-height: 14px; width: 140px;"
              >
                <div style="height: 8px; border-radius: 4px; background: ${legend.gradient};"></div>
                <div style="display: flex; justify-content: space-between;">
                  <span>${legend.min}</span><span>${legend.max}</span>
                </div>
              </div>`
            : ''
        }
      </div>
    `;
  }

  // rooms: [{ name, object_id (floor object or <group>), temperature, illuminance, presence, the
  // sensors of the sensor maps (humidity, co2, power...), alarms, climate }]: a translucent copy of
  // each floor, coloured by the map chosen, with the value written on it; it blinks while an alarm
  // of the room is on.
  public init(): void {
    this._views = [];
    this._mapScales = mapScales(this.host.config);
    const rooms = Array.isArray(this.host.config.rooms) ? this.host.config.rooms : [];
    rooms.forEach((room: any) => {
      const ids: string[] = [];
      const id = String(room.object_id || '');
      if (id.startsWith('<') && id.endsWith('>')) {
        const group = (this.host.config.object_groups || []).find((g: any) => '<' + g.object_group + '>' == id);
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
      let level: number | undefined;
      ids.forEach((objectId) => {
        const floor = this.host.scene.getObjectByName(objectId) as THREE.Mesh;
        if (!floor || !floor.geometry) return;
        const overlay = new THREE.Mesh(floor.geometry, material);
        overlay.name = objectId + '_room_color';
        overlay.position.y = 0.6;
        overlay.renderOrder = 5;
        overlay.visible = false;
        floor.add(overlay);
        overlays.push(overlay);
        box.expandByObject(floor);
        if (level === undefined && floor.userData.level !== undefined) level = floor.userData.level;
      });
      if (overlays.length == 0) {
        console.warn('floor3d-card: room ' + room.name + ': floor object not found (' + id + ')');
        return;
      }
      const presence = room.presence ? (Array.isArray(room.presence) ? room.presence : [room.presence]) : [];
      const sensors: { [map: string]: string[] } = {};
      this._mapScales.forEach((scale) => {
        const found = roomSensors(room, scale.key);
        if (found.length) sensors[scale.key] = found;
      });
      this._views.push({
        name: room.name || id,
        material,
        overlays,
        // Level with the top of the walls: seen from above it sits inside the outline of the room.
        center: box.getCenter(new THREE.Vector3()).setY(box.max.y + 250),
        box,
        level,
        temperature: room.temperature,
        illuminance: room.illuminance,
        presence,
        sensors,
        alarms: roomSensors(room, 'alarms'),
        climate: typeof room.climate === 'string' && room.climate ? room.climate : undefined,
      });
    });
    const initial = this.host.config.room_colors;
    this._mode = this.modes().includes(initial) ? initial : 'none';
  }

  // The colour of an alarm or of a thermostat behind the text of a room label.
  private _labelColor(hex: string): string {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `rgba(${r}, ${g}, ${b}, 0.85)`;
  }

  // The legend under the Map menu: the colours of the map on show, from its lowest to its highest
  // value. A sensor map shows the scale of the readings (a VOC index has its own).
  private _setLegend(mode: string, scale: MapScale | undefined, reading?: { stops: Stops; unit: string }): void {
    const fmt = (n: number, digits = 0): string =>
      n.toLocaleString(this.host.language(), { maximumFractionDigits: digits });
    const sample = (colorOf: (k: number) => THREE.Color): string =>
      'linear-gradient(to right, ' +
      Array.from({ length: 9 }, (_, i) => '#' + colorOf(i / 8).getHexString() + ' ' + (i * 12.5).toString() + '%').join(
        ', ',
      ) +
      ')';
    let legend: { gradient: string; min: string; max: string } | undefined;
    if (mode == 'temperature') {
      const min = this.host.num(this.host.config.temperature_min, 17);
      const max = this.host.num(this.host.config.temperature_max, 27);
      legend = {
        gradient: sample((k) => this._temperatureColor(min + k * (max - min))),
        min: fmt(min) + '°',
        max: fmt(max) + '°',
      };
    } else if (mode == 'illuminance') {
      const min = Math.max(this.host.num(this.host.config.illuminance_min, 5), 0.1);
      const max = Math.max(this.host.num(this.host.config.illuminance_max, 1000), min * 1.01);
      legend = {
        gradient: sample((k) => this._illuminanceColor(min * Math.pow(max / min, k))),
        min: fmt(min),
        max: fmt(max) + ' lx',
      };
    } else if (scale) {
      const stops = reading ? reading.stops : scale.stops;
      const unit = reading ? reading.unit : scale.unit;
      legend = {
        gradient: legendGradient(stops),
        min: fmt(stops[0][0], scale.decimals),
        max: fmt(stops[stops.length - 1][0], scale.decimals) + (unit ? ' ' + unit : ''),
      };
    }
    if (JSON.stringify(legend) === JSON.stringify(this._legend)) return;
    this._legend = legend;
    this.host.renderMenus();
  }

  // Blue (temperature_min, 17 by default) to red (temperature_max, 27), green in the middle.
  private _temperatureColor(t: number): THREE.Color {
    const min = this.host.num(this.host.config.temperature_min, 17);
    const max = this.host.num(this.host.config.temperature_max, 27);
    const k = THREE.MathUtils.clamp((t - min) / (max - min || 1), 0, 1);
    return new THREE.Color().setHSL(((1 - k) * 220) / 360, 0.85, 0.55, THREE.SRGBColorSpace);
  }

  // Dark blue (illuminance_min lux, 5 by default) to yellow (illuminance_max, 1000), through purple
  // and orange. The scale is logarithmic, as the eye sees light: a few lux at night, hundreds in a
  // lit room, thousands next to a sunny window.
  private _illuminanceColor(lux: number): THREE.Color {
    const min = Math.max(this.host.num(this.host.config.illuminance_min, 5), 0.1);
    const max = Math.max(this.host.num(this.host.config.illuminance_max, 1000), min * 1.01);
    const k = THREE.MathUtils.clamp(Math.log(Math.max(lux, 0.01) / min) / Math.log(max / min), 0, 1);
    return new THREE.Color().setHSL(((230 + k * 180) % 360) / 360, 0.85, 0.3 + 0.3 * k, THREE.SRGBColorSpace);
  }

  // background: the colour behind the text (an alarm, a thermostat heating or cooling).
  private _setRoomLabel(room: RoomView, text: string, background = LABEL_BACKGROUND): void {
    if (text === (room.labelText || '') && (!text || background === room.labelBackground)) return;
    room.labelText = text;
    room.labelBackground = background;
    if (!text) {
      if (room.label) room.label.visible = false;
      return;
    }
    if (!room.label) {
      room.label = new THREE.Sprite(
        new THREE.SpriteMaterial({ transparent: true, depthTest: false, sizeAttenuation: false }),
      );
      room.label.renderOrder = 20;
      room.label.position.copy(room.center);
      this.host.scene.add(room.label);
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const font = '600 40px Roboto, Arial, sans-serif';
    ctx.font = font;
    const width = Math.ceil(ctx.measureText(text).width) + 32;
    canvas.width = width;
    canvas.height = 60;
    ctx.font = font;
    ctx.fillStyle = background;
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
}
