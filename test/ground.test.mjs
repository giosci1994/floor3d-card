// Tests of src/ground.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { grassTexture, groundAlpha, groundStyle } from '../src/ground.ts';

test('ground: grass, a colour, or nothing', () => {
  assert.deepEqual(groundStyle('grass'), { kind: 'grass' });
  assert.deepEqual(groundStyle(' Grass '), { kind: 'grass' });
  assert.deepEqual(groundStyle('#806040'), { kind: 'color', color: '#806040' });
  assert.deepEqual(groundStyle('sandybrown'), { kind: 'color', color: 'sandybrown' });
  for (const none of [undefined, null, '', ' ', 'no', 'none', 'false', false, 0]) assert.equal(groundStyle(none), null, String(none));
});

test('ground: opaque up to half its radius, then fading to nothing at the edge', () => {
  assert.equal(groundAlpha(0, 1000), 1);
  assert.equal(groundAlpha(500, 1000), 1);
  assert.equal(groundAlpha(750, 1000), 0.5);
  assert.equal(groundAlpha(1000, 1000), 0);
  assert.equal(groundAlpha(2000, 1000), 0);
  let previous = 1;
  for (let r = 0; r <= 1000; r += 50) {
    const a = groundAlpha(r, 1000);
    assert.ok(a <= previous, 'never more opaque farther out');
    previous = a;
  }
});

test('lawn: green, always the same, and a tile that repeats without seams', () => {
  const size = 128;
  const data = grassTexture(size);
  assert.equal(data.length, size * size * 4);
  assert.deepEqual(data, grassTexture(size), 'the same every time');
  let r = 0;
  let g = 0;
  let b = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    assert.equal(data[i + 3], 255, 'opaque');
  }
  assert.ok(g > r && r > b, 'green: ' + [r, g, b].map((v) => Math.round(v / (size * size))));
  // Across the edges of the tile the colours change as little as between two columns inside it.
  const column = (x) => Array.from({ length: size }, (_, y) => data[(y * size + x) * 4 + 1]);
  const step = (a, b) => column(a).reduce((sum, v, y) => sum + Math.abs(v - column(b)[y]), 0) / size;
  const inside = (step(10, 11) + step(60, 61) + step(100, 101)) / 3;
  assert.ok(step(size - 1, 0) < inside * 1.5 + 2, 'seam ' + step(size - 1, 0) + ' / inside ' + inside);
});
