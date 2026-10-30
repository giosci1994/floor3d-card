---
title: Rotating objects
description: type3d rotate, fans, turbines and weather vanes that turn at a speed or to an angle.
sidebar:
  order: 10
---

Objects that turn around their middle, or around a hinge: a ceiling fan while it is on, a wind turbine at the speed of a sensor, a weather vane to the direction of the wind.

| Option | Default | |
| --- | --- | --- |
| `axis` | | `x`, `y` or `z`: the axis it turns around (`y` is up). |
| `round_per_second` | `1` | Turns per second at full speed; negative turns the other way. |
| `ramp` | `1.5` | Seconds to reach full speed or to stop; `0` starts and stops at once. |
| `hinge` | the first object | The object whose middle the others turn around. |
| `speed_entity` | | A sensor from 0 to 100: the share of `round_per_second` it turns at. |
| `speed_multiplier` | `1` | Multiplies the speed sensor. |
| `angle_entity` | | A sensor in degrees: the object turns to that angle. |
| `angle_offset` | `0` | Added to the angle: where its 0 is on the model. |
| `angle_min`, `angle_max` | `0`, `360` | The angle stays within them. |

## Speed

- An entity that is **on or off** turns at full speed while on, speeding up and slowing down over `ramp` seconds.
- A **fan** with a `percentage` attribute turns at that share of `round_per_second`, and with `direction: reverse` the other way; a change of direction slows down and speeds up again.
- A **number** (the state of a sensor or an `input_number`, or of `speed_entity`), from 0 to 100 times `speed_multiplier`, is the share of `round_per_second` it turns at; negative, the other way; with no number (`unavailable`), it stops. The state can have a comma (`12,5`) or a unit (`30 km/h`).

## Angle

With `angle_entity` the object turns to the angle of the sensor around its `axis`, clockwise seen from the positive end of the axis (from above for `y`, as a compass), at `round_per_second`, and stays there; when the card opens it is there at once. Over a whole turn it goes the shorter way (from 350 to 10 through 0); `angle_min` and `angle_max` keep it within a range, for a valve or a barrier. While the sensor has no number the object stays where it is. With `angle_entity` the speed and the state of the entity are not used.

```yaml
- entity: fan.ceiling
  type3d: rotate
  object_id: <Fan_blades>
  rotate:
    axis: y
    round_per_second: 1.5
    ramp: 3
    hinge: Fan_hub

- entity: sensor.wind_speed
  type3d: rotate
  object_id: <Turbine>
  rotate:
    axis: z
    round_per_second: 2
    speed_multiplier: 2 # 50 km/h: full speed

- entity: sensor.wind_direction
  type3d: rotate
  object_id: <WeatherVane>
  rotate:
    axis: y
    round_per_second: 0.25
    angle_entity: sensor.wind_direction
    angle_offset: 90 # the vane of the model points east at 0
```
