// The pictures of the documentation live in docs/images, next to the README and FORK.md that use
// them too: they are copied into src/assets/images before each build, where Astro optimises them.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import sharp from 'sharp';

const from = new URL('../../docs/images/', import.meta.url);
const to = new URL('../src/assets/images/', import.meta.url);
rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });

// The home page shows its picture as a square: the house of evening.jpg, on the night around it.
await sharp(new URL('evening.jpg', from).pathname)
  .extract({ left: 200, top: 0, width: 1040, height: 900 })
  .extend({ top: 70, bottom: 70, background: { r: 22, g: 30, b: 43 } })
  .toFile(new URL('hero.jpg', to).pathname);
