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

// --- The night: stars and the moon (stars_show, moon_show) -------------------------------------------

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));
const smooth = (from: number, to: number, x: number): number => {
  const t = clamp01((x - from) / (to - from));
  return t * t * (3 - 2 * t);
};

// How much the stars and the moon show, 0 to 1. The stars come out when the sun is 3° below the
// horizon and are all there at 12° below; the moon shows from the sunset. Clouds hide the stars, the
// moon a little less. In steps of 0.02: the background is drawn again only when it shows.
export function nightSky(elevation: number, clouds = 0): { stars: number; moon: number } {
  if (isNaN(elevation)) return { stars: 0, moon: 0 };
  const c = clamp01(clouds);
  const step = (x: number): number => Math.round(x * 50) / 50;
  return {
    stars: step(smooth(-3, -12, elevation) * (1 - c) * (1 - c)),
    moon: step(smooth(2, -6, elevation) * (1 - 0.85 * c)),
  };
}

const SYNODIC_MONTH = 29.530588853; // days from a new moon to the next
const NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

// Where the moon is in its cycle, 0 to 1: 0 new moon, 0.25 first quarter, 0.5 full moon, 0.75 last
// quarter. From the mean cycle: within about half a day of the real one, enough for the picture.
export function moonPhase(date: Date): number {
  const phase = ((date.getTime() - NEW_MOON) / 86400000 / SYNODIC_MONTH) % 1;
  return phase < 0 ? phase + 1 : phase;
}

// The lit part of a moon of radius r, centred on 0,0, lit on the right: half the disc, closed by the
// edge of the shadow (half an ellipse, bulging out for a crescent and in for a gibbous moon).
export function moonPath(phase: number, r: number): string {
  const k = Math.cos(2 * Math.PI * phase);
  const rx = Math.round(r * Math.abs(k) * 100) / 100;
  return `M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${rx} ${r} 0 0 ${k > 0 ? 0 : 1} 0 ${-r}Z`;
}

// The moon: its lit part, the rest of the disc faint (the earthshine) and a halo as bright as the moon
// is full. Growing it is lit on the right, waning on the left; the other way round south of the
// equator.
export function moonSvg(phase: number, southern = false, opacity = 1): string {
  const lit = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  const mirror = phase > 0.5 !== southern;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" width="100" height="100" opacity="${opacity}">` +
    `<defs><radialGradient id="h"><stop offset="0.35" stop-color="#fff" stop-opacity="${(0.3 * lit).toFixed(2)}"/>` +
    `<stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>` +
    `<circle r="50" fill="url(#h)"/><circle r="18" fill="#c8d2e6" fill-opacity="0.12"/>` +
    `<path d="${moonPath(phase, 18)}" fill="#f6f1de"${mirror ? ' transform="scale(-1 1)"' : ''}/></svg>`
  );
}

// The stars, always the same ones: more of them up high and fainter towards the horizon, where the
// sky is lighter. A strip 1600 x 900 pixels from the top of the card, repeated sideways: the stars
// are as big on every card.
let starCircles: string | undefined;
export function starsSvg(opacity = 1): string {
  if (!starCircles) {
    let seed = 20261009;
    const random = (): number => {
      // mulberry32
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const circles: string[] = [];
    for (let i = 0; i < 280; i++) {
      const x = random() * 1600;
      const y = Math.pow(random(), 1.6) * 800;
      const r = 0.7 + 1.3 * Math.pow(random(), 5);
      const o = (0.45 + 0.55 * random()) * (1 - (0.75 * y) / 800);
      circles.push(`<circle cx="${Math.round(x)}" cy="${Math.round(y)}" r="${r.toFixed(1)}" fill-opacity="${o.toFixed(2)}"/>`);
    }
    starCircles = circles.join('');
  }
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">' +
    `<g fill="#fff" opacity="${opacity}">${starCircles}</g></svg>`
  );
}

const svgUrl = (svg: string): string => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

// backgroundColor: sky. The CSS background: the gradient of the sky and, at night, the stars and the
// moon over it (phase from moonPhase, southern south of the equator).
export function skyBackground(
  elevation: number,
  clouds = 0,
  night: { stars?: boolean; moon?: boolean; phase?: number; southern?: boolean } = {},
): string {
  const shown = nightSky(elevation, clouds);
  const layers: string[] = [];
  if (night.moon && shown.moon > 0 && night.phase !== undefined && !isNaN(night.phase)) {
    // A new picture every hour or so of the cycle, not at every update.
    const phase = (Math.round(night.phase * 200) / 200) % 1;
    layers.push(`${svgUrl(moonSvg(phase, night.southern, shown.moon))} 78% 12% / 60px 60px no-repeat`);
  }
  if (night.stars && shown.stars > 0) layers.push(`${svgUrl(starsSvg(shown.stars))} 0 0 / 1600px 900px repeat-x`);
  layers.push(skyGradient(skyColors(elevation, clouds)));
  return layers.join(', ');
}
