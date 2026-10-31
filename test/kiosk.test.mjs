// Tests of src/kiosk.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { mock, test } from 'node:test';
import { Kiosk } from '../src/kiosk.ts';

// The clock goes on second by second (one tick of the mock timers runs the timers set during it only
// up to a point).
function advance(ms) {
  for (; ms >= 1000; ms -= 1000) mock.timers.tick(1000);
  if (ms > 0) mock.timers.tick(ms);
}

// A card with views 0, 2 and 3 (1 is missing): what the kiosk showed.
function card(config) {
  const shown = [];
  const host = { config, views: () => [0, 2, 3], show: (index) => shown.push(index), hold: () => host.alarm };
  return { shown, host };
}

test('kiosk: the tour goes through the initial view and every zoom area, then again', () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const { shown, host } = card({ kiosk: 'yes', kiosk_tour: 10 });
    const kiosk = new Kiosk(host);
    kiosk.start();
    advance(9999);
    assert.deepEqual(shown, []);
    advance(1);
    assert.deepEqual(shown, [0]);
    advance(30000);
    assert.deepEqual(shown, [0, 2, 3, -1]);
    advance(10000);
    assert.deepEqual(shown, [0, 2, 3, -1, 0]);
    kiosk.stop();
    advance(60000);
    assert.equal(shown.length, 5, 'stopped');
  } finally {
    mock.timers.reset();
  }
});

test('kiosk: a touch stops the tour, which goes on from the initial view kiosk_idle seconds later', () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const { shown, host } = card({ kiosk: 'yes', kiosk_tour: 10, kiosk_idle: 30 });
    const kiosk = new Kiosk(host);
    kiosk.start();
    advance(15000);
    assert.deepEqual(shown, [0]);
    kiosk.touched();
    advance(20000);
    kiosk.touched(); // touched again: 30 seconds from now
    advance(29999);
    assert.deepEqual(shown, [0]);
    advance(1);
    assert.deepEqual(shown, [0, -1], 'back to the initial view');
    advance(10000);
    assert.deepEqual(shown, [0, -1, 0], 'and the tour goes on');
  } finally {
    mock.timers.reset();
  }
});

test('kiosk: without a tour the camera goes back after kiosk_idle (60 by default, 0 never); off does nothing', () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const plain = card({ kiosk: 'yes' });
    const kiosk = new Kiosk(plain.host);
    kiosk.start();
    advance(120000);
    assert.deepEqual(plain.shown, [], 'no tour');
    kiosk.touched();
    advance(60000);
    assert.deepEqual(plain.shown, [-1]);
    advance(600000);
    assert.deepEqual(plain.shown, [-1], 'once');

    const never = card({ kiosk: 'yes', kiosk_tour: 5, kiosk_idle: 0 });
    const k2 = new Kiosk(never.host);
    k2.start();
    k2.touched();
    advance(600000);
    assert.deepEqual(never.shown, [], 'kiosk_idle 0: the tour stays stopped');

    const off = card({ kiosk: 'no', kiosk_tour: 5 });
    const k3 = new Kiosk(off.host);
    k3.start();
    k3.touched();
    advance(600000);
    assert.deepEqual(off.shown, []);
  } finally {
    mock.timers.reset();
  }
});

test('kiosk: the tour waits while the camera must stay (an alarm shown by alarm_view); before start a touch does nothing', () => {
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const { shown, host } = card({ kiosk: 'yes', kiosk_tour: 10, kiosk_idle: 30 });
    const kiosk = new Kiosk(host);
    kiosk.touched(); // in the editor, or before the model is shown
    advance(60000);
    assert.deepEqual(shown, []);
    kiosk.start();
    advance(10000);
    assert.deepEqual(shown, [0]);
    host.alarm = true;
    advance(60000);
    assert.deepEqual(shown, [0], 'the camera stays on the alarm');
    host.alarm = false;
    advance(10000);
    assert.deepEqual(shown, [0, 2], 'then the tour goes on');
    kiosk.stop();
    kiosk.touched();
    advance(60000);
    assert.deepEqual(shown, [0, 2], 'stopped: a touch does nothing');
  } finally {
    mock.timers.reset();
  }
});
