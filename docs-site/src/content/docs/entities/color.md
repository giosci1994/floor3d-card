---
title: Colour by state
description: type3d color, a colour for each state of the entity.
sidebar:
  order: 3
---

The objects take a colour for each state of the entity, and their own colours in the other states.

```yaml
- entity: binary_sensor.front_door
  type3d: color
  object_id: Front_door
  colorcondition:
    - state: 'on'
      color: '#ff0000'
    - state: 'off'
      color: green
```

A colour is `#rrggbb`, a name (`red`) or `r, g, b` (`255, 0, 0`). With an [`entity_template`](/floor3d-card/entities/overview/#templates) the state can be made from a number: `hot` above 25 °C, for example.

## The colour of a light

With `color.light: yes` (since 2.13.4) the objects take the colour of a light entity while it is on, and glow with its brightness: a LED strip, a lamp shade, a lit sign. The entity is the light itself.

```yaml
- entity: light.kitchen_led_strip
  type3d: color
  object_id: Led_strip
  color:
    light: yes
    glow: 1.5
```

| Option | Default | |
| --- | --- | --- |
| `light` | `no` | `yes`: while the entity is on, the colour it reports (`rgb_color`, or its colour temperature; white when it reports none). |
| `glow` | `1` | How much the objects glow, times the brightness of the light. `0`: coloured, without glow. |

Off, the objects have their own colours again. A `colorcondition` whose state is the state of the entity comes first: `unavailable` in grey, for example. The glow doesn't light the room: for that, give the lamp a [light](/floor3d-card/entities/light/) entity too.

The card can also colour the doors and the rooms by itself: open doors in amber, rooms by temperature, presence or any sensor (see the `state_colors` and `rooms` options).
