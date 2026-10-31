// Tests of src/quality.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { LOW_SHADOWS, lowQuality, pixelRatioLimit, shadowLimit, weakDevice } from '../src/quality.ts';

test('quality: a weak device has 2 GB or less, 2 cores or fewer, or a touch screen and 4 cores or fewer', () => {
  assert.equal(weakDevice({ memory: 2, cores: 8 }), true);
  assert.equal(weakDevice({ memory: 8, cores: 2 }), true);
  assert.equal(weakDevice({ memory: 4, cores: 4, touch: true }), true);
  assert.equal(weakDevice({ memory: 4, cores: 4, touch: false }), false, 'a desktop with 4 cores');
  assert.equal(weakDevice({ memory: 8, cores: 8, touch: true }), false, 'a recent tablet');
  assert.equal(weakDevice({ cores: 6, touch: true }), false, 'Safari tells no memory');
  assert.equal(weakDevice({}), false, 'what is not told does not count');
});

test('quality: high by default, low, auto low only on a weak device', () => {
  const weak = { memory: 2, cores: 4, touch: true };
  const strong = { memory: 8, cores: 8 };
  assert.equal(lowQuality({}, weak), false);
  assert.equal(lowQuality({ quality: 'high' }, weak), false);
  assert.equal(lowQuality({ quality: 'low' }, strong), true);
  assert.equal(lowQuality({ quality: 'auto' }, weak), true);
  assert.equal(lowQuality({ quality: 'auto' }, strong), false);
});

test('quality: the pixel ratio and the shadows of the profile, max_pixel_ratio and max_shadows win', () => {
  assert.equal(pixelRatioLimit({}, false), 2);
  assert.equal(pixelRatioLimit({}, true), 1);
  assert.equal(pixelRatioLimit({ max_pixel_ratio: 1.5 }, true), 1.5);
  assert.equal(pixelRatioLimit({ max_pixel_ratio: '3' }, false), 3);
  assert.equal(pixelRatioLimit({ max_pixel_ratio: '' }, true), 1);
  assert.equal(shadowLimit({}, false), undefined, 'as many as the GPU takes');
  assert.equal(shadowLimit({}, true), LOW_SHADOWS);
  assert.equal(shadowLimit({ max_shadows: 6 }, true), 6);
  assert.equal(shadowLimit({ max_shadows: '2' }, false), 2);
  assert.equal(shadowLimit({ max_shadows: 0 }, false), 0, 'the sun only');
});
