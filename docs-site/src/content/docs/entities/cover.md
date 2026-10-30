---
title: Cover
description: type3d cover, roller shutters, shades, curtains and venetian blinds that follow the position and the tilt.
sidebar:
  order: 9
---

A cover follows the position of its entity (`current_position`, from 0 closed to 100 open): a roller shutter slides into its box, a roller shade rolls up, a curtain gathers to one side. A venetian blind also turns its slats with `current_tilt_position`.

```yaml
- entity: cover.living_room
  type3d: cover
  object_id: <living_shutter> # the slats and the bottom bar
  cover:
    pane: Living_shutter_slats
    side: up
```

| Option | Default | |
| --- | --- | --- |
| `pane` | | The object that goes away when the cover is open. |
| `side` | | `up`, `down`, `left` or `right`: the way it opens. |
| `motion` | `slide` | `slide`, `shrink` or `none` (below). |
| `slats` | none | The object with the slats of a venetian blind. |
| `tilt_closed` | `80` | The angle of the slats at tilt 0, in degrees from the model. |
| `tilt_open` | `0` | The angle of the slats at tilt 100. |

| ![Closed (current_position: 0)](../../../assets/images/cover-closed.jpg) | ![Open at 45% (current_position: 45)](../../../assets/images/cover-half.jpg) |
| :---: | :---: |
| Closed (current_position: 0) | Open at 45% (current_position: 45) |

## Motion

- `slide`: the pane slides toward `side`, and a plane hides what goes past the edge, into the box of the shutter.
- `shrink`: the pane gets shorter toward its side instead, as a roller shade rolls up or a curtain gathers to one side. No plane cuts the model, and the other objects of the cover (the bottom bar of a shade) follow the edge.
- `none`: the pane stays where it is and only the slats turn.

## Venetian blinds

`slats` names the object with the slats. They turn with `current_tilt_position`, each on its long side. They can be in one object with the rails and the cords, as Sweet Home 3D exports a blind: the card turns the pieces that are long and equal, at least three of them, and leaves the rest as it is. `tilt_closed` and `tilt_open` are the angles from the model at tilt 0 and at tilt 100, for slats drawn open; for a blind whose slats are horizontal at 50, `tilt_closed: -80` and `tilt_open: 80`.

```yaml
- entity: cover.living_room_shade
  type3d: cover
  object_id: Shade_* # the fabric and its bottom bar
  cover:
    pane: Shade_fabric
    side: up
    motion: shrink
- entity: cover.office_blind
  type3d: cover
  object_id: Blind_office
  cover:
    side: up
    slats: Blind_office # the same object: slats, rails and cords
```

![A roller shade that shortens and a venetian blind: open, at 50 % and closed](../../../assets/images/covers.jpg)
