/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
// Room maps from sensors, alarms and climate: the rules, without three.js (tests: test/maps.test.mjs).
// The card draws them in _updateStateColors.

// --- Sensor maps --------------------------------------------------------------------------------

export type Aggregate = 'mean' | 'sum' | 'max';
export type Stops = [number, string][]; // value → colour (#rrggbb), from the lowest value

export interface MapScale {
  key: string; // the key of the sensors in a room, and the value of the map in the Map menu
  name?: string; // the name of a map of the configuration; a preset has its text map_<key>
  unit: string; // of the stops and of the label
  stops: Stops;
  aggregate: Aggregate; // of the sensors of a room
  decimals: number; // of the label
  units?: { [unit: string]: number }; // factor from the unit of a sensor (see normalizeUnit) to unit
  unitless?: { unit: string; stops: Stops }; // for sensors without unit (an index)
}

const GREEN = '#22c55e';
const LIME = '#a3e635';
const YELLOW = '#facc15';
const ORANGE = '#f97316';
const RED = '#dc2626';
const PURPLE = '#7e22ce';
const MASS = { 'µg/m³': 1, 'mg/m³': 1000 };

// Maps ready to use: a room with a sensor under one of these keys shows it on the map of that key.
// The colours go from good (green) to bad (red), with the thresholds of the WHO and of the European
// guidelines for indoor air; humidity is good in the middle, dry (orange) or damp (blue) outside.
export const PRESET_MAPS: MapScale[] = [
  {
    key: 'humidity',
    unit: '%',
    stops: [
      [25, '#c2410c'],
      [40, GREEN],
      [60, GREEN],
      [75, '#2563eb'],
    ],
    aggregate: 'mean',
    decimals: 0,
  },
  {
    key: 'co2',
    unit: 'ppm',
    stops: [
      [600, GREEN],
      [800, LIME],
      [1000, YELLOW],
      [1500, ORANGE],
      [2000, RED],
    ],
    aggregate: 'mean',
    decimals: 0,
  },
  {
    key: 'pm25',
    unit: 'µg/m³',
    stops: [
      [5, GREEN],
      [15, YELLOW],
      [35, ORANGE],
      [75, RED],
      [150, PURPLE],
    ],
    aggregate: 'mean',
    decimals: 0,
    units: MASS,
  },
  {
    key: 'pm10',
    unit: 'µg/m³',
    stops: [
      [15, GREEN],
      [45, YELLOW],
      [100, ORANGE],
      [150, RED],
      [300, PURPLE],
    ],
    aggregate: 'mean',
    decimals: 0,
    units: MASS,
  },
  {
    // Total volatile organic compounds, in µg/m³ (ppb are converted with the usual 4.5 of indoor
    // mixtures), or an index without unit such as the VOC index of Sensirion sensors (100: the
    // average of the last days).
    key: 'voc',
    unit: 'µg/m³',
    stops: [
      [200, GREEN],
      [500, YELLOW],
      [1000, ORANGE],
      [3000, RED],
    ],
    aggregate: 'mean',
    decimals: 0,
    units: { ...MASS, ppb: 4.5, ppm: 4500 },
    unitless: {
      unit: '',
      stops: [
        [100, GREEN],
        [150, YELLOW],
        [250, ORANGE],
        [400, RED],
      ],
    },
  },
  {
    // Formaldehyde: the WHO guideline is 100 µg/m³ over 30 minutes (1 ppb = 1.23 µg/m³).
    key: 'hcho',
    unit: 'µg/m³',
    stops: [
      [30, GREEN],
      [60, YELLOW],
      [100, ORANGE],
      [200, RED],
    ],
    aggregate: 'mean',
    decimals: 0,
    units: { ...MASS, ppb: 1.23, ppm: 1230 },
  },
  {
    key: 'radon',
    unit: 'Bq/m³',
    stops: [
      [50, GREEN],
      [100, YELLOW],
      [200, ORANGE],
      [300, RED],
    ],
    aggregate: 'mean',
    decimals: 0,
    units: { 'bq/m³': 1, 'pci/l': 37 },
  },
  {
    key: 'noise',
    unit: 'dB',
    stops: [
      [35, GREEN],
      [50, YELLOW],
      [65, ORANGE],
      [80, RED],
    ],
    aggregate: 'max',
    decimals: 0,
    units: { db: 1, 'db(a)': 1, dba: 1 },
  },
  {
    // The power of the smart plugs of a room, added up.
    key: 'power',
    unit: 'W',
    stops: [
      [0, GREEN],
      [300, LIME],
      [1000, YELLOW],
      [2000, ORANGE],
      [3000, RED],
    ],
    aggregate: 'sum',
    decimals: 0,
    units: { w: 1, kw: 1000 },
  },
];

// Keys of a room that aren't sensors of a map.
export const ROOM_KEYS = ['name', 'object_id', 'temperature', 'illuminance', 'presence', 'alarms', 'climate'];

// µg/m³, ug/m3 and μg/m³ (Greek mu) are the same unit; W and w too.
export function normalizeUnit(unit: unknown): string {
  return String(unit ?? '')
    .trim()
    .toLowerCase()
    .replace(/μ/g, 'µ')
    .replace(/^u(?=g\/)/, 'µ')
    .replace(/m3$/, 'm³')
    .replace(/\s+/g, '');
}

const COLOR = /^#[0-9a-f]{6}$/i;
const toNumber = (v: any): number => (v === '' || v === null || v === undefined ? NaN : Number(v));

// The scales of the maps: the presets, changed or completed by the maps of the configuration
// (maps: [{ key, name, unit, min, max, colors, stops, aggregate, decimals }]). For a preset, min and
// max move its colours between them; colors spreads new colours between min and max; stops gives
// the values and colours one by one. A new key needs min and max (0 and 100 otherwise).
export function mapScales(config: any): MapScale[] {
  const scales = PRESET_MAPS.map((p) => ({ ...p }));
  (Array.isArray(config && config.maps) ? config.maps : []).forEach((def: any) => {
    const key = def && typeof def.key === 'string' ? def.key.trim() : '';
    if (!key || ROOM_KEYS.includes(key)) return;
    const at = scales.findIndex((s) => s.key === key);
    const scale = buildScale(def, at >= 0 ? scales[at] : undefined);
    if (at >= 0) scales[at] = scale;
    else scales.push(scale);
  });
  return scales;
}

export function buildScale(def: any, preset?: MapScale): MapScale {
  const base: MapScale = preset
    ? { ...preset }
    : {
        key: def.key,
        unit: '',
        stops: [
          [0, GREEN],
          [50, YELLOW],
          [100, RED],
        ],
        aggregate: 'mean',
        decimals: 1,
      };
  const first = base.stops[0][0];
  const last = base.stops[base.stops.length - 1][0];
  let min = toNumber(def.min);
  let max = toNumber(def.max);
  if (isNaN(min)) min = first;
  if (isNaN(max)) max = last;
  if (max <= min) max = min + 1;
  let stops = base.stops;
  const explicit = Array.isArray(def.stops)
    ? def.stops
        .map((s: any): [number, string] => (Array.isArray(s) ? [toNumber(s[0]), String(s[1])] : [toNumber(s && s.value), String(s && s.color)]))
        .filter(([v, c]) => !isNaN(v) && COLOR.test(c))
        .sort((a, b) => a[0] - b[0])
    : [];
  const colors = Array.isArray(def.colors) ? def.colors.map(String).filter((c) => COLOR.test(c)) : [];
  if (explicit.length >= 2) stops = explicit;
  else if (colors.length >= 2) stops = colors.map((c, i): [number, string] => [min + ((max - min) * i) / (colors.length - 1), c]);
  else if (min !== first || max !== last) {
    // The colours of the preset, moved between min and max.
    stops = base.stops.map(([v, c]): [number, string] => [min + ((v - first) / (last - first || 1)) * (max - min), c]);
  }
  const aggregate = ['mean', 'sum', 'max'].includes(def.aggregate) ? def.aggregate : base.aggregate;
  const decimals = toNumber(def.decimals);
  return {
    ...base,
    key: preset ? preset.key : def.key,
    name: def.name ? String(def.name) : base.name,
    unit: def.unit !== undefined && def.unit !== null ? String(def.unit) : base.unit,
    stops,
    aggregate,
    decimals: isNaN(decimals) ? base.decimals : Math.max(0, Math.min(3, Math.round(decimals))),
  };
}

// The entity ids of the sensors of a room for a map: one id or a list.
export function roomSensors(room: any, key: string): string[] {
  const value = room ? room[key] : undefined;
  return (Array.isArray(value) ? value : value ? [value] : []).filter((id: any) => typeof id === 'string' && id);
}

export interface Reading {
  value: number;
  stops: Stops;
  unit: string;
}

// The value of a room on a map, from the states of its sensors: converted to the unit of the map,
// then averaged (or added up, or the highest). Sensors unavailable or not numeric don't count;
// none left: undefined (the room isn't coloured).
export function roomReading(scale: MapScale, states: any[]): Reading | undefined {
  const withUnit: number[] = [];
  const index: number[] = [];
  states.forEach((s) => {
    if (!s) return;
    const n = parseFloat(s.state);
    if (!isFinite(n)) return;
    const unit = normalizeUnit(s.attributes && s.attributes.unit_of_measurement);
    if (!unit && scale.unitless) {
      index.push(n);
      return;
    }
    const factor = scale.units && scale.units[unit];
    withUnit.push(factor !== undefined ? n * factor : n);
  });
  const values = withUnit.length ? withUnit : index;
  if (!values.length) return undefined;
  const value =
    scale.aggregate === 'sum'
      ? values.reduce((a, b) => a + b, 0)
      : scale.aggregate === 'max'
      ? Math.max(...values)
      : values.reduce((a, b) => a + b, 0) / values.length;
  if (!withUnit.length && scale.unitless) return { value, stops: scale.unitless.stops, unit: scale.unitless.unit };
  return { value, stops: scale.stops, unit: scale.unit };
}

const channels = (hex: string): number[] => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// The colour of a value: between the two stops around it, mixed as a CSS gradient does (in sRGB),
// so that the legend shows the same colours as the rooms.
export function colorAt(stops: Stops, value: number): string {
  if (value <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [v1, c1] = stops[i];
    if (value <= v1) {
      const [v0, c0] = stops[i - 1];
      const k = (value - v0) / (v1 - v0 || 1);
      const a = channels(c0);
      const b = channels(c1);
      return '#' + a.map((x, j) => Math.round(x + (b[j] - x) * k).toString(16).padStart(2, '0')).join('');
    }
  }
  return stops[stops.length - 1][1];
}

// The CSS gradient of a legend for these stops.
export function legendGradient(stops: Stops): string {
  const first = stops[0][0];
  const span = stops[stops.length - 1][0] - first || 1;
  return 'linear-gradient(to right, ' + stops.map(([v, c]) => `${c} ${Math.round(((v - first) / span) * 1000) / 10}%`).join(', ') + ')';
}

// --- Alarms -------------------------------------------------------------------------------------

// States of a sensor that mean the alarm is on.
export const ALARM_STATES = ['on', 'detected', 'wet', 'triggered', 'alarm'];

export interface AlarmKind {
  key: string; // its text is alarm_<key>
  color: string;
  priority: number; // 0 first: fire and gas before water, water before a problem
}

// The kind of an alarm, from the device class of its sensor in Home Assistant.
export function alarmKind(deviceClass: unknown): AlarmKind {
  switch (deviceClass) {
    case 'smoke':
      return { key: 'smoke', color: '#ff3b30', priority: 0 };
    case 'gas':
      return { key: 'gas', color: '#ff3b30', priority: 0 };
    case 'carbon_monoxide':
      return { key: 'co', color: '#ff3b30', priority: 0 };
    case 'heat':
      return { key: 'heat', color: '#ff6a00', priority: 1 };
    case 'moisture':
      return { key: 'water', color: '#2f80ff', priority: 2 };
    case 'cold':
      return { key: 'cold', color: '#38bdf8', priority: 3 };
    case 'safety':
      return { key: 'safety', color: '#f59e0b', priority: 4 };
    case 'problem':
      return { key: 'problem', color: '#f59e0b', priority: 4 };
    case 'tamper':
      return { key: 'tamper', color: '#f59e0b', priority: 5 };
    default:
      return { key: 'generic', color: '#ff3b30', priority: 1 };
  }
}

// The alarms on among these states (one per sensor), the most serious first.
export function activeAlarms(states: any[]): AlarmKind[] {
  return states
    .filter((s) => s && ALARM_STATES.includes(String(s.state).toLowerCase()))
    .map((s) => alarmKind(s.attributes && s.attributes.device_class))
    .sort((a, b) => a.priority - b.priority);
}

// --- Climate ------------------------------------------------------------------------------------

export type ClimateAction = 'heat' | 'cool' | 'dry' | null;

// What a heater or a cooler is doing. A thermostat (climate.*) says it in hvac_action; without it,
// its mode and the current and target temperatures tell it. Any other entity (a boiler switch, the
// plug of an electric radiator) heats while it is on, or cools with onMode: cool.
export function climateAction(stateObj: any, onMode: 'heat' | 'cool' = 'heat'): ClimateAction {
  if (!stateObj || ['unavailable', 'unknown'].includes(stateObj.state)) return null;
  const a = stateObj.attributes || {};
  const domain = String(stateObj.entity_id || '').split('.')[0];
  if (domain !== 'climate') return stateObj.state === 'on' ? onMode : null;
  if (a.hvac_action) {
    if (['heating', 'preheating'].includes(a.hvac_action)) return 'heat';
    if (a.hvac_action === 'cooling') return 'cool';
    if (a.hvac_action === 'drying') return 'dry';
    return null; // idle, off, fan
  }
  const current = parseFloat(a.current_temperature);
  const target = parseFloat(a.temperature);
  const low = parseFloat(a.target_temp_low);
  const high = parseFloat(a.target_temp_high);
  switch (stateObj.state) {
    case 'heat':
      return isFinite(current) && isFinite(target) && current >= target ? null : 'heat';
    case 'cool':
      return isFinite(current) && isFinite(target) && current <= target ? null : 'cool';
    case 'heat_cool':
    case 'auto':
      if (isFinite(current) && isFinite(low) && current < low) return 'heat';
      if (isFinite(current) && isFinite(high) && current > high) return 'cool';
      return null;
    case 'dry':
      return 'dry';
    default:
      return null; // off, fan_only
  }
}

export const CLIMATE_COLORS = { heat: '#ff6a00', cool: '#38bdf8', dry: '#14b8a6' };

// The target of a thermostat for a label: "22" or "20–24" (heat_cool), undefined when it is off or
// has none.
export function climateTarget(stateObj: any, format: (n: number) => string): string | undefined {
  if (!stateObj || ['off', 'unavailable', 'unknown'].includes(stateObj.state)) return undefined;
  const a = stateObj.attributes || {};
  const target = parseFloat(a.temperature);
  if (isFinite(target)) return format(target);
  const low = parseFloat(a.target_temp_low);
  const high = parseFloat(a.target_temp_high);
  if (isFinite(low) && isFinite(high)) return format(low) + '–' + format(high);
  return undefined;
}
