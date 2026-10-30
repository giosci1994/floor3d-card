---
title: Sky, weather and ground
description: A sky that follows the sun, with stars and the moon at night, the forecast, and a lawn under the house.
sidebar:
  order: 4
---

## Sky

`backgroundColor: sky` draws a sky behind the model that follows the elevation of the sun (`sun.sun`, or `sun_entity`): dark blue at night, orange at the horizon at sunrise and sunset, light blue by day. With a `weather` entity, clouds turn it grey. It is drawn behind the canvas, so it costs nothing to the GPU, and it changes nothing else: lights, colours and ground stay the same.

At night the sky gets its **stars**, which come out when the sun is 3° below the horizon, and the **moon**, from the sunset, with its phase of the day (lit on the right while it grows, on the other side south of the equator). Clouds hide the stars and dim the moon.

| Option | Default | |
| --- | --- | --- |
| `stars_show` | `yes` | `no` hides the stars. |
| `moon_show` | `yes` | `no` hides the moon. |
| `moon_size` | `30` | The width of the moon, in pixels. |
| `sky_clouds` | `yes` | `no`: the sky ignores the clouds of the weather entity, and stars and moon always show. |

The `sky: yes` of the original card is ignored: it changed the lights and the colours of the model.

## Weather

`weather` puts a box in a corner with the weather now and the next forecasts, in the language of the card. A tap opens the entity.

| Option | Default | |
| --- | --- | --- |
| `weather_position` | `bottom-left` | `bottom-left`, `bottom-right`, `top-left` or `top-right`. |
| `weather_forecast` | `daily` | `daily`, `hourly` or `twice_daily`; if the entity doesn't have it, the one it has. |
| `weather_count` | `4` | The forecasts shown; `0` for the weather now only. |
| `weather_show` | `yes` | `no` hides the box and keeps its settings. |

```yaml
backgroundColor: sky
ground: grass
weather: weather.home
weather_forecast: hourly
```

![The sky by day and at sunset, with the forecast box](../../../assets/images/sky-weather.jpg)

## Ground

`ground` lays a surface under the house: `grass` for a lawn, or a colour (`'#806040'`). It is two and a half times as wide as the house and fades into the background at its edge, so that the sky still shows around it. With `shadow: yes` it takes the shadows of the sun. It isn't part of the model: taps go through it, and it doesn't lower the number of shadows the lamps can have. A model with a ground of its own keeps it.

`ground_floor_level` raises the ground above the bottom of the model, in its units (centimetres for Sweet Home 3D): for a house with a basement, the height of the basement (for example `270`), so that the ground is at the floor of the ground floor. When only the levels under the ground are shown, it opens over them, with sides of earth, so that the basement can be seen from above.

![The lawn of the card under the house, with the shadow of the sun](../../../assets/images/ground.jpg)
