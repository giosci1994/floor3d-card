---
title: Wall tablets
description: Kiosk mode without menus, a tour of the views, and a lighter quality for weak tablets.
sidebar:
  order: 10
---

A tablet on a wall shows the house all day, often on a weak device. Since 2.13.4 the card has a kiosk mode and a quality profile for it, in the *Wall tablet* and *Rendering* sections of the editor.

```yaml
kiosk: yes
kiosk_tour: 20 # seconds of each view
kiosk_idle: 60 # seconds after a touch
quality: auto
```

## Kiosk mode

`kiosk: yes` hides the header of the card and all its menus and buttons: the views menu (or its buttons), the levels, the Map menu and the button of the cameras. The boxes, the markers and the icons of the cameras stay, and a tap on an object still runs its action.

| Option | Default | |
| --- | --- | --- |
| `kiosk` | `no` | `yes`: no header, menus or buttons. |
| `kiosk_tour` | none | Every so many seconds the camera flies to the next view: the initial view, then each [view](/floor3d-card/features/views/#views) (`zoom_areas`) with its level, then the initial view again. |
| `kiosk_idle` | `60` | Seconds after the last touch before the tour goes on from the initial view. Without a tour, the camera goes back to the initial view. `0`: never. |

A touch on the card (the model, a box, a marker) stops the tour, so that the camera doesn't fly away while someone looks around. With [`alarm_view: yes`](/floor3d-card/features/alarms/) the camera stays on the room of an alarm while it is on, and the tour goes on after. The tour doesn't run in the preview of the card editor, where the camera is where the editor puts it.

The card hides only its own menus: the header and the sidebar of Home Assistant are hidden by a [panel view](https://www.home-assistant.io/dashboards/panel/) with an integration such as *kiosk-mode* from HACS, or by the browser of the tablet (Fully Kiosk Browser, for example).

## Quality

The card draws the model as sharp as the screen allows and with all the shadows the GPU takes. A weak tablet then turns the model slowly and gets warm. `quality: low` asks less of it:

- the canvas at 1 pixel per pixel of the screen, instead of up to 2 (`max_pixel_ratio` wins when set);
- at most 4 lamps casting a shadow at once, plus the sun (`max_shadows` wins when set): the first 4 lamps in the order of the entities, or with `extralightmode: yes` 4 of the lamps that are on;
- a smaller shadow map for the sun: a quarter of the memory, with softer edges.

`quality: auto` is low on a device that looks weak: 2 GB of memory or less (Chrome and the Android browsers tell it, Safari doesn't), 2 cores or fewer, or a touch screen with 4 cores or fewer. Elsewhere it is high, so the same dashboard is sharp on a computer and light on the tablet.

| Option | Default | |
| --- | --- | --- |
| `quality` | `high` | `low` or `auto`. |
| `max_shadows` | as many as the GPU takes | Lamps casting a shadow at once, the sun aside. With any quality. |
| `max_pixel_ratio` | `2`, `1` with quality low | The highest resolution, in pixels per CSS pixel. |

Other options that help a weak tablet: `shadow: no` (no shadows at all), `log_depth: no` (the default), and `extralightmode: yes`, so that only the lamps that are on cast a shadow.
