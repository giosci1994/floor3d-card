/* eslint-disable @typescript-eslint/no-explicit-any */
// Forms of the configuration shared by the card and its editor.
// normalizeConfig(): what the card and the editor work with. It accepts the short forms (true/false
// for the yes/no switches, object_id strings in object_groups, a missing options block).
// cleanConfig(): what the editor writes to the YAML. Only the long forms the card has always read,
// plus object_id strings, without empty rows, empty blocks and switches left at their default.

// Top-level switches, written 'yes' or 'no', and the value the card uses when they are missing.
const SWITCH_DEFAULTS: { [key: string]: 'yes' | 'no' } = {
  header: 'yes',
  click: 'no',
  overlay: 'no',
  lock_camera: 'no',
  show_axes: 'no',
  shadow: 'no',
  extralightmode: 'no',
  hideLevelsMenu: 'no',
  hideZoomMenu: 'no',
  editModeNotifications: 'yes',
  selectionMode: 'no',
  sun: 'no',
  sun_shadow: 'yes',
  log_depth: 'no',
  reversed_depth: 'yes',
  state_colors: 'no',
  alarm_view: 'no',
  hideMapMenu: 'no',
  weather_show: 'yes',
  status_show: 'no',
  energy_show: 'yes',
  people_show: 'yes',
  alarm_panel_show: 'yes',
  chips_show: 'yes',
  cameras_show: 'yes',
  camera_popup_show: 'yes',
  stars_show: 'yes',
  moon_show: 'yes',
  sky_clouds: 'yes',
  sky: 'no', // no longer used by the card
};

// Other top-level options whose value, when missing, is the one written here.
const VALUE_DEFAULTS: { [key: string]: string | number } = {
  language: 'auto',
  overlay_width: 33,
  overlay_height: 20,
  overlay_bgcolor: 'transparent',
  overlay_fgcolor: 'black',
  weather_position: 'bottom-left',
  weather_forecast: 'daily',
  weather_count: 4,
  status_position: 'top-left',
  energy_position: 'bottom-left',
  energy_top: 3,
  people_position: 'top-left',
  alarm_panel_position: 'top-right',
  chips_position: 'bottom-right',
  camera_popup_position: 'bottom-right',
  camera_popup_duration: 20,
  moon_size: 30,
};

// Switches inside the options block of an entity. They have no default: the card reads a missing
// value differently from 'no' (light.shadow, for example), so they are never removed.
const BLOCK_SWITCHES: [string, string][] = [
  ['light', 'shadow'],
  ['light', 'single'],
  ['image', 'lighting_shadow'],
  ['room', 'label'],
  ['tracker', 'label'],
];

// Types whose options block the card reads without checking that it exists.
const REQUIRED_BLOCKS = ['light', 'door', 'cover', 'rotate', 'room', 'text', 'gesture', 'hide', 'show'];

// Numbers the editor used to save as text ('700'), or typed in a field that also takes the id of a
// sensor (the light powers): written as numbers. A sensor id stays as it is.
const TOP_NUMBERS = [
  'overlay_width',
  'overlay_height',
  'globalLightPower',
  'sun_power',
  'sky_power',
  'weather_count',
  'energy_top',
  'camera_popup_duration',
  'moon_size',
];
const BLOCK_NUMBERS: { [block: string]: string[] } = {
  light: ['lumens', 'decay', 'distance', 'angle'],
  door: ['degrees', 'percentage'],
  cover: ['tilt_closed', 'tilt_open'],
  room: ['transparency', 'elevation', 'width', 'height'],
  image: ['rotate', 'lumens', 'lighting_lumens'],
  rotate: ['round_per_second', 'ramp'],
  tracker: ['sensor_rotation', 'scale', 'height', 'size'],
  info: ['size'],
  shower: ['velocity', 'count', 'size', 'height', 'width'],
};

const NUMBER = /^-?\d+(\.\d+)?$/;

const isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value);

const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value));

function yesNo(object: any, key: string): void {
  if (object[key] === true) object[key] = 'yes';
  else if (object[key] === false) object[key] = 'no';
}

function toNumber(object: any, key: string): void {
  if (typeof object[key] === 'string' && NUMBER.test(object[key].trim())) {
    object[key] = Number(object[key]);
  }
}

export function normalizeConfig<T>(config: T): T {
  const c: any = copy(config);
  // The status box was status: yes before it had its show switch, like the other boxes.
  if (c.status !== undefined) {
    if (c.status_show === undefined) c.status_show = c.status;
    delete c.status;
  }
  Object.keys(SWITCH_DEFAULTS).forEach((key) => yesNo(c, key));
  if (Array.isArray(c.entities)) {
    c.entities.forEach((entity) => {
      if (!isObject(entity)) return;
      BLOCK_SWITCHES.forEach(([block, key]) => {
        if (isObject(entity[block])) yesNo(entity[block], key);
      });
      if (REQUIRED_BLOCKS.includes(entity.type3d) && entity[entity.type3d] == null) {
        entity[entity.type3d] = {};
      }
    });
  }
  if (Array.isArray(c.object_groups)) {
    c.object_groups.forEach((group) => {
      if (!isObject(group)) return;
      // The card goes through the objects of a group without checking that the list exists.
      group.objects = (Array.isArray(group.objects) ? group.objects : []).map((object) =>
        typeof object === 'string' ? { object_id: object } : object,
      );
    });
  }
  // One person, chip, plug or camera written alone, without a list.
  ['people', 'chips', 'energy_plugs', 'cameras'].forEach((key) => {
    if (typeof c[key] === 'string' && c[key] !== '') c[key] = [c[key]];
  });
  // The sensors of a camera: one, or a list.
  if (Array.isArray(c.cameras)) {
    c.cameras.forEach((camera) => {
      if (isObject(camera) && typeof camera.popup_on === 'string' && camera.popup_on !== '') camera.popup_on = [camera.popup_on];
    });
  }
  return c;
}

// Removes empty strings and the blocks left empty, at any depth below a list item.
function removeEmpty(object: any): void {
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (value === '') {
      delete object[key];
    } else if (isObject(value)) {
      removeEmpty(value);
      if (Object.keys(value).length === 0) delete object[key];
    } else if (Array.isArray(value)) {
      object[key] = value.filter((item) => {
        if (!isObject(item)) return item !== '';
        removeEmpty(item);
        return Object.keys(item).length > 0;
      });
      if (object[key].length === 0) delete object[key];
    }
  });
}

// A list item keeps its name ('entity', 'object_group', 'zoom') even when empty, as long as
// something else is filled in; an item with nothing filled in is dropped.
function cleanItem(item: any, name: string): any {
  if (!isObject(item)) return item === '' ? undefined : item;
  const clean = copy(item);
  const named = clean[name];
  removeEmpty(clean);
  if (Object.keys(clean).filter((key) => key !== name).length === 0 && !named) return undefined;
  if (named === '') clean[name] = '';
  return clean;
}

export function cleanConfig<T>(config: T): T {
  const c: any = normalizeConfig(config);

  Object.entries(SWITCH_DEFAULTS).forEach(([key, value]) => {
    if (c[key] === value) delete c[key];
  });
  TOP_NUMBERS.forEach((key) => toNumber(c, key));
  Object.entries(VALUE_DEFAULTS).forEach(([key, value]) => {
    if (c[key] !== undefined && String(c[key]) === String(value)) delete c[key];
  });

  // The card needs the entities list, even when empty.
  c.entities = (Array.isArray(c.entities) ? c.entities : [])
    .map((entity) => {
      const clean = cleanItem(entity, 'entity');
      if (isObject(clean)) {
        Object.entries(BLOCK_NUMBERS).forEach(([block, keys]) => {
          if (isObject(clean[block])) keys.forEach((key) => toNumber(clean[block], key));
        });
      }
      return clean;
    })
    .filter((entity) => entity !== undefined);

  if (Array.isArray(c.object_groups)) {
    c.object_groups = c.object_groups
      .map((group) => {
        const clean = cleanItem(group, 'object_group');
        // A group object with only its object_id is written as that id.
        if (isObject(clean) && Array.isArray(clean.objects)) {
          clean.objects = clean.objects.map((object) =>
            isObject(object) && Object.keys(object).length === 1 && typeof object.object_id === 'string'
              ? object.object_id
              : object,
          );
        }
        return clean;
      })
      .filter((group) => group !== undefined);
    if (c.object_groups.length === 0) delete c.object_groups;
  }

  if (Array.isArray(c.zoom_areas)) {
    c.zoom_areas = c.zoom_areas.map((zoom) => cleanItem(zoom, 'zoom')).filter((zoom) => zoom !== undefined);
    if (c.zoom_areas.length === 0) delete c.zoom_areas;
  }

  if (Array.isArray(c.rooms)) {
    c.rooms = c.rooms.map((room) => cleanItem(room, 'name')).filter((room) => room !== undefined);
    if (c.rooms.length === 0) delete c.rooms;
  }

  // Sensor maps of the configuration (see maps.ts): limits and decimals written as numbers.
  if (Array.isArray(c.maps)) {
    c.maps = c.maps
      .map((map) => {
        const clean = cleanItem(map, 'key');
        if (isObject(clean)) ['min', 'max', 'decimals'].forEach((key) => toNumber(clean, key));
        return clean;
      })
      .filter((map) => map !== undefined);
    if (c.maps.length === 0) delete c.maps;
  }

  // Boxes (see boxes.ts): people and chips without empty rows, a person or a chip with only its
  // entity written as the id; lists left empty go away.
  ['people', 'chips'].forEach((key) => {
    if (!Array.isArray(c[key])) return;
    c[key] = c[key]
      .map((item) => {
        if (!isObject(item)) return item || undefined;
        const clean = cleanItem(item, 'entity');
        if (!isObject(clean) || !clean.entity) return undefined;
        return Object.keys(clean).length === 1 ? clean.entity : clean;
      })
      .filter((item) => item !== undefined);
    if (c[key].length === 0) delete c[key];
  });
  if (Array.isArray(c.energy_plugs)) {
    c.energy_plugs = c.energy_plugs.filter((p) => typeof p === 'string' && p !== '');
    if (c.energy_plugs.length === 0) delete c.energy_plugs;
  }

  // Cameras (see cameras.ts): the position as [x, y, z] once its three numbers are there, the level as
  // a number; a camera with only its entity written as the id.
  if (Array.isArray(c.cameras)) {
    c.cameras = c.cameras
      .map((item) => {
        if (!isObject(item)) return item || undefined;
        const clean = cleanItem(item, 'entity');
        if (!isObject(clean)) return undefined;
        const p = clean.position;
        if (isObject(p)) {
          const list = [p.x, p.y, p.z].map((n) => (typeof n === 'string' && NUMBER.test(n.trim()) ? Number(n) : n));
          if (list.every((n) => typeof n === 'number' && isFinite(n))) clean.position = list;
        } else if (Array.isArray(p)) {
          clean.position = p.map((n) => (typeof n === 'string' && NUMBER.test(n.trim()) ? Number(n) : n));
        }
        toNumber(clean, 'level');
        return Object.keys(clean).length === 1 && clean.entity ? clean.entity : clean;
      })
      .filter((item) => item !== undefined);
    if (c.cameras.length === 0) delete c.cameras;
  }

  if (isObject(c.url_parameters)) {
    removeEmpty(c.url_parameters);
    if (Object.keys(c.url_parameters).length === 0) delete c.url_parameters;
  }

  return c;
}

// An object id with * stands for all the objects of the model whose name matches it, as an object
// group would: Lamp_* is Lamp_1, Lamp_2, Lamp_kitchen... null for a plain object id.
export function objectPattern(id: string): RegExp | null {
  if (typeof id !== 'string' || !id.includes('*')) return null;
  const escaped = id.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('^' + escaped.replace(/\*/g, '.*') + '$');
}

// The names matching an object id: itself when it is a plain id, the matching names (in the order
// of the model) when it has *.
export function matchObjects(id: string, names: string[]): string[] {
  const pattern = objectPattern(id);
  return pattern ? names.filter((name) => pattern.test(name)) : [id];
}
