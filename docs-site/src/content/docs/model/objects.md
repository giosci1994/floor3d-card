---
title: Objects and groups
description: How an entity names the objects of the model it moves, lights or colours.
sidebar:
  order: 4
---

Each entity of the card names its objects in `object_id`. It can be:

- the name of an object of the model: `object_id: sweethome3d_window_pane_on_hinge_1_50`;
- a name with `*`, for all the objects whose name matches: `object_id: Lamp_*`;
- an object group between `<` and `>`: `object_id: <kitchen light>`.

## Names with `*`

`*` stands for any text. With `object_id: Lamp_*` a light entity gets a light in every object whose name starts with `Lamp_`, and a colour entity colours all of them. It saves updating a group by hand when Sweet Home 3D numbers the objects again after a change to the model. It works in object groups too.

The editor says how many objects match (`Lamp_* (4 objects)`), warns when none does, and outlines them in the preview. The types that use a single object (text, room label, info box, TV screen, tracker) take a plain name. The idea comes from [anasmadrhar/floor3d-card](https://github.com/anasmadrhar/floor3d-card).

## Object groups

An object group gives a name to several objects, treated as one: a lamp made of a base and a bulb, a chandelier, a mannequin of a hundred pieces.

```yaml
entities:
  - entity: light.kitchen
    type3d: light
    object_id: <kitchen light>
    light:
      lumens: 900
object_groups:
  - object_group: kitchen light
    objects:
      - Sphere_104_101
      - Sphere_104_102
```

In the editor, the objects of a group are picked with a tap each in the preview: see [The preview](/floor3d-card/editor/preview/#pick-in-the-preview). A light entity on a group gets one light in each of its objects; `light.single` gives the whole lamp one light, with fewer shadows.

`selectionMode: yes` adds a button to the card: while it is on, each tap colours an object blue (a second tap takes it back) and the browser console lists the names of the objects picked, to build a group without the editor.
