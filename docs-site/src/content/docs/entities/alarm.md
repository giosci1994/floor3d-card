---
title: Alarm
description: type3d alarm, objects that blink while a smoke, gas or water sensor is on.
sidebar:
  order: 17
---

The objects of an alarm sensor (`binary_sensor`) blink while it is on, in the colour of its kind: the dishwasher with the leak sensor under it, the boiler with its gas sensor. A tap opens the sensor.

```yaml
- entity: binary_sensor.dishwasher_leak
  type3d: alarm
  object_id: dishwasher
```

The kind comes from the device class of the sensor: red for smoke, gas and carbon monoxide, orange-red for heat, blue for a water leak, light blue for cold, orange for safety, problem and tampering. `alarm.color` gives another colour.

The rooms blink too, with the kind of alarm written on them, when the sensor is in the `alarms` of a room; with `alarm_view: yes` the camera goes to the room.

![A water leak in the bedroom: the room blinks in blue](../../../assets/images/map-alarm.jpg)
