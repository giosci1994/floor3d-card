// The pictures of the documentation live in docs/images, next to the README and FORK.md that use
// them too: they are copied into src/assets/images before each build, where Astro optimises them.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const from = new URL('../../docs/images/', import.meta.url);
const to = new URL('../src/assets/images/', import.meta.url);
rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
