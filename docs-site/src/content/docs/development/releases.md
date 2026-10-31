---
title: Publishing a release
description: How a new version of the card reaches HACS.
sidebar:
  order: 2
---

1. Change `version` in `package.json` and `CARD_VERSION` in `src/const.ts` (for example `2.0.1` and `v2.0.1`), and commit. No build to commit: the Release workflow makes the files.
2. On GitHub, **Releases › Draft a new release**: a new tag named after the version (`v2.0.1`), a description of the changes, **Publish release**.
3. The Release workflow builds the card from the tag and attaches the files of `dist/` (`.js` and the `.wasm` of the Draco decoder) to the release. HACS downloads them from there, and shows the update when it next checks the repository (**Update information** in the menu of the repository checks at once).

## The workflows

- **Build**, at every push and pull request to `master`: lint, format check, build, `npm test` and the [browser tests](/floor3d-card/development/testing/).
- **Validate**, at every push and every night: the checks of HACS. Pull requests from forks skip it, since a fork has no releases for HACS to check.
- **Docs**: builds this site on pull requests that change it, and publishes it on GitHub Pages from `master`. It builds the card first: the live demo of the home page runs the card of the same commit, in the house of the browser tests (`docs-site/scripts/demo.mjs`, `docs-site/src/scripts/demo.js`).
- **Release**: the files of each published release.

The changes of each version are in the [releases](https://github.com/giosci1994/floor3d-card/releases) on GitHub.
