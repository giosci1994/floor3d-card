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
  camera_position: { x: 700, y: 1300, z: 1200 },
  camera_target: { x: 700, y: 0, z: 700 },
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
