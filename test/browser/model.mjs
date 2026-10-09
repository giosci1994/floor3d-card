// The test house, made when the tests start: ground, two rooms with floors, walls with windows and
// doors, furniture, 30 small lamps under the ceiling and a TV. Sizes in cm, y up.
// objFile()/mtlFile(): OBJ + MTL (MeshPhongMaterial in three.js); with level1, the objects named
// there on level 1 and the others on level 0; with covers, a roller shade, a venetian blind and a
// shutter in the windows. glbFile(rich): the same house as a GLB
// (MeshStandardMaterial), with rich the walls get every texture glTF has plus a clearcoat
// (MeshPhysicalMaterial, 10 texture units with the lighting lookup table).
import zlib from 'node:zlib';

const boxes = []; // [name, material, x0, x1, y0, y1, z0, z1]
const box = (...b) => boxes.push(b);
const H0 = 6;
const H1 = 276;

function wallX(name, z0, z1, x0, x1, openings, sill, top) {
  let xs = x0;
  openings.forEach(([a, b], i) => {
    box(`${name}_${i}a`, 'wall', xs, a, H0, H1, z0, z1);
    if (sill > H0) box(`${name}_${i}b`, 'wall', a, b, H0, sill, z0, z1);
    box(`${name}_${i}c`, 'wall', a, b, top, H1, z0, z1);
    xs = b;
  });
  box(`${name}_end`, 'wall', xs, x1, H0, H1, z0, z1);
}
function wallZ(name, x0, x1, z0, z1, openings, sill, top) {
  let zs = z0;
  openings.forEach(([a, b], i) => {
    box(`${name}_${i}a`, 'wall', x0, x1, H0, H1, zs, a);
    if (sill > H0) box(`${name}_${i}b`, 'wall', x0, x1, H0, sill, a, b);
    box(`${name}_${i}c`, 'wall', x0, x1, top, H1, a, b);
    zs = b;
  });
  box(`${name}_end`, 'wall', x0, x1, H0, H1, zs, z1);
}

box('ground', 'grass', 0, 1400, 0, 2, 0, 1400);
box('floor_living', 'floor', 320, 700, 2, 6, 420, 980);
box('floor_bed', 'floor', 720, 1080, 2, 6, 420, 980);
box('wall_north', 'wall', 300, 1100, H0, H1, 400, 420);
wallX('wall_south', 980, 1000, 300, 1100, [[400, 620], [820, 980]], 90, 220);
wallZ('wall_west', 300, 320, 420, 980, [[600, 800]], 90, 220);
wallZ('wall_east', 1080, 1100, 420, 980, [[650, 740]], H0, 216);
wallZ('wall_inner', 700, 720, 420, 980, [[640, 730]], H0, 216);
box('table', 'wood', 450, 570, H0, 80, 600, 700);
box('sofa', 'fabric', 340, 400, H0, 50, 700, 900);
box('bed', 'fabric', 850, 1050, H0, 55, 450, 650);
box('wardrobe', 'wood', 1020, 1080, H0, 220, 800, 960);
for (let k = 0; k < 30; k++) {
  const lx = 340 + (k % 6) * 120;
  const lz = 450 + Math.floor(k / 6) * 100;
  box(`lamp_${k + 1}`, 'wood', lx, lx + 10, 250, 260, lz, lz + 10);
}
box('tv_body', 'plastic', 410, 630, 85, 215, 420, 428);
box('tv_screen', 'screen', 420, 620, 95, 205, 428, 429);

export const objectNames = [...new Set(boxes.map((b) => b[0]))];

// Covers (objFile({ covers: true })), inside the windows of the south wall and outside the one of
// the west wall. The blind is one object, as Sweet Home 3D exports it: head rail, 12 slats, bottom
// rail and two cords.
const coverBoxes = [
  ['shade', 'fabric', 400, 620, 93, 218, 976, 977],
  ['shade_bar', 'wood', 400, 620, 90, 93, 975.5, 977.5],
  ['blind', 'wood', 818, 982, 214, 220, 966, 979],
  ...Array.from({ length: 12 }, (_, k) => ['blind', 'wood', 822, 978, 96 + 9.5 * k, 96.4 + 9.5 * k, 968, 978]),
  ['blind', 'wood', 822, 978, 92, 94, 968, 978],
  ['blind', 'fabric', 850, 850.3, 94, 214, 972.9, 973.1],
  ['blind', 'fabric', 950, 950.3, 94, 214, 972.9, 973.1],
  ['shutter', 'wood', 296, 298, 90, 220, 600, 800],
];
export const coverNames = [...new Set(coverBoxes.map((b) => b[0]))];

const COLORS = {
  grass: [0.3, 0.42, 0.25],
  wall: [0.86, 0.85, 0.82],
  floor: [0.62, 0.46, 0.3],
  fabric: [0.25, 0.35, 0.55],
  wood: [0.45, 0.3, 0.18],
  plastic: [0.9, 0.1, 0.6],
  screen: [0.02, 0.02, 0.03],
};

export function mtlFile() {
  return Object.entries(COLORS)
    .map(([name, c]) => `newmtl ${name}\nKa 0 0 0\nKd ${c.join(' ')}\nKs 0 0 0\n`)
    .join('');
}

// Names with lvl000 or lvl001 in front, as the ExportToHASS plugin of Sweet Home 3D writes the levels.
// Boxes one after the other with the same name are one object.
export function objFile({ level1 = [], covers = false } = {}) {
  const level = (name) => (level1.length ? (level1.includes(name) ? 'lvl001' : 'lvl000') : '') + name;
  const lines = ['mtllib home.mtl'];
  [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].forEach((n) => lines.push('vn ' + n.join(' ')));
  [[0, 0], [1, 0], [1, 1], [0, 1]].forEach((t) => lines.push('vt ' + t.join(' ')));
  let vi = 0;
  let previous = null;
  for (const [name, mat, x0, x1, y0, y1, z0, z1] of covers ? [...boxes, ...coverBoxes] : boxes) {
    if (name !== previous) lines.push(`o ${level(name)}`);
    lines.push(`usemtl ${mat}`);
    previous = name;
    [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]].forEach((p) =>
      lines.push('v ' + p.join(' ')),
    );
    const b = vi + 1;
    // faces counter-clockwise seen from outside, with their normal
    const faces = [[[1, 2, 6, 5], 1], [[0, 4, 7, 3], 2], [[3, 7, 6, 2], 3], [[0, 1, 5, 4], 4], [[4, 5, 6, 7], 5], [[0, 3, 2, 1], 6]];
    faces.forEach(([idx, n]) => lines.push('f ' + idx.map((i, k) => `${b + i}/${k + 1}/${n}`).join(' ')));
    vi += 8;
  }
  return lines.join('\n') + '\n';
}

// A white 4×4 PNG, for the textures of the rich material.
function png() {
  const crcTable = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type), data]);
    const sum = Buffer.alloc(4);
    sum.writeUInt32BE(crc(body));
    return Buffer.concat([len, body, sum]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(4, 0);
  ihdr.writeUInt32BE(4, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB
  const raw = Buffer.alloc(4 * (1 + 4 * 3), 255);
  for (let row = 0; row < 4; row++) raw[row * 13] = 0; // filter: none
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

export function glbFile(rich = false) {
  const names = Object.keys(COLORS);
  const materials = names.map((name) => ({
    name,
    pbrMetallicRoughness: { baseColorFactor: [...COLORS[name], 1], metallicFactor: 0, roughnessFactor: 1 },
  }));
  const chunks = [];
  let length = 0;
  const views = [];
  const accessors = [];
  const add = (data, target, count, componentType, type, min, max) => {
    const pad = (4 - (length % 4)) % 4;
    if (pad) chunks.push(Buffer.alloc(pad));
    length += pad;
    views.push({ buffer: 0, byteOffset: length, byteLength: data.length, ...(target ? { target } : {}) });
    chunks.push(data);
    length += data.length;
    if (componentType === undefined) return views.length - 1;
    accessors.push({ bufferView: views.length - 1, componentType, count, type, ...(min ? { min, max } : {}) });
    return accessors.length - 1;
  };
  const f32 = (values) => Buffer.from(new Float32Array(values).buffer);
  const meshes = [];
  const nodes = [];
  for (const [name, mat, x0, x1, y0, y1, z0, z1] of boxes) {
    const faces = [
      [[[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], [1, 0, 0]],
      [[[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], [-1, 0, 0]],
      [[[x0, y1, z0], [x0, y1, z1], [x1, y1, z1], [x1, y1, z0]], [0, 1, 0]],
      [[[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], [0, -1, 0]],
      [[[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], [0, 0, 1]],
      [[[x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [x1, y0, z0]], [0, 0, -1]],
    ];
    const pos = [];
    const nor = [];
    const uv = [];
    const idx = [];
    faces.forEach(([corners, n]) => {
      const base = pos.length / 3;
      corners.forEach((c, k) => {
        pos.push(...c);
        nor.push(...n);
        uv.push(...[[0, 1], [1, 1], [1, 0], [0, 0]][k]);
      });
      idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    });
    const p = add(f32(pos), 34962, pos.length / 3, 5126, 'VEC3', [x0, y0, z0], [x1, y1, z1]);
    const q = add(f32(nor), 34962, nor.length / 3, 5126, 'VEC3');
    const t = add(f32(uv), 34962, uv.length / 2, 5126, 'VEC2');
    const i = add(Buffer.from(new Uint16Array(idx).buffer), 34963, idx.length, 5123, 'SCALAR');
    meshes.push({ name, primitives: [{ attributes: { POSITION: p, NORMAL: q, TEXCOORD_0: t }, indices: i, material: names.indexOf(mat) }] });
    nodes.push({ name, mesh: meshes.length - 1 });
  }
  const gltf = { asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: nodes.map((_, k) => k) }], nodes, meshes, materials, accessors, bufferViews: views };
  if (rich) {
    const tex = () => ({ index: 0 });
    const wall = materials[names.indexOf('wall')];
    Object.assign(wall.pbrMetallicRoughness, { baseColorTexture: tex(), metallicRoughnessTexture: tex() });
    Object.assign(wall, {
      normalTexture: tex(),
      occlusionTexture: tex(),
      emissiveTexture: tex(),
      emissiveFactor: [0, 0, 0],
      extensions: { KHR_materials_clearcoat: { clearcoatFactor: 0.3, clearcoatTexture: tex(), clearcoatRoughnessTexture: tex(), clearcoatNormalTexture: tex() } },
    });
    const image = add(png());
    Object.assign(gltf, {
      extensionsUsed: ['KHR_materials_clearcoat'],
      images: [{ bufferView: image, mimeType: 'image/png' }],
      samplers: [{}],
      textures: [{ source: 0, sampler: 0 }],
    });
  }
  const pad = (4 - (length % 4)) % 4;
  if (pad) chunks.push(Buffer.alloc(pad));
  const bin = Buffer.concat(chunks);
  gltf.buffers = [{ byteLength: bin.length }];
  let json = Buffer.from(JSON.stringify(gltf));
  json = Buffer.concat([json, Buffer.alloc((4 - (json.length % 4)) % 4, 0x20)]);
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
  const head = (len, type) => {
    const b = Buffer.alloc(8);
    b.writeUInt32LE(len, 0);
    b.writeUInt32LE(type, 4);
    return b;
  };
  return Buffer.concat([header, head(json.length, 0x4e4f534a), json, head(bin.length, 0x004e4942), bin]);
}
