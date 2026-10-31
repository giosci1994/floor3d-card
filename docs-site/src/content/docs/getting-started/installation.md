---
title: Installation
description: Install floor3d-card mod with HACS or by hand.
sidebar:
  order: 1
---

The card needs **Home Assistant 2024.1** or newer.

## With HACS

[![Open this repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=giosci1994&repository=floor3d-card&category=plugin)

1. In HACS, search for **floor3d-card mod**: the card is in the default list of HACS. Or open the link above.
2. Open it and click **Download**. HACS copies the files of the latest release into `www/community/floor3d-card/` and adds the resource by itself.
3. Reload the browser or the app. The version is shown at the top of the card editor and in the browser console.

HACS shows the updates of the card like those of any other card.

## By hand

1. Download all the files of the [latest release](https://github.com/giosci1994/floor3d-card/releases/latest) (`.js` and `.wasm`) into a folder of `config/www`, for example `config/www/floor3d-card/`. There are seven files: the card, its core, the editor (loaded only when you edit the card) and the decoders of compressed models (loaded only by the models that need them).
2. Add the card as a resource of type **module** (Settings › Dashboards › Resources):

   ```yaml
   - url: /local/floor3d-card/floor3d-card.js?v=2.13.4 # the version: change it at every update
     type: module
   ```

3. Reload the browser or the app.

At every update copy the new files and change the `?v=` of the resource: Home Assistant serves `/local` with a long cache, while a new query is a new address.

## Coming from the original card

Remove the original floor3d-card from HACS first: both define `custom:floor3d-card` and use the same `www/community/floor3d-card` folder. When both are loaded, the one loaded first is used and the browser console says `custom:floor3d-card is already defined by another resource`.

Your configuration stays the same. In the card picker this card is listed as **floor3d-card mod**.

A few things work differently, on purpose:

- `sky: yes` is ignored: it changed the lights and the colours of the model. `backgroundColor: sky` draws a sky that follows the sun instead, and `ground` a lawn under the house (see [Sky, weather and ground](/floor3d-card/features/sky/)).
- The text type writes flat on the largest face of the object, readable from both sides; `mapping: model` keeps the old way (see [Text](/floor3d-card/entities/text/)).
- In YAML dashboards, an unquoted `yes` or `no` (read as `true` or `false`) now works: `shadow: yes` gives shadows, `header: no` hides the header.
- A configuration saved by this editor writes the objects of a group as plain ids, which the original card doesn't read (see [What the editor writes](/floor3d-card/editor/yaml/)).
- The bugs of the original card fixed here are listed in [FORK.md](https://github.com/giosci1994/floor3d-card/blob/master/FORK.md#fixes).
