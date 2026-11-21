---
title: A console that lights up the TV
description: A game console that glows while it is on, and its picture on the TV screen of the model, whatever the TV reports.
sidebar:
  order: 2
---

While the game console is on, it glows blue on its shelf and the TV of the model shows its logo, also when Home Assistant doesn't see what the TV shows (many TVs report `off` or `unavailable` while they show an HDMI input). `switch.console` is the console: a smart plug, its own integration, or a template that says `on` when it draws power.

Put the picture in `/config/www` (here `/config/www/console.png`, which Home Assistant serves as `/local/console.png`).

```yaml
object_groups:
  - object_group: Console
    objects:
      - object_id: Console_body
      - object_id: Console_top
entities:
  # The console: blue and glowing while it is on. A dark console with a texture needs the glow, the
  # colour alone leaves it almost black.
  - entity: switch.console
    type3d: color
    object_id: <Console>
    colorcondition:
      - state: 'on'
        color: '#4FC3F7'
        glow: 2.5
  # The TV: its own picture (what it plays), or the picture of the console while it is on.
  - entity: media_player.living_room_tv
    type3d: image
    object_id: TV_screen
    image:
      lumens: 2
      lighting_lumens: 300
      overrides:
        - entity: switch.console
          state: 'on'
          picture: /local/console.png
```

- `glow` from about `2.5` makes the console the colour itself; around `1` to `1.5` its texture still shows (see [A colour that glows](/floor3d-card/entities/color/#a-colour-that-glows)).
- The rows of `overrides` are read in order: the first whose entity is in its state gives the picture. Without a matching row, the screen shows the picture of the TV, and is dark while the TV is off (see [A picture by the state of another entity](/floor3d-card/entities/image/#a-picture-by-the-state-of-another-entity)).
