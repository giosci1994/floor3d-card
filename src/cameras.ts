/* eslint-disable @typescript-eslint/no-explicit-any */
// The cameras of the card (cameras:): an icon on the map at a point of the model, and their picture,
// which pops up in a corner when their doorbell or motion sensor goes off. What they show is worked
// out here, without three.js and without Home Assistant, so that the tests run in Node.

export interface CameraItem {
  entity: string;
  position?: [number, number, number]; // a point of the model: where its icon goes
  level?: number; // the icon shows only with this level
  name?: string;
  icon?: string;
  popup_on: string[]; // the entities that make its picture pop up
}

interface State {
  state: string;
  attributes: { [key: string]: unknown };
}
type States = { [id: string]: State | undefined };

// [x, y, z] from a list or from { x, y, z }; undefined unless the three are numbers.
export function point(value: unknown): [number, number, number] | undefined {
  const v: any = value;
  const list = Array.isArray(v) ? v : v && typeof v === 'object' ? [v.x, v.y, v.z] : [];
  if (list.length !== 3 || list.some((n: unknown) => n === null || n === '' || typeof n === 'boolean')) return undefined;
  const numbers = list.map(Number);
  return numbers.every((n: number) => isFinite(n)) ? (numbers as [number, number, number]) : undefined;
}

const ids = (value: unknown): string[] =>
  (Array.isArray(value) ? value : value ? [value] : []).filter((id: unknown) => typeof id === 'string' && id !== '') as string[];

// cameras: camera ids, or { entity, position, level, name, icon, popup_on }.
export function cameraList(value: unknown): CameraItem[] {
  return (Array.isArray(value) ? value : value ? [value] : [])
    .map((c: any): CameraItem | null => {
      if (typeof c === 'string') return c ? { entity: c, popup_on: [] } : null;
      if (!c || typeof c !== 'object' || !c.entity) return null;
      const level = c.level === '' || c.level === null || c.level === undefined ? NaN : Number(c.level);
      return {
        entity: String(c.entity),
        position: point(c.position),
        level: Number.isInteger(level) && level >= 0 ? level : undefined,
        name: c.name ? String(c.name) : undefined,
        icon: c.icon ? String(c.icon) : undefined,
        popup_on: ids(c.popup_on),
      };
    })
    .filter((c): c is CameraItem => !!c);
}

export const cameraName = (camera: CameraItem, stateObj?: State): string =>
  camera.name || String((stateObj && stateObj.attributes.friendly_name) || camera.entity);

// The picture of a camera now: its entity_picture (the proxy of Home Assistant, with its token) and
// the time, so that the browser asks for a new one.
export function snapshotUrl(stateObj: State | undefined, now: number): string | undefined {
  const picture = stateObj && stateObj.attributes.entity_picture;
  if (typeof picture !== 'string' || !picture) return undefined;
  return picture + (picture.includes('?') ? '&' : '?') + 't=' + now;
}

// --- The pictures that pop up (camera_popup) -------------------------------------------------------

// What the card remembers between two updates: the last state of each sensor, and for each camera
// when it went off (since), until when its picture stays (until, once its sensors are off again),
// whether a sensor is on now and which one went off last. dismissed: the pictures that went off
// before this time were closed.
export interface PopupMemory {
  states: { [id: string]: string | undefined };
  cameras: { [entity: string]: { since: number; until: number; on: boolean; trigger?: string } };
  dismissed: number;
}

export const newPopupMemory = (): PopupMemory => ({ states: {}, cameras: {}, dismissed: -Infinity });

const NO_EVENT = ['unavailable', 'unknown', ''];

// Reads the sensors of the cameras now. A sensor (binary_sensor, input_boolean...) keeps the picture
// while it is on, and for duration ms once off. An event entity (the doorbell of many integrations)
// changes its state, the time of the event, at each event: the picture stays for duration ms. A
// sensor already on when the card opens counts, an event that happened before doesn't.
// Returns the cameras to show, the last to go off first, and when the first of them goes away.
export function popupStep(
  memory: PopupMemory,
  cameras: CameraItem[],
  states: States,
  now: number,
  duration: number,
): { showing: { entity: string; trigger?: string }[]; next?: number } {
  const sensors = Array.from(new Set(cameras.flatMap((c) => c.popup_on)));
  const changes: { [id: string]: { on: boolean; started: boolean } } = {};
  sensors.forEach((id) => {
    const stateObj = states[id];
    const state = stateObj ? String(stateObj.state) : undefined;
    const before = memory.states[id];
    if (id.startsWith('event.')) {
      // The time of the last event: kept while the entity is unavailable, so that the same time
      // coming back is not a new event ('' when the first state seen was not an event).
      const valid = state !== undefined && !NO_EVENT.includes(state);
      changes[id] = { on: false, started: valid && before !== undefined && state !== before };
      if (valid) memory.states[id] = state;
      else if (before === undefined) memory.states[id] = '';
    } else {
      changes[id] = { on: state === 'on', started: state === 'on' && before !== 'on' };
      memory.states[id] = state;
    }
  });
  const showing: { entity: string; trigger?: string; since: number }[] = [];
  let next: number | undefined;
  const done = new Set<string>();
  cameras.forEach((camera) => {
    // A camera listed twice: once.
    if (!camera.popup_on.length || done.has(camera.entity)) return;
    done.add(camera.entity);
    const c = memory.cameras[camera.entity] || (memory.cameras[camera.entity] = { since: 0, until: 0, on: false });
    let on = false;
    camera.popup_on.forEach((id) => {
      const change = changes[id];
      if (change.started) {
        c.since = now;
        c.trigger = id;
        if (id.startsWith('event.')) c.until = Math.max(c.until, now + duration);
      }
      if (change.on) on = true;
    });
    if (c.on && !on) c.until = Math.max(c.until, now + duration);
    c.on = on;
    if (c.since <= memory.dismissed || !(on || now < c.until)) return;
    showing.push({ entity: camera.entity, trigger: c.trigger, since: c.since });
    if (!on && (next === undefined || c.until < next)) next = c.until;
  });
  showing.sort((a, b) => b.since - a.since);
  return { showing: showing.map(({ entity, trigger }) => ({ entity, trigger })), next };
}
