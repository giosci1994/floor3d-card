---
title: A robot vacuum on the model
description: The robot vacuum goes around the model of the house, turned to where it is going, from the position on its map.
sidebar:
  order: 3
---

The robot vacuum moves over the floor of the model as it cleans, turned to where it is going, with the room it is in written over it. It is a [tracker](/floor3d-card/entities/tracker/#a-model-in-place-of-the-marker) with a model of its own.

## The model

Download [robot-vacuum.glb](/floor3d-card/models/robot-vacuum.glb) (about 115 KB): a round robot 35 cm wide, in metres as glTF wants, facing +X, with a dark bumper and a blue arrow at the front. Put it in the folder of the model of the house, in `/config/www`. Any other `.glb` works too; the robot is made by a [Python script](https://github.com/giosci1994/floor3d-card/blob/master/docs-site/scripts/robot_vacuum_glb.py) without libraries, to change its colours or its size.

## The position in Home Assistant

Many robot vacuums give the map of the house as a camera entity, with the position of the robot in an attribute: here `camera.robot_map` with `vacuum_position: {x: 1520, y: 3240, a: 90}`, in millimetres and degrees (the name of the attribute and its keys change with the integration: look at the attributes of your map in Developer tools › States). Three template sensors give the card the X, the Y and the direction:

```yaml
template:
  - sensor:
      - name: Robot x
        unique_id: robot_x
        unit_of_measurement: mm
        availability: "{{ state_attr('camera.robot_map', 'vacuum_position') is mapping }}"
        state: "{{ state_attr('camera.robot_map', 'vacuum_position').x }}"
      - name: Robot y
        unique_id: robot_y
        unit_of_measurement: mm
        availability: "{{ state_attr('camera.robot_map', 'vacuum_position') is mapping }}"
        state: "{{ state_attr('camera.robot_map', 'vacuum_position').y }}"
      - name: Robot heading
        unique_id: robot_heading
        unit_of_measurement: °
        availability: "{{ state_attr('camera.robot_map', 'vacuum_position') is mapping }}"
        state: "{{ state_attr('camera.robot_map', 'vacuum_position').a }}"
```

While the robot is docked, the card can hide it: the templates of X and Y can both say `0` then (a tracker at 0, 0 fades out), for example `{{ 0 if is_state('vacuum.robot', 'docked') else state_attr('camera.robot_map', 'vacuum_position').x }}`.

## The card

```yaml
- entity: sensor.robot_x
  type3d: tracker
  object_id: robot_vacuum
  tracker:
    sensor_y: sensor.robot_y
    sensor_heading: sensor.robot_heading
    unit: mm
    scale: 0.1 # from millimetres to a house in centimetres
    sensor_position: [-500, 0, -400] # where the 0, 0 of the map is in the model
    sensor_rotation: 0
    flip_y: true # the Y of many maps goes down the picture
    model: robot-vacuum.glb
    model_scale: 100 # the model is in metres, the house in centimetres
    color: '#29B6F6'
    size: 12
```

To place it, start the robot and look at where it goes on the model:

1. `sensor_position` moves the whole map: put the robot on its dock and move the point until it is where the dock is in the model.
2. If it goes the wrong way along an axis, `flip_x` or `flip_y`; if the map is turned compared with the model, `sensor_rotation` (in degrees).
3. The direction follows the same `flip_x`, `flip_y` and `sensor_rotation`. If the robot moves sideways or backwards, the angle of the map starts from another side: `model_rotation` turns the model (`90`, `180` or `-90`).

With `zone` the tracker writes a room over the robot: an entity whose state is the name of the room (the room the integration reports, or a template from the position).
