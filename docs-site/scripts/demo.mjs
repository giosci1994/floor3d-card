// The live demo of the home page: the card of this repository (dist/, built by npm run build in the
// root), the test house of the browser tests with two doors, and a picture for its TV, copied or
// made into public/demo before each build. src/components/LiveDemo.astro runs it.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import { mtlFile, objFile } from '../../test/browser/model.mjs';

const dist = new URL('../../dist/', import.meta.url);
const to = new URL('../public/demo/', import.meta.url);
if (!existsSync(new URL('floor3d-card.js', dist))) {
  console.error('docs-site: the demo needs the card: run npm run build in the root of the repository first');
  process.exit(1);
}
rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });

// The card and the chunks it loads (the editor is never loaded: the demo is not edited).
readdirSync(dist)
  .filter((f) => f.endsWith('.js') && !f.includes('-editor-'))
  .forEach((f) => cpSync(new URL(f, dist), new URL(f, to)));

// The house, with a door in the inner wall and one in the east wall. Sizes in cm, as the model.
const doors = [
  ['door_inner', 'wood', 707, 713, 6, 214, 641, 729],
  ['door_front', 'wood', 1087, 1093, 6, 214, 651, 739],
];
// Of the 30 small lamps of the tests, only those of the demo.
const lamps = [8, 11, 20, 23];
const skip = Array.from({ length: 30 }, (_, k) => 'lamp_' + (k + 1)).filter((n) => !lamps.includes(Number(n.slice(5))));
writeFileSync(new URL('home.obj', to), objFile({ covers: true, extra: doors, skip }));
// The body of the TV is magenta in the tests, to be found in a picture: dark grey here.
writeFileSync(new URL('home.mtl', to), mtlFile().replace(/(newmtl plastic\n[^]*?Kd )[^\n]*/, '$10.12 0.12 0.13'));

// What the TV shows: a sunset over the sea, so that the room takes its colours.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3b1d6e"/><stop offset="0.55" stop-color="#ff7a3d"/><stop offset="1" stop-color="#ffcf6b"/>
  </linearGradient></defs>
  <rect width="320" height="180" fill="url(#s)"/>
  <circle cx="160" cy="112" r="34" fill="#fff2b0"/>
  <rect y="118" width="320" height="62" fill="#1d4e89"/>
  <rect x="120" y="128" width="80" height="4" fill="#ffd27a" opacity="0.8"/>
  <rect x="135" y="140" width="50" height="3" fill="#ffd27a" opacity="0.6"/>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('tv.png', to).pathname);
console.log('docs-site: demo ready in public/demo');
