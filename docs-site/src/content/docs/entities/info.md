---
title: Info box
description: type3d info, a box with a text floating over the object.
sidebar:
  order: 7
---

A box with the state of the entity floats over its object, or at a point of its own, and always faces the camera. It hides with the level of its object.

```yaml
- entity: sensor.solar_power
  type3d: info
  object_id: Roof
  info:
    text: Solar $entity W
    size: 80
    textfgcolor: white
    textbgcolor: black
```

| Option | Default | |
| --- | --- | --- |
| `text` | the state and its unit | A text where `$entity` is the state, or a template `[[[ ]]]` as `entity_template`. |
| `size` | `100` | The height of the box, in the units of the model. |
| `font`, `textfgcolor`, `textbgcolor` | `monospace`, `white`, transparent | The font and the colours of the text. |
| `position` | over the object | A point of the scene, `{x, y, z}`, as `camera_position`. |
