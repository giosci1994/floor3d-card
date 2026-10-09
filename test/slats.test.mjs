// Tests of src/slats.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findSlats, slatAngle, tiltSlats } from '../src/slats.ts';

// The 8 corners of a box and its 12 triangles (36 vertices, as an OBJ gives them; with indexed, 8
// vertices and an index, as a GLB can).
const CORNERS = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
const FACES = [[0, 1, 2], [0, 2, 3], [4, 6, 5], [4, 7, 6], [0, 4, 5], [0, 5, 1], [3, 2, 6], [3, 6, 7], [0, 3, 7], [0, 7, 4], [1, 5, 6], [1, 6, 2]];
const corner = (c, [x0, x1, y0, y1, z0, z1]) => [c[0] ? x1 : x0, c[1] ? y1 : y0, c[2] ? z1 : z0];

function mesh(boxes, indexed = false) {
  const positions = [];
  const index = [];
  boxes.forEach((b) => {
    if (indexed) {
      const base = positions.length / 3;
      CORNERS.forEach((c) => positions.push(...corner(c, b)));
      FACES.forEach((f) => index.push(...f.map((i) => base + i)));
    } else FACES.forEach((f) => f.forEach((i) => positions.push(...corner(CORNERS[i], b))));
  });
  return { positions: new Float32Array(positions), index: indexed ? index : null };
}

// A blind 100 cm wide: 12 slats 5 cm deep and 0.3 thick every 4 cm, the head rail, the bottom
// rail, and two cords made of a short piece between each pair of slats.
const blind = (indexed) => {
  const boxes = [];
  for (let k = 0; k < 12; k++) boxes.push([0, 100, 10 + 4 * k, 10.3 + 4 * k, -2.5, 2.5]);
  boxes.push([-1, 101, 60, 64, -3, 3]); // head rail
  boxes.push([0, 100, 5, 7, -2.5, 2.5]); // bottom rail
  for (const x of [20, 80]) for (let k = 0; k < 11; k++) boxes.push([x, x + 0.2, 10.3 + 4 * k, 14 + 4 * k, -0.1, 0.1]);
  return mesh(boxes, indexed);
};

for (const indexed of [false, true]) {
  test(`slats of a blind in one mesh (${indexed ? 'indexed, as a GLB' : 'triangles, as an OBJ'}): the 12 slats, not the rails or the cords`, () => {
    const { positions, index } = blind(indexed);
    const slats = findSlats(positions, index);
    assert.equal(slats.length, 12);
    slats.forEach((s) => {
      assert.deepEqual(s.axis.map((v) => Math.round(v * 1000) / 1000), [1, 0, 0]);
      assert.ok(Math.abs(s.center[0] - 50) < 1e-3 && Math.abs(s.center[2]) < 1e-3);
    });
    const ys = slats.map((s) => s.center[1]).sort((a, b) => a - b);
    ys.forEach((y, k) => assert.ok(Math.abs(y - (10.15 + 4 * k)) < 1e-3));
  });
}

test('tilt: each slat turns on its length through its centre, the rest stays', () => {
  const { positions } = blind(false);
  const slats = findSlats(positions);
  const out = Float32Array.from(positions);
  tiltSlats(slats, Math.PI / 2, positions, out);
  const first = slats.find((s) => Math.abs(s.center[1] - 10.15) < 1e-3);
  const ys = first.vertices.map((v) => out[3 * v + 1]);
  const zs = first.vertices.map((v) => out[3 * v + 2]);
  // 5 cm deep and 0.3 thick before; after a quarter turn, 5 cm high and 0.3 deep.
  assert.ok(Math.abs(Math.max(...ys) - Math.min(...ys) - 5) < 1e-3);
  assert.ok(Math.abs(Math.max(...zs) - Math.min(...zs) - 0.3) < 1e-3);
  assert.ok(Math.abs((Math.max(...ys) + Math.min(...ys)) / 2 - 10.15) < 1e-3, 'around its centre');
  const moved = new Set(slats.flatMap((s) => s.vertices));
  for (let v = 0; v < positions.length / 3; v++) {
    if (moved.has(v)) continue;
    for (let k = 0; k < 3; k++) assert.equal(out[3 * v + k], positions[3 * v + k]);
  }
  // Normals turn too, without the centre.
  const normals = new Float32Array(positions.length);
  first.vertices.forEach((v) => (normals[3 * v + 2] = 1));
  const turned = Float32Array.from(normals);
  tiltSlats([first], Math.PI / 2, normals, turned, true);
  const n = first.vertices[0];
  assert.deepEqual([turned[3 * n], turned[3 * n + 1], turned[3 * n + 2]].map((v) => Math.round(v * 1000) / 1000), [0, -1, 0]);
});

test('no slats: a single box, or pieces all different', () => {
  assert.deepEqual(findSlats(mesh([[0, 100, 0, 200, 0, 3]]).positions), []);
  assert.deepEqual(findSlats(mesh([[0, 100, 0, 1, 0, 5], [0, 50, 10, 11, 0, 5], [0, 70, 20, 21, 0, 5]]).positions), []);
});

test('vertical slats turn on the vertical axis', () => {
  const boxes = [];
  for (let k = 0; k < 6; k++) boxes.push([10 * k, 10 * k + 9, 0, 200, 0, 0.2]);
  const slats = findSlats(mesh(boxes).positions);
  assert.equal(slats.length, 6);
  slats.forEach((s) => assert.deepEqual(s.axis.map((v) => Math.round(v * 1000) / 1000), [0, 1, 0]));
});

test('angle of the slats: tilt_closed at 0, tilt_open at 100', () => {
  assert.equal(slatAngle(0, 80, 0), 80);
  assert.equal(slatAngle(100, 80, 0), 0);
  assert.equal(slatAngle(50, 80, 0), 40);
  assert.equal(slatAngle(50, -80, 80), 0, 'blinds horizontal at 50');
  assert.equal(slatAngle(150, 80, 0), 0, 'out of range: clamped');
});
