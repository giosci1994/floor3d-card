// The live demo of the home page: the picture of the hero gets a button, and a tap on it puts the
// card in its place, with the house of public/demo (scripts/demo.mjs) and a Home Assistant that
// only plays a day: the sun goes round, someone comes home, the covers move, the lamps and the TV
// light the rooms at night, a leak makes the bedroom blink. The visitor can only turn and zoom.

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const DEMO = BASE + 'demo/';
const DAY = 60; // seconds of the whole day
const TICK = 0.5; // seconds between two states

const lamp = (n, color) => ({
  entity: 'light.lamp_' + n,
  type3d: 'light',
  object_id: 'lamp_' + n,
  light: { lumens: 900, shadow: 'yes', color },
});

const CONFIG = {
  type: 'custom:floor3d-card',
  path: DEMO,
  objfile: 'home.obj',
  mtlfile: 'home.mtl',
  header: 'no',
  style: 'display: block; position: relative; overflow: hidden; width: 100%; height: 100%;',
  backgroundColor: 'sky',
  shadow: 'yes',
  sun: 'yes',
  sun_roof: ['floor_living', 'floor_bed'],
  globalLightPower: 0.15,
  sky_power: 0.35,
  walls: 'fade',
  hideMapMenu: 'yes',
  hideLevelsMenu: 'yes',
  camera_position: { x: 380, y: 760, z: 820 },
  camera_target: { x: 0, y: 0, z: 0 },
  rooms: [{ name: 'Bedroom', object_id: 'floor_bed', alarms: ['binary_sensor.leak'] }],
  entities: [
    lamp(8),
    lamp(20),
    lamp(11),
    lamp(23),
    {
      entity: 'media_player.tv',
      type3d: 'image',
      object_id: 'tv_screen',
      image: { lumens: 2, lighting_lumens: 400, lighting_shadow: 'no' },
    },
    {
      entity: 'cover.shade',
      type3d: 'cover',
      object_id: '<shade>',
      cover: { pane: 'shade', side: 'up', motion: 'shrink' },
    },
    { entity: 'cover.blind', type3d: 'cover', object_id: 'blind', cover: { side: 'up', motion: 'none', slats: 'blind' } },
    { entity: 'cover.shutter', type3d: 'cover', object_id: 'shutter', cover: { pane: 'shutter', side: 'up' } },
    {
      entity: 'binary_sensor.door_front',
      type3d: 'door',
      object_id: 'door_front',
      door: { doortype: 'swing', side: 'left', direction: 'inner', degrees: 90 },
    },
    {
      entity: 'binary_sensor.door_inner',
      type3d: 'door',
      object_id: 'door_inner',
      door: { doortype: 'swing', side: 'left', direction: 'inner', degrees: 90 },
    },
    {
      entity: 'sensor.anna',
      type3d: 'tracker',
      object_id: 'anna',
      // The card centres the house (1400 cm wide) on the origin: the radar at its corner.
      tracker: { unit: 'cm', scale: 0.1, sensor_position: [-700, 0, -700], color: '#ff7043', label: 'no' },
    },
  ],
  object_groups: [{ object_group: 'shade', objects: ['shade', 'shade_bar'] }],
};

// Where the sun is at the time t of the day (0 to DAY): it rises in the east, is high at noon,
// sets in the west and stays under the horizon for the night.
function sun(t) {
  const f = t / DAY;
  if (f < 0.5) {
    const d = f / 0.5; // the day
    return { azimuth: 90 + 180 * d, elevation: 55 * Math.sin(Math.PI * d) };
  }
  if (f < 0.6) return { azimuth: 270 + (f - 0.5) * 100, elevation: -20 * ((f - 0.5) / 0.1) }; // dusk
  if (f < 0.9) return { azimuth: 280 + (f - 0.6) * 200, elevation: -20 }; // night
  return { azimuth: 340 + (f - 0.9) * 1100, elevation: -20 + 20 * ((f - 0.9) / 0.1) }; // dawn, back to 90
}

// The walk of Anna, in cm of the model: outside the front door, in through the living room, to the
// sofa, and at night to the bedroom. [time, x, z]; before the first and after the last she is away.
const WALK = [
  [4, 1220, 695],
  [8, 1040, 695],
  [12, 900, 700],
  [15, 760, 690],
  [17, 620, 690],
  [20, 450, 780],
  [32, 450, 780],
  [35, 620, 690],
  [37, 760, 690],
  [40, 950, 560],
  [54, 950, 560],
];
function anna(t) {
  if (t < WALK[0][0] || t > WALK[WALK.length - 1][0]) return null;
  for (let i = 1; i < WALK.length; i++) {
    const [t1, x1, z1] = WALK[i];
    const [t0, x0, z0] = WALK[i - 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return [x0 + (x1 - x0) * k, z0 + (z1 - z0) * k];
    }
  }
  return null;
}

const between = (t, a, b) => t >= a && t < b;

// Every entity of the demo at the time t of the day.
function statesAt(t) {
  const s = sun(t);
  const night = between(t, 29, 56);
  const lampOn = (start, end) => between(t, start, end);
  const light = (n, on, rgb) => [
    'light.lamp_' + n,
    on ? 'on' : 'off',
    on ? { brightness: 255, rgb_color: rgb, friendly_name: 'Lamp ' + n } : { friendly_name: 'Lamp ' + n },
  ];
  const cover = (id, position, tilt) => [
    id,
    position > 0 ? 'open' : 'closed',
    { current_position: position, ...(tilt === undefined ? {} : { current_tilt_position: tilt }) },
  ];
  const a = anna(t);
  const list = [
    ['sun.sun', s.elevation > 0 ? 'above_horizon' : 'below_horizon', s],
    light(8, lampOn(29, 56), [255, 190, 120]),
    light(20, lampOn(30, 55), [255, 170, 100]),
    light(11, lampOn(31, 50), [170, 110, 255]),
    light(23, lampOn(32, 54), [255, 200, 140]),
    ['media_player.tv', between(t, 22, 34) ? 'playing' : 'off', between(t, 22, 34) ? { entity_picture: DEMO + 'tv.png' } : {}],
    cover('cover.shade', between(t, 12, 22) ? 35 : night ? 0 : 100),
    cover('cover.blind', 0, night ? 0 : 100),
    cover('cover.shutter', night ? 0 : 100),
    ['binary_sensor.door_front', between(t, 6, 11) ? 'on' : 'off', { device_class: 'door' }],
    ['binary_sensor.door_inner', between(t, 14, 19) || between(t, 35, 39) ? 'on' : 'off', { device_class: 'door' }],
    ['binary_sensor.leak', between(t, 44, 50) ? 'on' : 'off', { device_class: 'moisture', friendly_name: 'Leak' }],
    ['sensor.anna', a ? 'home' : 'away', a ? { x: a[0], y: a[1] } : { x: 0, y: 0 }],
  ];
  return Object.fromEntries(
    list.map(([entity_id, state, attributes]) => [entity_id, { entity_id, state, attributes, last_updated: '' }]),
  );
}

// A Home Assistant that answers what the card asks, and does nothing when asked to do something.
function hassWith(states) {
  return {
    states,
    callService: () => Promise.resolve(),
    language: 'en',
    locale: { language: 'en', number_format: 'language', time_format: '24' },
    themes: { darkMode: true, themes: {} },
    selectedTheme: null,
    user: { is_admin: false, name: 'demo' },
    config: { unit_system: { temperature: '°C' }, latitude: 45 },
    localize: (key) => key,
    connection: {
      subscribeMessage: () => Promise.resolve(() => {}),
      subscribeEvents: () => () => {},
    },
  };
}

// The card in place of the picture, then the day, over and over. The states change only when they
// are different, as Home Assistant sends them.
async function start(frame, picture, button) {
  button.disabled = true;
  button.textContent = 'Loading…';
  try {
    await import(/* @vite-ignore */ DEMO + 'floor3d-card.js');
  } catch (error) {
    button.textContent = 'The demo could not load';
    console.error(error);
    return;
  }
  const card = document.createElement('floor3d-card');
  card.isPanel = false;
  card.editMode = false;
  card.setConfig(CONFIG);
  let states = statesAt(0);
  card.hass = hassWith(states);
  picture.remove();
  button.remove();
  frame.classList.add('f3d-demo-live');
  frame.append(card);
  // The day starts when the house is on show (its levels are made with the model), so that its
  // morning isn't spent loading; after 15 s it starts anyway.
  const shown = performance.now();
  let began;
  window.setInterval(() => {
    const now = performance.now();
    if (began === undefined) {
      if (!card._levels && now - shown < 15000) return;
      began = now;
    }
    const t = ((now - began) / 1000) % DAY;
    const next = statesAt(t);
    let changed = false;
    for (const id of Object.keys(next)) {
      const a = states[id];
      const b = next[id];
      if (a && a.state === b.state && JSON.stringify(a.attributes) === JSON.stringify(b.attributes)) next[id] = a;
      else changed = true;
    }
    if (!changed) return;
    states = next;
    card.hass = hassWith(states);
  }, TICK * 1000);
}

export function setupDemo() {
  const picture = document.querySelector('.hero > img');
  if (!picture || !window.WebGL2RenderingContext) return;
  const frame = document.createElement('div');
  frame.className = 'f3d-demo';
  picture.replaceWith(frame);
  frame.append(picture);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'f3d-demo-play';
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>Live demo';
  button.addEventListener('click', () => start(frame, picture, button), { once: true });
  frame.append(button);
}
