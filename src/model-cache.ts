// The last model loaded by a card being edited (in the preview of the card editor, or in a dashboard
// in edit mode), kept for a few minutes. Home Assistant builds the preview again at every change of
// the configuration, and each time the model was downloaded and parsed again: seconds for a big
// model. A card that finds its model here takes a copy of it instead. The file is asked first
// whether it changed (a model exported again with the same name is loaded again), and the reload
// button of the editor empties the cache.
import * as THREE from 'three';

const KEEP_MS = 5 * 60 * 1000; // a model not used for this long is let go, with its memory

interface Entry {
  key: string;
  version: string;
  model: THREE.Object3D;
  timer: number;
}
let entry: Entry | undefined;

// A copy of a model that shares nothing the card changes: its own objects, geometries (the card moves
// the geometry of doors to their hinge) and materials (it colours and fades them). Objects that
// share a geometry or a material in the file still share them in the copy. The textures, which the
// card doesn't change, are shared.
export function copyModel(source: THREE.Object3D): THREE.Object3D {
  const copy = source.clone(true);
  const geometries = new Map<THREE.BufferGeometry, THREE.BufferGeometry>();
  const materials = new Map<THREE.Material, THREE.Material>();
  const material = (m: THREE.Material): THREE.Material => {
    if (!materials.has(m)) materials.set(m, m.clone());
    return materials.get(m);
  };
  copy.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) {
      if (!geometries.has(mesh.geometry)) geometries.set(mesh.geometry, mesh.geometry.clone());
      mesh.geometry = geometries.get(mesh.geometry);
    }
    if (mesh.material)
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(material) : material(mesh.material);
  });
  return copy;
}

// What tells a new version of a file: its ETag, else when it changed, else its size; empty when the
// server sends none of them. Undefined when the file can't be reached.
async function versionOf(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    if (!response.ok) return undefined;
    const headers = response.headers;
    return headers.get('etag') || headers.get('last-modified') || headers.get('content-length') || '';
  } catch {
    return undefined;
  }
}

function forget(): void {
  if (entry) window.clearTimeout(entry.timer);
  entry = undefined;
}

// Keeps a copy of the model of key, loaded from url, as the file gave it (before the card changes it).
export async function keepModel(key: string, url: string, model: THREE.Object3D): Promise<void> {
  const copy = copyModel(model);
  const version = await versionOf(url);
  if (version === undefined) return;
  forget();
  entry = { key, version, model: copy, timer: window.setTimeout(forget, KEEP_MS) };
}

// A copy of the model of key, if it is kept and its file hasn't changed since.
export async function takeModel(key: string, url: string): Promise<THREE.Object3D | undefined> {
  if (!entry || entry.key !== key) return undefined;
  const kept = entry;
  const version = await versionOf(url);
  if (entry !== kept) return undefined; // let go or replaced meanwhile
  if (version === undefined || version !== kept.version) {
    forget();
    return undefined;
  }
  window.clearTimeout(kept.timer);
  kept.timer = window.setTimeout(forget, KEEP_MS);
  return copyModel(kept.model);
}

// The reload button of the editor: the next card loads the model from its files.
export function forgetModels(): void {
  forget();
}
