---
title: What the editor writes
description: The short YAML the editor writes, and what the card accepts in YAML written by hand.
sidebar:
  order: 3
---

The editor writes only what the card needs:

- no empty rows: a new entity, object group or zoom area goes into the YAML once something is filled in (the editor keeps showing it meanwhile);
- no empty options blocks (`camera: {}`) and no empty values;
- no switch left at its default value (`header: 'yes'`, `click: 'no'`, `shadow: 'no'` and so on), nor the overlay size and colours when they are the default ones (33 %, 20 %, transparent, black);
- numbers without quotes (`lumens: 700`, not `lumens: '700'`);
- the objects of a group as plain ids.

```yaml
object_groups:
  - object_group: Kitchen light
    objects:
      - Sphere_104_101
      - Sphere_104_102
```

## YAML written by hand

The card also accepts:

- `true`/`false` in place of `'yes'`/`'no'` for the switches (the top-level ones, `light.shadow`, `image.lighting_shadow`, `room.label`, `tracker.label`);
- the objects of a group as plain ids (above) or as `- object_id: ...`, as the original card;
- a type without its options block when no option is needed (`type3d: light` without `light:`).

Existing configurations keep working as they are, and the editor rewrites them in the short form only when something is changed.

:::note
In YAML-mode dashboards (`ui-lovelace.yaml`) Home Assistant reads an unquoted `yes`/`no` as `true`/`false`, which the original card ignored (`shadow: yes` gave no shadows, `header: no` kept the header). This card applies them.

A configuration saved by this editor needs this card: the original card doesn't read the objects of a group as plain ids.
:::
