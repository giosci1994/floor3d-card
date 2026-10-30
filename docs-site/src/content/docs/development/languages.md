---
title: Adding a language
description: Translate the card and its editor into a new language.
sidebar:
  order: 4
---

The texts are in JSON files: `src/localize/languages/<code>.json` for the card (menus, loading screen, errors) and `src/localize/editor/<code>.json` for the editor (labels, help texts, menus, headings), loaded only with the editor. A text missing in a language is the English one.

1. Copy the two `en.json` files to `<code>.json` (the code Home Assistant uses: `fr`, `es`, `pt-BR`…) and translate the texts, leaving the `{name}` placeholders as they are.
2. Add the file to `languages` in `src/localize/localize.ts` and in `src/localize/editor.ts`, and the code to the `language` menu in `src/editor-schema.ts` (with its name under `options.language` in the editor files).
3. Add the code to the lists of languages in `test/i18n.test.mjs`: `npm test` checks that every key exists in English and that the placeholders match.

A pull request with a new language is welcome.
