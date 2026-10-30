---
title: Entities
description: How an entity of Home Assistant is bound to objects of the model, and what a tap on them does.
sidebar:
  order: 1
---

Each entity of the card binds an entity of Home Assistant to objects of the model. Its type (`type3d`) says what the objects do with the state: a lamp lights up, a door opens, a floor takes a colour.

```yaml
entities:
  - entity: light.kitchen
    type3d: light
    object_id: Kitchen_lamp
    light:
      lumens: 900
```

| Field | Default | |
| --- | --- | --- |
| `entity` | required | The entity of Home Assistant. |
| `type3d` | required | The type: see the list below. |
| `object_id` | required | The object, a name with `*` or an `<object group>`: see [Objects and groups](/floor3d-card/model/objects/). |
| `action` | `default` | What a tap does: `default` (the action of the type), `more-info` (the details of the entity), `overlay` (its name and state in the overlay panel). |
| `long_press_action` | `more-info` with `click: yes` | What a long press does: the same choices. |
| `entity_template` | none | A template that changes the state the card reads (below). |

The options of a type go in a block with its name: `light:` for a light, `door:` for a door. A type without options needs no block.

## The types

| Type | In the editor | What the objects do |
| --- | --- | --- |
| [`light`](/floor3d-card/entities/light/) | Light | A light in the colour and brightness of the entity |
| [`color`](/floor3d-card/entities/color/) | Colour by state | A colour for each state |
| [`hide`, `show`](/floor3d-card/entities/hide-show/) | Hidden / Shown in a state | Hidden or shown in one state |
| [`text`](/floor3d-card/entities/text/) | Text | The state written on the object |
| [`room`](/floor3d-card/entities/room/) | Room label and colour | A coloured box over a floor, with a label |
| [`info`](/floor3d-card/entities/info/) | Info box | A box with a text floating over the object |
| [`door`](/floor3d-card/entities/door/) | Door or window | Swings or slides open |
| [`cover`](/floor3d-card/entities/cover/) | Cover (roller shutter) | Slides, rolls up or turns its slats |
| [`rotate`](/floor3d-card/entities/rotate/) | Rotating object (fan) | Turns, at a speed or to an angle |
| [`gesture`](/floor3d-card/entities/gesture/) | Service on tap | A tap calls a service |
| [`camera`](/floor3d-card/entities/camera/) | Camera | A tap opens the camera |
| [`image`](/floor3d-card/entities/image/) | Picture (TV screen) | The picture of the entity, which lights the room |
| [`shower`](/floor3d-card/entities/shower/) | Shower | Falling water while on |
| [`tracker`](/floor3d-card/entities/tracker/) | Person tracker | The people a presence radar sees |
| [`climate`](/floor3d-card/entities/climate/) | Heating or cooling | Glows while it heats or cools |
| [`alarm`](/floor3d-card/entities/alarm/) | Alarm (smoke, water…) | Blinks while the alarm is on |

## Taps

By default a **double click** on an object runs the action of its type: a light toggles, a gesture calls its service, a camera, a thermostat or an alarm opens its details. With **`click: yes`** a single tap does it, on phones too, and a **long press** opens the details of the entity (or runs `long_press_action`). Dragging, turning or pinching the model doesn't run anything, and the Home Assistant app vibrates.

With **`overlay: yes`** the card has a panel over the model, and the entities with `action: overlay` write their name and state in it when tapped. Its place, size and colours are `overlay_alignment`, `overlay_width`, `overlay_height`, `overlay_bgcolor`, `overlay_fgcolor`, `overlay_font` and `overlay_fontsize`.

```yaml
click: 'yes'
overlay: 'yes'
entities:
  - entity: sensor.kitchen_temperature
    type3d: color
    object_id: Kitchen_floor
    action: overlay
```

## Templates

`entity_template` is JavaScript between `[[[` and `]]]`, run in the browser at every change of the entity: what it returns is the state the card uses. `$entity` is the state of the entity, a number when the state is numeric.

```yaml
- entity: sensor.temperature
  type3d: color
  object_id: Radiator
  entity_template: '[[[ if ($entity > 25) { "hot" } else { "cool" } ]]]'
  colorcondition:
    - state: hot
      color: red
```

Above 25, the state is `hot` and the radiator is red.
