---
title: Modelling your home
description: Model your home in Sweet Home 3D and export it for the card.
sidebar:
  order: 1
---

The card shows a 3D model of your home made with a 3D modelling program. It was made and tested with [Sweet Home 3D](http://www.sweethome3d.com/), free and easy to learn, and these pages assume you use it.

## Model the home

Draw the walls, floors, doors, windows, lamps and furniture you want to see in the card. Each object of the model can then be bound to an entity of Home Assistant: a lamp lights up with its light entity, a door opens with its sensor, a room takes the colour of its thermostat.

- Place the upper left corner of the 2D plan at the coordinates 0, 0.
- The card moves and colours whole objects: a door, a lamp or a cover that must follow an entity is an object of its own. An object made of several pieces (a chandelier, a mannequin) becomes one with an [object group](/floor3d-card/model/objects/#object-groups).
- To take an object away, make it invisible rather than deleting it: deleting renumbers the objects (see below).

## Export

Export with *3D view › Export to OBJ format…* into a folder of its own: the export is several files, the model (`.obj`), its materials (`.mtl`) and the pictures of the textures. Copy all of them into a folder of `/config/www` in Home Assistant, for example `/config/www/floor3d/`. For the card that folder is `/local/floor3d/`.

The *3D model* section of the editor takes the folder (`path`), the model (`objfile`) and the materials (`mtlfile`):

```yaml
type: custom:floor3d-card
path: /local/floor3d/
objfile: home.obj
mtlfile: home.mtl
```

A GLB file loads faster and is a single file: see [GLB and compressed models](/floor3d-card/model/glb/).

## The names of the objects

The entities find their objects by name. Sweet Home 3D names the objects of the export by their kind and a number (`wall_9_64`, `sweethome3d_window_pane_on_hinge_1_50`). The numbers change when objects are deleted and the model is exported again, and then the entities must be bound again to the new names. The [walls](/floor3d-card/features/walls/) are always `wall_…`, whatever the language of Sweet Home 3D.

The [ExportToHASS](https://github.com/adizanni/ExportToHASS) plugin for Sweet Home 3D, by the author of the original card, exports the levels of the model (see [Levels](/floor3d-card/model/levels/)) and names that stay the same. [Download the plugin](https://github.com/adizanni/ExportToHASS/releases/latest/download/ExportToHASSPlugin.sh3p) and follow its instructions.

To find the name of an object:

- in the editor, **Pick in the preview**: a tap on the object fills the field (see [The preview](/floor3d-card/editor/preview/));
- in the object menus of the editor, which list all the objects of the model, with a search;
- in the dashboard in edit mode, a double click on the object shows its name (`editModeNotifications`, on by default; a single tap with `click: yes`). The name is also written in the browser console.

`objectlist` can name a JSON file in the folder of the model whose keys are the names of the objects: the object menus of the editor list them too.
