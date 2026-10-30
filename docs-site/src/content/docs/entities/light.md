---
title: Light
description: type3d light, a light in the colour and brightness of a light entity.
sidebar:
  order: 2
---

A light entity gets a light in its objects, on when the entity is on, in the colour and brightness it reports (`rgb_color`, or its colour temperature, and `brightness`). A double click on the lamp toggles it; with `click: yes` a tap does, and a long press opens its details.

```yaml
- entity: light.living_room
  type3d: light
  object_id: Living_lamp
  light:
    lumens: 900
    shadow: 'yes'
```

| Option | Default | |
| --- | --- | --- |
| `lumens` | `800` | The brightness at full power; `light_power` multiplies all the lamps. |
| `color` | white | The colour of a light that doesn't report one. |
| `decay` | `2` | How fast the light fades with the distance. |
| `distance` | `600` | How far the light reaches, in cm. |
| `shadow` | `no` | `yes`: the light casts shadows, and doesn't go through the walls. |
| `vertical_alignment` | `middle` | `top` or `bottom`: the light at the top or bottom of the lamp, so that the lamp itself doesn't stop it. |
| `single` | `no` | `yes`: one light for a lamp made of several objects, in the middle of them. |
| `light_object` | none | One light, on this object of the lamp. |
| `light_target` | none | A spot pointed at this object. |
| `light_direction` | none | A spot pointed this way: `{x, y, z}` (code editor only). |
| `angle` | `18` | The width of the spot, in degrees. |

## Shadows

Without a shadow, the light of a lamp goes through the walls and lights the rooms around it: that's what `shadow: yes` is for. But each light with a shadow takes a texture unit of the GPU, and the GPU has a fixed number of them: about 14 shadows on most phones and PCs, fewer when the materials of the model have many textures. Past the limit the last lights get no shadow (the sun comes first, then the lights in the order of the entities), with a warning in the console; the card editor shows the limit and the lights left without.

To stay within the limit:

- `shadow: no` on the lights whose shadow nobody would notice (a corridor, a strip under the cabinets): they still light the room.
- One light for a lamp made of several objects. A chandelier or a row of five spots, given as a `<group>` or a name with `*`, makes one light per object: five lights, and five shadows. With `single: yes` the entity gets one light in the middle of all its objects, or on the object of `light_object`. Raise `lumens`, since the light of five spots becomes one.
- `extralightmode: yes` (top level): only the lights that are on count, and a light gets its shadow when it is switched on, if there is room.

```yaml
- entity: light.living_room
  type3d: light
  object_id: <living_room_spots>
  light:
    single: 'yes' # one light in the middle of the five spots
    lumens: 2500
- entity: light.kitchen
  type3d: light
  object_id: Kitchen_spot_*
  light:
    light_object: Kitchen_spot_2 # one light, on this spot
```

`light_object` alone also means one light, as in [floor3dx-card](https://github.com/FortranFour/floor3dx-card), so the same configuration works in both.

![Evening: lamps on, each with its own shadows](../../../assets/images/evening.jpg)
