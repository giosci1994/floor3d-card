// Tests of src/boxes.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  batteryIcon,
  chipList,
  corner,
  formatPower,
  initials,
  matchRoom,
  panelLook,
  peopleList,
  personPlace,
  statusGroups,
  topConsumers,
  watts,
} from '../src/boxes.ts';
import { climateAction } from '../src/maps.ts';

const st = (entity_id, state, attributes = {}) => ({ entity_id, state, attributes });

test('corners: one of the four, else the default', () => {
  assert.equal(corner('top-right', 'bottom-left'), 'top-right');
  assert.equal(corner('middle', 'bottom-left'), 'bottom-left');
  assert.equal(corner(undefined, 'top-left'), 'top-left');
});

test('status: lamps on, doors and windows open, locks open, heaters working; each entity once', () => {
  const entities = [
    { entity: 'light.a', type3d: 'light', object_id: 'lamp_a' },
    { entity: 'light.a', type3d: 'light', object_id: 'lamp_a2' }, // the same lamp, two objects
    { entity: 'light.b', type3d: 'light', object_id: 'lamp_b' },
    { entity: 'binary_sensor.front', type3d: 'door', object_id: 'door_front' },
    { entity: 'binary_sensor.window', type3d: 'color', object_id: 'window_1' },
    { entity: 'cover.garage', type3d: 'cover', object_id: 'garage' },
    { entity: 'cover.shutter', type3d: 'cover', object_id: 'shutter' },
    { entity: 'lock.front', type3d: 'color', object_id: 'door_front' },
    { entity: 'climate.living', type3d: 'climate', object_id: 'radiator' },
    { entity: 'switch.boiler', type3d: 'climate', object_id: 'boiler' },
    { entity: 'sensor.t', type3d: 'text', object_id: 'tv' },
  ];
  const states = Object.fromEntries(
    [
      st('light.a', 'on'),
      st('light.b', 'off'),
      st('binary_sensor.front', 'on', { device_class: 'door' }),
      st('binary_sensor.window', 'on', { device_class: 'window' }),
      st('cover.garage', 'open', { device_class: 'garage' }),
      st('cover.shutter', 'open', { device_class: 'shutter' }),
      st('lock.front', 'unlocked'),
      st('climate.living', 'heat', { hvac_action: 'heating' }),
      st('switch.boiler', 'off'),
      st('sensor.t', '21'),
    ].map((s) => [s.entity_id, s]),
  );
  const groups = statusGroups(entities, states, climateAction);
  assert.deepEqual(
    groups.map((g) => [g.kind, g.entities, g.indices]),
    [
      ['lights', ['light.a'], [0, 1]],
      ['open', ['binary_sensor.front', 'binary_sensor.window', 'cover.garage'], [3, 4, 5]],
      ['unlocked', ['lock.front'], [7]],
      ['climate', ['climate.living'], [8]],
    ],
  );
  states['switch.boiler'] = st('switch.boiler', 'on');
  assert.deepEqual(statusGroups(entities, states, climateAction).find((g) => g.kind === 'climate').entities, ['climate.living', 'switch.boiler']);
  assert.deepEqual(statusGroups([{ entity: 'light.b', type3d: 'light' }], states, climateAction), [], 'nothing on: no group');
});

test('energy: watts from W, kW and MW, written in the language', () => {
  assert.equal(watts(st('sensor.p', '950', { unit_of_measurement: 'W' })), 950);
  assert.equal(watts(st('sensor.p', '1.25', { unit_of_measurement: 'kW' })), 1250);
  assert.ok(isNaN(watts(st('sensor.p', 'unavailable', { unit_of_measurement: 'W' }))));
  assert.ok(isNaN(watts(undefined)));
  assert.equal(formatPower(950, 'en'), '950 W');
  assert.equal(formatPower(1234, 'en'), '1.2 kW');
  assert.equal(formatPower(1234, 'it'), '1,2 kW');
  assert.equal(formatPower(12345, 'en'), '12 kW');
  assert.equal(formatPower(NaN, 'en'), '');
});

test('energy: the plugs that use the most, highest first, without the ones at 0 or unavailable', () => {
  const states = {
    'sensor.washer': st('sensor.washer', '1900', { unit_of_measurement: 'W' }),
    'sensor.fridge': st('sensor.fridge', '0.12', { unit_of_measurement: 'kW' }),
    'sensor.tv': st('sensor.tv', '0', { unit_of_measurement: 'W' }),
    'sensor.oven': st('sensor.oven', 'unavailable', { unit_of_measurement: 'W' }),
    'sensor.pc': st('sensor.pc', '310', { unit_of_measurement: 'W' }),
  };
  const ids = ['sensor.washer', 'sensor.fridge', 'sensor.tv', 'sensor.oven', 'sensor.pc', 'sensor.washer', 'sensor.missing'];
  assert.deepEqual(topConsumers(states, ids, 2), [
    { entity: 'sensor.washer', watts: 1900 },
    { entity: 'sensor.pc', watts: 310 },
  ]);
  assert.equal(topConsumers(states, ids, 10).length, 3);
  assert.deepEqual(topConsumers(states, ids, 0), []);
});

test('energy: battery icons', () => {
  assert.equal(batteryIcon(100), 'mdi:battery');
  assert.equal(batteryIcon(47), 'mdi:battery-50');
  assert.equal(batteryIcon(3), 'mdi:battery-outline');
  assert.equal(batteryIcon(NaN), 'mdi:battery-unknown');
});

test('alarm panel: green while armed, orange while it changes, red and blinking when triggered', () => {
  assert.equal(panelLook('armed_away').icon, 'mdi:shield-lock');
  assert.equal(panelLook('armed_night').color, panelLook('armed_home').color);
  assert.equal(panelLook('arming').color, panelLook('pending').color);
  assert.equal(panelLook('triggered').pulse, true);
  assert.ok(!panelLook('disarmed').pulse);
  assert.equal(panelLook('something new').icon, 'mdi:shield-alert-outline');
});

test('people: home in a room, away, in a zone; initials', () => {
  const rooms = [{ name: 'Living room', object_id: 'floor_living' }, { name: 'Bedroom', object_id: 'floor_bed' }];
  assert.equal(matchRoom('living_room', rooms), 0);
  assert.equal(matchRoom('Living-Room', rooms), 0);
  assert.equal(matchRoom('floor_bed', rooms), 1, 'by object id');
  assert.equal(matchRoom('Kitchen', rooms), -1);
  assert.equal(matchRoom('not_home', rooms), -1);
  assert.deepEqual(personPlace('home', 'Bedroom', rooms), { home: true, zone: undefined, room: 1 });
  assert.deepEqual(personPlace('home', undefined, rooms), { home: true, zone: undefined, room: -1 });
  assert.deepEqual(personPlace('not_home', 'Bedroom', rooms), { home: false, zone: undefined, room: -1 }, 'away: the room sensor is old');
  assert.deepEqual(personPlace('Work', undefined, rooms), { home: false, zone: 'Work', room: -1 });
  assert.equal(initials('Giovanni Rossi'), 'GR');
  assert.equal(initials('anna'), 'A');
  assert.equal(initials(''), '?');
});

test('people and chips: ids or objects', () => {
  assert.deepEqual(peopleList(['person.a', { entity: 'person.b', room: 'sensor.b_area' }, { room: 'x' }, '']), [
    { entity: 'person.a' },
    { entity: 'person.b', room: 'sensor.b_area' },
  ]);
  assert.deepEqual(peopleList('person.a'), [{ entity: 'person.a' }]);
  assert.deepEqual(peopleList(undefined), []);
  assert.deepEqual(chipList(['sensor.t', { entity: 'sensor.h', name: 'Out', icon: 'mdi:water' }, null]), [
    { entity: 'sensor.t' },
    { entity: 'sensor.h', name: 'Out', icon: 'mdi:water' },
  ]);
});
