// Tests of src/markers.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { markerActive, markerList } from '../src/markers.ts';

test('markers: an entity at a point of the model or over an object, with its level, name, icon and state', () => {
  assert.deepEqual(
    markerList([
      { entity: 'sensor.t', position: [1, 2, 3], level: '1', name: 'Living', icon: 'mdi:sofa' },
      { entity: 'binary_sensor.door', object_id: 'door_1', state: 'no' },
      { entity: 'sensor.p', position: { x: '4', y: 5, z: 6 }, state: false },
    ]),
    [
      {
        entity: 'sensor.t',
        position: [1, 2, 3],
        object_id: undefined,
        level: 1,
        name: 'Living',
        icon: 'mdi:sofa',
        state: true,
      },
      {
        entity: 'binary_sensor.door',
        position: undefined,
        object_id: 'door_1',
        level: undefined,
        name: undefined,
        icon: undefined,
        state: false,
      },
      {
        entity: 'sensor.p',
        position: [4, 5, 6],
        object_id: undefined,
        level: undefined,
        name: undefined,
        icon: undefined,
        state: false,
      },
    ],
  );
});

test('markers: without a place, an entity or a list, nothing', () => {
  assert.deepEqual(markerList([{ entity: 'sensor.t' }, { position: [1, 2, 3] }, 'sensor.x', null]), []);
  assert.deepEqual(markerList(undefined), []);
  assert.deepEqual(markerList({ entity: 'sensor.t', object_id: 'lamp' }).length, 1, 'one marker written alone');
  assert.equal(
    markerList([{ entity: 'sensor.t', position: [1, 'a', 3] }]).length,
    0,
    'a position that is not three numbers',
  );
  assert.equal(markerList([{ entity: 'sensor.t', position: [1, 2, 3], level: -1 }])[0].level, undefined);
});

test('markers: on, open or doing something is active', () => {
  ['on', 'open', 'unlocked', 'home', 'playing', 'heat'].forEach((s) => assert.equal(markerActive(s), true, s));
  ['off', 'closed', 'locked', 'not_home', 'idle', '21.5', 'unavailable', undefined].forEach((s) =>
    assert.equal(markerActive(s), false, String(s)),
  );
});
