---
title: TV screen
description: type3d image, the picture of an entity on a screen of the model, which lights the room.
sidebar:
  order: 13
---

The picture of the entity (`entity_picture`: the cover of what a media player plays, a camera) shows on a screen of the model, and can light the room in front of it with the average colour of the picture. The screen is dark while the entity is `off`, `standby`, `unavailable` or `unknown`.

```yaml
- entity: media_player.living_room_tv
  type3d: image
  object_id: TV_screen
  image:
    lumens: 2
    lighting_lumens: 300
    lighting_direction: positive_z
```

| Option | Default | |
| --- | --- | --- |
| `rotate` | `0` | Turns the picture, in degrees. |
| `mirror` | `no` | `yes`: mirrors the picture. |
| `lumens` | none | The screen glows; without it the picture is lit by the room, as a printed picture. |
| `lighting_lumens` | none | A light in front of the screen, in the colour of the picture. |
| `lighting_direction` | `positive_z` | Which way the screen faces: `positive_z`, `negative_z`, `positive_x`, `negative_x`, `positive_y` or `negative_y`. |
| `lighting_distance` | `800` | How far that light reaches, in cm. |
| `lighting_off_state` | `off`, `standby`, `unavailable`, `unknown` | The states in which the light is off. |
| `lighting_shadow` | `yes` | `no`: the light casts no shadow, and leaves the shadow for a lamp. |

![TV screen: the picture of the media player lights the room](../../../assets/images/tv.jpg)
