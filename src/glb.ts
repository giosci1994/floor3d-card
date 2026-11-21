// Reading a .glb file: the model of the card and the models of the trackers. Also a file compressed
// with Draco or meshopt (gltf-transform draco / meshopt, 5 to 10 times smaller): the decoder it needs
// is loaded only then, meshopt from a chunk of the card, Draco from the files that come with the card,
// or from draco_decoder_path when set. Idea from Steven-D-Morgan/hass-3d-floorplan.
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import DRACO_DECODER from 'virtual:draco-decoder';

// Quantized models (gltf-transform meshopt adds KHR_mesh_quantization) keep their positions as
// integers, with a scale and an offset on each node. The card moves doors, covers and fans by
// changing the geometry and the position of the objects, as if every object had no transform of its
// own: the geometry goes back to floats with the transforms of the nodes in it, like any other model.
function bakeNodeTransforms(root: THREE.Object3D): void {
  root.updateMatrixWorld(true);
  const meshes: THREE.Mesh[] = [];
  const users = new Map<THREE.BufferGeometry, number>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    meshes.push(mesh);
    users.set(mesh.geometry, (users.get(mesh.geometry) || 0) + 1);
  });
  meshes.forEach((mesh) => {
    // A geometry used by several objects is copied first, so that each gets its own transform.
    const geometry = floatGeometry(users.get(mesh.geometry) > 1 ? mesh.geometry.clone() : mesh.geometry);
    geometry.applyMatrix4(mesh.matrixWorld);
    mesh.geometry = geometry;
  });
  root.traverse((object) => {
    if (object === root) return;
    object.position.set(0, 0, 0);
    object.quaternion.identity();
    object.scale.set(1, 1, 1);
  });
  root.updateMatrixWorld(true);
}

// The same geometry with float attributes (quantized ones are integers, normalized or not).
function floatGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
  Object.keys(geometry.attributes).forEach((name) => {
    const attribute = geometry.attributes[name] as THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
    if (!(attribute instanceof THREE.InterleavedBufferAttribute) && attribute.array instanceof Float32Array) return;
    const array = new Float32Array(attribute.count * attribute.itemSize);
    for (let i = 0; i < attribute.count; i++) {
      for (let k = 0; k < attribute.itemSize; k++) {
        array[i * attribute.itemSize + k] = attribute.getComponent(i, k);
      }
    }
    geometry.setAttribute(name, new THREE.BufferAttribute(array, attribute.itemSize));
  });
  return geometry;
}

// The glTF extensions a .glb file uses, read from its JSON chunk (the decoders it needs).
function glbExtensions(buffer: ArrayBuffer): string[] {
  try {
    const view = new DataView(buffer);
    if (buffer.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67) return []; // 'glTF'
    if (view.getUint32(16, true) !== 0x4e4f534a) return []; // 'JSON'
    const json = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 20, view.getUint32(12, true))));
    return [...(json.extensionsUsed || []), ...(json.extensionsRequired || [])];
  } catch {
    return [];
  }
}

// The model of a .glb file already read (path: where its external files are). dracoDecoderPath:
// draco_decoder_path of the card.
export async function parseGLB(buffer: ArrayBuffer, path: string, dracoDecoderPath?: string): Promise<GLTF> {
  const extensions = glbExtensions(buffer);
  const loader = new GLTFLoader();
  if (extensions.includes('EXT_meshopt_compression')) {
    const { MeshoptDecoder } = await import('three/addons/libs/meshopt_decoder.module.js');
    loader.setMeshoptDecoder(MeshoptDecoder);
  }
  let draco: { dispose(): void } | undefined;
  if (extensions.includes('KHR_draco_mesh_compression')) {
    const { DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js');
    let decoderPath = dracoDecoderPath;
    if (decoderPath && !decoderPath.endsWith('/')) decoderPath += '/';
    const dracoLoader = new DRACOLoader().setDecoderPath(decoderPath || DRACO_DECODER);
    draco = dracoLoader;
    loader.setDRACOLoader(dracoLoader);
  }
  try {
    const gltf = await loader.parseAsync(buffer, path);
    if (extensions.includes('KHR_mesh_quantization')) bakeNodeTransforms(gltf.scene);
    return gltf;
  } finally {
    draco?.dispose(); // its workers
  }
}
