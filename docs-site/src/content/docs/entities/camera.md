---
title: Camera
description: type3d camera, a tap on an object opens the camera.
sidebar:
  order: 12
---

A double click on the object (a tap with `click: yes`) opens the camera with its picture and its live. The type has no options.

```yaml
- entity: camera.front_door
  type3d: camera
  object_id: Front_door_camera
```

The `cameras` option of the card does more for the cameras of the house: an icon over the point of the model where each camera is, which opens it, and its picture that pops up in a corner when the doorbell rings or a sensor sees motion.
