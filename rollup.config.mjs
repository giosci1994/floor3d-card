import { readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

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

export const plugins = [nodeResolve(), commonjs(), typescript({ noEmitOnError: true }), json(), removeOldChunks()];

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
