import { readFileSync, readdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

// The chunk names change with their content: after writing, the files of older builds are removed
// from dist/, so that dist/ and the release hold only the files the card loads.
function removeOldChunks() {
  return {
    name: 'remove-old-chunks',
    writeBundle({ dir }, bundle) {
      for (const file of readdirSync(dir)) {
        if (/\.(js|wasm)$/.test(file) && !(file in bundle)) rmSync(join(dir, file));
      }
    },
  };
}

// The Draco decoder of three.js (its glTF build, the one for KHR_draco_mesh_compression) goes into
// dist/ next to the chunks, so that it is part of the release that HACS installs. The module
// 'virtual:draco-decoder' gives the addresses of its two files, relative to the chunk that imports
// it, as setDecoderPath() of DRACOLoader takes them.
function dracoDecoder() {
  const id = '\0draco-decoder';
  const require = createRequire(import.meta.url);
  const folder = join(dirname(require.resolve('three')), '../examples/jsm/libs/draco/gltf');
  return {
    name: 'draco-decoder',
    resolveId: (source) => (source === 'virtual:draco-decoder' ? id : null),
    load(module) {
      if (module !== id) return null;
      const url = (name) => {
        const ref = this.emitFile({ type: 'asset', name, source: readFileSync(join(folder, name)) });
        return `import.meta.ROLLUP_FILE_URL_${ref}`;
      };
      return `export default { js: ${url('draco_wasm_wrapper.js')}, wasm: ${url('draco_decoder.wasm')} };`;
    },
  };
}

export const plugins = [nodeResolve(), typescript({ noEmitOnError: true }), json(), dracoDecoder(), removeOldChunks()];

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
  // The Draco decoder: floor3d-card-draco_wasm_wrapper-<hash>.js and floor3d-card-draco_decoder-<hash>.wasm.
  assetFileNames: 'floor3d-card-[name]-[hash][extname]',
  manualChunks: coreChunk(),
};

export default {
  input: 'src/floor3d-card.ts',
  // Home Assistant loads the card for its side effects (custom element): no exports needed.
  preserveEntrySignatures: false,
  output,
  plugins: [...plugins, terser()],
};
