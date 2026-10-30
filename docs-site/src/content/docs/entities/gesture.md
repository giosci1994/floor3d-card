---
title: Service on tap
description: type3d gesture, a tap on an object calls a service.
sidebar:
  order: 11
---

A double click on the objects (a tap with `click: yes`) calls a service of Home Assistant with the entity as its target: `domain.service` with `entity_id`.

```yaml
- entity: script.good_night
  type3d: gesture
  object_id: Bed
  gesture:
    domain: script
    service: turn_on
```
