---
title: GLB and compressed models
description: A model in a single file, faster to load, and compressed several times smaller.
sidebar:
  order: 3
---

Instead of the OBJ files the card can load a `.glb` file: a single binary file, faster to load. `mtlfile` is not needed then.

```yaml
path: /local/floor3d/
objfile: home.glb
```

## From OBJ to GLB

[obj2gltf](https://github.com/CesiumGS/obj2gltf) converts the export of Sweet Home 3D. It needs [Node.js](https://nodejs.org/):

```bash
npm install -g obj2gltf
```

In the folder of the export (the `.obj`, the `.mtl` and the pictures):

```bash
obj2gltf --checkTransparency -i home.obj -o home.glb
```

It takes from a few seconds to a few minutes. Copy `home.glb` into the folder of the model in Home Assistant.

## Compressed models

A `.glb` can be compressed with [glTF Transform](https://gltf-transform.dev), often several times smaller:

```bash
npx @gltf-transform/cli meshopt home.glb home-meshopt.glb
npx @gltf-transform/cli draco home.glb home-draco.glb
```

The names of the objects stay the same, so the entities keep working.

:::caution
Use only these two commands: `gltf-transform optimize` also merges objects, and the entities would no longer find them.
:::

- **meshopt**: the decoder is part of the card, about 25 KB, loaded only by these models. Doors, covers and fans move as in the uncompressed model.
- **Draco**: usually the smallest file. The decoder (about 250 KB, the glTF build that three.js includes, by Google under the Apache License 2.0) comes with the card, next to its other files, and is loaded only by these models; it works without Internet access. `draco_decoder_path` sets another folder with `draco_wasm_wrapper.js` and `draco_decoder.wasm`, for example `/local/draco/`.

The card reads the file first and loads a decoder only when the model needs it: an uncompressed model loads as before. The idea comes from [Steven-D-Morgan/hass-3d-floorplan](https://github.com/Steven-D-Morgan/hass-3d-floorplan).
