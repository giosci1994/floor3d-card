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
  assert.ok(editor.panels.includes('Infoboxen'), 'the section of the boxes: ' + editor.panels.join(', '));
  assert.ok(editor.panels.includes('Entitäten (31)'), editor.panels.join(', '));
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

test('card editor: only its preview answers (not the cards of the dashboard in edit mode); picking and the current view keep the pause; the camera stays', { timeout: TIMEOUT }, async () => {
  const config = house({ sun: 'no', shadow: 'no', entities: lamps(2) });
  const { page, errors } = await open(config);
  const ready = (name) => page.waitForFunction((name) => window[name] && window[name]._modelready, name, { timeout: 120000 });
  // A card of the dashboard in edit mode (Home Assistant sets preview on it too) and the preview.
  const add = (name, inView) =>
    page.evaluate(
      ({ name, inView }) => {
        const card = document.createElement('floor3d-card');
        card.setConfig(JSON.parse(JSON.stringify(window.__card._config)));
        card.hass = window.__hass();
        card.preview = true;
        const box = document.createElement('div');
        box.style.cssText = 'width: 500px; height: 380px';
        box.appendChild(card);
        if (inView) {
          const view = document.createElement('hui-view');
          view.appendChild(box);
          document.body.appendChild(view);
        } else {
          document.body.appendChild(box);
        }
        window[name] = card;
      },
      { name, inView },
    );
  await page.evaluate(() => window.__card.remove()); // not part of this test
  await add('__dashboard', true);
  await ready('__dashboard');
  await add('__preview', false);
  await ready('__preview');
  const camera = (name) => page.evaluate((name) => window[name]._camera.position.toArray().map((v) => Math.round(v)), name);
  // The user moves the camera of the preview.
  await page.evaluate(() => {
    window.__preview._camera.position.set(300, 700, 500);
    window.__preview._controls.update();
  });
  const moved = await camera('__preview');
  const editorCamera = () => page.evaluate(() => window.__ed._config.camera_position && [window.__ed._config.camera_position.x, window.__ed._config.camera_position.y, window.__ed._config.camera_position.z].map(Math.round));
  await page.evaluate(async () => {
    const ed = await window.__preview.constructor.getConfigElement();
    ed.hass = window.__hass();
    ed.setConfig(JSON.parse(JSON.stringify(window.__preview._config)));
    document.body.append(ed);
    window.__ed = ed;
    await new Promise((r) => setTimeout(r, 100));
    ed._useCurrentView();
  });
  assert.deepEqual(await editorCamera(), moved, 'the camera of the preview, not the one of the card behind');

  // Pause, then Home Assistant replaces the preview (a change of the configuration).
  await page.evaluate(() => {
    window.__ed._setPaused(true);
    window.__preview.remove();
  });
  await add('__preview2', false);
  await add('__dashboard2', true);
  await ready('__dashboard2');
  let state = await page.evaluate(() => ({
    placeholder: !!window.__preview2._pausedEl,
    image: !!(window.__preview2._pausedEl && window.__preview2._pausedEl.querySelector('img')),
    dashboardLive: !!window.__dashboard2._renderer && !window.__dashboard2._pausedEl,
  }));
  assert.deepEqual(state, { placeholder: true, image: true, dashboardLive: true }, 'only the preview shows the picture of the pause');

  // "Use the current view" while paused: the camera of the last live preview, and the pause stays.
  await page.evaluate(() => {
    window.__ed._config = { ...window.__ed._config, camera_position: undefined };
    window.__ed._useCurrentView();
  });
  assert.deepEqual(await editorCamera(), moved);
  assert.equal(await page.evaluate(() => window.__ed._paused), true);

  // "Pick in the preview" while paused: the preview loads the model, where the camera was; the
  // pause stays, also after the object is picked.
  await page.evaluate(() => window.__ed._startPick({ path: ['entities', 0, 'object_id'] }));
  await ready('__preview2');
  assert.deepEqual(await camera('__preview2'), moved, 'the camera where it was, not the initial view');
  state = await page.evaluate(() => ({ paused: window.__ed._paused, pick: window.__preview2._pickMode }));
  assert.deepEqual(state, { paused: true, pick: true });
  await page.evaluate(() => window.__preview2._toEditor({ picked: 'lamp_7' }));
  state = await page.evaluate(() => ({ paused: window.__ed._paused, object: window.__ed._config.entities[0].object_id }));
  assert.deepEqual(state, { paused: true, object: 'lamp_7' });

  // Closing the editor (Save or X) ends the pause: a preview still showing the picture loads.
  await page.evaluate(() => window.__preview2.remove());
  await add('__preview3', false);
  assert.equal(await page.evaluate(() => !!window.__preview3._pausedEl), true);
  await page.evaluate(() => window.__ed.remove());
  await ready('__preview3');
  assert.equal(await page.evaluate(() => !!window.__preview3._pausedEl), false);
  // A new preview with the same initial view goes back to the camera; with another, to the new one.
  await add('__preview4', false);
  await ready('__preview4');
  assert.deepEqual(await camera('__preview4'), moved);
  await page.evaluate(() => {
    const config = JSON.parse(JSON.stringify(window.__card._config));
    config.camera_position = { x: 0, y: 1500, z: 10 };
    const card = document.createElement('floor3d-card');
    card.setConfig(config);
    card.hass = window.__hass();
    card.preview = true;
    document.body.appendChild(card);
    window.__preview5 = card;
  });
  await ready('__preview5');
  assert.notDeepEqual(await camera('__preview5'), moved, 'another initial view: shown');
  assert.deepEqual(errors, []);
  await page.close();
});

test('views: one with a level shows only that level, one without shows them all, the initial view shows initialLevel again', { timeout: TIMEOUT }, async () => {
  const view = (zoom, x, level) => ({ zoom, camera_position: { x, y: 500, z: 300 }, camera_target: { x, y: 0, z: 0 }, ...(level === undefined ? {} : { level }) });
  const zoom_areas = [view('Bedroom', 200, 1), view('Living', -200), view('Ground floor', 0, 0)];
  const levels = (page) => page.evaluate(() => window.__card._levels.map((l) => l.visible));
  const camera = (page) => page.evaluate(() => window.__card._camera.position.toArray().map((v) => Math.round(v)));

  // The Views menu.
  let { page, errors } = await open(house({ objfile: 'levels.obj', zoom_areas }));
  const choose = (index) =>
    page.evaluate((index) => {
      const select = window.__card._zoommenu.querySelector('select[aria-label="Views"]');
      select.value = String(index);
      select.dispatchEvent(new Event('change'));
    }, index);
  assert.deepEqual(await levels(page), [true, true], 'the bedroom on level 1, the rest on level 0');
  await choose(0);
  assert.deepEqual(await levels(page), [false, true], 'Bedroom: level 1');
  await choose(1);
  assert.deepEqual(await levels(page), [true, true], 'Living, without a level: all the levels');
  await choose(2);
  assert.deepEqual(await levels(page), [true, false], 'Ground floor: level 0');
  await choose(-1);
  assert.deepEqual(await levels(page), [true, true], 'the initial view: all the levels');
  assert.deepEqual(errors, []);
  await page.close();

  // The buttons of hideZoomMenu: yes jump to the view; the initial view shows initialLevel again.
  ({ page, errors } = await open(house({ objfile: 'levels.obj', zoom_areas, hideZoomMenu: 'yes', initialLevel: 1 })));
  const press = (index) => page.evaluate((index) => [...window.__card._zoombar.querySelectorAll('floor3d-button')].find((b) => b.index === index).click(), index);
  const start = await camera(page);
  assert.deepEqual(await levels(page), [false, true], 'initialLevel: 1');
  await press(2);
  assert.deepEqual(await levels(page), [true, false]);
  await press(1);
  assert.deepEqual(await levels(page), [true, true]);
  assert.deepEqual(await camera(page), [-200, 500, 300]);
  await press(-1);
  assert.deepEqual(await levels(page), [false, true], 'initialLevel again');
  assert.deepEqual(await camera(page), start);
  assert.deepEqual(errors, []);
  await page.close();
});

// --- Covers ------------------------------------------------------------------------------------

// The box of an object in the scene: [min, max] in centimetres, rounded.
const worldBox = (page, name) =>
  page.evaluate((name) => {
    const o = window.__card._scene.getObjectByName(name);
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    o.updateWorldMatrix(true, true);
    o.traverse((m) => {
      if (!m.geometry) return;
      m.geometry.computeBoundingBox();
      const b = m.geometry.boundingBox.clone().applyMatrix4(m.matrixWorld);
      ['x', 'y', 'z'].forEach((k, i) => {
        min[i] = Math.min(min[i], b.min[k]);
        max[i] = Math.max(max[i], b.max[k]);
      });
    });
    return [min.map((v) => Math.round(v * 10) / 10), max.map((v) => Math.round(v * 10) / 10)];
  }, name);

// For a sliding cover: is the middle of the object (where it is now) on the side its plane keeps?
const keeps = (page, name) =>
  page.evaluate((name) => {
    const o = window.__card._scene.getObjectByName(name);
    const material = [].concat(o.material)[0];
    o.updateWorldMatrix(true, true);
    o.geometry.computeBoundingBox();
    const center = o.geometry.boundingBox.getCenter(o.position.clone()).applyMatrix4(o.matrixWorld);
    return material.clippingPlanes[0].distanceToPoint(center) > 0;
  }, name);

test('covers: the slats of a blind turn with its tilt, a roller shade shortens, a shutter that opens downward is cut on the right side', { timeout: TIMEOUT }, async () => {
  const entities = [
    { entity: 'cover.blind', type3d: 'cover', object_id: 'blind', cover: { side: 'up', motion: 'none', slats: 'blind' } },
    { entity: 'cover.shade', type3d: 'cover', object_id: 'shade*', cover: { pane: 'shade', side: 'up', motion: 'shrink' } },
    { entity: 'cover.shutter', type3d: 'cover', object_id: 'shutter', cover: { side: 'down' } },
  ];
  const coverStates = states({
    'cover.blind': { state: 'open', attributes: { current_tilt_position: 100 } },
    'cover.shade': { state: 'open', attributes: { current_position: 50 } },
    'cover.shutter': { state: 'closed', attributes: { current_position: 0 } },
  });
  const { page, errors } = await open(house({ objfile: 'covers.obj', entities }), coverStates);
  const slats = () =>
    page.evaluate(() => {
      const card = window.__card;
      const i = card._config.entities.findIndex((e) => e.entity === 'cover.blind');
      const set = card._slatSets.get(i)[0];
      const lowest = set.slats.reduce((a, b) => (a.center[1] < b.center[1] ? a : b));
      const position = set.geometry.getAttribute('position');
      const ys = lowest.vertices.map((v) => position.getY(v));
      return { count: set.slats.length, height: Math.round((Math.max(...ys) - Math.min(...ys)) * 100) / 100 };
    });
  const blindBefore = await worldBox(page, 'blind');
  assert.deepEqual(await slats(), { count: 12, height: 0.4 }, 'open: as in the model');
  await page.evaluate(() => window.__setState('cover.blind', 'closed', { current_tilt_position: 0 }));
  await page.waitForTimeout(1600);
  assert.equal((await slats()).height, 9.92, 'closed: turned by 80°');
  await page.evaluate(() => window.__setState('cover.blind', 'open', { current_tilt_position: 50 }));
  await page.waitForTimeout(1600);
  assert.equal((await slats()).height, 6.73, 'half: 40°');
  assert.deepEqual((await worldBox(page, 'blind'))[1][1], blindBefore[1][1], 'motion none: the head rail stays');

  // Roller shade at 50 %: half as long, from its top; the bar follows the bottom edge.
  const shade = await worldBox(page, 'shade');
  const bar = await worldBox(page, 'shade_bar');
  const height = 218 - 93;
  assert.ok(Math.abs(shade[1][1] - shade[0][1] - height / 2) < 0.2, 'half the fabric: ' + shade);
  assert.ok(Math.abs(bar[1][1] - bar[0][1] - 3) < 0.2, 'the bar keeps its size');
  assert.ok(Math.abs(bar[1][1] - shade[0][1]) < 0.2, 'the bar at the bottom edge of the fabric');
  const material = await page.evaluate(() => [].concat(window.__card._scene.getObjectByName('shade').material)[0].clippingPlanes);
  assert.ok(!material || material.length === 0, 'no plane cuts a shade that shortens');
  await page.evaluate(() => window.__setState('cover.shade', 'closed', { current_position: 0 }));
  await page.waitForTimeout(1600);
  const closed = await worldBox(page, 'shade');
  assert.ok(Math.abs(closed[1][1] - closed[0][1] - height) < 0.2, 'closed: full length');
  assert.ok(Math.abs(closed[1][1] - shade[1][1]) < 0.2, 'the top stays');

  // Shutter opening downward: shown while closed, hidden once open.
  assert.equal(await keeps(page, 'shutter'), true, 'closed: shown');
  await page.evaluate(() => window.__setState('cover.shutter', 'open', { current_position: 100 }));
  await page.waitForTimeout(1600);
  assert.equal(await keeps(page, 'shutter'), false, 'open: under the edge, cut');
  assert.deepEqual(errors, []);
  await page.close();
});

test('covers: sliding up and to the left are cut past their edge; tilt_open and tilt_closed', { timeout: TIMEOUT }, async () => {
  const entities = [
    { entity: 'cover.shade', type3d: 'cover', object_id: 'shade', cover: { side: 'up' } },
    { entity: 'cover.blind', type3d: 'cover', object_id: 'blind', cover: { side: 'left', slats: 'blind', tilt_closed: -60, tilt_open: 30 } },
  ];
  const coverStates = states({
    'cover.shade': { state: 'closed', attributes: { current_position: 0 } },
    'cover.blind': { state: 'closed', attributes: { current_position: 0, current_tilt_position: 0 } },
  });
  const { page, errors } = await open(house({ objfile: 'covers.obj', entities }), coverStates);
  assert.equal(await keeps(page, 'shade'), true);
  assert.equal(await keeps(page, 'blind'), true);
  const angle = () => page.evaluate(() => Math.round(window.__card._slatAngles.get(1)));
  assert.equal(await angle(), -60, 'tilt 0: tilt_closed');
  await page.evaluate(() => {
    window.__setState('cover.shade', 'open', { current_position: 100 });
    window.__setState('cover.blind', 'open', { current_position: 100, current_tilt_position: 100 });
  });
  await page.waitForTimeout(1600);
  assert.equal(await keeps(page, 'shade'), false, 'up: past the top, cut');
  assert.equal(await keeps(page, 'blind'), false, 'left: past the left edge, cut');
  assert.equal(await angle(), 30, 'tilt 100: tilt_open');
  assert.deepEqual(errors, []);
  await page.close();
});

// --- Sky and weather ---------------------------------------------------------------------------

// The two colours of a CSS gradient, as [r, g, b] lists.
const gradientColors = (css) => [...css.matchAll(/rgb\((\d+), (\d+), (\d+)\)/g)].map((m) => m.slice(1, 4).map(Number));
const lightness = ([r, g, b]) => (r + g + b) / 3;
const colorfulness = ([r, g, b]) => Math.max(r, g, b) - Math.min(r, g, b);

test('sky background: follows the elevation of the sun, greyer with the clouds of the weather entity', { timeout: TIMEOUT }, async () => {
  const skyStates = states({ 'weather.home': { state: 'sunny', attributes: { temperature: 21.4, supported_features: 1 } } });
  const { page, errors } = await open(house({ backgroundColor: 'sky', weather: 'weather.home', weather_count: 0 }), skyStates);
  const background = () =>
    page.evaluate(() => ({ css: window.__card._renderer.domElement.style.background, alpha: window.__card._renderer.getClearAlpha() }));
  let b = await background();
  assert.equal(b.alpha, 0, 'the canvas lets the sky through');
  const [dayTop, dayHorizon] = gradientColors(b.css);
  assert.ok(dayTop[2] > dayTop[0] && lightness(dayHorizon) > lightness(dayTop), 'day, at 35°: blue, lighter at the horizon: ' + b.css);
  await page.evaluate(() => window.__setState('sun.sun', 'below_horizon', { azimuth: 300, elevation: 0 }));
  const [, sunsetHorizon] = gradientColors((await background()).css);
  assert.ok(sunsetHorizon[0] > sunsetHorizon[1] && sunsetHorizon[1] > sunsetHorizon[2], 'sunset: orange at the horizon');
  await page.evaluate(() => window.__setState('sun.sun', 'below_horizon', { azimuth: 340, elevation: -25 }));
  const [nightTop] = gradientColors((await background()).css);
  assert.ok(lightness(nightTop) < 50, 'night: dark');
  await page.evaluate(() => {
    window.__setState('sun.sun', 'above_horizon', { azimuth: 200, elevation: 35 });
    window.__setState('weather.home', 'cloudy', { cloud_coverage: 100 });
  });
  const [cloudyTop] = gradientColors((await background()).css);
  assert.ok(colorfulness(cloudyTop) < colorfulness(dayTop) / 2, 'clouds: grey');
  assert.deepEqual(errors, []);
  await page.close();
});

test('weather box: the weather now and the next forecasts in the language of the card; a tap opens the entity', { timeout: TIMEOUT }, async () => {
  const weatherStates = states({ 'weather.home': { state: 'rainy', attributes: { temperature: 12.6, supported_features: 3, friendly_name: 'Home' } } });
  const { page, errors } = await open(house({ weather: 'weather.home', weather_count: 3, language: 'it' }), weatherStates);
  const subscriptions = () => page.evaluate(() => window.__subscriptions.map((s) => ({ ...s.message, active: s.active })));
  assert.deepEqual(await subscriptions(), [{ type: 'weather/subscribe_forecast', forecast_type: 'daily', entity_id: 'weather.home', active: true }]);
  const day = (d, condition, temperature, templow, rain) => ({
    datetime: `2026-10-${d}T12:00:00+00:00`,
    condition,
    temperature,
    templow,
    precipitation_probability: rain,
  });
  await page.evaluate(
    (forecast) => window.__forecast('weather.home', forecast),
    [day(12, 'sunny', 18.2, 9.6, 0), day(13, 'rainy', 15, 10, 60), day(14, 'cloudy', 16, 11, 5), day(15, 'snowy', 2, -3, 80)],
  );
  const box = () =>
    page.evaluate(() => {
      const el = window.__card.shadowRoot.querySelector('.f3d-weather');
      return {
        shown: !!el && el.isConnected,
        corner: el.parentElement.className,
        label: el.getAttribute('aria-label'),
        now: [el.querySelector('.now ha-icon').getAttribute('icon'), el.querySelector('.now span').textContent],
        items: [...el.querySelectorAll('.item')].map((i) => [
          i.querySelector('.when').textContent,
          i.querySelector('ha-icon').getAttribute('icon'),
          i.querySelector('.temp').textContent.replace(/\s+/g, ' ').trim(),
          i.querySelector('.rain') ? i.querySelector('.rain').textContent : '',
        ]),
      };
    });
  assert.deepEqual(await box(), {
    shown: true,
    corner: 'f3d-corner f3d-corner-bottom-left',
    label: 'Previsioni meteo',
    now: ['mdi:weather-rainy', '13°'],
    items: [
      ['lun', 'mdi:weather-sunny', '18° 10°', ''],
      ['mar', 'mdi:weather-rainy', '15° 10°', '60%'],
      ['mer', 'mdi:weather-cloudy', '16° 11°', ''],
    ],
  });
  // The weather now changes; then the entity only has hourly forecasts: the box asks for those.
  await page.evaluate(() => window.__setState('weather.home', 'sunny', { temperature: 14 }));
  assert.deepEqual((await box()).now, ['mdi:weather-sunny', '14°']);
  await page.evaluate(() => window.__setState('weather.home', 'sunny', { supported_features: 2 }));
  assert.deepEqual(
    (await subscriptions()).map((s) => [s.forecast_type, s.active]),
    [
      ['daily', false],
      ['hourly', true],
    ],
  );
  // A tap opens the weather entity, not an object of the model.
  const opened = await page.evaluate(() => {
    const seen = [];
    window.__card.addEventListener('hass-more-info', (e) => seen.push(e.detail.entityId));
    window.__card.shadowRoot.querySelector('.f3d-weather').click();
    return seen;
  });
  assert.deepEqual(opened, ['weather.home']);
  // Removed from the page: no more forecasts.
  await page.evaluate(() => window.__card.remove());
  await page.waitForTimeout(50);
  assert.deepEqual((await subscriptions()).map((s) => s.active), [false, false]);
  assert.deepEqual(errors, []);
  await page.close();
});

// --- Boxes in the corners ----------------------------------------------------------------------

// A picture of a person (a pixel), without a file to serve.
const PICTURE = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=';

// What a box shows: its corner, the texts and icons of its parts.
const boxOf = (page, kind) =>
  page.evaluate((kind) => {
    const el = window.__card.shadowRoot.querySelector('.f3d-' + kind);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      corner: el.parentElement.className.replace('f3d-corner f3d-corner-', ''),
      rect: [r.left, r.top, r.right, r.bottom].map(Math.round),
      text: el.textContent.replace(/\s+/g, ' ').trim(),
      icons: [...el.querySelectorAll('ha-icon')].map((i) => i.getAttribute('icon')),
      classes: el.className,
    };
  }, kind);
const cameraTarget = (page) => page.evaluate(() => window.__card._controls.target.toArray().map(Math.round));
const helpers = (page) => page.evaluate(() => window.__card._highlightHelpers.map((h) => '#' + h.material.color.getHexString()));
const moreInfo = (page) =>
  page.evaluate(() => {
    window.__moreInfo = [];
    window.__card.addEventListener('hass-more-info', (e) => window.__moreInfo.push(e.detail.entityId));
  });

test('status box: what is on or open; a tap outlines those objects and frames them, a second tap ends it', { timeout: TIMEOUT }, async () => {
  const entities = [
    ...lamps(3),
    { entity: 'binary_sensor.window', type3d: 'color', object_id: 'wardrobe', colorcondition: [{ state: 'on', color: '#ff0000' }] },
    { entity: 'lock.front', type3d: 'color', object_id: 'table', colorcondition: [{ state: 'unlocked', color: '#ff0000' }] },
  ];
  const boxStates = states({
    'light.lamp_1': { state: 'on', attributes: { brightness: 200 } },
    'light.lamp_2': { state: 'on', attributes: { brightness: 200 } },
    'light.lamp_3': { state: 'off', attributes: {} },
    'binary_sensor.window': { state: 'on', attributes: { device_class: 'window' } },
    'lock.front': { state: 'unlocked', attributes: {} },
  });
  const { page, errors } = await open(house({ status: 'yes', entities }), boxStates);
  let box = await boxOf(page, 'status');
  assert.equal(box.corner, 'top-left');
  assert.deepEqual(box.icons, ['mdi:lightbulb-on', 'mdi:door-open', 'mdi:lock-open-variant']);
  assert.equal(box.text, '2 1 1');
  const before = await cameraTarget(page);
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-status .chip').click());
  await page.waitForTimeout(900);
  assert.deepEqual(await helpers(page), ['#ffd54f', '#ffd54f'], 'the two lamps on, outlined in yellow');
  assert.notDeepEqual(await cameraTarget(page), before, 'the camera goes to them');
  assert.match((await boxOf(page, 'status')).classes, /f3d-status/);
  assert.equal(await page.evaluate(() => window.__card.shadowRoot.querySelectorAll('.f3d-status .chip.active').length), 1);
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-status .chip').click());
  assert.deepEqual(await helpers(page), [], 'a second tap ends it');
  // Everything off and closed.
  await page.evaluate(() => {
    ['light.lamp_1', 'light.lamp_2'].forEach((id) => window.__setState(id, 'off'));
    window.__setState('binary_sensor.window', 'off');
    window.__setState('lock.front', 'locked');
  });
  box = await boxOf(page, 'status');
  assert.deepEqual(box.icons, ['mdi:check-circle-outline']);
  assert.equal(box.text, 'All off');
  assert.deepEqual(errors, []);
  await page.close();
});

test('boxes: energy, people, alarm panel and chips, each in its corner, stacked without covering each other or the menus', { timeout: TIMEOUT }, async () => {
  const rooms = [
    { name: 'Living room', object_id: 'floor_living', power: ['sensor.washer', 'sensor.tv'] },
    { name: 'Bedroom', object_id: 'floor_bed', power: 'sensor.heater' },
  ];
  const config = house({
    rooms,
    zoom_areas: [{ zoom: 'Living', camera_position: { x: -200, y: 500, z: 300 }, camera_target: { x: -200, y: 0, z: 0 } }],
    status: 'yes',
    weather: 'weather.home',
    energy_power: 'sensor.house_power',
    energy_solar: 'sensor.solar_power',
    energy_grid: 'sensor.grid_power',
    energy_battery: 'sensor.battery',
    energy_top: 2,
    people: [{ entity: 'person.anna', room: 'sensor.anna_area' }, 'person.marco', 'person.lucia'],
    alarm_panel: 'alarm_control_panel.home',
    chips: ['sensor.outdoor', { entity: 'binary_sensor.front_door', name: 'Door' }],
  });
  const boxStates = states({
    'weather.home': { state: 'sunny', attributes: { temperature: 20, supported_features: 1 } },
    'sensor.house_power': { state: '1234', attributes: { unit_of_measurement: 'W' } },
    'sensor.solar_power': { state: '3.4', attributes: { unit_of_measurement: 'kW' } },
    'sensor.grid_power': { state: '-500', attributes: { unit_of_measurement: 'W' } },
    'sensor.battery': { state: '80', attributes: { unit_of_measurement: '%' } },
    'sensor.washer': { state: '1900', attributes: { unit_of_measurement: 'W', friendly_name: 'Washer' } },
    'sensor.tv': { state: '120', attributes: { unit_of_measurement: 'W', friendly_name: 'TV' } },
    'sensor.heater': { state: '800', attributes: { unit_of_measurement: 'W', friendly_name: 'Heater' } },
    'person.anna': { state: 'home', attributes: { friendly_name: 'Anna Rossi', entity_picture: PICTURE } },
    'sensor.anna_area': { state: 'Bedroom', attributes: {} },
    'person.marco': { state: 'not_home', attributes: { friendly_name: 'Marco' } },
    'person.lucia': { state: 'Work', attributes: { friendly_name: 'Lucia' } },
    'alarm_control_panel.home': { state: 'armed_away', attributes: {} },
    'sensor.outdoor': { state: '12.5', attributes: { unit_of_measurement: '°C', friendly_name: 'Outdoor' } },
    'binary_sensor.front_door': { state: 'off', attributes: { device_class: 'door' } },
  });
  const { page, errors } = await open(config, boxStates);
  await moreInfo(page);

  // Corners: the defaults, stacked from the corner, under the menus at the top right.
  const kinds = ['status', 'people', 'alarm_panel', 'energy', 'weather', 'chips'];
  const boxes = Object.fromEntries(await Promise.all(kinds.map(async (k) => [k, await boxOf(page, k)])));
  assert.deepEqual(
    kinds.map((k) => boxes[k].corner),
    ['top-left', 'top-left', 'top-right', 'bottom-left', 'bottom-left', 'bottom-right'],
  );
  const overlap = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  kinds.forEach((a, i) => kinds.slice(i + 1).forEach((b) => assert.ok(!overlap(boxes[a].rect, boxes[b].rect), a + ' covers ' + b)));
  const menus = await page.evaluate(() => window.__card._zoommenu.getBoundingClientRect().bottom);
  assert.ok(boxes.alarm_panel.rect[1] > menus, 'the alarm panel under the menus');
  assert.ok(boxes.people.rect[1] > boxes.status.rect[3], 'people under the status, from the top');
  assert.ok(boxes.weather.rect[3] < boxes.energy.rect[1], 'energy at the bottom, the weather above it');

  // Energy: values, the export to the grid, the two plugs that use the most.
  assert.deepEqual(boxes.energy.icons, ['mdi:home-lightning-bolt', 'mdi:solar-power', 'mdi:transmission-tower-export', 'mdi:battery-80']);
  assert.equal(boxes.energy.text, '1.2 kW 3.4 kW 500 W 80% Washer1.9 kW Heater800 W');
  const living = await page.evaluate(() => window.__card._roomViews.find((r) => r.name === 'Living room').box.getCenter(window.__card._controls.target.clone()).toArray().map(Math.round));
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-energy .consumer').click());
  await page.waitForTimeout(900);
  assert.deepEqual(await cameraTarget(page), living, 'the washer: to its room');
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-energy .value').click());

  // People: the room of Anna from her area sensor, Marco away, Lucia in a zone.
  assert.equal(boxes.people.text, 'Anna Bedroom M Marco Away L Lucia Work');
  assert.equal(await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-people img').getAttribute('src')), PICTURE);
  assert.equal(await page.evaluate(() => window.__card.shadowRoot.querySelectorAll('.f3d-people .away').length), 2);
  const bedroom = await page.evaluate(() => window.__card._roomViews.find((r) => r.name === 'Bedroom').box.getCenter(window.__card._controls.target.clone()).toArray().map(Math.round));
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-people .place.link').click());
  await page.waitForTimeout(900);
  assert.deepEqual(await cameraTarget(page), bedroom, 'her room');
  assert.deepEqual(await helpers(page), ['#ffffff'], 'its floor outlined');

  // Alarm panel: its state; red and blinking when triggered; a tap opens it.
  assert.deepEqual([boxes.alarm_panel.icons, boxes.alarm_panel.text], [['mdi:shield-lock'], 'Armed away']);
  await page.evaluate(() => window.__setState('alarm_control_panel.home', 'triggered'));
  const triggered = await boxOf(page, 'alarm_panel');
  assert.deepEqual([triggered.icons, triggered.text], [['mdi:bell-ring'], 'Triggered']);
  assert.match(triggered.classes, /pulse/);
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-alarm_panel').click());

  // Chips: the state with its unit; a name when given; a tap opens the entity.
  assert.equal(boxes.chips.text, '12.5 °C Door off');
  await page.evaluate(() => window.__card.shadowRoot.querySelector('.f3d-chips .chip').click());

  assert.deepEqual(await page.evaluate(() => window.__moreInfo), ['sensor.house_power', 'alarm_control_panel.home', 'sensor.outdoor']);
  // On a narrow card (a phone) the corners of a side don't cover each other or the menus.
  await page.addStyleTag({ content: '#wrap { width: 380px !important; }' });
  await page.waitForTimeout(300);
  const narrow = Object.fromEntries(await Promise.all(kinds.map(async (k) => [k, (await boxOf(page, k)).rect])));
  narrow.menus = await page.evaluate(() => {
    const r = window.__card._zoommenu.getBoundingClientRect();
    return [r.left, r.top, r.right, r.bottom].map(Math.round);
  });
  Object.keys(narrow).forEach((a, i) =>
    Object.keys(narrow)
      .slice(i + 1)
      .forEach((b) => assert.ok(!overlap(narrow[a], narrow[b]), 'narrow: ' + a + ' covers ' + b + ' ' + narrow[a] + ' / ' + narrow[b])),
  );

  // A box left out of the configuration goes away.
  await page.evaluate(() => {
    const card = window.__card;
    card._config = { ...card._config, chips: undefined };
    card._renderBoxes(true);
  });
  assert.equal(await boxOf(page, 'chips'), null);
  assert.deepEqual(errors, []);
  await page.close();
});
