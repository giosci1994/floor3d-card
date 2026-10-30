---
title: Shower
description: type3d shower, falling water while the entity is on.
sidebar:
  order: 14
---

Drops fall from the object while the entity is on: a shower, a fountain, a sprinkler. The speed of the animation doesn't depend on the frame rate.

```yaml
- entity: binary_sensor.shower_running
  type3d: shower
  object_id: Shower_head
  shower:
    count: 300
    color: '#99ccff'
```

| Option | Default | |
| --- | --- | --- |
| `count` | `200` | The number of drops. |
| `velocity` | `5` | How fast they fall. |
| `size` | `1` | The size of a drop. |
| `color` | `#aaaaaa` | The colour of the drops. |
| `width` | `20` | How wide the water spreads, in cm. |
| `height` | `100` | How far it falls, in cm. |

![Animated shower](../../../assets/images/shower.jpg)
