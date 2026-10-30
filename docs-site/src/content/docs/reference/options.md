---
title: Options of the card
description: Every option of the card, in the order of the sections of the editor, with its default.
sidebar:
  order: 1
---

The options at the top level of the card, grouped as in the sections of the editor. The switches take `yes` or `no` (`true` and `false` too). An option left out has its default, and the editor doesn't write it. The options of each entity are on the page of its [type](/floor3d-card/entities/overview/).

## 3D model

| Option | Default | |
| --- | --- | --- |
| `type` | required | `custom:floor3d-card` |
| `name` | | The name in the header of the card. |
| `header` | `yes` | Show the header. |
| `language` | `auto` | `en`, `it`, `de` or `nb`; `auto`: the language of the user. See [Languages](/floor3d-card/features/languages/). |
| `path` | required | The folder of the model, for example `/local/floor3d/`. |
| `objfile` | required | The model: `.obj` or `.glb`. |
| `mtlfile` | | The materials of an `.obj`. |
| `objectlist` | | A JSON file whose keys are the names of the objects, for the menus of the editor. |
| `backgroundColor` | `#aaaaaa` | A colour, `transparent`, or `sky`: a sky that follows the sun. |
| `style` | | CSS for the canvas of the card. |
| `stars_show`, `moon_show` | `yes` | Stars and moon in the sky at night. |
| `moon_size` | `30` | The width of the moon, in pixels. |
| `sky_clouds` | `yes` | `no`: the sky ignores the clouds of the weather. |
| `ground` | none | `grass`, or a colour: a surface under the house. |
| `ground_floor_level` | `0` | How much higher than the bottom of the model the ground is. |
| `walls` | `none` | `fade` or `low`: the walls in the way. See [Walls](/floor3d-card/features/walls/). |
| `walls_objects` | `wall_*` | The objects that are walls. |
| `walls_opacity` | `0.15` | How much of a faded wall shows. |
| `walls_height` | `100` | The height of the cut, in cm. |

See [Sky, weather and ground](/floor3d-card/features/sky/).

## Camera and navigation

| Option | Default | |
| --- | --- | --- |
| `camera_position`, `camera_target`, `camera_rotate` | from above a corner | The initial view: `{x, y, z}`. See [The camera and views](/floor3d-card/features/views/). |
| `lock_camera` | `no` | Stops the zoom and the rotation. |
| `zoom_areas` | | The views of the Views menu. |
| `hideZoomMenu` | `no` | Buttons instead of the Views menu. |
| `hideLevelsMenu` | `no` | Hides the buttons of the levels. |
| `hideMapMenu` | `no` | Hides the Map menu and its legend. |
| `initialLevel` | all the levels | The level shown when the card opens. |
| `url_parameters` | | `zoom`: the parameter of the page address that picks a view. |
| `north` | `{x: 0, z: -1}` | Where north points in the model: it orients the sun. |

## Light and shadows

| Option | Default | |
| --- | --- | --- |
| `globalLightPower` | `0.2` | The light that follows the camera: a number or a numeric sensor. |
| `light_power` | `1` | Multiplies all the lamps. |
| `exposure` | `1` | The overall exposure. |
| `tone_mapping` | `neutral` | `neutral`, `agx`, `aces` or `linear`. |
| `shadow` | `no` | The lamps and the sun can cast shadows. |
| `extralightmode` | `no` | Only the lights that are on take a shadow. |
| `sky_power` | `0` | The light of the sky: a number or a numeric sensor. |
| `sky_color` | `#e6eeff` | The sky light from above. |
| `ground_color` | `#706458` | The sky light from below. |
| `sun` | `no` | The sunlight of the sun entity. |
| `sun_entity` | `sun.sun` | The sun entity. |
| `sun_power` | `1` | Multiplies the sunlight: a number or a numeric sensor. |
| `sun_shadow` | `yes` | `no`: the sun casts no shadow. |
| `sun_roof` | | The indoor floors, under an invisible roof for the sun. |

See [Light, sun and sky](/floor3d-card/features/light/).

## Boxes

Each box has `*_position` (`top-left`, `top-right`, `bottom-left` or `bottom-right`) and `*_show`. See [Boxes](/floor3d-card/features/boxes/) and [Weather](/floor3d-card/features/sky/#weather).

| Option | Default | |
| --- | --- | --- |
| `weather` | | A weather entity: the forecast box. |
| `weather_forecast` | `daily` | `daily`, `hourly` or `twice_daily`. |
| `weather_count` | `4` | The forecasts shown. |
| `weather_position`, `weather_show` | `bottom-left`, `yes` | |
| `status_show` | `no` | The box of what is on or open. |
| `status_position` | `top-left` | |
| `energy_power`, `energy_solar`, `energy_grid`, `energy_battery` | | The sensors of the energy box. |
| `energy_plugs` | the power sensors of the rooms | The plugs to rank. |
| `energy_top` | `3` | The plugs shown. |
| `energy_position`, `energy_show` | `bottom-left`, `yes` | |
| `people` | | The people of the house, with an optional `room` entity. |
| `people_position`, `people_show` | `top-left`, `yes` | |
| `alarm_panel` | | An `alarm_control_panel`. |
| `alarm_panel_position`, `alarm_panel_show` | `top-right`, `yes` | |
| `chips` | | Any entities, with `name` and `icon`. |
| `chips_position`, `chips_show` | `bottom-right`, `yes` | |

## Cameras of the house

| Option | Default | |
| --- | --- | --- |
| `cameras` | | The cameras: `entity`, `position`, `level`, `name`, `icon`, `popup_on`. |
| `cameras_show` | `yes` | The icons of the cameras on the model. |
| `cameras_button` | `yes` | The button that hides the icons. |
| `camera_popup_show` | `yes` | The pictures that pop up. |
| `camera_popup_position` | `bottom-right` | |
| `camera_popup_duration` | `20` | Seconds the picture stays. |

See [Cameras of the house](/floor3d-card/features/cameras/).

## Interaction

| Option | Default | |
| --- | --- | --- |
| `click` | `no` | A tap runs the action of an object; off, a double click does. |
| `editModeNotifications` | `yes` | In a dashboard in edit mode, a double click shows the name of an object or the camera. |
| `selectionMode` | `no` | A button to pick objects and list their names, to build groups. |
| `show_axes` | `no` | Shows the axes of the scene. |
| `overlay` | `no` | A panel over the model for `action: overlay`. |
| `overlay_alignment` | `top-left` | `top-left`, `top-right`, `bottom-left` or `bottom-right`. |
| `overlay_width`, `overlay_height` | `33`, `20` | In % of the card. |
| `overlay_bgcolor`, `overlay_fgcolor` | `transparent`, `black` | |
| `overlay_font`, `overlay_fontsize` | | |

See [Taps](/floor3d-card/entities/overview/#taps).

## State colours and room maps

| Option | Default | |
| --- | --- | --- |
| `state_colors` | `no` | Open doors and windows light up. |
| `open_color` | `#ffb020` | Their colour. |
| `alarm_entity` | | An alarm panel: armed, the open doors turn red. |
| `alarm_color` | `#ff3b30` | Their colour then. |
| `rooms` | | The rooms, their floors and their sensors. |
| `maps` | | The colours of the maps, and new maps. |
| `room_colors` | `none` | The map when the card opens. |
| `presence_color` | `#34d399` | The colour of presence. |
| `temperature_min`, `temperature_max` | `17`, `27` | Blue and red of the temperature map. |
| `illuminance_min`, `illuminance_max` | `5`, `1000` | Dark blue and yellow of the illuminance map. |
| `alarm_view` | `no` | The camera goes to the room of an alarm. |

See [Room colours and maps](/floor3d-card/features/rooms/) and [Alarms](/floor3d-card/features/alarms/).

## Rendering

| Option | Default | |
| --- | --- | --- |
| `max_pixel_ratio` | `2` | The highest resolution, in pixels per CSS pixel. |
| `log_depth` | `no` | The logarithmic depth buffer (expensive on phones). |
| `reversed_depth` | `yes` | The reversed depth buffer, where the browser has it. |
| `draco_decoder_path` | the one of the card | Another folder with the Draco decoder. |

## Entities, groups and views

| Option | |
| --- | --- |
| `entities` | The entities bound to objects: see [Entity types](/floor3d-card/entities/overview/). |
| `object_groups` | Names for groups of objects: see [Objects and groups](/floor3d-card/model/objects/). |
| `zoom_areas` | The views: see [The camera and views](/floor3d-card/features/views/#views). |
