---
title: Person tracker
description: type3d tracker, the people a presence radar sees, where they are in the room, or a robot vacuum with a model of its own.
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
| `sensor_position` | `[0, 0, 0]` | Where the radar is: `[x, y, z]` from the middle of the bottom of the model, which the card centres on 0 (for a house 1400 cm wide, its corner is at `[-700, 0, -700]`). |
| `sensor_rotation` | `0` | Which way it faces, in degrees. |
| `scale` | `0.001` | From the unit of the radar to the model. |
| `zone` | | An entity whose state is shown above the head (the zone). |
| `label` | `yes` | `no` hides it. |
| `color` | `#FF5500` | The colour of the marker. |
| `size` | `15` | Its size. |
| `height` | `150` | Its height, in cm. |

A radar that publishes metres with the X axis already mirrored needs `unit: m` and `flip_x: true`. While only trackers (or a shower) move, the card draws at most 30 frames a second.

## A model in place of the marker

With `model` (since 2.14.0) a `.glb` model takes the place of the head and the stem: a robot vacuum that goes around the house, for example. The halo on the floor and the label stay. With `sensor_heading` the model also turns to where it is going, the shorter way and smoothly, as it moves.

```yaml
- entity: sensor.robot_x
  type3d: tracker
  object_id: robot_vacuum
  tracker:
    sensor_y: sensor.robot_y
    sensor_heading: sensor.robot_heading
    unit: mm
    scale: 0.1
    model: robot_vacuum.glb
    model_scale: 100
    label: no
    color: '#00aaff'
```

| Option | Default | |
| --- | --- | --- |
| `model` | | A `.glb` file: in the folder of the `path` of the card, or an address of its own that starts with `/` or `http` (`/local/models/robot.glb`). It can be compressed with Draco or meshopt, as the model of the house. |
| `model_scale` | `1` | A glTF model is in metres: `100` for a house in centimetres (Sweet Home 3D), `1000` for one in millimetres. |
| `model_rotation` | `0` | Degrees, for a model whose front doesn't face +X (the direction of `sensor_x`). |
| `sensor_heading` | | A sensor whose state is the direction in degrees, in the frame of `sensor_x` and `sensor_y`: `0` towards +x, `90` towards +y. The card mirrors it with `flip_x` and `flip_y` and turns it by `sensor_rotation`, as the position. |

A robot to download, and the sensors of Home Assistant that give its position and direction, are in the recipe [A robot vacuum on the model](/floor3d-card/recipes/robot-vacuum/).

The middle of the base of the model goes on the point of the tracker, and it fades in and out as the marker does. If the file doesn't load, the console says why and the marker comes back.

![Two people tracked, with the name of their zone above the head](../../../assets/images/trackers.jpg)
