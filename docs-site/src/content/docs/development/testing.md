---
title: Tests
description: The tests of the logic, the browser tests of the built card, and the test page.
sidebar:
  order: 3
---

## Tests of the logic

`npm test` runs the tests of the parts without three.js and without the page (`test/*.test.mjs`, Node 22 or newer): the configuration, the maps, the sky and the ground, the boxes, the cameras, the rotation, the slats, the text, and the language files (every key in English, the same placeholders in every language).

## Browser tests

`test/browser/` runs the built card (`dist/`) in headless Chromium with software WebGL (SwiftShader), the same on every computer, at every pull request and push. The test house is made by `model.mjs` when the tests start (OBJ and MTL, the same with levels, with covers, a GLB, a GLB compressed with Draco), and `server.mjs` serves it with the test page. They check the lights and their shadows, doors, covers, rotation, maps, alarms, boxes, cameras, the editor and its preview, the walls, the levels, and every bug fixed since they exist.

The tests wait for what they check (an animation that ends, a camera that arrives), never for a fixed time: a busy computer is slower.

To run them locally: `npx playwright install --only-shell chromium` once, then `npm run build` and `npm run test:browser`. With another Chromium already installed, `CHROMIUM_PATH=/path/to/chrome npm run test:browser` uses it.

## The test page

`test/` holds a page that runs the card outside Home Assistant, with fake states, a fake WebGL context and `requestAnimationFrame` on a timer. `config.json` is an example that uses the options of the card; `states.json` and `states-off.json` are two sets of states, lights on by day and off at night.

1. Put your model where `path`, `objfile` and `mtlfile` of `test/config.json` point, and use the `object_id` of your model.
2. Copy the files of `dist/` (after `npm run build`) or of a release into `test/`.
3. Serve the folder from a web server and open `index.html?v=dist&fakegl=1&raf=timeout`.

- `fakegl=1` replaces WebGL with a fake context: three.js loads the real model and counts the textures and draw calls;
- `raf=timeout` is needed when the browser window is hidden;
- `st=states-off.json` picks the other states, `cfg=` another configuration, and `ov=` overrides keys of the configuration with a JSON object;
- `window.__setState(entity, state, attributes)` changes a state from the console, and `window.__card` is the card.
