// Objects of the rotate type that turn to the angle of a sensor (rotate.angle_entity), as a weather
// vane to the direction of the wind. No three.js: the tests run in Node.

const number = (value: unknown, fallback: number): number => {
  const n = value === undefined || value === null || value === '' ? NaN : Number(value);
  return isFinite(n) ? n : fallback;
};

// The angle to turn to, in radians, from a state in degrees: kept within angle_min and angle_max (0
// and 360 by default), then angle_offset added (where the 0 of the sensor is on the model). wrap: the
// range is a whole turn, so the object goes the shorter way (from 350 to 10 through 0). null: the
// state is not a number (unavailable, unknown).
export function rotationAngle(state: unknown, min?: unknown, max?: unknown, offset?: unknown): { angle: number; wrap: boolean } | null {
  const value = state === undefined || state === null || String(state).trim() === '' ? NaN : Number(state);
  if (!isFinite(value)) return null;
  let low = number(min, 0);
  let high = number(max, 360);
  if (low > high) [low, high] = [high, low];
  const degrees = Math.min(high, Math.max(low, value)) + number(offset, 0);
  return { angle: (degrees * Math.PI) / 180, wrap: high - low >= 360 };
}

// One step from the angle now to the target, of at most step radians; the target itself once it is
// that close. With wrap the shorter way round.
export function turnToward(current: number, target: number, step: number, wrap: boolean): number {
  let difference = target - current;
  if (wrap) difference = ((((difference + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
  if (Math.abs(difference) <= step) return target;
  return current + Math.sign(difference) * step;
}
