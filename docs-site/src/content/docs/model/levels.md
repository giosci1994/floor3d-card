---
title: Levels
description: A house of several floors, one level at a time.
sidebar:
  order: 2
---

A model exported with the [ExportToHASS](https://github.com/adizanni/ExportToHASS) plugin keeps the levels of Sweet Home 3D: the name of each object starts with `lvl` and the number of its level (`lvl001…`). The card takes the prefix away, so the entities use the names without it.

With more than one level the card shows a column of buttons at the top left: the first one shows all the levels, and each of the others shows or hides its level (dimmed while it is hidden).

| Option | Default | |
| --- | --- | --- |
| `initialLevel` | all the levels | The level shown when the card opens and with the initial view. |
| `hideLevelsMenu` | `no` | `yes` hides the buttons of the levels. |

A view can show a level of its own (`level`): only that level is shown, and a view without `level` shows all of them.

The card hides what belongs to a hidden level: lamps and their light, info boxes, the icons of the cameras. When a tap takes the camera to something (the status box, an alarm), its level and the levels under it are shown, and those above it hidden, so that they don't cover it.

A house with a basement sets `ground_floor_level`, the height of the basement, so that the ground under the house is at the floor of the ground floor; with only the basement shown, the ground opens over it.
