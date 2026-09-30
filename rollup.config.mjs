import { readdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
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

// The chunk names change with their content: after writing, the .js files of older builds are
// removed from dist/, so that dist/ and the release hold only the files the card loads.
function removeOldChunks() {
  return {
    name: 'remove-old-chunks',
    writeBundle({ dir }, bundle) {
      for (const file of readdirSync(dir)) {
        if (file.endsWith('.js') && !(file in bundle)) rmSync(join(dir, file));
      }
    },
  };
}

export const plugins = [
  litForMaterial(),
  nodeResolve(),
  commonjs(),
  typescript({ noEmitOnError: true }),
  json(),
  ignore({ files: ignored }),
  removeOldChunks(),
];

// Everything the card imports at startup, except the card module itself, goes into a "core" chunk.
// The editor then imports the core chunk and never floor3d-card.js: the card is registered as a
// resource with a query (HACS adds ?hacstag=..., by hand one may add ?v=...), and an import of
// ./floor3d-card.js without that query would load a second copy of the card, whose
// customElements.define('floor3d-card') fails.
function coreChunk() {
  // Rollup passes the same api object for all the modules of a build and a new one for every build
  // (npm start rebuilds on every change), so the set is computed once per build.
  const cores = new WeakMap();
  const staticImports = ({ getModuleIds, getModuleInfo }) => {
    const core = new Set();
    const entries = [...getModuleIds()].filter((moduleId) => getModuleInfo(moduleId).isEntry);
    const queue = entries.flatMap((entry) => getModuleInfo(entry).importedIds);
    while (queue.length) {
      const moduleId = queue.pop();
      if (!core.has(moduleId)) {
        core.add(moduleId);
        queue.push(...getModuleInfo(moduleId).importedIds);
      }
    }
    return core;
  };
  return (id, api) => {
    if (!cores.has(api)) cores.set(api, staticImports(api));
    return cores.get(api).has(id) ? 'core' : undefined;
  };
}

export const output = {
  dir: 'dist',
  format: 'es',
  entryFileNames: 'floor3d-card.js',
  // floor3d-card-core-<hash>.js holds the libraries and the shared code; the editor becomes
  // floor3d-card-editor-<hash>.js, loaded only when the card is edited.
  chunkFileNames: 'floor3d-card-[name]-[hash].js',
  manualChunks: coreChunk(),
};

export default {
  input: 'src/floor3d-card.ts',
  // Home Assistant loads the card for its side effects (custom element): no exports needed.
  preserveEntrySignatures: false,
  output,
  plugins: [...plugins, terser()],
};
