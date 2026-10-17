// The text of a text entity laid flat on its object (text.mapping: flat): on the largest flat face of
// the object and on the one opposite, readable from both sides (not mirrored), the right way up; the
// other faces take the colour of the background. The mapping (UV) of the model often has the text
// mirrored, upside down, or nowhere (a box drawn in Sweet Home 3D, a mesh without UV).
// No three.js: the tests run in Node.

export interface TextLayout {
  uv: Float32Array; // u, v of each corner of the triangles, in their order
  width: number; // the size of the face, in the units of the model
  height: number;
}

type V = [number, number, number];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const scale = (a: V, k: number): V => [a[0] * k, a[1] * k, a[2] * k];
const unit = (a: V): V => {
  const length = Math.hypot(a[0], a[1], a[2]);
  return length > 0 ? scale(a, 1 / length) : [0, 0, 0];
};

// positions: the corners of the triangles (x, y, z, three corners a triangle, not indexed), in the
// scene (y up). null when there is no face.
export function textLayout(positions: ArrayLike<number>): TextLayout | null {
  const count = Math.floor(positions.length / 9);
  const corner = (k: number): V => [positions[k * 3], positions[k * 3 + 1], positions[k * 3 + 2]];
  // The faces by the direction they face, a face and the one opposite together, with their area.
  const sides: { normal: V; area: number }[] = [];
  const normals: V[] = [];
  for (let t = 0; t < count; t++) {
    const a = corner(t * 3);
    const n = cross(sub(corner(t * 3 + 1), a), sub(corner(t * 3 + 2), a));
    const area = Math.hypot(n[0], n[1], n[2]) / 2;
    const normal = unit(n);
    normals.push(normal);
    if (area === 0) continue;
    const side = sides.find((s) => Math.abs(dot(s.normal, normal)) > 0.985);
    if (side) side.area += area;
    else sides.push({ normal, area });
  }
  if (!sides.length) return null;
  const front = sides.reduce((best, s) => (s.area > best.area ? s : best)).normal;
  // Up: the up of the scene on a wall; on a floor or a table, away from the default view (-z).
  const ref: V = Math.abs(front[1]) < 0.8 ? [0, 1, 0] : [0, 0, -1];
  const up = unit(sub(ref, scale(front, dot(ref, front))));
  const right = cross(up, front);
  let minR = Infinity;
  let maxR = -Infinity;
  let minU = Infinity;
  let maxU = -Infinity;
  for (let k = 0; k < count * 3; k++) {
    const p = corner(k);
    const r = dot(p, right);
    const u = dot(p, up);
    minR = Math.min(minR, r);
    maxR = Math.max(maxR, r);
    minU = Math.min(minU, u);
    maxU = Math.max(maxU, u);
  }
  const width = maxR - minR;
  const height = maxU - minU;
  if (!(width > 0) || !(height > 0)) return null;
  const uv = new Float32Array(count * 6);
  for (let t = 0; t < count; t++) {
    const facing = dot(normals[t], front);
    for (let c = 0; c < 3; c++) {
      const k = t * 3 + c;
      const p = corner(k);
      let u = -1;
      let v = -1; // a corner of the picture: the background
      if (facing > 0.5 || facing < -0.5) {
        const r = (dot(p, right) - minR) / width;
        u = facing > 0 ? r : 1 - r; // seen from behind: left and right change places
        v = (dot(p, up) - minU) / height;
      }
      uv[k * 2] = u;
      uv[k * 2 + 1] = v;
    }
  }
  return { uv, width, height };
}

// The size of a picture of the text for a face of the given width / height: the text whole in the
// middle (width x height its size), the rest background; at most max pixels a side.
export function fitText(width: number, height: number, aspect: number, max = 2048): { width: number; height: number; x: number; y: number; scale: number } {
  let w = Math.max(width, 1);
  let h = Math.max(height, 1);
  if (w / h < aspect) w = h * aspect;
  else h = w / aspect;
  const k = Math.min(1, max / Math.max(w, h));
  const out = { width: Math.max(1, Math.round(w * k)), height: Math.max(1, Math.round(h * k)), scale: k, x: 0, y: 0 };
  out.x = (out.width - width * k) / 2;
  out.y = (out.height - height * k) / 2;
  return out;
}
