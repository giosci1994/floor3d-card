---
title: Door or window
description: type3d door, a door or a window that swings or slides open.
sidebar:
  order: 8
---

A door or a window opens while its entity is `on`, `open` or `opening` (a contact sensor, a garage door), and closes again.

```yaml
- entity: binary_sensor.dining_window_left
  type3d: door
  object_id: <WindowDiningRoomLeft>
  door:
    doortype: swing
    direction: inner
    degrees: 50
    hinge: WindowDiningRoomLeft_4
```

| Option | Default | |
| --- | --- | --- |
| `doortype` | `swing` | `swing`: it turns on its hinge; `slide`: it slides. |
| `side` | | `left`, `right`, `up` or `down`: the edge it turns around, or the way it slides. |
| `direction` | | `inner` or `outer`: the way it turns. |
| `degrees` | `90` | How far a swing door opens. |
| `percentage` | `100` | How far a sliding door opens, in % of its width. |
| `hinge` | | The object of the hinge: the door turns around it. |
| `pane` | | The object of the pane, the main part of the door. |

The moving parts of a door are usually several objects: list them in an [object group](/floor3d-card/model/objects/#object-groups) and name the hinge or the pane among them.

- **Swing, with `hinge`**: the door turns around the hinge, and `direction` and `degrees` are enough; the side comes from the hinge.
- **Swing, with `pane`** (or neither: the first object of the group is the pane): `side`, `direction` and `degrees`.
- **Slide**: `side`, `direction` and `percentage`; the pane is `pane`, or the first object.

With `state_colors: yes` the open doors and windows also light up in amber, and turn red with the alarm armed.

## Example

A double French window exported with ExportToHASS:

![The parts of a French window exported with ExportToHASS](../../../assets/images/door-parts.jpg)

```yaml
object_groups:
  - object_group: WindowDiningRoomLeft
    objects:
      - WindowDiningRoomLeft_7
      - WindowDiningRoomLeft_6
      - WindowDiningRoomLeft_5
```

With the entity above:

| ![Closed (off)](../../../assets/images/door-closed.jpg) | ![Open (on): the pane turns 50° on its hinge](../../../assets/images/door-open.jpg) |
| :---: | :---: |
| Closed (off) | Open (on): the pane turns 50° on its hinge |
