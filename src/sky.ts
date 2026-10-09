// The sky behind the model (backgroundColor: sky): from the deep blue of the night to the orange of
// sunrise and sunset and the light blue of the day, following the elevation of the sun, and greyer
// with clouds. No three.js: the tests run in Node.

type RGB = [number, number, number];

// Elevation of the sun (degrees) and the colours of the sky at the top and at the horizon.
const KEYS: [number, string, string][] = [
  [-18, '#0b1026', '#1c2541'], // night
  [-10, '#141d45', '#2f3566'], // late twilight
  [-4, '#22306a', '#7a5f93'], // blue hour
  [0, '#3a5596', '#f0955f'], // sunrise and sunset
  [5, '#5384c8', '#f5c38a'], // golden hour
  [12, '#4a8edb', '#bcdaf2'], // morning and evening
  [30, '#3b87d9', '#cde6fa'], // day
];

const rgb = (hex: string): RGB => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as RGB;
const hex = (c: RGB): string => '#' + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as RGB;

// Clouds (0 to 1) turn the colours to grey, a little darker.
function cloudy(c: RGB, clouds: number): RGB {
  const grey = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) * (1 - 0.15 * clouds);
  return mix(c, [grey, grey, grey], 0.75 * clouds);
}

// [top, horizon] as #rrggbb. Without a known elevation the sky is the one of the day.
export function skyColors(elevation: number, clouds = 0): [string, string] {
  const e = isNaN(elevation) ? 45 : elevation;
  let top = rgb(KEYS[KEYS.length - 1][1]);
  let horizon = rgb(KEYS[KEYS.length - 1][2]);
  if (e <= KEYS[0][0]) {
    top = rgb(KEYS[0][1]);
    horizon = rgb(KEYS[0][2]);
  } else {
    for (let k = 1; k < KEYS.length; k++) {
      if (e > KEYS[k][0]) continue;
      const [e0, t0, h0] = KEYS[k - 1];
      const [e1, t1, h1] = KEYS[k];
      const t = (e - e0) / (e1 - e0);
      top = mix(rgb(t0), rgb(t1), t);
      horizon = mix(rgb(h0), rgb(h1), t);
      break;
    }
  }
  const c = Math.min(1, Math.max(0, clouds));
  return [hex(cloudy(top, c)), hex(cloudy(horizon, c))];
}

export const skyGradient = ([top, horizon]: [string, string]): string => `linear-gradient(to bottom, ${top}, ${horizon})`;

// How cloudy a weather entity says the sky is, 0 to 1: its cloud_coverage, else its condition.
const CONDITION_CLOUDS: { [condition: string]: number } = {
  'clear-night': 0,
  sunny: 0,
  windy: 0.2,
  partlycloudy: 0.45,
  exceptional: 0.5,
  'windy-variant': 0.6,
  fog: 0.85,
  cloudy: 0.9,
  rainy: 0.95,
  snowy: 0.95,
  pouring: 1,
  'snowy-rainy': 1,
  hail: 1,
  lightning: 1,
  'lightning-rainy': 1,
};

export function weatherClouds(stateObj?: { state: string; attributes: { [key: string]: unknown } }): number {
  if (!stateObj) return 0;
  const coverage = Number(stateObj.attributes && stateObj.attributes.cloud_coverage);
  if (stateObj.attributes && stateObj.attributes.cloud_coverage != null && !isNaN(coverage)) return Math.min(1, Math.max(0, coverage / 100));
  return CONDITION_CLOUDS[stateObj.state] ?? 0;
}
