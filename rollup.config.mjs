import { createRequire } from 'node:module';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import ignore from './rollup-ignore-plugin.mjs';

const require = createRequire(import.meta.url);

// The Material components of the editor (mwc 0.27) are written for Lit 2 and break on Lit 3
// (e.g. @queryAssignedNodes changed signature). The card uses Lit 3; every import of Lit made
// from @material/* is redirected to a single Lit 2 copy (the "lit2" alias in package.json).
const LIT2_ENTRY = require.resolve('lit2');
const LIT_PACKAGES = /^(lit|lit-html|lit-element|@lit\/reactive-element)(\/|$)/;

function litForMaterial() {
  return {
    name: 'lit-for-material',
    async resolveId(source, importer) {
      if (!importer || !importer.includes('/node_modules/@material/') || !LIT_PACKAGES.test(source)) {
        return null;
      }
      const target = source === 'lit' || source.startsWith('lit/') ? source.replace(/^lit/, 'lit2') : source;
      return this.resolve(target, LIT2_ENTRY, { skipSelf: true });
    },
  };
}

// Material components the editor never uses: replaced with empty modules to keep the bundle small.
export const ignored = [
  '@material/mwc-notched-outline/mwc-notched-outline.js',
  '@material/mwc-ripple/mwc-ripple.js',
  '@material/mwc-list/mwc-list-item.js',
  '@material/mwc-list/mwc-list.js',
  '@material/mwc-menu/mwc-menu.js',
  '@material/mwc-menu/mwc-menu-surface.js',
  '@material/mwc-icon/mwc-icon.js',
  '@material/mwc-button/mwc-button.js',
].map((file) => require.resolve(file));

export const plugins = [
  litForMaterial(),
  nodeResolve(),
  commonjs(),
  typescript({ noEmitOnError: true }),
  json(),
  ignore({ files: ignored }),
];

export default {
  input: 'src/floor3d-card.ts',
  // Home Assistant loads the card for its side effects (custom element): no exports needed,
  // so the card code stays in floor3d-card.js instead of a facade plus a chunk.
  preserveEntrySignatures: false,
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'floor3d-card.js',
    // The editor becomes a separate file loaded only when the card is edited.
    chunkFileNames: 'floor3d-card-[name]-[hash].js',
  },
  plugins: [...plugins, terser()],
};
