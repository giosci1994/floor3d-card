---
title: Hide and show
description: type3d hide and show, objects hidden or shown in one state.
sidebar:
  order: 4
---

- `hide`: the objects are hidden while the entity is in `state`, and shown in the other states.
- `show`: the objects are shown while the entity is in `state`, and hidden in the other states.

```yaml
- entity: binary_sensor.garage_car
  type3d: show
  object_id: <car>
  show:
    state: 'on' # the car is there only while the sensor sees it
- entity: switch.christmas_tree
  type3d: hide
  object_id: <christmas_tree>
  hide:
    state: 'off'
```

A hidden object is out of the way of a tap (since 2.14.0): a roof hidden over the house lets you tap the lamps under it. The same goes for an object you see through, with an opacity under 0.5 (glass, a polycarbonate roof); the picker of the editor can still pick those.
