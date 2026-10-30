---
title: Troubleshooting
description: The card doesn't show, a model doesn't load, lights without shadows, a slow card, and other common problems.
sidebar:
  order: 1
---

## The card or its update doesn't show

- **The original card is installed too.** Both define `custom:floor3d-card`, and the one loaded first is used: the browser console says `custom:floor3d-card is already defined by another resource`. Remove the original card from HACS (or its resource), then reload.
- **The browser keeps the old version.** The version is at the top of the card editor and in the browser console. Reload the page, or clear the cache of the Home Assistant app. Installed by hand, change the `?v=` of the resource at every update: Home Assistant serves `/local` with a long cache, and a new query is a new address.
- **Home Assistant is older than 2024.1.** The card needs 2024.1 or newer; on an older one the editor says so, and the card can still be set up in YAML.

## The model doesn't load

While it loads, the card shows a bar with the step and the megabytes; when the model can't load, the card writes the file and the reason.

- `path` is the address of the folder for the browser: `/local/floor3d/` for `/config/www/floor3d/`, with the `/` at the end.
- `objfile` and `mtlfile` are the names of the files, with the same capitals as on the disk.
- An OBJ needs its `.mtl` and the pictures of its textures in the same folder. A GLB is a single file.
- A model compressed with Draco loads its decoder from the folder of the card: if the card was installed by hand, copy all the files of the release, `.wasm` included.

## The entities lost their objects

Sweet Home 3D numbers the objects again when objects are deleted and the model exported again. The editor warns, on the line of each entity, when its object isn't in the model any more: pick it again in the preview. To avoid it, hide objects rather than deleting them, use names with `*` (`Lamp_*`), or export with the ExportToHASS plugin. See [The names of the objects](/floor3d-card/model/sweet-home-3d/#the-names-of-the-objects).

## Lights without shadows

The GPU can draw a limited number of shadows, about 14 on most phones and PCs, fewer when the materials of the model have many textures. Past the limit the last lights get none, with a warning in the console, and the light section of the editor shows the limit and the lights left without. See [Shadows](/floor3d-card/entities/light/#shadows) for the ways to stay within it.

## The sun comes in from above

A model without ceilings lets the sun of noon in from above. List the indoor floors in `sun_roof`: see [The sun indoors](/floor3d-card/features/light/#the-sun-indoors).

## Too dark, too bright

- The whole picture: `exposure` (1).
- The lamps: `light_power` (1), or `lumens` of each lamp.
- The light that follows the camera: `globalLightPower` (0.2).
- The sun and the sky: `sun_power` and `sky_power`, also from sensors: see [Light, sun and sky](/floor3d-card/features/light/).

## A tap does nothing

By default an object runs its action with a **double click**. `click: yes` makes it a single tap, on phones too, and a long press opens the details of the entity. Only lights, gestures, cameras, thermostats and alarms have an action of their own: the others need `action: more-info` or `overlay`. See [Taps](/floor3d-card/entities/overview/#taps).

## A text is mirrored or doesn't show

The text type writes on the largest face of the object, readable from both sides, with `mapping: flat` (the default). `mapping: model` follows the mapping of the model, as the original card did, which can write it mirrored or on no face. See [Text](/floor3d-card/entities/text/).

## The card is slow

- The card draws nothing while it is not on the screen, and only when something changes or moves.
- Fewer shadows: `shadow: no` on the lamps whose shadow nobody notices, and `single: yes` for lamps of several objects.
- `max_pixel_ratio` (2) caps the resolution on phones with very dense screens.
- A smaller model: a GLB, compressed with meshopt or Draco, loads faster (see [GLB and compressed models](/floor3d-card/model/glb/)).

### Laptops with two GPUs

On a laptop with a second GPU (NVIDIA, for example), Chrome or Firefox may draw with the integrated one, and the card is slow.

- **Firefox**: in the NVIDIA Control Panel, *Manage 3D Settings › Program Settings*, choose Firefox, the *High performance NVIDIA processor* and NVIDIA as the *OpenGL rendering GPU*. Then in `about:config` set `webgl.disable-angle` to `true`.
- **Chrome**: the same in the NVIDIA Control Panel for Chrome. Then in `chrome://flags/#use-angle` choose OpenGL, and restart Chrome. `chrome://gpu` should show `ANGLE (NVIDIA … OpenGL …)` as `GL_RENDERER`.
- **Edge**: the same as Chrome, with `edge://flags/#use-angle`; it doesn't always work.

## Still stuck?

Open an [issue](https://github.com/giosci1994/floor3d-card/issues) with the version of the card, of Home Assistant and of the browser, the configuration of the card, and the errors of the browser console.
