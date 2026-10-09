// Tests of src/cameras.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cameraList, cameraName, newPopupMemory, point, popupStep, snapshotUrl } from '../src/cameras.ts';

const st = (state, attributes = {}) => ({ state, attributes });

test('cameras: ids or objects, positions as lists or x y z', () => {
  assert.deepEqual(point([1, '2', -3.5]), [1, 2, -3.5]);
  assert.deepEqual(point({ x: 1, y: 2, z: 3 }), [1, 2, 3]);
  assert.equal(point([1, 2]), undefined);
  assert.equal(point({ x: 1, y: '', z: 3 }), undefined, 'a number still empty in the editor');
  assert.equal(point([1, null, 3]), undefined);
  assert.equal(point('1,2,3'), undefined);
  assert.deepEqual(
    cameraList([
      'camera.a',
      { entity: 'camera.b', position: [10, 240, -30], level: '1', name: 'Door', icon: 'mdi:doorbell-video', popup_on: 'binary_sensor.bell' },
      { entity: 'camera.c', position: { x: 1, y: 2 }, level: 'x', popup_on: ['binary_sensor.m', '', 'event.e'] },
      { position: [1, 2, 3] },
      '',
      null,
    ]),
    [
      { entity: 'camera.a', popup_on: [] },
      { entity: 'camera.b', position: [10, 240, -30], level: 1, name: 'Door', icon: 'mdi:doorbell-video', popup_on: ['binary_sensor.bell'] },
      { entity: 'camera.c', position: undefined, level: undefined, name: undefined, icon: undefined, popup_on: ['binary_sensor.m', 'event.e'] },
    ],
  );
  assert.deepEqual(cameraList('camera.a'), [{ entity: 'camera.a', popup_on: [] }]);
  assert.deepEqual(cameraList(undefined), []);
});

test('cameras: name and picture', () => {
  const [camera] = cameraList(['camera.a']);
  assert.equal(cameraName(camera, st('idle', { friendly_name: 'Garden' })), 'Garden');
  assert.equal(cameraName({ ...camera, name: 'Gate' }, st('idle', { friendly_name: 'Garden' })), 'Gate');
  assert.equal(cameraName(camera, undefined), 'camera.a');
  assert.equal(snapshotUrl(st('idle', { entity_picture: '/api/camera_proxy/camera.a?token=abc' }), 42), '/api/camera_proxy/camera.a?token=abc&t=42');
  assert.equal(snapshotUrl(st('idle', { entity_picture: '/local/a.jpg' }), 42), '/local/a.jpg?t=42');
  assert.equal(snapshotUrl(st('unavailable'), 42), undefined);
});

test('pop-up: a sensor keeps the picture while on, and for the duration once off', () => {
  const cameras = cameraList([{ entity: 'camera.door', popup_on: ['binary_sensor.motion'] }, 'camera.map_only']);
  const memory = newPopupMemory();
  const step = (state, now) => popupStep(memory, cameras, { 'binary_sensor.motion': st(state) }, now, 20000);
  assert.deepEqual(step('off', 0), { showing: [], next: undefined });
  assert.deepEqual(step('on', 1000), { showing: [{ entity: 'camera.door', trigger: 'binary_sensor.motion' }], next: undefined }, 'on: no end yet');
  assert.deepEqual(step('on', 60000).showing.length, 1, 'still on a minute later');
  assert.deepEqual(step('off', 61000), { showing: [{ entity: 'camera.door', trigger: 'binary_sensor.motion' }], next: 81000 });
  assert.equal(step('off', 80999).showing.length, 1);
  assert.deepEqual(step('off', 81000), { showing: [], next: undefined }, 'gone after the duration');
});

test('pop-up: a sensor already on when the card opens counts, an old event does not', () => {
  const cameras = cameraList([
    { entity: 'camera.garden', popup_on: 'binary_sensor.garden' },
    { entity: 'camera.door', popup_on: ['event.doorbell'] },
  ]);
  const memory = newPopupMemory();
  const states = { 'binary_sensor.garden': st('on'), 'event.doorbell': st('2026-10-09T10:00:00.000+00:00') };
  assert.deepEqual(popupStep(memory, cameras, states, 0, 20000).showing, [{ entity: 'camera.garden', trigger: 'binary_sensor.garden' }]);
  // The doorbell rings: its event changes; the last to go off comes first.
  states['event.doorbell'] = st('2026-10-09T17:00:00.000+00:00');
  const rang = popupStep(memory, cameras, states, 5000, 20000);
  assert.deepEqual(rang.showing.map((s) => s.entity), ['camera.door', 'camera.garden']);
  assert.equal(rang.next, 25000, 'the event stays for the duration');
  // The same state again (another update of Home Assistant): no new ring.
  assert.equal(popupStep(memory, cameras, states, 26000, 20000).showing.map((s) => s.entity).join(), 'camera.garden');
  // unavailable, then back to the same time: not a ring either.
  states['event.doorbell'] = st('unavailable');
  popupStep(memory, cameras, states, 27000, 20000);
  states['event.doorbell'] = st('2026-10-09T17:00:00.000+00:00');
  assert.equal(popupStep(memory, cameras, states, 28000, 20000).showing.length, 1);
  // An event entity that had no event yet (unknown), then rings.
  const fresh = newPopupMemory();
  const doorOnly = { 'event.doorbell': st('unknown') };
  assert.deepEqual(popupStep(fresh, cameras, doorOnly, 0, 20000).showing, []);
  doorOnly['event.doorbell'] = st('2026-10-09T18:00:00.000+00:00');
  assert.deepEqual(popupStep(fresh, cameras, doorOnly, 1000, 20000).showing, [{ entity: 'camera.door', trigger: 'event.doorbell' }]);
});

test('pop-up: closed until the next time a sensor goes off; one sensor for two cameras', () => {
  const cameras = cameraList([
    { entity: 'camera.a', popup_on: ['binary_sensor.m'] },
    { entity: 'camera.b', popup_on: ['binary_sensor.m', 'binary_sensor.b'] },
    { entity: 'camera.b', popup_on: ['binary_sensor.b'] },
  ]);
  const memory = newPopupMemory();
  const states = { 'binary_sensor.m': st('on'), 'binary_sensor.b': st('off') };
  assert.equal(popupStep(memory, cameras, states, 1000, 10000).showing.length, 2, 'both cameras of the sensor');
  memory.dismissed = 2000;
  assert.deepEqual(popupStep(memory, cameras, states, 3000, 10000).showing, [], 'closed, though still on');
  states['binary_sensor.b'] = st('on');
  assert.deepEqual(popupStep(memory, cameras, states, 4000, 10000).showing, [{ entity: 'camera.b', trigger: 'binary_sensor.b' }]);
  states['binary_sensor.m'] = st('off');
  states['binary_sensor.b'] = st('off');
  popupStep(memory, cameras, states, 4500, 10000);
  states['binary_sensor.m'] = st('on');
  assert.deepEqual(
    popupStep(memory, cameras, states, 5000, 10000).showing.map((s) => s.entity),
    ['camera.a', 'camera.b'],
    'on again: a new time',
  );
});
