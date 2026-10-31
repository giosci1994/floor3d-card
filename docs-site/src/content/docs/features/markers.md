---
title: Markers
description: Any entity as a chip over the model, with its icon and its state, at a point or over an object.
sidebar:
  order: 6
---

`markers` puts a chip over the model for any entity: its icon and its state, as Home Assistant writes it (in the language of the user, with its unit). The chip follows the view, takes the colour of the theme while the entity is on or open, fades while it is unavailable, and a tap opens the entity. They are in the *Markers* section of the editor.

```yaml
markers:
  - entity: sensor.living_room_temperature
    position: [500, 150, 700] # picked in the editor
  - entity: light.table_lamp
    object_id: Table # over the top of the table
    icon: mdi:lamp
  - entity: binary_sensor.kitchen_window
    object_id: Window_kitchen
    state: no # only the icon
```

| Option | Default | |
| --- | --- | --- |
| `entity` | required | Any entity. |
| `position` | | A point of the model: `[x, y, z]`, in the coordinates of the model file. |
| `object_id` | | Else the object the marker stays over, also when it moves (a door, a cover). |
| `level` | | The marker shows only with this level. Over an object, the level of the object. |
| `name` | its name | The name of the marker, shown when the pointer is over it. |
| `icon` | its icon | The icon. |
| `state` | `yes` | `no`: only the icon. |

`markers_show: no` hides all the markers and keeps their settings.

In the editor, **Pick in the preview** and a tap on the model fill `position` and, when the model has more than one level, `level`; the button next to the object picks the object with a tap. A marker over an object hides with its level, and while the object is hidden.

The icons of the [cameras of the house](/floor3d-card/features/cameras/) work the same way, and open the camera with its live.
