---
title: Room label and colour
description: type3d room, a coloured box over a floor, with a label.
sidebar:
  order: 6
---

A translucent box rises from a floor of the model, in a colour and with a label of the state. The object is the floor of a room; a room that is not a rectangle gets a box anyway.

```yaml
- entity: sensor.bedroom_temperature
  type3d: room
  object_id: room_1_101
  room:
    elevation: 250
    transparency: 50
    color: '#3399ff'
    label: 'yes'
  colorcondition:
    - state: 'on'
      color: red
```

| Option | Default | |
| --- | --- | --- |
| `elevation` | `250` | The height of the box, in cm. |
| `transparency` | `50` | In %. |
| `color` | | The colour of the box; `colorcondition` gives one for each state, as [colour by state](/floor3d-card/entities/color/). |
| `label` | `no` | `yes`: a label with the state over the room. |
| `label_text` | `state` | `template`: the label writes the result of `entity_template`. |
| `attribute` | none | An attribute to write instead of the state. |
| `width`, `height` | `150`, `75` | The size of the label, in the units of the model. |
| `span`, `font`, `textfgcolor`, `textbgcolor` | | The text of the label, as for [text](/floor3d-card/entities/text/). |

![Rooms highlighted with the temperature as label](../../../assets/images/room.jpg)

For rooms coloured by temperature, presence or any sensor, with a legend and a menu to switch between them, the `rooms` option of the card does more with less configuration.
