# floor3d-card mod

![floor3d-card mod](docs/images/banner.png)

A fork of [adizanni/floor3d-card](https://github.com/adizanni/floor3d-card) (MIT licence, © adizanni) based on version 1.5.3, with updated libraries, bug fixes and new features. All the options of the original card still work and are documented in [README.md](README.md). This page covers only what is different.

## Installation

The floor3d-card in the HACS default repository is the original one. To use this fork, install it by hand:

1. Copy **all** the `dist/*.js` files into a new folder of `config/www` named after the version, for example `config/www/floor3d-card-mod/v20260930b/`. There are two files: the card and its editor, which is loaded only when you edit the card.
2. Add `/local/floor3d-card-mod/v20260930b/floor3d-card.js` as a resource of type **module** (Settings › Dashboards › Resources). If the original card is installed too, remove it first: both define `custom:floor3d-card`.
3. Reload the browser or the app. The version is shown at the top of the card editor and in the browser console.

Use a **new folder for every version** instead of a `?v=` query on the resource. The card imports its editor as `./floor3d-card-editor-<hash>.js`, and with a `?v=` the browser would load the card twice (as two different modules). Home Assistant serves `/local` with a 31-day cache, and so may a proxy in front of it: a new folder is a new address. The folders of older versions can be deleted afterwards.

## Building

```bash
npx --yes yarn@1.22.22 install --frozen-lockfile
npm run build        # = rollup -c rollup.config.mjs
npm start            # rebuilds on every change and serves dist/ on port 5000
```

Change `CARD_VERSION` in `src/const.ts` at every modification: the date, plus the next letter for another build on the same day (`v1.5.3-mod 2026-09-28c`). Deploy into a folder with the same name (`v20260928c`).

- **Tooling.** Rollup 4 with the official `@rollup/plugin-*` packages, TypeScript 5.9 (target ES2021), Lit 3, custom-card-helpers 2 and the types of home-assistant-js-websocket 9. Babel is gone: without a configuration it did nothing. `.yarnrc` skips the `engines` check because custom-card-helpers 2 asks for Node ≥ 24 for its own development tools, while its code ends up in the browser bundle. three.js went from 0.130 to 0.186; tween.js stays at 18.
- **Lit 2 kept for the Material components.** The editor uses `@material/mwc-*` 0.27 components, written for Lit 2; on Lit 3 some of them break (for example `mwc-formfield` with the old signature of `@queryAssignedNodes`). The `litForMaterial` plugin in `rollup.config.mjs` makes all of `@material/*` use a single Lit 2 copy (the `lit2` alias in `package.json`), while the card uses Lit 3. Alias and plugin can go once the Material components are replaced.
- **Editor loaded separately.** The card no longer imports the editor at startup: `getConfigElement()` loads it when the card is edited. Devices that only show the card download about 810 KB instead of 1.15 MB.
- **Components Home Assistant no longer provides.** Recent Home Assistant versions don't define `mwc-menu` anymore, so the drop-down menus of the editor didn't open. `elements/menu.ts` defines `mwc-menu`, `mwc-menu-surface`, `mwc-list` and `mwc-list-item` only when they are missing. The card also reads `isPanel` and `editMode` directly from Home Assistant (2024+), and falls back to the page structure on older versions.

## New features

- **Animated shower** (`type3d: shower`): particles falling while the entity is `on`. Options under `shower:`: `count`, `velocity`, `size`, `color`, `width`, `height`. The animation speed doesn't depend on the frame rate.
- **Person trackers** (`type3d: tracker`) for presence radars that report target coordinates, such as the HLK-LD2450. See [Trackers](#trackers).
- **TV screen** (`type3d: image`): shows the `entity_picture` of a media player and lights the room with the average colour of the picture. Options under `image:`: `rotate`, `mirror`, `lumens`, `lighting_lumens`, `lighting_direction`, `lighting_off_state`, `lighting_distance`, `lighting_shadow: no`. The light is off with `off`, `standby`, `unavailable` and `unknown`.
- **Info boxes** (`type3d: info`), a **zoom menu** (`hideZoomMenu`) and zoom areas defined by camera position, target and rotation.
- **Pause while hidden**: nothing is rendered while the card is not visible (IntersectionObserver).
- **Version label** at the top of the card editor and in the console banner.
- The sky (`sky`) and the ambient light are removed on purpose, so that they don't affect the render. The light that follows the camera (torch) is always on.

| ![TV screen (type3d: image): the picture of the media player lights the room](docs/images/tv.jpg) | ![Animated shower (type3d: shower)](docs/images/shower.jpg) |
| :---: | :---: |
| TV screen (`type3d: image`): the picture of the media player lights the room | Animated shower (`type3d: shower`) |

### Light and colours

With three.js 0.186 colours are handled in sRGB, light is computed in linear space and lights use physical units (the model is in centimetres). Intensities are recalibrated to stay close to version 0.130 at room distances, and tone mapping (Neutral) avoids burnt-out areas.

| ![sun: yes in the morning (sun.sun azimuth 105°)](docs/images/sun-morning.jpg) | ![The same model in the afternoon (azimuth 250°)](docs/images/sun-afternoon.jpg) |
| :---: | :---: |
| `sun: yes` in the morning (sun.sun azimuth 105°) | The same model in the afternoon (azimuth 250°) |

| Option | Default | What it does |
|---|---|---|
| `exposure` | `1` | Overall exposure |
| `tone_mapping` | `neutral` | `neutral`, `agx`, `aces` or `linear` |
| `light_power` | `1` | Multiplies the intensity of all the lamps (and of the TV light) |
| `globalLightPower` | `0.2` | Light that follows the camera (torch), as before |
| `sun` | `no` | `yes`: sunlight from `sun.sun` (azimuth and elevation), with shadows |
| `sun_entity` | `sun.sun` | Sun entity |
| `sun_power` | `1` | Multiplies the sunlight |
| `sun_roof` | none | List of the indoor floors: above them, at wall height, an invisible roof casts shadows for the sun only. The sun comes in through windows and doors, not from above; lamps and camera don't see the roof |
| `north` | `{x: 0, z: -1}` | Where north points in the model: orients the sun |
| `max_pixel_ratio` | `2` | Maximum resolution relative to CSS pixels (phones reach 3× or more) |
| `log_depth` | `no` | `yes` turns the logarithmic depth buffer back on (expensive on phones) |
| `reversed_depth` | `yes` | Reversed depth buffer where `EXT_clip_control` is available |

### Shadows

Shadows are redrawn only when needed, and only for the lights that are on. While a door moves they are redrawn at most every 300 ms, plus once when it stops; before, it was every frame and for every light. Each light with shadows takes a GPU texture unit (16 on phones): beyond the limit the last lights get no shadow, and the sun comes first. `shadow: no` on a light excludes it.

![Evening: lamps on, each with its own shadows](docs/images/evening.jpg)

### Trackers

```yaml
- entity: sensor.radar_target_1_x
  type3d: tracker
  object_id: person_tracker_1
  tracker:
    sensor_y: sensor.radar_target_1_y
    unit: m
    flip_x: true
    zone: sensor.radar_target_1_zone
    sensor_position: [-400, 0, 450]
    sensor_rotation: -135
    scale: 0.1
    color: '#FF5500'
```

The X coordinate comes from `sensor_x`, from an `x` attribute of the entity, or from the entity state; Y from `sensor_y` or from a `y` attribute. The position of the sensor is set with `sensor_position` (`[x, y, z]` in the model), `sensor_rotation` (degrees) and `scale`; in the editor these are in the Tracker panel, while the type is chosen in YAML.

- `unit`: `mm` (default), `cm` or `m`;
- `flip_x` / `flip_y`: mirror an axis;
- `zone`: entity of the zone, shown above the head; `label: no` hides it;
- `color`, `size`, `height`: look of the marker.

Sensors that publish metres with the X axis already mirrored need `unit: m` and `flip_x: true`. Markers glide to the new position (about 0.25 s) and fade out when the target is lost. When only trackers or the shower are moving, rendering is limited to 30 frames per second.

![Two people tracked, with the name of their zone above the head](docs/images/trackers.jpg)

### Tap and long press

With `click: yes`, a tap runs the action of the object: lights toggle. A long press opens the entity details (or runs `long_press_action`). Dragging, rotating or pinching doesn't trigger anything. The Home Assistant app vibrates.

### Views

With `hideZoomMenu: no`, the "Views" menu at the top right moves smoothly to the `zoom_areas` and back to the initial view. The old button bar appears only with `hideZoomMenu: yes`.

### State colours

- `state_colors: yes`: open doors and windows (`type3d: door`) light up (`open_color`, amber). With `alarm_entity` armed they turn red (`alarm_color`), and they blink when the alarm is triggered.
- `rooms`: transparent copies of the floors, coloured by temperature (blue to red between `temperature_min` and `temperature_max`, 17 and 27 by default, with the value written on it) or by presence (`presence_color`).
- A "Map" menu next to "Views" switches between no map, temperatures and presence; `room_colors` sets the initial choice.

| ![Open doors and windows in amber (state_colors: yes)](docs/images/state-open.jpg) | ![Alarm armed: the open ones turn red](docs/images/state-alarm.jpg) |
| :---: | :---: |
| Open doors and windows in amber (`state_colors: yes`) | Alarm armed: the open ones turn red |

```yaml
state_colors: 'yes'
alarm_entity: alarm_control_panel.home_alarm
room_colors: temperature
rooms:
  - name: Bedroom
    object_id: room_1_101        # floor object in the model (or <group>)
    temperature: sensor.bedroom_temperature
    presence: binary_sensor.bedroom_occupancy
  - name: Living room
    object_id: room_2_102
    temperature: sensor.living_room_temperature
    presence: [binary_sensor.living_room_occupancy, binary_sensor.kitchen_occupancy]
```

| ![Room map by temperature, chosen in the "Map" menu at the top right](docs/images/map-temperature.jpg) | ![Room map by presence](docs/images/map-presence.jpg) |
| :---: | :---: |
| Room map by temperature, chosen in the "Map" menu at the top right | Room map by presence |

## Fixes

- States out of step when an entity is missing at startup (the arrays followed only the entities that were found).
- No more `reading 'some'` crash at startup. The animation loop starts only once the renderer is ready, restarts whenever needed and stops by itself when there is nothing left to animate.
- One render per frame. Trackers are recalculated only when their entities change, the marker really disappears when the person leaves, and there are no debug logs.
- `_zIndexChecker` is disabled: with the current Home Assistant interface it reported false "card covered" states on phones and blocked doors and trackers.
- TV screen: previous textures are released. The TV light was doubled: a spot with the same name never received any intensity but still computed shadows.
- Original bug: the light that follows the camera (torch) now lights what the camera looks at. Before, it always pointed at the centre of the model, so close views and zoom areas stayed dark.
- Original bug: `color_mode` is no longer modified in the Home Assistant states. The colour of `color_temp` lights is compared by value (before, it was redrawn at every update).
- Guards for `_ispanel`/`_issidebar` without `hui-view`, for configuration rows without objects and for the missing ambient light.
- The editor accepts a tracker position only if it is a valid `[x, y, z]`; "Entity not found" is logged only once.
- Sprite texts are in sRGB.

## Test page

`test/` holds a page that runs the card outside Home Assistant, with fake states, a fake WebGL context and `requestAnimationFrame` on a timer. `config.json` is an example that uses all the new options. `states.json` and `states-off.json` are two sets of states: lights on and during the day, lights off and at night.

1. Put your model (`.obj` and `.mtl`) where `path`, `objfile` and `mtlfile` of `test/config.json` point, and replace the `object_id` values with the ones of your model.
2. Copy all the `dist/*.js` files into `test/`.
3. Serve the folder from a web server (for example from a random folder of `config/www`, to be removed after the test) and open `index.html?v=dist&fakegl=1&raf=timeout`.

- `fakegl=1` replaces WebGL with a fake context: three.js loads the real model and counts the textures and draw calls;
- `raf=timeout` is needed when the browser window is hidden, because `requestAnimationFrame` doesn't fire then;
- `st=states-off.json` picks the other set of states, `cfg=` another configuration, and `ov=` overrides configuration keys with a JSON object;
- `window.__setState(entity, state, attributes)` changes a state from the console, and `window.__card` is the card.
