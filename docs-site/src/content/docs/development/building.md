---
title: Building the card
description: Build the card from the source, and how the source is organised.
sidebar:
  order: 1
---

```bash
npx --yes yarn@1.22.22 install --frozen-lockfile # not npm install: see below
npm run build        # rollup -c rollup.config.mjs
npm start            # rebuilds on every change and serves dist/ on port 5000
npm test             # tests of the logic and of the language files (Node 22 or newer)
npm run test:browser # the built card in headless Chromium (after npm run build)
npm run lint         # ESLint on src/
npm run format       # Prettier (format:check only checks)
```

`dist/` is not in the repository: `npm run build` makes it, and the Release workflow builds the files of each release from its tag.

The dependencies are installed with yarn 1 from `yarn.lock`, as the workflows do. `npm install` would rewrite `yarn.lock` in a form yarn 1 can't read, and `.npmrc` (`package-lock=false`) stops npm from adding a `package-lock.json`. To change a dependency use `npx --yes yarn@1.22.22 add` (or `upgrade`).

`CARD_VERSION` in `src/const.ts` is shown in the card editor and in the console: keep it equal to `version` in `package.json` and to the tag of the release. For test builds between releases add a suffix, for example `v2.0.1-dev.1`.

## Tooling

Rollup 4, TypeScript 5.9 (target ES2021), Lit 3, three.js 0.186 and tween.js 25. ESLint 10 (`eslint.config.mjs`) and Prettier 3 (`.prettierrc.js`): the Build workflow checks both, so run `npm run format` before a commit. The commit that formatted all the code with Prettier 3 is in `.git-blame-ignore-revs`.

## The source

- `src/floor3d-card.ts` is the card. Parts of it are in their own modules, which reach the card only through an interface of what they read of it and ask of it: the styles (`styles.ts`), the boxes in the corners (`corner-boxes.ts`), the icons and pictures of the cameras (`camera-overlay.ts`), the torch, the sun, the sky and the ground (`environment.ts`), the rooms and their maps (`rooms.ts`), the walls (`walls.ts`).
- Each entity type has a handler (`EntityHandler` in `entity-types.ts`: setup when the model is loaded, show, refresh at new states), listed in `_entityTypes` of the card: `trackers.ts`, `showers.ts`, `lamps.ts`, `screens.ts`, `openings.ts` (doors and covers), `rotating.ts`, `texts.ts` (text, info and room).
- `model-cache.ts` keeps the last model of a card being edited, so that the next preview takes a copy instead of downloading and parsing it again; the copy has its own objects, geometries and materials, and the file is asked first whether it changed (`HEAD`, its ETag).
- The configuration is `Floor3dCardConfig` in `types.ts`, an entity of it `EntityConfig`. `config.ts` reads it (`normalizeConfig()`) and writes the short form of the editor (`cleanConfig()`).
- The logic without three.js and without the page (`boxes.ts`, `cameras.ts`, `maps.ts`, `sky.ts`, `ground.ts`, `rotate.ts`, `slats.ts`, `textmap.ts`, `config.ts`) is tested in Node by `npm test`.
- The editor (`editor.ts`, `editor-schema.ts`) is built on the components of Home Assistant, and talks to the preview through window events.

## The files of a build

The card doesn't import the editor at startup: `getConfigElement()` loads it when the card is edited, so devices that only show the card download about 850 KB. The build makes:

- `floor3d-card.js`, the card;
- `floor3d-card-core-<hash>.js`, the libraries and the code shared with the editor;
- `floor3d-card-editor-<hash>.js`, the editor with its texts in every language (about 95 KB);
- the decoders of compressed models, loaded only by those models: meshopt (about 25 KB), and the Draco loader with the decoder of three.js (`.js` and `.wasm`, about 250 KB).

Nothing imports `floor3d-card.js`: the resource has a query (`?hacstag=` from HACS, `?v=` by hand), and an import without it would load a second copy of the card. `coreChunk()` in `rollup.config.mjs` makes the split, and `removeOldChunks()` removes the chunks of older builds from `dist/`.
