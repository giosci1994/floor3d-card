---
title: Alarms
description: A room that blinks with smoke, gas or a water leak, and the camera that goes there.
sidebar:
  order: 3
---

`alarms` of a room lists alarm sensors (`binary_sensor`): while one of them is on, the room blinks, whatever the map (even with *No map*), with the kind of alarm written on it in its colour. The kind comes from the device class of the sensor: red for smoke, gas and carbon monoxide, orange-red for heat, blue for a water leak, light blue for cold, orange for safety, problem and tampering. With several alarms on, the most serious gives the colour.

- `alarm_view: yes`: the camera goes to the room when one of its alarms goes on, from at least 65° above, with its level and the levels under it shown and those above hidden.
- [`type3d: alarm`](/floor3d-card/entities/alarm/): the objects of a sensor blink too, as the dishwasher with the leak sensor under it.

```yaml
alarm_view: 'yes'
rooms:
  - name: Kitchen
    object_id: room_3_103
    alarms: [binary_sensor.kitchen_smoke, binary_sensor.sink_leak]
entities:
  - entity: binary_sensor.dishwasher_leak
    type3d: alarm
    object_id: dishwasher
```

The blinking runs only while an alarm is on; when all are off the rooms show their map again.

![A water leak in the bedroom: the room blinks in blue](../../../assets/images/map-alarm.jpg)

The alarm panel of the house has a [box](/floor3d-card/features/boxes/) of its own, and with `state_colors: yes` the open doors turn red while it is armed (see [Room colours](/floor3d-card/features/rooms/)).
