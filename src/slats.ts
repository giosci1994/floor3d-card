// Slats of a venetian blind (cover.slats): found in the geometry of an object, without three.js, so
// that the tests can run in Node.
//
// A blind exported from Sweet Home 3D is often a single object: slats, rails and cords in one mesh.
// Its separate pieces (vertices joined by triangles or at the same place) are grouped by their size,
// and the largest group of at least 3 long and equal pieces are the slats; the rails and the cords
// stay as they are. Each slat turns on its own long side, through its centre.

export interface Slat {
  vertices: number[]; // indices in the position attribute
  center: [number, number, number];
  axis: [number, number, number]; // unit vector along the length of the slat
}

type Vec = [number, number, number];

const dot = (a: Vec, b: Vec): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: Vec): number => Math.sqrt(dot(a, a));

// The direction along which the points spread most (power iteration on their covariance matrix),
// orthogonal to the given axes.
function principalAxis(cov: number[], skip: Vec[]): Vec | null {
  let v: Vec = [0.577, 0.578, 0.576];
  for (let k = 0; k < 64; k++) {
    skip.forEach((s) => {
      const d = dot(v, s);
      v = [v[0] - d * s[0], v[1] - d * s[1], v[2] - d * s[2]];
    });
    const w: Vec = [
      cov[0] * v[0] + cov[1] * v[1] + cov[2] * v[2],
      cov[3] * v[0] + cov[4] * v[1] + cov[5] * v[2],
      cov[6] * v[0] + cov[7] * v[1] + cov[8] * v[2],
    ];
    skip.forEach((s) => {
      const d = dot(w, s);
      w[0] -= d * s[0];
      w[1] -= d * s[1];
      w[2] -= d * s[2];
    });
    const n = norm(w);
    if (n < 1e-12) return null;
    v = [w[0] / n, w[1] / n, w[2] / n];
  }
  return v;
}

// The same direction for parallel slats: its largest coordinate positive.
function orient(v: Vec): Vec {
  const i = [0, 1, 2].reduce((best, k) => (Math.abs(v[k]) > Math.abs(v[best]) ? k : best), 0);
  return v[i] < 0 ? [-v[0], -v[1], -v[2]] : v;
}

export function findSlats(positions: ArrayLike<number>, index?: ArrayLike<number> | null): Slat[] {
  const count = Math.floor(positions.length / 3);
  if (count < 3) return [];
  const parent = new Int32Array(count);
  for (let i = 0; i < count; i++) parent[i] = i;
  const find = (i: number): number => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  };
  const union = (a: number, b: number): void => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[ra] = rb;
  };

  // Vertices at the same place (a mesh repeats them for each face) belong to the same piece.
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < positions.length; i++) {
    min = Math.min(min, positions[i]);
    max = Math.max(max, positions[i]);
  }
  const step = Math.max((max - min) * 1e-5, 1e-9);
  const seen = new Map<string, number>();
  const unique = new Uint8Array(count); // the first vertex at each place: the shape, without repeats
  for (let i = 0; i < count; i++) {
    const key =
      Math.round(positions[3 * i] / step) + ',' + Math.round(positions[3 * i + 1] / step) + ',' + Math.round(positions[3 * i + 2] / step);
    const first = seen.get(key);
    if (first === undefined) {
      seen.set(key, i);
      unique[i] = 1;
    } else union(i, first);
  }
  if (index && index.length) {
    for (let t = 0; t + 2 < index.length; t += 3) {
      union(index[t], index[t + 1]);
      union(index[t + 1], index[t + 2]);
    }
  } else {
    for (let v = 0; v + 2 < count; v += 3) {
      union(v, v + 1);
      union(v + 1, v + 2);
    }
  }

  const pieces = new Map<number, number[]>();
  for (let i = 0; i < count; i++) {
    const root = find(i);
    const list = pieces.get(root);
    if (list) list.push(i);
    else pieces.set(root, [i]);
  }

  // Directions and size of each piece, from its points without repeats (a mesh repeats some
  // corners more than others); its centre is the middle of its box along those directions.
  const shapes: { slat: Slat; size: Vec }[] = [];
  pieces.forEach((vertices) => {
    const points = vertices.filter((v) => unique[v]);
    if (points.length < 3) return;
    const c: Vec = [0, 0, 0];
    points.forEach((v) => {
      c[0] += positions[3 * v];
      c[1] += positions[3 * v + 1];
      c[2] += positions[3 * v + 2];
    });
    c[0] /= points.length;
    c[1] /= points.length;
    c[2] /= points.length;
    const cov = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    points.forEach((v) => {
      const d = [positions[3 * v] - c[0], positions[3 * v + 1] - c[1], positions[3 * v + 2] - c[2]];
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) cov[3 * r + k] += d[r] * d[k];
    });
    const e1 = principalAxis(cov, []);
    if (!e1) return;
    const e2 = principalAxis(cov, [e1]) || orthogonal(e1);
    const e3 = cross(e1, e2);
    const center: Vec = [0, 0, 0];
    const size = [e1, e2, e3].map((axis) => {
      let lo = Infinity;
      let hi = -Infinity;
      points.forEach((v) => {
        const p = positions[3 * v] * axis[0] + positions[3 * v + 1] * axis[1] + positions[3 * v + 2] * axis[2];
        lo = Math.min(lo, p);
        hi = Math.max(hi, p);
      });
      for (let k = 0; k < 3; k++) center[k] += ((lo + hi) / 2) * axis[k];
      return hi - lo;
    }) as Vec;
    shapes.push({ slat: { vertices, center, axis: orient(e1) }, size });
  });

  // Slats are long and equal: grouped by size, with 3 % of tolerance. The group with the largest
  // surface wins, so that the many short pieces of a cord don't pass for the slats.
  const bucket = (x: number, length: number): number => (x <= length * 1e-3 ? -1 : Math.round(Math.log(x) / Math.log(1.03)));
  const groups = new Map<string, { slats: Slat[]; surface: number }>();
  shapes.forEach(({ slat, size }) => {
    const [length, width, thickness] = size;
    if (length < 2 * width) return;
    const key = bucket(length, length) + ',' + bucket(width, length) + ',' + bucket(thickness, length);
    const group = groups.get(key) || { slats: [], surface: 0 };
    group.slats.push(slat);
    group.surface += length * width;
    groups.set(key, group);
  });
  let best: { slats: Slat[]; surface: number } | undefined;
  groups.forEach((group) => {
    if (group.slats.length >= 3 && (!best || group.surface > best.surface)) best = group;
  });
  return best ? best.slats : [];
}

function orthogonal(a: Vec): Vec {
  const b: Vec = Math.abs(a[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const c = cross(a, b);
  const n = norm(c);
  return [c[0] / n, c[1] / n, c[2] / n];
}

// Turns every slat by angle (radians) on its axis: original positions (and normals) into out.
export function tiltSlats(slats: Slat[], angle: number, original: ArrayLike<number>, out: { [i: number]: number }, isNormal = false): void {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  slats.forEach(({ vertices, center, axis }) => {
    const [ax, ay, az] = axis;
    vertices.forEach((v) => {
      const i = 3 * v;
      const x = original[i] - (isNormal ? 0 : center[0]);
      const y = original[i + 1] - (isNormal ? 0 : center[1]);
      const z = original[i + 2] - (isNormal ? 0 : center[2]);
      // Rodrigues: v cos + (a × v) sin + a (a · v)(1 - cos)
      const d = (ax * x + ay * y + az * z) * (1 - cos);
      out[i] = x * cos + (ay * z - az * y) * sin + ax * d + (isNormal ? 0 : center[0]);
      out[i + 1] = y * cos + (az * x - ax * z) * sin + ay * d + (isNormal ? 0 : center[1]);
      out[i + 2] = z * cos + (ax * y - ay * x) * sin + az * d + (isNormal ? 0 : center[2]);
    });
  });
}

// The angle of the slats (degrees, from the model) for a tilt of 0 (closed) to 100 (open):
// tilt_closed at 0, tilt_open at 100, in between in proportion.
export function slatAngle(tilt: number, closed: number, open: number): number {
  const t = Math.min(100, Math.max(0, tilt));
  return closed + ((open - closed) * t) / 100;
}
