---
title: Person tracker
description: type3d tracker, the people a presence radar sees, where they are in the room.
sidebar:
  order: 15
---

A marker for each target of a presence radar that reports coordinates, such as the HLK-LD2450: it glides to the new position (about 0.25 s) and fades out when the target is lost. One entity per target.

```yaml
- entity: sensor.radar_target_1_x
  type3d: tracker
  object_id: person_tracker_1
  tracker:
    sensor_y: sensor.radar_target_1_y
    unit: m
    flip_x: true
    zone: sensor.radar_target_1_zone
    sensor_position: [-400, 0, 450]
    sensor_rotation: -135
    scale: 0.1
    color: '#FF5500'
```

The X coordinate comes from `sensor_x`, from an `x` attribute of the entity, or from its state; Y from `sensor_y` or from a `y` attribute.

| Option | Default | |
| --- | --- | --- |
| `sensor_x`, `sensor_y` | | The sensors of the coordinates. |
| `unit` | `mm` | `mm`, `cm` or `m`: the unit of the coordinates. |
| `flip_x`, `flip_y` | `no` | Mirror an axis. |
| `sensor_position` | | Where the radar is in the model: `[x, y, z]`. |
| `sensor_rotation` | `0` | Which way it faces, in degrees. |
| `scale` | `0.001` | From the unit of the radar to the model. |
| `zone` | | An entity whose state is shown above the head (the zone). |
| `label` | `yes` | `no` hides it. |
| `color` | `#FF5500` | The colour of the marker. |
| `size` | `15` | Its size. |
| `height` | `150` | Its height, in cm. |

A radar that publishes metres with the X axis already mirrored needs `unit: m` and `flip_x: true`. While only trackers (or a shower) move, the card draws at most 30 frames a second.

![Two people tracked, with the name of their zone above the head](../../../assets/images/trackers.jpg)
