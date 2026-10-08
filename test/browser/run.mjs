// Browser tests: the built card (dist/) in headless Chromium with software WebGL (SwiftShader), on
// the generated test house of model.mjs. npm run build, then npm run test:browser. Chromium comes
// from Playwright: npx playwright install --only-shell chromium (the CI does it).
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';
import { objectNames } from './model.mjs';
import { start } from './server.mjs';

const TIMEOUT = 180000;
let server;
let browser;

before(async () => {
  server = await start();
  browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
});
after(async () => {
  await browser?.close();
  await server?.close();
});

// --- Configurations and states ------------------------------------------------------------------

const lamps = (count, light = {}) =>
  Array.from({ length: count }, (_, k) => ({ entity: `light.lamp_${k + 1}`, type3d: 'light', object_id: `lamp_${k + 1}`, light: { lumens: 300, ...light } }));

const house = (extra = {}) => ({
  type: 'custom:floor3d-card',
  path: '/local/floor3d/',
  objfile: 'home.obj',
  mtlfile: 'home.mtl',
  header: 'no',
  backgroundColor: '#121212',
  globalLightPower: 0.2,
  shadow: 'yes',
  sun: 'yes',
  sun_roof: ['floor_living', 'floor_bed'],
  // The card centres the model: the house is around the origin.
  camera_position: { x: 0, y: 1000, z: 850 },
  camera_target: { x: 0, y: 0, z: 0 },
  hideLevelsMenu: 'yes',
  entities: [],
  ...extra,
});

// The TV lights the room with the colour of its picture (one light more, with shadows).
const tv = { entity: 'media_player.tv', type3d: 'image', object_id: 'tv_screen', image: { lumens: 2, lighting_lumens: 300 } };

const states = (extra = {}) => {
  const all = {
    'sun.sun': { state: 'above_horizon', attributes: { azimuth: 200, elevation: 35 } },
    'media_player.tv': { state: 'off', attributes: { friendly_name: 'TV' } },
    'light.group': { state: 'on', attributes: { brightness: 255, friendly_name: 'Group' } },
    'sensor.t_living': { state: '21.5', attributes: { unit_of_measurement: '°C' } },
    ...Object.fromEntries(Array.from({ length: 30 }, (_, k) => [`light.lamp_${k + 1}`, { state: 'on', attributes: { brightness: 60 } }])),
    ...extra,
  };
  return Object.fromEntries(Object.entries(all).map(([id, s]) => [id, { entity_id: id, ...s }]));
};

// --- The page -----------------------------------------------------------------------------------

let pages = 0;

// Opens the test page with the card on config and states, once the model is shown. errors collects
// the errors of the page and the shader errors of three.js.
async function open(config, stateSet = states()) {
  const name = 'case' + ++pages;
  server.put(name + '.json', config);
  server.put(name + '-states.json', stateSet);
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push('page: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' || /Shader Error|not valid|WebGL: INVALID/.test(m.text())) errors.push(m.text().split('\n')[0]);
  });
  await page.goto(`${server.url}/test/index.html?cfg=${name}.json&st=${name}-states.json`);
  await page.waitForFunction(() => window.__card && window.__card._modelready, null, { timeout: 120000 });
  await page.waitForTimeout(500);
  return { page, errors };
}

// The shadow limit as the card computes it, from the GPU of the page and the richest material.
const shadowState = (page) =>
  page.evaluate(() => {
    const card = window.__card;
    const caps = card._renderer.capabilities;
    return {
      status: card._shadowStatus,
      maxTextures: caps.maxTextures,
      maxVaryings: caps.maxVaryings,
      casting: card._shadowLights.filter((l) => l.castShadow).length,
    };
  });

// Mean brightness of the picture (0 to 1): a model that doesn't draw leaves the background.
const brightness = (page) =>
  page.evaluate(() => {
    const card = window.__card;
    card._render(); // the drawing buffer can be read only in the task that draws it
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 48;
    const g = canvas.getContext('2d');
    g.drawImage(card._renderer.domElement, 0, 0, 64, 48);
    const d = g.getImageData(0, 0, 64, 48).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    return sum / (64 * 48 * 255);
  });

const expectedLimit = (s, textures = 2) => Math.max(2, Math.min(s.maxTextures - textures, s.maxVaryings - Math.max(6, 4 + Math.ceil(textures / 2))));

// --- Tests --------------------------------------------------------------------------------------

for (const [model, files] of [
  ['OBJ', { objfile: 'home.obj', mtlfile: 'home.mtl' }],
  ['GLB', { objfile: 'home.glb', mtlfile: undefined }],
]) {
  test(`${model} model, 30 lamps, TV and sun with shadows: drawn, no shader error, shadows within the GPU limit`, { timeout: TIMEOUT }, async () => {
    const { page, errors } = await open(house({ ...files, entities: [tv, ...lamps(30)] }));
    const s = await shadowState(page);
    assert.equal(s.status.lights, 32, 'sun, TV and 30 lamps');
    assert.equal(s.status.budget, expectedLimit(s));
    assert.equal(s.casting, Math.min(32, s.status.budget));
    assert.equal(s.status.dropped.length, Math.max(0, 32 - s.status.budget));
    assert.ok((await brightness(page)) > 0.03, 'the model is drawn');
    assert.deepEqual(errors, []);
    await page.close();
  });
}

test('GLB material with 10 texture units: the shadow limit leaves them, no shader error', { timeout: TIMEOUT }, async () => {
  const { page, errors } = await open(house({ objfile: 'rich.glb', mtlfile: undefined, entities: [tv, ...lamps(30)] }));
  const s = await shadowState(page);
  assert.equal(s.status.textures, 10);
  assert.equal(s.status.material, 'wall');
  assert.equal(s.status.budget, expectedLimit(s, 10));
  assert.ok((await brightness(page)) > 0.03);
  assert.deepEqual(errors, []);
  await page.close();
});

test('one light for a lamp of several objects: in the middle, or on light_object', { timeout: TIMEOUT }, async () => {
  const group = (light) => house({ entities: [{ entity: 'light.group', type3d: 'light', object_id: 'lamp_*', light: { lumens: 3000, ...light } }] });
  const lights = (page) =>
    page.evaluate(() => {
      const found = [];
      window.__card._scene.traverse((o) => o.isLight && o.name.endsWith('_light') && found.push(o));
      const center = (name) => {
        const o = window.__card._scene.getObjectByName(name);
        const box = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
        o.updateWorldMatrix(true, true);
        o.traverse((m) => {
          if (!m.geometry) return;
          m.geometry.computeBoundingBox();
          const b = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld);
          ['x', 'y', 'z'].forEach((k, i) => {
            box.min[i] = Math.min(box.min[i], b.min[k]);
            box.max[i] = Math.max(box.max[i], b.max[k]);
          });
        });
        return box.min.map((v, i) => Math.round((v + box.max[i]) / 2));
      };
      const p = found[0] && found[0].getWorldPosition(found[0].position.clone());
      return { count: found.length, at: p ? [p.x, p.y, p.z].map(Math.round) : null, intensity: found[0] && found[0].intensity, lamp1: center('lamp_1'), lamp5: center('lamp_5'), lamp30: center('lamp_30') };
    });
  let { page, errors } = await open(group({}));
  assert.equal((await lights(page)).count, 30, 'one light per object');
  assert.deepEqual(errors, []);
  await page.close();

  ({ page, errors } = await open(group({ single: 'yes' })));
  let l = await lights(page);
  assert.equal(l.count, 1);
  assert.deepEqual(l.at, l.lamp1.map((v, i) => Math.round((v + l.lamp30[i]) / 2)), 'in the middle of the lamps');
  assert.ok(l.intensity > 0, 'on with the entity');
  assert.deepEqual(errors, []);
  await page.close();

  ({ page, errors } = await open(group({ light_object: 'lamp_5' })));
  l = await lights(page);
  assert.equal(l.count, 1);
  assert.deepEqual(l.at, l.lamp5, 'on lamp_5');
  assert.deepEqual(errors, []);
  await page.close();
});

test('a lamp follows its state, brightness, colour and colour temperature', { timeout: TIMEOUT }, async () => {
  const { page, errors } = await open(house({ entities: lamps(1) }), states({ 'light.lamp_1': { state: 'on', attributes: { brightness: 255, rgb_color: [255, 0, 0] } } }));
  const light = () =>
    page.evaluate(() => {
      const l = window.__card._scene.getObjectByName('lamp_1_light');
      return { intensity: l.intensity, color: [l.color.r, l.color.g, l.color.b] };
    });
  let l = await light();
  assert.ok(l.intensity > 0);
  assert.ok(l.color[0] > 0.9 && l.color[1] < 0.05 && l.color[2] < 0.05, 'red: ' + l.color);
  const full = l.intensity;
  await page.evaluate(() => window.__setState('light.lamp_1', 'on', { brightness: 128, rgb_color: null, color_temp_kelvin: 2700 }));
  l = await light();
  assert.ok(Math.abs(l.intensity - (full * 128) / 255) < 1e-6 * full, 'half brightness');
  assert.ok(l.color[0] > l.color[2] * 1.5, 'warm white at 2700 K: ' + l.color);
  await page.evaluate(() => window.__setState('light.lamp_1', 'off'));
  assert.equal((await light()).intensity, 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test('languages: the profile of the user, a regional variant, and the language option', { timeout: TIMEOUT }, async () => {
  const rooms = { rooms: [{ name: 'Living', object_id: 'floor_living', temperature: 'sensor.t_living' }] };
  let { page, errors } = await open(house(rooms));
  const menu = () =>
    page.evaluate(() => {
      window.__card._renderMenus();
      return [...window.__card._zoommenu.querySelectorAll('select option')].map((o) => o.textContent.trim());
    });
  const profile = (language) =>
    page.evaluate((language) => {
      const h = window.__hass();
      window.__card.hass = { ...h, language, locale: { ...h.locale, language } };
    }, language);
  assert.deepEqual(await menu(), ['No map', 'Temperatures', 'Presence', 'Illuminance']);
  await profile('it');
  assert.deepEqual(await menu(), ['Nessuna mappa', 'Temperature', 'Presenze', 'Illuminamento']);
  await profile('de-CH');
  assert.equal((await menu())[0], 'Keine Karte');
  await profile('fr');
  assert.equal((await menu())[0], 'No map', 'a language without texts is English');
  assert.deepEqual(errors, []);
  await page.close();

  ({ page, errors } = await open(house({ ...rooms, language: 'it' })));
  await profile('de');
  assert.equal((await menu())[0], 'Nessuna mappa', 'the option wins over the profile');
  assert.deepEqual(errors, []);
  await page.close();
});

test('card editor: objects and shadows from the preview, texts in the language of the card', { timeout: TIMEOUT }, async () => {
  const config = house({ language: 'de', entities: [tv, ...lamps(30)] });
  const { page, errors } = await open(config);
  const editor = await page.evaluate(async () => {
    const card = window.__card;
    card.preview = true; // the card in the preview of the editor answers it
    const ed = await card.constructor.getConfigElement();
    ed.hass = window.__hass();
    ed.setConfig(JSON.parse(JSON.stringify(card._config)));
    document.body.append(ed);
    await new Promise((r) => setTimeout(r, 300));
    ed._mode = 'ready'; // the test page has no Home Assistant forms: the parts of the editor are checked
    ed._expanded = ['entities'];
    await ed.updateComplete;
    const lines = [...ed.shadowRoot.querySelectorAll('.row .secondary')].map((r) => r.textContent.trim());
    return {
      objects: ed._modelObjects.slice().sort(),
      shadows: ed._shadows,
      panels: [...ed.shadowRoot.querySelectorAll('ha-expansion-panel')].map((p) => p.header),
      noShadow: lines.filter((t) => t.includes('Kein Schatten')).length,
    };
  });
  assert.deepEqual(editor.objects, objectNames.slice().sort());
  assert.equal(editor.shadows.lights, 32);
  assert.equal(editor.panels[0], '3D-Modell');
  assert.equal(editor.panels[6], 'Entitäten (31)');
  assert.equal(editor.noShadow, editor.shadows.dropped.length, 'the lines of the lights left without shadow say so');
  assert.deepEqual(errors, []);
  await page.close();
});

test('reload (refresh button of the editor): the model comes back, without errors', { timeout: TIMEOUT }, async () => {
  const { page, errors } = await open(house({ entities: [tv, ...lamps(10)] }));
  await page.evaluate(() => window.__card.rerender());
  await page.waitForFunction(() => window.__card._modelready, null, { timeout: 120000 });
  await page.waitForTimeout(500);
  const s = await shadowState(page);
  assert.equal(s.status.lights, 12);
  assert.ok((await brightness(page)) > 0.03);
  assert.deepEqual(errors, []);
  await page.close();
});

// --- Room maps from sensors, alarms, climate ------------------------------------------------------

const roomState = (page) =>
  page.evaluate(() =>
    Object.fromEntries(
      window.__card._roomViews.map((r) => [
        r.name,
        {
          visible: r.overlays[0].visible,
          color: r.material.color.getHexString(),
          opacity: r.material.opacity,
          label: r.labelText || '',
          background: r.labelBackground || '',
          alarm: !!r.alarm,
        },
      ]),
    ),
  );
const near = (hex, expected) =>
  [0, 2, 4].every((i) => Math.abs(parseInt(hex.slice(i, i + 2), 16) - parseInt(expected.replace('#', '').slice(i, i + 2), 16)) <= 2);

test('sensor maps: in the menu once a room has the sensor, coloured, labelled, with a legend', { timeout: TIMEOUT }, async () => {
  const sensor = (state, unit) => ({ state: String(state), attributes: unit ? { unit_of_measurement: unit } : {} });
  const config = house({
    sun: 'no',
    rooms: [
      {
        name: 'Living',
        object_id: 'floor_living',
        humidity: 'sensor.h_living',
        co2: 'sensor.co2_living',
        power: ['sensor.plug_tv', 'sensor.plug_pc', 'sensor.plug_off'],
        hcho: 'sensor.hcho_living',
        voc: 'sensor.voc_living',
      },
      { name: 'Bed', object_id: 'floor_bed', co2: 'sensor.co2_bed' },
    ],
  });
  const { page, errors } = await open(
    config,
    states({
      'sensor.h_living': sensor(45, '%'),
      'sensor.co2_living': sensor(1200, 'ppm'),
      'sensor.co2_bed': sensor(700, 'ppm'),
      'sensor.plug_tv': sensor(120, 'W'),
      'sensor.plug_pc': sensor(1.5, 'kW'),
      'sensor.plug_off': sensor('unavailable', 'W'),
      'sensor.hcho_living': sensor(0.05, 'mg/m³'),
      'sensor.voc_living': sensor(180),
    }),
  );
  const options = await page.evaluate(() => [...window.__card._zoommenu.querySelectorAll('select option')].map((o) => o.value));
  assert.deepEqual(options, ['none', 'temperature', 'presence', 'illuminance', 'humidity', 'co2', 'voc', 'hcho', 'power']);
  const show = async (mode) => {
    await page.evaluate((mode) => window.__card._setMapMode(mode), mode);
    const legend = await page.evaluate(() => {
      const l = window.__card._zoommenu.querySelector('.f3d-legend');
      return l ? [...l.querySelectorAll('span')].map((span) => span.textContent.trim()).join(' ') : null;
    });
    return { rooms: await roomState(page), legend };
  };
  let m = await show('co2');
  assert.equal(m.rooms.Living.label, '1,200 ppm');
  // 1200 ppm: 40 % of the way from yellow (#facc15, 1000 ppm) to orange (#f97316, 1500 ppm)
  assert.ok(near(m.rooms.Living.color, '#faa815'), 'between yellow and orange: ' + m.rooms.Living.color);
  assert.equal(m.rooms.Bed.label, '700 ppm');
  assert.equal(m.legend, '600 2,000 ppm');
  m = await show('power');
  assert.equal(m.rooms.Living.label, '1,620 W', 'the plugs added up, kW converted');
  assert.equal(m.rooms.Bed.visible, false, 'no sensor: not coloured');
  m = await show('hcho');
  assert.equal(m.rooms.Living.label, '50 µg/m³', 'mg/m³ converted');
  m = await show('voc');
  assert.equal(m.rooms.Living.label, '180', 'an index has no unit');
  assert.equal(m.legend, '100 400', 'and its own scale');
  m = await show('humidity');
  assert.equal(m.rooms.Living.label, '45 %');
  assert.ok(near(m.rooms.Living.color, '#22c55e'), 'good humidity is green');
  m = await show('none');
  assert.equal(m.rooms.Living.visible, false);
  assert.equal(m.legend, null);
  assert.deepEqual(errors, []);
  await page.close();
});

test('alarms: a room blinks over any map with the kind written on it, an object too; the camera goes there', { timeout: TIMEOUT }, async () => {
  const off = (deviceClass) => ({ state: 'off', attributes: { device_class: deviceClass } });
  const config = house({
    sun: 'no',
    alarm_view: 'yes',
    rooms: [
      { name: 'Living', object_id: 'floor_living', alarms: ['binary_sensor.smoke_living'] },
      { name: 'Bed', object_id: 'floor_bed', alarms: 'binary_sensor.leak_bed' },
    ],
    entities: [{ entity: 'binary_sensor.leak_bed', type3d: 'alarm', object_id: 'wardrobe' }],
  });
  const { page, errors } = await open(config, states({ 'binary_sensor.smoke_living': off('smoke'), 'binary_sensor.leak_bed': off('moisture') }));
  let rooms = await roomState(page);
  assert.equal(rooms.Living.visible, false);
  assert.equal(await page.evaluate(() => window.__card._roomAlarms), false);

  await page.evaluate(() => window.__setState('binary_sensor.smoke_living', 'on'));
  rooms = await roomState(page);
  assert.equal(rooms.Living.visible, true, 'shown with no map');
  assert.equal(rooms.Living.label, 'Smoke');
  assert.ok(near(rooms.Living.color, '#ff3b30'));
  assert.ok(await page.evaluate(() => window.__card._roomAlarms && window.__card._to_animate), 'blinking');
  const opacities = [];
  for (let k = 0; k < 4; k++) {
    opacities.push((await roomState(page)).Living.opacity);
    await page.waitForTimeout(170);
  }
  assert.ok(Math.max(...opacities) - Math.min(...opacities) > 0.1, 'the opacity changes: ' + opacities);
  await page.waitForTimeout(900); // the camera flies to the room (700 ms)
  const target = await page.evaluate(() => {
    const t = window.__card._controls.target;
    const c = window.__card._roomViews[0].box.getCenter(t.clone());
    return t.distanceTo(c);
  });
  assert.ok(target < 1, 'the camera looks at the room: ' + target);

  await page.evaluate(() => window.__setState('binary_sensor.leak_bed', 'on'));
  rooms = await roomState(page);
  assert.equal(rooms.Bed.label, 'Water leak');
  assert.ok(near(rooms.Bed.color, '#2f80ff'));
  const wardrobe = () =>
    page.evaluate(() => {
      const o = window.__card._scene.getObjectByName('wardrobe');
      return { tinted: o.material === o.userData.tintMaterial, emissive: o.material.emissive.getHexString() };
    });
  let w = await wardrobe();
  assert.ok(w.tinted && near(w.emissive, '#2f80ff'), 'the object of the leak sensor glows blue: ' + JSON.stringify(w));

  await page.evaluate(() => {
    window.__setState('binary_sensor.smoke_living', 'off');
    window.__setState('binary_sensor.leak_bed', 'off');
  });
  rooms = await roomState(page);
  assert.equal(rooms.Living.visible || rooms.Bed.visible, false);
  assert.equal(await page.evaluate(() => window.__card._roomAlarms), false);
  w = await wardrobe();
  assert.equal(w.tinted, false);
  assert.deepEqual(errors, []);
  await page.close();
});

test('climate: a heater glows while it heats; a room shows the target and the temperature of its thermostat', { timeout: TIMEOUT }, async () => {
  const thermostat = (action) => ({ state: 'heat', attributes: { hvac_action: action, current_temperature: 20.5, temperature: 22 } });
  const config = house({
    sun: 'no',
    room_colors: 'temperature',
    rooms: [{ name: 'Living', object_id: 'floor_living', climate: 'climate.living' }],
    entities: [
      { entity: 'climate.living', type3d: 'climate', object_id: 'sofa' },
      { entity: 'switch.boiler', type3d: 'climate', object_id: 'table' },
    ],
  });
  const { page, errors } = await open(config, states({ 'climate.living': thermostat('heating'), 'switch.boiler': { state: 'off', attributes: {} } }));
  const glow = (name) =>
    page.evaluate((name) => {
      const o = window.__card._scene.getObjectByName(name);
      return { tinted: o.material === o.userData.tintMaterial, emissive: o.material.emissive.getHexString() };
    }, name);
  let g = await glow('sofa');
  assert.ok(g.tinted && near(g.emissive, '#ff6a00'), 'heating: orange ' + JSON.stringify(g));
  assert.equal((await glow('table')).tinted, false, 'the boiler is off');
  let rooms = await roomState(page);
  assert.equal(rooms.Living.label, '20.5 °C → 22 °C', 'the temperature of the thermostat and its target');
  assert.ok(rooms.Living.background.includes('255, 106, 0'), 'heating: orange label');

  await page.evaluate(() => window.__setState('climate.living', 'heat', { hvac_action: 'idle' }));
  assert.equal((await glow('sofa')).tinted, false, 'idle: no glow');
  rooms = await roomState(page);
  assert.ok(rooms.Living.background.includes('0, 0, 0'), 'idle: plain label');
  await page.evaluate(() => window.__setState('switch.boiler', 'on'));
  g = await glow('table');
  assert.ok(g.tinted && near(g.emissive, '#ff6a00'), 'a switch on heats');
  assert.deepEqual(errors, []);
  await page.close();
});

test('a card with only rooms, without the entities list: the rooms follow their sensors, the canvas its card', { timeout: TIMEOUT }, async () => {
  const config = house({ room_colors: 'co2', rooms: [{ name: 'Living', object_id: 'floor_living', co2: 'sensor.co2' }] });
  delete config.entities;
  const { page, errors } = await open(config, states({ 'sensor.co2': { state: '900', attributes: { unit_of_measurement: 'ppm' } } }));
  assert.equal((await roomState(page)).Living.label, '900 ppm');
  await page.evaluate(() => window.__setState('sensor.co2', '1600'));
  assert.equal((await roomState(page)).Living.label, '1,600 ppm', 'updated');
  const size = await page.evaluate(() => [window.__card._renderer.domElement.width, document.getElementById('wrap').clientWidth]);
  assert.equal(size[0], size[1], 'the canvas fills the card');
  assert.deepEqual(errors, []);
  await page.close();
});

test('card editor: a room with the sensors of the maps, its alarms and thermostat; the sensor maps', { timeout: TIMEOUT }, async () => {
  const config = house({
    language: 'it',
    rooms: [{ name: 'Living', object_id: 'floor_living', co2: 'sensor.co2', power: 'sensor.plug', alarms: ['binary_sensor.smoke'] }],
    maps: [{ key: 'co2', min: 400, max: 1400 }, { key: 'fridge', name: 'Frigo', unit: '°C', min: 2, max: 8 }],
  });
  const { page, errors } = await open(config);
  const result = await page.evaluate(async () => {
    const card = window.__card;
    card.preview = true;
    const ed = await card.constructor.getConfigElement();
    ed.hass = window.__hass();
    ed.setConfig(JSON.parse(JSON.stringify(card._config)));
    document.body.append(ed);
    await new Promise((r) => setTimeout(r, 200));
    ed._mode = 'ready';
    ed._expanded = ['colours'];
    await ed.updateComplete;
    const lines = [...ed.shadowRoot.querySelectorAll('.row')].map((r) => r.textContent.replace(/\s+/g, ' ').trim());
    ed._view = { list: 'rooms', index: 0 };
    await ed.updateComplete;
    const headings = [...ed.shadowRoot.querySelectorAll('.heading')].map((h) => h.textContent.trim());
    const forms = [...ed.shadowRoot.querySelectorAll('ha-form')];
    const fields = forms.flatMap((f) => {
      const out = [];
      const walk = (s) => s.forEach((x) => (x.schema ? walk(x.schema) : out.push([x.name, f.computeLabel(x)])));
      walk(f.schema);
      return out;
    });
    const data = forms.map((f) => f.data);
    // A change in the sensors form: the alarms list of one goes back to one id.
    const sensorsForm = forms.find((f) => JSON.stringify(f.schema).includes('"co2"'));
    sensorsForm.dispatchEvent(new CustomEvent('value-changed', { detail: { value: { ...sensorsForm.data, humidity: 'sensor.hum', power: ['sensor.plug', 'sensor.plug2'] } } }));
    const room = ed._config.rooms[0];
    return { lines, headings, fields, alarmsInForm: data[0].alarms, room };
  });
  assert.ok(result.lines.some((l) => l.startsWith('CO₂') && l.includes('Mappa pronta, altri colori') && l.includes('400–1400')), result.lines.join(' | '));
  assert.ok(result.lines.some((l) => l.startsWith('Frigo') && l.includes('Mappa nuova')));
  assert.ok(result.headings.includes('Sensori per le mappe') && result.headings.includes('Allarmi e clima'), result.headings.join(' | '));
  const labels = Object.fromEntries(result.fields);
  assert.equal(labels.power, 'Consumi (prese smart)');
  assert.equal(labels.fridge, 'Frigo', 'a new map adds a sensor field to the rooms');
  assert.equal(labels.alarms, 'Sensori di allarme');
  assert.deepEqual(result.alarmsInForm, ['binary_sensor.smoke'], 'one alarm id shown as a list in the picker');
  assert.equal(result.room.humidity, 'sensor.hum');
  assert.deepEqual(result.room.power, ['sensor.plug', 'sensor.plug2']);
  assert.equal(result.room.alarms, 'binary_sensor.smoke', 'written back as one id');
  assert.deepEqual(errors, []);
  await page.close();
});
