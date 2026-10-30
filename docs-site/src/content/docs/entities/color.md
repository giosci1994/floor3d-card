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

The card can also colour the doors and the rooms by itself: open doors in amber, rooms by temperature, presence or any sensor (see the `state_colors` and `rooms` options).
