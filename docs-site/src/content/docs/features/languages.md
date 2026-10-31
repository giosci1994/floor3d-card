---
title: Languages
description: The card and its editor in the language of each user.
sidebar:
  order: 10
---

The card and its editor show the language of the profile of each user in Home Assistant, so in the same house everyone sees their own. `language` (`en`, `it`, `de`, `nb`) sets one for the card and its editor, whatever the profile. A regional variant uses its language (`de-CH`: German), and a language without texts shows English.

| Language | Card | Editor |
| --- | --- | --- |
| English | ✓ | ✓ |
| Italiano | ✓ | ✓ |
| Deutsch | ✓ | ✓ |
| Norsk bokmål | ✓ | English |

A new language is two JSON files to translate: see `src/localize/` in the repository, and [Adding a language](/floor3d-card/development/languages/) for the steps.
