// The ground under the house (ground: grass, or a colour): how it looks and how it fades at its edge.
// No three.js: the tests run in Node.

export type GroundStyle = { kind: 'grass' } | { kind: 'color'; color: string };

// grass, or a colour (#rrggbb, a CSS name...); nothing (or no, none): no ground.
export function groundStyle(value: unknown): GroundStyle | null {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text || ['no', 'none', 'false'].includes(text.toLowerCase())) return null;
  if (text.toLowerCase() === 'grass') return { kind: 'grass' };
  return { kind: 'color', color: text };
}

// How opaque the ground is at a distance r from its centre, for a ground of radius R: all of it up
// to half the radius, then fading to nothing at the edge, so that it ends in the background
// without a line.
export function groundAlpha(r: number, R: number): number {
  const t = Math.min(1, Math.max(0, (r - 0.5 * R) / (0.5 * R)));
  return 1 - t * t * (3 - 2 * t);
}

// The lawn: a tile of size x size RGBA pixels (sRGB) that repeats without seams. Patches of light
// and dark green and short blades in every direction; always the same (a fixed seed).
export function grassTexture(size = 256, seed = 7): Uint8Array {
  let state = seed;
  const random = (): number => {
    // mulberry32
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const smooth = (t: number): number => t * t * (3 - 2 * t);
  // Noise on an n x n grid that wraps around: the right edge of the tile goes on into its left edge.
  const noise = (n: number): ((x: number, y: number) => number) => {
    const grid = Array.from({ length: n * n }, () => random());
    const at = (i: number, j: number): number => grid[(j % n) * n + (i % n)];
    return (x, y) => {
      const fx = (x / size) * n;
      const fy = (y / size) * n;
      const i = Math.floor(fx);
      const j = Math.floor(fy);
      const tx = smooth(fx - i);
      const ty = smooth(fy - j);
      const top = at(i, j) + (at(i + 1, j) - at(i, j)) * tx;
      const bottom = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * tx;
      return top + (bottom - top) * ty;
    };
  };
  const patches = noise(4);
  const tufts = noise(16);
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = 0.55 * patches(x, y) + 0.3 * tufts(x, y) + 0.15 * random();
      const i = (y * size + x) * 4;
      data[i] = 50 + 50 * n;
      data[i + 1] = 82 + 56 * n;
      data[i + 2] = 32 + 26 * n;
      data[i + 3] = 255;
    }
  }
  // Blades: short strokes a little lighter or darker.
  for (let k = 0; k < size * 7; k++) {
    let x = random() * size;
    let y = random() * size;
    const angle = random() * Math.PI * 2;
    const length = 3 + random() * 4;
    const shade = random() < 0.5 ? 16 : -14;
    for (let s = 0; s < length; s++) {
      const i = ((Math.floor(y + size) % size) * size + (Math.floor(x + size) % size)) * 4;
      for (let c = 0; c < 3; c++) data[i + c] = Math.min(255, Math.max(0, data[i + c] + shade));
      x += Math.cos(angle);
      y += Math.sin(angle);
    }
  }
  return data;
}
