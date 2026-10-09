// Tests of src/config.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { cleanConfig, matchObjects, normalizeConfig, objectPattern } from '../src/config.ts';

const example = JSON.parse(fs.readFileSync(new URL('./config.json', import.meta.url), 'utf8'));

test('switches: true/false read as yes/no', () => {
  const c = normalizeConfig({ shadow: true, click: false, entities: [{ entity: 'light.a', type3d: 'light', light: { shadow: false } }] });
  assert.equal(c.shadow, 'yes');
  assert.equal(c.click, 'no');
  assert.equal(c.entities[0].light.shadow, 'no');
});

test('switches: only the ones at their default are left out', () => {
  const c = cleanConfig({ header: 'yes', click: 'no', shadow: 'yes', editModeNotifications: 'no', hideLevelsMenu: 'no', sun_shadow: 'yes', sky: 'no', entities: [] });
  assert.deepEqual(c, { shadow: 'yes', editModeNotifications: 'no', entities: [] });
});

test('switches of an options block are kept, default or not', () => {
  const c = cleanConfig({ entities: [{ entity: 'light.a', type3d: 'light', light: { shadow: 'no' } }] });
  assert.equal(c.entities[0].light.shadow, 'no');
});

test('overlay size and colours left out when they are the defaults', () => {
  const c = cleanConfig({ overlay: 'yes', overlay_width: '33', overlay_height: 25, overlay_bgcolor: 'transparent', overlay_fgcolor: 'white', entities: [] });
  assert.deepEqual(c, { overlay: 'yes', overlay_height: 25, overlay_fgcolor: 'white', entities: [] });
});

test('language: left out on auto (the language of the user), kept when chosen', () => {
  assert.ok(!('language' in cleanConfig({ language: 'auto', entities: [] })));
  assert.equal(cleanConfig({ language: 'de', entities: [] }).language, 'de');
});

test('object groups: plain ids read and written', () => {
  const n = normalizeConfig({ object_groups: [{ object_group: 'g', objects: ['a', { object_id: 'b' }] }, { object_group: 'h' }] });
  assert.deepEqual(n.object_groups[0].objects, [{ object_id: 'a' }, { object_id: 'b' }]);
  assert.deepEqual(n.object_groups[1].objects, []);
  const c = cleanConfig({ entities: [], object_groups: [{ object_group: 'g', objects: [{ object_id: 'a' }, { object_id: '' }, {}, 'c'] }] });
  assert.deepEqual(c.object_groups, [{ object_group: 'g', objects: ['a', 'c'] }]);
});

test('the options block the card reads is added when missing', () => {
  const c = normalizeConfig({ entities: [{ entity: 'light.a', type3d: 'light' }, { entity: 'x.b', type3d: 'hide' }, { entity: 'x.c', type3d: 'tracker' }] });
  assert.deepEqual(c.entities[0].light, {});
  assert.deepEqual(c.entities[1].hide, {});
  assert.equal(c.entities[2].tracker, undefined);
});

test('empty rows left out, rows being filled in kept', () => {
  const c = cleanConfig({
    entities: [{ entity: '' }, { entity: '', type3d: 'light' }, { entity: 'light.a', object_id: '', light: {} }, 'switch.b', ''],
    object_groups: [{ object_group: '' }],
    zoom_areas: [{ zoom: '' }],
  });
  assert.deepEqual(c, { entities: [{ entity: '', type3d: 'light' }, { entity: 'light.a' }, 'switch.b'] });
});

test('rooms: empty rows left out, rows being filled in kept', () => {
  const c = cleanConfig({ entities: [], rooms: [{ name: 'Bedroom', object_id: 'f1' }, { name: '' }, { name: '', object_id: 'f2' }] });
  assert.deepEqual(c.rooms, [{ name: 'Bedroom', object_id: 'f1' }, { name: '', object_id: 'f2' }]);
  assert.ok(!('rooms' in cleanConfig({ entities: [], rooms: [{ name: '' }] })));
});

test('rooms: illuminance kept, with the limits of its map', () => {
  const c = cleanConfig({
    room_colors: 'illuminance',
    illuminance_min: 2,
    illuminance_max: 2000,
    entities: [],
    rooms: [{ name: 'Living', object_id: 'f1', illuminance: 'sensor.lux', temperature: '' }],
  });
  assert.deepEqual(c.rooms, [{ name: 'Living', object_id: 'f1', illuminance: 'sensor.lux' }]);
  assert.equal(c.room_colors, 'illuminance');
  assert.equal(c.illuminance_min, 2);
  assert.equal(c.illuminance_max, 2000);
});

test('numbers written as numbers; zero, entity ids and object ids kept', () => {
  const c = cleanConfig({
    globalLightPower: 'sensor.lux',
    overlay_width: '40',
    entities: [
      { entity: 'light.a', type3d: 'light', light: { lumens: '700', decay: '0', color: '#fff' } },
      { entity: 'b.b', type3d: 'door', door: { degrees: '-50', percentage: 0, hinge: '12' }, object_id: '129' },
    ],
  });
  assert.equal(c.globalLightPower, 'sensor.lux');
  assert.equal(c.overlay_width, 40);
  assert.deepEqual(c.entities[0].light, { lumens: 700, decay: 0, color: '#fff' });
  assert.deepEqual(c.entities[1].door, { degrees: -50, percentage: 0, hinge: '12' });
  assert.equal(c.entities[1].object_id, '129');
});

test('light powers: numbers typed as text written as numbers, sensor ids kept', () => {
  const c = cleanConfig({ globalLightPower: '0.3', sun_power: '0', sky_power: 'sensor.diffuse_light', sky_color: '#ffffff', entities: [] });
  assert.equal(c.globalLightPower, 0.3);
  assert.equal(c.sun_power, 0);
  assert.equal(c.sky_power, 'sensor.diffuse_light');
  assert.equal(c.sky_color, '#ffffff');
  assert.equal(cleanConfig({ sun_power: 'sensor.direct_light', sky_power: 0.4, entities: [] }).sun_power, 'sensor.direct_light');
});

test('one light for a lamp: single read as yes/no and kept, light_object kept', () => {
  const n = normalizeConfig({ entities: [{ entity: 'light.a', type3d: 'light', object_id: '<spots>', light: { single: true } }] });
  assert.equal(n.entities[0].light.single, 'yes');
  const c = cleanConfig({
    entities: [
      { entity: 'light.a', type3d: 'light', object_id: '<spots>', light: { single: 'no', lumens: '2500' } },
      { entity: 'light.b', type3d: 'light', object_id: 'Lamp_*', light: { light_object: 'Lamp_2' } },
    ],
  });
  assert.deepEqual(c.entities[0].light, { single: 'no', lumens: 2500 });
  assert.deepEqual(c.entities[1].light, { light_object: 'Lamp_2' });
});

test('rotate: round_per_second and ramp written as numbers', () => {
  const c = cleanConfig({ entities: [{ entity: 'fan.a', type3d: 'rotate', rotate: { axis: 'y', round_per_second: '1', ramp: '0' } }] });
  assert.deepEqual(c.entities[0].rotate, { axis: 'y', round_per_second: 1, ramp: 0 });
});

test('url_parameters: kept when set, left out when empty', () => {
  assert.deepEqual(cleanConfig({ url_parameters: { zoom: 'area' }, entities: [] }).url_parameters, { zoom: 'area' });
  assert.ok(!('url_parameters' in cleanConfig({ url_parameters: { zoom: '' }, entities: [] })));
  assert.ok(!('url_parameters' in cleanConfig({ url_parameters: {}, entities: [] })));
});

test('object ids with *: the matching names of the model', () => {
  const names = ['Lamp_1', 'Lamp_2', 'Lamp_kitchen', 'Lamps', 'Wall', 'a.b(1)', 'axb(1)'];
  assert.deepEqual(matchObjects('Lamp_*', names), ['Lamp_1', 'Lamp_2', 'Lamp_kitchen']);
  assert.deepEqual(matchObjects('*all', names), ['Wall']);
  assert.deepEqual(matchObjects('a.b(*)', names), ['a.b(1)']); // . and ( ) are plain characters
  assert.deepEqual(matchObjects('Lamp_9*', names), []);
  assert.deepEqual(matchObjects('Wall', names), ['Wall']); // a plain id stays as it is
  assert.deepEqual(matchObjects('Door', names), ['Door']);
  assert.equal(objectPattern('Lamp_1'), null);
  assert.equal(objectPattern('<group>'), null);
});

test('the given config is not modified', () => {
  const input = { shadow: true, entities: [{ entity: '' }], object_groups: [{ object_group: 'g', objects: ['a'] }] };
  const before = JSON.stringify(input);
  normalizeConfig(input);
  cleanConfig(input);
  assert.equal(JSON.stringify(input), before);
});

test('example config: cleaning twice gives the same result', () => {
  const clean = cleanConfig(example);
  assert.deepEqual(cleanConfig(clean), clean);
});

test('example config: nothing is lost except defaults and empty values', () => {
  const leaves = (o, p = '', out = {}) => {
    if (o !== null && typeof o === 'object') {
      const entries = Object.entries(o);
      if (!entries.length) out[p] = Array.isArray(o) ? '[]' : '{}';
      entries.forEach(([k, v]) => leaves(v, p + '/' + k, out));
    } else out[p] = o;
    return out;
  };
  const defaults = {
    header: 'yes', click: 'no', overlay: 'no', lock_camera: 'no', show_axes: 'no', shadow: 'no', extralightmode: 'no',
    hideLevelsMenu: 'no', hideZoomMenu: 'no', editModeNotifications: 'yes', selectionMode: 'no', sun: 'no', sun_shadow: 'yes',
    log_depth: 'no', reversed_depth: 'yes', state_colors: 'no', sky: 'no',
    overlay_width: '33', overlay_height: '20', overlay_bgcolor: 'transparent', overlay_fgcolor: 'black',
  };
  const before = leaves(normalizeConfig(example));
  const after = leaves(normalizeConfig(cleanConfig(example)));
  for (const [p, v] of Object.entries(before)) {
    if (p in after) {
      assert.equal(String(after[p]), String(v), p);
      continue;
    }
    const topLevel = p.split('/').length === 2;
    assert.ok(v === '' || v === '{}' || v === '[]' || (topLevel && String(defaults[p.slice(1)]) === String(v)), 'lost: ' + p);
  }
  for (const p of Object.keys(after)) assert.ok(p in before, 'added: ' + p);
});

test('sensor maps and rooms: empty maps left out, numbers written as numbers, sensors and alarms kept', () => {
  const c = cleanConfig({
    alarm_view: true,
    entities: [],
    maps: [{ key: 'co2', min: '400', max: '1400', colors: ['#00ff00', '', '#ff0000'] }, { key: '' }, { name: 'Fridge', key: 'fridge', decimals: '1' }],
    rooms: [{ name: 'Kitchen', object_id: 'floor_kitchen', co2: 'sensor.co2', power: ['sensor.a', 'sensor.b'], alarms: 'binary_sensor.smoke', climate: '' }],
  });
  assert.equal(c.alarm_view, 'yes');
  assert.deepEqual(c.maps, [{ key: 'co2', min: 400, max: 1400, colors: ['#00ff00', '#ff0000'] }, { name: 'Fridge', key: 'fridge', decimals: 1 }]);
  assert.deepEqual(c.rooms[0], { name: 'Kitchen', object_id: 'floor_kitchen', co2: 'sensor.co2', power: ['sensor.a', 'sensor.b'], alarms: 'binary_sensor.smoke' });
  assert.ok(!('alarm_view' in cleanConfig({ alarm_view: 'no', entities: [] })));
});

test('covers and weather: angles of the slats and forecasts shown written as numbers, defaults left out', () => {
  const c = cleanConfig({
    backgroundColor: 'sky',
    weather: 'weather.home',
    weather_position: 'bottom-left',
    weather_forecast: 'hourly',
    weather_count: '6',
    entities: [{ entity: 'cover.blind', type3d: 'cover', object_id: 'blind', cover: { slats: 'blind', motion: 'none', tilt_closed: '-60', tilt_open: '30' } }],
  });
  assert.deepEqual(c.entities[0].cover, { slats: 'blind', motion: 'none', tilt_closed: -60, tilt_open: 30 });
  assert.equal(c.backgroundColor, 'sky');
  assert.equal(c.weather, 'weather.home');
  assert.equal(c.weather_forecast, 'hourly');
  assert.equal(c.weather_count, 6);
  assert.ok(!('weather_position' in c), 'bottom-left is the default');
  assert.ok(!('weather_count' in cleanConfig({ weather_count: 4, entities: [] })));
});

test('boxes: people and chips without empty rows, an id alone written as the id, defaults left out', () => {
  const c = cleanConfig({
    status_show: true,
    status_position: 'top-left',
    energy_power: 'sensor.house',
    energy_top: '5',
    energy_position: 'top-right',
    energy_plugs: ['sensor.washer', ''],
    people: ['person.a', { entity: 'person.b', room: 'sensor.b_area' }, { entity: 'person.c', room: '' }, { entity: '' }, ''],
    chips: [],
    alarm_panel: 'alarm_control_panel.home',
    alarm_panel_position: 'top-right',
    entities: [],
  });
  assert.equal(c.status_show, 'yes');
  assert.ok(!('status_position' in c), 'top-left is the default');
  assert.equal(c.energy_top, 5);
  assert.equal(c.energy_position, 'top-right');
  assert.deepEqual(c.energy_plugs, ['sensor.washer']);
  assert.deepEqual(c.people, ['person.a', { entity: 'person.b', room: 'sensor.b_area' }, 'person.c']);
  assert.ok(!('chips' in c));
  assert.ok(!('alarm_panel_position' in c), 'top-right is the default');
  assert.ok(!('status_show' in cleanConfig({ status_show: 'no', entities: [] })));
  assert.equal(cleanConfig({ status: true, entities: [] }).status_show, 'yes', 'the status: yes of before');
  assert.ok(!('status' in normalizeConfig({ status: 'yes', entities: [] })));
  // A box hidden keeps its settings; shown is the default and goes away.
  const hidden = cleanConfig({ weather: 'weather.home', weather_show: false, chips: ['sensor.t'], chips_show: 'yes', hideMapMenu: true, entities: [] });
  assert.deepEqual([hidden.weather, hidden.weather_show, hidden.chips, 'chips_show' in hidden, hidden.hideMapMenu], ['weather.home', 'no', ['sensor.t'], false, 'yes']);
  const one = normalizeConfig({ people: 'person.a', chips: 'sensor.t', energy_plugs: 'sensor.washer', entities: [] });
  assert.deepEqual([one.people, one.chips, one.energy_plugs], [['person.a'], ['sensor.t'], ['sensor.washer']], 'one alone: a list');
});

test('cameras: position as [x, y, z] once complete, sensors as a list, an id alone written as the id, defaults left out', () => {
  const c = cleanConfig({
    cameras: [
      'camera.a',
      { entity: 'camera.b', position: { x: 10, y: '240', z: -30 }, level: '1', name: '', popup_on: ['binary_sensor.bell', ''] },
      { entity: 'camera.c', position: { x: 5, y: '' } },
      { entity: 'camera.d', popup_on: [] },
      { entity: '', position: [1, 2, 3] },
      { entity: '' },
      '',
    ],
    cameras_show: true,
    camera_popup_show: 'yes',
    camera_popup_position: 'bottom-right',
    camera_popup_duration: '30',
    stars_show: false,
    moon_show: 'yes',
    entities: [],
  });
  assert.deepEqual(c.cameras, [
    'camera.a',
    { entity: 'camera.b', position: [10, 240, -30], level: 1, popup_on: ['binary_sensor.bell'] },
    { entity: 'camera.c', position: { x: 5 } },
    'camera.d',
    { entity: '', position: [1, 2, 3] },
  ]);
  assert.ok(!('cameras_show' in c) && !('camera_popup_show' in c) && !('camera_popup_position' in c) && !('moon_show' in c), 'defaults');
  assert.equal(c.camera_popup_duration, 30);
  assert.equal(c.stars_show, 'no');
  assert.ok(!('camera_popup_duration' in cleanConfig({ camera_popup_duration: 20, entities: [] })));
  assert.ok(!('cameras' in cleanConfig({ cameras: [{ entity: '' }, ''], entities: [] })));
  const one = normalizeConfig({ cameras: 'camera.a', entities: [] });
  assert.deepEqual(one.cameras, ['camera.a'], 'one alone: a list');
  assert.deepEqual(normalizeConfig({ cameras: [{ entity: 'camera.a', popup_on: 'event.bell' }], entities: [] }).cameras[0].popup_on, ['event.bell']);
});
