// The markers of the card (markers:): any entity as a chip over the model, with its icon and its
// state, at a point of the model or over an object; a tap opens the entity. What they show is worked
// out here, without three.js and without Home Assistant, so that the tests run in Node.

// [x, y, z] from a list or from { x, y, z }; undefined unless the three are numbers. As point() of
// cameras.ts: the modules tested in Node import nothing of the card.
function point(value: unknown): [number, number, number] | undefined {
  const v: any = value;
  const list = Array.isArray(v) ? v : v && typeof v === 'object' ? [v.x, v.y, v.z] : [];
  if (list.length !== 3 || list.some((n: unknown) => n === null || n === '' || typeof n === 'boolean'))
    return undefined;
  const numbers = list.map(Number);
  return numbers.every((n: number) => isFinite(n)) ? (numbers as [number, number, number]) : undefined;
}

export interface MarkerItem {
  entity: string;
  position?: [number, number, number]; // a point of the model, as the place of a camera
  object_id?: string; // else over the top of this object
  level?: number; // the marker shows only with this level
  name?: string;
  icon?: string;
  state: boolean; // the state next to the icon (state: no, only the icon)
}

// States of an entity that is on, open or doing something: the marker takes the colour of the theme.
const ACTIVE = ['on', 'open', 'opening', 'closing', 'unlocked', 'home', 'playing', 'heat', 'cool', 'detected', 'wet'];
export const markerActive = (state: string | undefined): boolean => !!state && ACTIVE.includes(state);

const no = (value: unknown): boolean => value === false || value === 'no';

// markers: entity ids, or { entity, position, object_id, level, name, icon, state }. A marker
// without a place (neither a position nor an object) is left out.
export function markerList(value: unknown): MarkerItem[] {
  return (Array.isArray(value) ? value : value ? [value] : [])
    .map((m: any): MarkerItem | null => {
      if (!m || typeof m !== 'object' || !m.entity) return null;
      const level = m.level === '' || m.level === null || m.level === undefined ? NaN : Number(m.level);
      const marker: MarkerItem = {
        entity: String(m.entity),
        position: point(m.position),
        object_id: m.object_id ? String(m.object_id) : undefined,
        level: Number.isInteger(level) && level >= 0 ? level : undefined,
        name: m.name ? String(m.name) : undefined,
        icon: m.icon ? String(m.icon) : undefined,
        state: !no(m.state),
      };
      return marker.position || marker.object_id ? marker : null;
    })
    .filter((m): m is MarkerItem => !!m);
}
