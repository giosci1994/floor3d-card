import type { LovelaceCard, LovelaceCardEditor } from './ha';

declare global {
  interface HTMLElementTagNameMap {
    'floor3d-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface Floor3dCardConfig {
  type: string;
  path: string;
  name: string;
  objfile: string;
  mtlfile: string;
  objectlist: string;
  style: string;
  header: string;
  backgroundColor: string;
  weather?: string; // weather entity of the forecast box
  weather_position?: string; // top-left, top-right, bottom-left (default) or bottom-right
  weather_forecast?: string; // daily (default), hourly or twice_daily
  weather_count?: number | string; // forecasts shown, 4 by default
  // Boxes in the corners (boxes.ts), each with its *_position.
  // *_show: no hides a box and keeps its settings; status_show: yes shows what is on or open.
  weather_show?: string | boolean;
  status_show?: string | boolean;
  energy_show?: string | boolean;
  people_show?: string | boolean;
  alarm_panel_show?: string | boolean;
  chips_show?: string | boolean;
  hideMapMenu?: string | boolean;
  status_position?: string;
  energy_power?: string; // power of the house
  energy_solar?: string;
  energy_grid?: string; // positive from the grid, negative to it
  energy_battery?: string; // charge in %
  energy_plugs?: string[]; // the plugs ranked; the power sensors of the rooms without it
  energy_top?: number | string; // plugs shown, 3 by default
  energy_position?: string;
  people?: any; // person ids, or { entity, room }
  people_position?: string;
  alarm_panel?: string; // an alarm_control_panel
  alarm_panel_position?: string;
  chips?: any; // entity ids, or { entity, name, icon }
  chips_position?: string;
  // Cameras (cameras.ts): ids, or { entity, position, level, name, icon, popup_on }.
  cameras?: any;
  cameras_show?: string | boolean; // their icons on the map
  cameras_button?: string | boolean; // a button by the menus that hides and shows them, on the device
  camera_popup_show?: string | boolean; // their picture when a sensor goes off
  camera_popup_position?: string; // bottom-right by default
  camera_popup_duration?: number | string; // seconds after the sensor is off again, 20 by default
  // backgroundColor: sky, at night.
  stars_show?: string | boolean;
  moon_show?: string | boolean;
  moon_size?: number | string; // width of the moon in pixels, 30 by default
  sky_clouds?: string | boolean; // no: the sky ignores the clouds of the weather entity
  ground?: string; // grass or a colour: a surface under the house (ground.ts)
  ground_floor_level?: number | string; // Y offset for ground positioning (useful with basements)
  walls?: string; // none, fade (the walls in the way of the view fade) or low (cut at walls_height)
  walls_objects?: string; // the walls: wall_* by default, the walls of Sweet Home 3D
  walls_opacity?: number | string; // fade: how much of a faded wall shows, 0.15 by default
  walls_height?: number | string; // low: the height of the cut above the floor, 100 cm by default
  globalLightPower: number | string; // a number or a numeric sensor
  hideLevelsMenu: string;
  initialLevel: number;
  selectionMode: string;
  editModeNotifications: string;
  shadow: string;
  entities: EntityConfig[];
  lock_camera: string;
  click: string;
  overlay: string;
  width: number;
  height: number;
  overlay_bgcolor: string;
  overlay_fgcolor: string;
  overlay_alignment: string;
  overlay_width: string;
  overlay_height: string;
  overlay_font: string;
  overlay_fontsize: string;
  object_groups: ObjectGroup[];
  zoom_areas: any;
  extralightmode: string;
  zoom: string;
  show_axes: string;
  camera_position: any;
  camera_rotate: any;
  camera_target: any;
  sky: string;
  north: any;
  x: number;
  y: number;
  z: number;
  camera: string;
  show_warning: boolean;
  show_error: boolean;
  language: string; // en, it, de, nb; missing or auto: the language of the user
  hideZoomMenu: string;
  // Rendering (three.js 0.186 build)
  exposure: number | string;
  tone_mapping: string;
  light_power: number | string;
  max_pixel_ratio: number | string;
  quality: string; // high (the default), low, or auto: low on a weak device (see quality.ts)
  max_shadows: number | string; // lamps casting a shadow at once
  kiosk: string; // yes: no header, menus or buttons (see kiosk.ts)
  kiosk_tour: number | string; // seconds of each view of the tour; 0 or missing: no tour
  kiosk_idle: number | string; // seconds after a touch before the tour goes on (60)
  draco_decoder_path: string; // folder of the Draco decoder, for .glb models compressed with Draco
  url_parameters: { zoom?: string }; // query parameters of the page read by the card
  log_depth: string;
  reversed_depth: string;
  sun: string;
  sun_entity: string;
  sun_power: number | string; // a number or a numeric sensor
  sun_shadow: string;
  sun_roof: any;
  sky_power: number | string; // a number or a numeric sensor
  sky_color: string;
  ground_color: string;
  // State colours
  state_colors: string;
  open_color: string;
  alarm_entity: string;
  alarm_color: string;
  presence_color: string;
  rooms: any;
  room_colors: string;
  maps: any; // sensor maps: changed presets and maps of other sensors (see maps.ts)
  alarm_view: string; // yes: the camera goes to a room when one of its alarms goes on
  temperature_min: number | string;
  temperature_max: number | string;
  illuminance_min: number | string;
  illuminance_max: number | string;
}

// An entity of the card (entities): what it does to its objects in the model (type3d), with the
// options of its type in a block of the same name (light, door, cover...).
export interface EntityConfig {
  entity: string;
  type3d: string; // light, color, hide, show, door, cover, text, info, room, rotate, gesture, image...
  object_id?: string; // an object of the model, a name with * (Lamp_*), or an object group <name>
  entity_template?: string; // [[[ ]]]: the state the card uses, from the state of the entity
  action?: string; // a tap on its objects: more-info, overlay or default
  long_press_action?: string;
  light?: any;
  colorcondition?: ColorCondition[] | { [key: string]: ColorCondition }; // type3d: color and room, a colour for each state
  color?: any; // type3d: color: light (the colour of the light while it is on) and glow
  hide?: any;
  show?: any;
  door?: any;
  cover?: any;
  text?: any;
  info?: any;
  room?: any;
  rotate?: any;
  gesture?: any;
  alarm?: any;
  climate?: any;
  shower?: any;
  tracker?: TrackerConfig;
  image?: ImageConfig;
}

// The objects of an entity, found from its object_id (helpers.ts): the card reads them by the
// position of the entity in the configuration.
export interface EntityObjects {
  entity: string;
  objects: { object_id: string }[];
}

// object_groups: several objects under one name, <name> in the object_id of an entity.
export interface ObjectGroup {
  object_group: string;
  objects: { object_id: string }[];
}

// A colour of type3d: color (and room) for a state. glow (color only): the objects also glow in it,
// with this intensity; none without.
export interface ColorCondition {
  state: string;
  color: string; // #rrggbb, a name, or r,g,b
  glow?: number;
}

// type3d: tracker, a person or a robot from x and y sensors (trackers.ts).
export interface TrackerConfig {
  sensor_x?: string;
  sensor_y?: string;
  unit?: 'mm' | 'cm' | 'm';
  scale?: number; // from millimetres to the units of the model, default 0.001
  flip_x?: boolean | 'yes' | 'no';
  flip_y?: boolean | 'yes' | 'no';
  sensor_rotation?: number; // degrees
  sensor_position?: number[]; // [x, y, z] of the sensor in the model
  zone?: string; // an entity whose state is written over the tracker
  label?: 'yes' | 'no';
  color?: string;
  size?: number;
  height?: number;
  // A .glb in place of the pin: relative to path, or an address starting with / or http.
  model?: string;
  model_scale?: number; // the model is in metres: 100 for a model of the house in centimetres
  model_rotation?: number; // degrees, for a model whose front doesn't face +X
  sensor_heading?: string; // the direction in degrees, from x towards y as sensor_x and sensor_y
}

// type3d: image, the picture of an entity on a screen of the model (screens.ts).
export interface ImageConfig {
  attribute?: string; // the attribute with the address of the picture, default entity_picture
  rotate?: number;
  mirror?: boolean | 'yes' | 'no';
  lumens?: number;
  lighting_lumens?: number;
  lighting_direction?: string;
  lighting_distance?: number;
  lighting_off_state?: string;
  lighting_shadow?: 'yes' | 'no';
  // The first entry whose entity is in its state gives the picture, also with the entity off.
  overrides?: ImageOverride[];
  [key: string]: any; // older options (count, color, size, width, height...)
}

export interface ImageOverride {
  entity: string;
  state: string;
  picture: string; // an address: /local/console.png
}
