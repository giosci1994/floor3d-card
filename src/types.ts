/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionConfig, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'floor3d-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

// TODO Add your configuration elements here for type-checking
export interface Floor3dCardConfig {
  type: string;
  path: string;
  name: string;
  font: string;
  attribute: string;
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
  camera_popup_show?: string | boolean; // their picture when a sensor goes off
  camera_popup_position?: string; // bottom-right by default
  camera_popup_duration?: number | string; // seconds after the sensor is off again, 20 by default
  // backgroundColor: sky, at night.
  stars_show?: string | boolean;
  moon_show?: string | boolean;
  moon_size?: number | string; // width of the moon in pixels, 30 by default
  sky_clouds?: string | boolean; // no: the sky ignores the clouds of the weather entity
  ground?: string; // grass or a colour: a surface under the house (ground.ts)
  globalLightPower: number | string; // a number or a numeric sensor
  hideLevelsMenu: string;
  initialLevel: number;
  selectionMode: string;
  editModeNotifications: string;
  shadow: string;
  entities: any;
  lock_camera: string;
  click: string;
  action: string;
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
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  entity: string;
  entity_template: string;
  cover: any;
  type3d: string;
  object_id: string;
  object_groups: any;
  object_group: string;
  zoom_areas: any;
  objects: any;
  lumens: number;
  decay: number;
  distance: number;
  colorcondition: any;
  light: any;
  door: any;
  doortype: string;
  extralightmode: string;
  room: any;
  zoom: string;
  elevation: number;
  transparency: number;
  show_axes: string;
  label: string;
  label_text: string;
  side: string;
  direction: string;
  degrees: number;
  percentage: number;
  hinge: string;
  pane: string;
  text: any;
  gesture: any;
  rotate: any;
  round_per_second: number;
  axis: string;
  span: string;
  vertical_alignment: string;
  textbgcolor: string;
  textfgcolor: string;
  camera_position: any;
  camera_rotate: any;
  camera_target: any;
  light_direction: any;
  light_target: string;
  radius: number;
  sky: string;
  north: any;
  x: number;
  y: number;
  z: number;
  hide: any;
  show: any;
  state: string;
  target: any;
  domain: string;
  camera: string;
  service: string;
  color: string;
  show_warning: boolean;
  show_error: boolean;
  language: string; // en, it, de, nb; missing or auto: the language of the user
  hideZoomMenu: string;
  // Rendering (three.js 0.186 build)
  exposure: number | string;
  tone_mapping: string;
  light_power: number | string;
  max_pixel_ratio: number | string;
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
  long_press_action: string;
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
  alarm: any; // options of type3d: alarm
  climate: any; // options of type3d: climate
  temperature_min: number | string;
  temperature_max: number | string;
  illuminance_min: number | string;
  illuminance_max: number | string;
  shower: any;
  tracker: any;
  image: any;
  info: any;
}

export interface EntityFloor3dCardConfig {
  hide: any;
  entity: string;
  type3d: 'light' | 'color' | 'hide' | 'text';
  object_id: string;
  lumens: number;
  conditions: ConditionsFloor3dCardConfig[];
  state: string;
}

export interface ConditionsFloor3dCardConfig {
  condition: string;
  state: string;
  color: string;
}
