/* eslint-disable @typescript-eslint/no-explicit-any */
// The boxes in the corners of the card, next to the weather: what is on or open (status), energy,
// people, alarm panel and chips. What they show is worked out here, without three.js and without
// Home Assistant, so that the tests run in Node.

export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export const CORNERS: Corner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
export const corner = (value: unknown, fallback: Corner): Corner => (CORNERS.includes(value as Corner) ? (value as Corner) : fallback);

// The boxes, in the order they stack from their corner.
export const BOX_KINDS = ['alarm_panel', 'status', 'people', 'energy', 'weather', 'chips'];

interface State {
  state: string;
  attributes: { [key: string]: unknown };
}
type States = { [id: string]: State | undefined };

const number = (value: unknown): number => (value === null || value === undefined || value === '' ? NaN : Number(value));

// --- What is on or open ------------------------------------------------------------------------

export type StatusKind = 'lights' | 'open' | 'unlocked' | 'climate';
export const STATUS_KINDS: StatusKind[] = ['lights', 'open', 'unlocked', 'climate'];
export const STATUS_ICONS: { [kind in StatusKind]: string } = {
  lights: 'mdi:lightbulb-on',
  open: 'mdi:door-open',
  unlocked: 'mdi:lock-open-variant',
  climate: 'mdi:radiator',
};
// The colour of the outline of their objects in the model.
export const STATUS_COLORS: { [kind in StatusKind]: string } = {
  lights: '#ffd54f',
  open: '#4fc3f7',
  unlocked: '#ff7043',
  climate: '#ff6a00',
};

const OPENINGS = ['door', 'window', 'garage_door', 'opening'];
const COVER_OPENINGS = ['door', 'garage', 'gate', 'window'];

// Whether a heater or a cooler works (climateAction of maps.ts, given by the card).
export type Working = (stateObj: any, mode: 'heat' | 'cool') => unknown;

// What an entity of the card says about the house, if anything: a lamp on, a door or a window
// open (a door of the model, or the sensor of one), a lock open, a heater or a cooler working.
// Shutters and blinds open are not left open: they don't count.
export function statusKind(
  entity: { entity?: string; type3d?: string; climate?: { mode?: string } },
  stateObj: State | undefined,
  working: Working,
): StatusKind | null {
  if (!stateObj || !entity || !entity.entity) return null;
  const domain = entity.entity.split('.')[0];
  const state = stateObj.state;
  const deviceClass = String(stateObj.attributes.device_class || '');
  if (entity.type3d === 'light') return state === 'on' ? 'lights' : null;
  if (domain === 'lock') return ['unlocked', 'unlocking', 'open', 'opening'].includes(state) ? 'unlocked' : null;
  if (entity.type3d === 'door' || (domain === 'binary_sensor' && OPENINGS.includes(deviceClass))) {
    return state === 'on' || state === 'open' || state === 'opening' ? 'open' : null;
  }
  if (domain === 'cover' && COVER_OPENINGS.includes(deviceClass)) return state === 'open' || state === 'opening' ? 'open' : null;
  if (entity.type3d === 'climate') {
    return working(stateObj, entity.climate && entity.climate.mode === 'cool' ? 'cool' : 'heat') ? 'climate' : null;
  }
  return null;
}

// The entities of each kind (each entity once) and the positions of their rows in the config.
export function statusGroups(entities: any[], states: States, working: Working): { kind: StatusKind; entities: string[]; indices: number[] }[] {
  const groups = new Map<StatusKind, { kind: StatusKind; entities: string[]; indices: number[] }>();
  (entities || []).forEach((entity, index) => {
    if (!entity || typeof entity !== 'object') return;
    const kind = statusKind(entity, states[entity.entity], working);
    if (!kind) return;
    const group = groups.get(kind) || { kind, entities: [], indices: [] };
    if (!group.entities.includes(entity.entity)) group.entities.push(entity.entity);
    group.indices.push(index);
    groups.set(kind, group);
  });
  return STATUS_KINDS.filter((kind) => groups.has(kind)).map((kind) => groups.get(kind));
}

// --- Energy --------------------------------------------------------------------------------------

const POWER_UNITS: { [unit: string]: number } = { w: 1, kw: 1000, mw: 1e6 };

// Power in W from a sensor (W, kW or MW); NaN when it isn't a number.
export function watts(stateObj: State | undefined): number {
  if (!stateObj) return NaN;
  const value = number(stateObj.state);
  const unit = String(stateObj.attributes.unit_of_measurement || 'W')
    .trim()
    .toLowerCase();
  return value * (POWER_UNITS[unit] ?? 1);
}

// 950 W, 1.2 kW (1,2 kW in Italian): watts below 1000, else kilowatts with one decimal.
export function formatPower(w: number, language: string): string {
  if (isNaN(w)) return '';
  const format = (value: number, digits: number) => {
    try {
      return new Intl.NumberFormat(language, { maximumFractionDigits: digits }).format(value);
    } catch {
      return value.toFixed(digits);
    }
  };
  return Math.abs(w) < 1000 ? format(Math.round(w), 0) + ' W' : format(w / 1000, Math.abs(w) < 10000 ? 1 : 0) + ' kW';
}

// The sensors that use the most power now, highest first; none at 0, unavailable or not a number.
export function topConsumers(states: States, sensors: string[], count: number): { entity: string; watts: number }[] {
  return Array.from(new Set(sensors || []))
    .map((entity) => ({ entity, watts: watts(states[entity]) }))
    .filter((c) => !isNaN(c.watts) && c.watts > 0)
    .sort((a, b) => b.watts - a.watts)
    .slice(0, Math.max(0, count));
}

export function batteryIcon(level: number): string {
  if (isNaN(level)) return 'mdi:battery-unknown';
  const tens = Math.round(Math.min(100, Math.max(0, level)) / 10) * 10;
  return tens >= 100 ? 'mdi:battery' : tens <= 0 ? 'mdi:battery-outline' : 'mdi:battery-' + tens;
}

// --- Alarm panel ---------------------------------------------------------------------------------

// The states of an alarm_control_panel: icon and colour (green while armed, orange while it is
// about to change, red and blinking when triggered).
export const PANEL_STATES: { [state: string]: { icon: string; color: string; pulse?: boolean } } = {
  disarmed: { icon: 'mdi:shield-off-outline', color: '#9e9e9e' },
  armed_home: { icon: 'mdi:shield-home', color: '#43a047' },
  armed_away: { icon: 'mdi:shield-lock', color: '#43a047' },
  armed_night: { icon: 'mdi:shield-moon', color: '#43a047' },
  armed_vacation: { icon: 'mdi:shield-airplane', color: '#43a047' },
  armed_custom_bypass: { icon: 'mdi:security', color: '#43a047' },
  arming: { icon: 'mdi:shield-outline', color: '#fb8c00' },
  pending: { icon: 'mdi:shield-outline', color: '#fb8c00' },
  disarming: { icon: 'mdi:shield-outline', color: '#fb8c00' },
  triggered: { icon: 'mdi:bell-ring', color: '#e53935', pulse: true },
};
export const panelLook = (state: string): { icon: string; color: string; pulse?: boolean } =>
  PANEL_STATES[state] || { icon: 'mdi:shield-alert-outline', color: '#9e9e9e' };

// --- People --------------------------------------------------------------------------------------

// The names of rooms and views are compared without case, spaces, _ and -.
export const nameKey = (name: unknown): string =>
  String(name ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '_');

// The room a value names (the state of a sensor such as the area of Bermuda or ESPresense): by
// name or by object id; -1 when none does.
export function matchRoom(value: unknown, rooms: { name?: string; object_id?: string }[]): number {
  const key = nameKey(value);
  if (!key || key === 'unknown' || key === 'unavailable' || key === 'not_home') return -1;
  return (rooms || []).findIndex((room) => room && (nameKey(room.name) === key || nameKey(room.object_id) === key));
}

// A person: at home or not, the zone where they are, and the room, if their room entity names one.
export function personPlace(personState: string | undefined, roomValue: unknown, rooms: { name?: string; object_id?: string }[]): { home: boolean; zone?: string; room: number } {
  const home = personState === 'home';
  const room = home ? matchRoom(roomValue, rooms) : -1;
  const zone = !home && personState && personState !== 'not_home' && personState !== 'unknown' && personState !== 'unavailable' ? personState : undefined;
  return { home, zone, room };
}

export function initials(name: string): string {
  const words = String(name || '?')
    .trim()
    .split(/\s+/)
    .filter((w) => w);
  return ((words[0] || '?')[0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
}

// people: entity ids, or { entity, room } with the entity whose state names the room.
export function peopleList(value: unknown): { entity: string; room?: string }[] {
  return (Array.isArray(value) ? value : value ? [value] : [])
    .map((p: any) => (typeof p === 'string' ? { entity: p } : p && typeof p === 'object' && p.entity ? { entity: String(p.entity), room: p.room ? String(p.room) : undefined } : null))
    .filter((p) => p && p.entity);
}

// chips: entity ids, or { entity, name, icon }.
export function chipList(value: unknown): { entity: string; name?: string; icon?: string }[] {
  return (Array.isArray(value) ? value : value ? [value] : [])
    .map((c: any) =>
      typeof c === 'string' ? { entity: c } : c && typeof c === 'object' && c.entity ? { entity: String(c.entity), name: c.name, icon: c.icon } : null,
    )
    .filter((c) => c && c.entity);
}
