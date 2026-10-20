// Tests of src/rotate.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { rotationAngle, sensorNumber, turnToward } from '../src/rotate.ts';

const deg = (r) => Math.round(((r * 180) / Math.PI) * 1000) / 1000;

test('angle: the state in degrees, within angle_min and angle_max, plus angle_offset', () => {
  assert.deepEqual(rotationAngle('90'), { angle: Math.PI / 2, wrap: true });
  assert.equal(deg(rotationAngle(45.5).angle), 45.5);
  assert.equal(deg(rotationAngle('120', 0, 90).angle), 90, 'kept within the limits');
  assert.equal(deg(rotationAngle('-10', '0', '90').angle), 0);
  assert.equal(rotationAngle('120', 0, 90).wrap, false, 'not a whole turn');
  assert.equal(deg(rotationAngle('10', 90, 0).angle), 10, 'limits the other way round');
  assert.equal(deg(rotationAngle('350', undefined, undefined, '20').angle), 370, 'offset added');
  assert.equal(deg(rotationAngle('30', '', '', '').angle), 30, 'empty fields: the defaults');
  for (const none of ['unavailable', 'unknown', '', ' ', undefined, null, 'abc'])
    assert.equal(rotationAngle(none), null, String(none));
});

test('turn: towards the target by at most a step, then the target; the shorter way on a whole turn', () => {
  assert.equal(turnToward(0, 1, 0.25, false), 0.25);
  assert.equal(turnToward(0.9, 1, 0.25, false), 1);
  assert.equal(turnToward(1, 0, 0.25, false), 0.75);
  const rad = (d) => (d * Math.PI) / 180;
  // From 350 to 10 degrees: through 0, not back through 180.
  const step = turnToward(rad(350), rad(10), rad(5), true);
  assert.equal(deg(step), 355);
  assert.equal(turnToward(rad(358), rad(10), rad(5), false) < rad(358), true, 'without wrap: back the long way');
  // Close enough: the target itself (a whole turn away looks the same), so that the turning ends.
  assert.equal(turnToward(rad(357), rad(1), rad(5), true), rad(1));
  assert.equal(turnToward(rad(1), rad(1), rad(5), true), rad(1));
});

test('number of a state: with a dot or a comma, with a unit after it; none for on, unavailable', () => {
  assert.equal(sensorNumber('12.5'), 12.5);
  assert.equal(sensorNumber('12,5'), 12.5, 'a comma');
  assert.equal(sensorNumber('12.5 °'), 12.5, 'a unit in the state');
  assert.equal(sensorNumber('30 km/h'), 30);
  assert.equal(sensorNumber(' -3 '), -3);
  assert.equal(sensorNumber('.5'), 0.5);
  assert.equal(sensorNumber(7), 7);
  for (const none of ['on', 'off', 'unavailable', 'unknown', '', ' ', 'abc', 'N 12', undefined, null, NaN])
    assert.equal(sensorNumber(none), null, String(none));
  assert.equal(deg(rotationAngle('45,5').angle), 45.5, 'the angle with a comma');
  assert.equal(deg(rotationAngle('90°').angle), 90, 'and with its unit');
});
