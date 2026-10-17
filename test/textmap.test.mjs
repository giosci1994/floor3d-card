// Tests of src/textmap.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fitText, textLayout } from '../src/textmap.ts';

// The triangles of a box from min to max (two a face, facing outwards).
function box(min, max) {
  const [x0, y0, z0] = min;
  const [x1, y1, z1] = max;
  const quad = (a, b, c, d) => [...a, ...b, ...c, ...a, ...c, ...d];
  return new Float32Array([
    ...quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]), // front +z
    ...quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]), // back -z
    ...quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]), // +x
    ...quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]), // -x
    ...quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]), // top
    ...quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]), // bottom
  ]);
}
// u, v of a corner of the triangles, and its position.
const corner = (positions, layout, k) => ({ p: Array.from(positions.slice(k * 3, k * 3 + 3)), uv: [layout.uv[k * 2], layout.uv[k * 2 + 1]].map((n) => Math.round(n * 1000) / 1000) });

test('text on a TV on a wall: on the largest faces, the right way up and readable from the front and the back', () => {
  // 200 wide, 100 high, 4 deep, facing z.
  const positions = box([0, 100, 0], [200, 200, 4]);
  const layout = textLayout(positions);
  assert.equal(layout.width, 200);
  assert.equal(layout.height, 100);
  const front = [0, 1, 2, 3, 4, 5].map((k) => corner(positions, layout, k));
  // Seen from +z the left (x 0) is u 0, the top (y 200) v 1.
  front.forEach(({ p, uv }) => assert.deepEqual(uv, [p[0] / 200, (p[1] - 100) / 100], 'front ' + p));
  const back = [6, 7, 8, 9, 10, 11].map((k) => corner(positions, layout, k));
  // Seen from -z the left is x 200: not mirrored.
  back.forEach(({ p, uv }) => assert.deepEqual(uv, [1 - p[0] / 200, (p[1] - 100) / 100], 'back ' + p));
  for (let k = 12; k < 36; k++) assert.deepEqual(corner(positions, layout, k).uv, [-1, -1], 'the sides: background');
});

test('text on a table: up is away from the default view, readable from above', () => {
  const positions = box([0, 70, 0], [120, 72, 60]);
  const layout = textLayout(positions);
  assert.equal(layout.width, 120);
  assert.equal(layout.height, 60);
  const top = [24, 25, 26, 27, 28, 29].map((k) => corner(positions, layout, k));
  // From above with -z up: x 0 is the left, z 0 the top.
  top.forEach(({ p, uv }) => assert.deepEqual(uv, [p[0] / 120, 1 - p[2] / 60], 'top ' + p));
});

test('text on a wall turned 30 degrees, and on one plane alone', () => {
  const a = (30 * Math.PI) / 180;
  const turn = (p) => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
  const flat = box([0, 0, 0], [100, 50, 2]);
  const turned = new Float32Array(flat.length);
  for (let k = 0; k < flat.length; k += 3) turned.set(turn([flat[k], flat[k + 1], flat[k + 2]]), k);
  const layout = textLayout(turned);
  assert.ok(Math.abs(layout.width - 100) < 1e-3 && Math.abs(layout.height - 50) < 1e-3);
  assert.deepEqual(corner(turned, layout, 2).uv, [1, 1], 'front, top right');
  const plane = new Float32Array([0, 0, 0, 10, 0, 0, 10, 5, 0, 0, 0, 0, 10, 5, 0, 0, 5, 0]);
  assert.deepEqual(Array.from(textLayout(plane).uv), [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]);
  assert.equal(textLayout(new Float32Array(9)), null, 'no face');
  assert.equal(textLayout(new Float32Array(0)), null);
});

test('the picture of the text has the shape of the face, the text whole in its middle', () => {
  assert.deepEqual(fitText(200, 50, 2), { width: 200, height: 100, x: 0, y: 25, scale: 1 });
  assert.deepEqual(fitText(100, 50, 8), { width: 400, height: 50, x: 150, y: 0, scale: 1 });
  const big = fitText(1000, 56, 100);
  assert.equal(big.width, 2048, 'at most 2048 pixels');
  assert.ok(big.height >= 20 && big.height <= 21);
  assert.equal(fitText(0, 56, 2).width, 112, 'an empty text: a picture of background');
});
