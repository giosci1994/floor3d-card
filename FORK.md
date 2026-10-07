# floor3d-card mod

![floor3d-card mod](docs/images/banner.png)

A fork of [adizanni/floor3d-card](https://github.com/adizanni/floor3d-card) (MIT licence, © adizanni) based on version 1.5.3, with updated libraries, bug fixes and new features. All the options of the original card still work and are documented in [README.md](README.md). This page covers only what is different.

If the fork is useful to you, you can support it on [Buy Me a Coffee](https://buymeacoffee.com/giosci1994u). The original card has its own page: [buymeacoffee.com/AndyHA](https://buymeacoffee.com/AndyHA).

## Installation

### HACS

[![Open this repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=giosci1994&repository=floor3d-card&category=plugin)

1. Open the link above: HACS offers to add this repository. Or add it by hand: in HACS, menu (⋮) at the top right › **Custom repositories**, repository `https://github.com/giosci1994/floor3d-card`, type **Dashboard**.
2. Open **floor3d-card mod** and click **Download**. HACS copies the files of the latest release into `www/community/floor3d-card/` and adds the resource `/hacsfiles/floor3d-card/floor3d-card.js`.
3. Reload the browser or the app. The version is shown at the top of the card editor and in the browser console.

If the original card is installed, remove it from HACS first: both define `custom:floor3d-card` and use the same `www/community/floor3d-card` folder. The configuration of the card stays the same. HACS shows the updates of this fork like those of any other card.

### By hand

1. Download all the `.js` files of the [latest release](https://github.com/giosci1994/floor3d-card/releases/latest) (they are also in `dist/`) into a folder of `config/www`, for example `config/www/floor3d-card/`. There are six files: the card, its core (libraries and code shared with the editor), the editor, which is loaded only when you edit the card, the classic editor, which only old Home Assistant versions load, and the decoders of [compressed models](#compressed-models), loaded only by the models that need them.
2. Add `/local/floor3d-card/floor3d-card.js?v=2.0.0` as a resource of type **module** (Settings › Dashboards › Resources). If the original card is installed too, remove it first.
3. Reload the browser or the app.

At every update copy the new files and change the `?v=` of the resource: Home Assistant serves `/local` with a 31-day cache, and so may a proxy in front of it, while a new query is a new address. The core and the editor have the hash of their content in the name, so they are new addresses too; the ones of older versions can be deleted.

## Building

```bash
npx --yes yarn@1.22.22 install --frozen-lockfile
npm run build        # = rollup -c rollup.config.mjs
npm start            # rebuilds on every change and serves dist/ on port 5000
npm test             # tests of src/config.ts (Node 22 or newer)
npm run lint         # ESLint on src/*.ts
```

`CARD_VERSION` in `src/const.ts` is shown in the card editor and in the console: keep it equal to `version` in `package.json` and to the tag of the release (see [Publishing a release](#publishing-a-release)). For test builds between releases add a suffix, for example `v2.0.1-dev.1`.

- **Tooling.** Rollup 4 with the official `@rollup/plugin-*` packages, TypeScript 5.9 (target ES2021), Lit 3, custom-card-helpers 2 and the types of home-assistant-js-websocket 9. Babel is gone: without a configuration it did nothing. `.yarnrc` skips the `engines` check because custom-card-helpers 2 asks for Node ≥ 24 for its own development tools, while its code ends up in the browser bundle. three.js went from 0.130 to 0.186; tween.js stays at 18.
- **Lit 2 kept for the classic editor.** The classic editor (`src/editor-classic.ts`, see [Card editor](#card-editor)) uses `@material/mwc-*` 0.27 components, written for Lit 2; on Lit 3 some of them break (for example `mwc-formfield` with the old signature of `@queryAssignedNodes`). The `litForMaterial` plugin in `rollup.config.mjs` makes all of `@material/*` use a single Lit 2 copy (the `lit2` alias in `package.json`), while the card and the new editor use Lit 3. Alias, plugin and classic editor can go once no supported Home Assistant version needs them.
- **Editor loaded separately.** The card doesn't import the editor at startup: `getConfigElement()` loads it when the card is edited. Devices that only show the card download about 810 KB. The build makes four files: `floor3d-card.js` (the card), `floor3d-card-core-<hash>.js` (libraries and code shared with the editor), `floor3d-card-editor-<hash>.js` (the editor, about 40 KB) and `floor3d-card-editor-classic-<hash>.js` (about 340 KB, loaded only when Home Assistant doesn't provide the components of the new editor). Nothing imports `floor3d-card.js`: the resource has a query (`?hacstag=` added by HACS, `?v=` by hand), and an import without it would load a second copy of the card, whose `customElements.define` fails. `coreChunk()` in `rollup.config.mjs` does this split, and `removeOldChunks()` removes from `dist/` the chunks of older builds. Two more chunks are loaded only by [compressed models](#compressed-models): `floor3d-card-meshopt_decoder.module-<hash>.js` (about 25 KB) and `floor3d-card-DRACOLoader-<hash>.js` (the loader; the Draco decoder itself comes from `draco_decoder_path`).
- **Components Home Assistant no longer provides.** Recent Home Assistant versions don't define `mwc-menu` anymore, so the drop-down menus of the classic editor didn't open. `elements/menu.ts` defines `mwc-menu`, `mwc-menu-surface`, `mwc-list` and `mwc-list-item` only when they are missing. The card also reads `isPanel`, `editMode` and `preview` directly from Home Assistant (2024+), and falls back to the page structure on older versions.

## Publishing a release

1. Change `version` in `package.json` and `CARD_VERSION` in `src/const.ts` (for example `2.0.1` and `v2.0.1`), run `npm run build` and commit, `dist/` included.
2. On GitHub, **Releases › Draft a new release**: a new tag named after the version (`v2.0.1`), a description of the changes, **Publish release**.
3. The Release workflow builds the card and attaches the `.js` files to the release. HACS downloads them from there, and shows the update when it next checks the repository (**Update information** in the menu of the repository checks at once).

The Validate workflow runs the HACS checks at every push and every night; the Build workflow runs `npm run lint`, builds the card and runs `npm test`.

## New features

- **Animated shower** (`type3d: shower`): particles falling while the entity is `on`. Options under `shower:`: `count`, `velocity`, `size`, `color`, `width`, `height`. The animation speed doesn't depend on the frame rate.
- **Person trackers** (`type3d: tracker`) for presence radars that report target coordinates, such as the HLK-LD2450. See [Trackers](#trackers).
- **TV screen** (`type3d: image`): shows the `entity_picture` of a media player and lights the room with the average colour of the picture. Options under `image:`: `rotate`, `mirror`, `lumens`, `lighting_lumens`, `lighting_direction`, `lighting_off_state`, `lighting_distance`, `lighting_shadow: no`. The light is off with `off`, `standby`, `unavailable` and `unknown`. With `lumens` the picture glows; without, it is lit by the room like a printed picture.
- **Info boxes** (`type3d: info`), a **zoom menu** (`hideZoomMenu`) and zoom areas defined by camera position, target and rotation.
- **Pause while hidden**: nothing is rendered while the card is not visible (IntersectionObserver).
- **Compressed models** (2.3): `.glb` files compressed with meshopt or Draco, often several times smaller. See [Compressed models](#compressed-models).
- **Views from the page address** (2.3, `url_parameters`): a button that navigates to `?area=kitchen` opens the card on the kitchen view. See [Views from the page address](#views-from-the-page-address).
- **Fans that speed up and slow down** (2.3, `rotate.ramp`). See [Fans](#fans).
- **Loading screen** (2.3): a bar with the step (materials, model, preparing the 3D scene), the percentage and the megabytes, in the colours of the theme. Before, only "1/2: 45%" in a corner, stuck at 100% while the model was being prepared. A model that doesn't load shows the file and the reason in the card.
- **Object ids with `*`** (2.3): `object_id: Lamp_*` stands for all the matching objects. See [Object ids with *](#object-ids-with-).
- **Sun and sky from sensors** (2.4): `sun_power` can be a numeric sensor, and `sky_power` adds the light of the sky, which fills the shade without shadows. Under clouds the card shows soft light instead of hard patches of sun. See [Sun and sky from sensors](#sun-and-sky-from-sensors).
- **Illuminance map** (2.5): rooms coloured by the lux of an illuminance sensor, next to the temperature and presence maps. See [State colours](#state-colours).
- **Paused preview** (2.5): the card editor can pause its preview while you edit, and sends the configuration to Home Assistant a second after the last change instead of at every keystroke. See [Card editor](#card-editor).
- **Version label** at the top of the card editor and in the console banner.
- The sky (`sky`) and the ambient light of the original card are removed on purpose, so that they don't affect the render; the light of the sky of 2.4 (`sky_power`) is there only when it is set. The light that follows the camera (torch) is always on.

| ![TV screen (type3d: image): the picture of the media player lights the room](docs/images/tv.jpg) | ![Animated shower (type3d: shower)](docs/images/shower.jpg) |
| :---: | :---: |
| TV screen (`type3d: image`): the picture of the media player lights the room | Animated shower (`type3d: shower`) |

### Card editor

The editor is built on the components of Home Assistant, like the editors of the built-in cards: the same fields, entity pickers, toggles and menus, in the light and dark themes.

| ![The card editor: settings in sections, then the entities, object groups and views](docs/images/editor-list.png) | ![Editing an entity: its options, and its objects highlighted in the preview](docs/images/editor-entity.png) |
| :---: | :---: |
| Settings in sections, then the lists of entities, object groups and views | Editing an entity: its objects are highlighted in the preview |

- **Settings in sections**: 3D model, camera and navigation, light and shadows, interaction (with the overlay), state colours and room maps (with the rooms), rendering. The yes/no options are toggles, and the help text of each field gives the value used when it is empty.
- **Lists** of entities, object groups, views (zoom areas), rooms and colour conditions: one line per item, dragged to change the order, with a pencil to edit it. An entity shows its type and object, and a warning when the entity doesn't exist, or when the object isn't in the model (after exporting the model again, for example).
- **Editing an item** opens its own page: the entity with the Home Assistant entity picker, its type, its object, then only the options of that type (changing the type takes away the options of the old one), and in a closed panel the tap and long press actions and the template.
- **Objects of the model**: the object menus list the groups and all the objects of the model, with a search; any other name can be typed too. The names come from the preview, or from `objectlist` when set.
- **Pick in the preview**: the button next to an object field turns the preview into a picker: a tap on an object fills the field. For an object group, every tap adds an object or takes it out, until the button is pressed again.
- **Highlight**: while an item is edited, or the mouse is over its line, its objects are outlined in the preview, groups included.
- **Use the current view**: in a view (zoom area), the button copies the position, target and rotation of the camera of the preview, after it has been moved there with the mouse or fingers.
- The **refresh** button next to the version reloads the preview.
- **Fewer reloads of the preview** (2.5): Home Assistant builds the preview again, model included, at every configuration it gets. The editor sends it one second after the last change, and at once when you leave a field or click anywhere (the Save button included), so typing an entity id reloads the preview once instead of at every keystroke, and Home Assistant always has the last configuration.
- **Pause** (2.5): the pause button next to refresh (also at the top of each entity, group, view and room) keeps the last picture of the preview, with "Preview paused" on it, while you make several changes; the play or refresh button shows them all at once. The configuration still goes to Home Assistant at every change, so Save never loses one. Picking an object or using the current view resumes the preview. The idea comes from [issue #13](https://github.com/giosci1994/floor3d-card/issues/13).
- When Home Assistant doesn't provide the components the editor is built on (`ha-form` and `ha-expansion-panel`), the editor of version 2.1 is shown instead (`src/editor-classic.ts`). The new editor was tested on Home Assistant 2026.9.

The editor and the preview talk through window events (`floor3d-card-editor` and `floor3d-card-preview`, see `src/editor.ts`); only a card that Home Assistant marks as `preview` answers.

### Shorter configuration

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

In YAML written by hand the card also accepts:

- `true`/`false` in place of `'yes'`/`'no'` for the switches (top level, `light.shadow`, `image.lighting_shadow`, `room.label`, `tracker.label`);
- the objects of a group as plain ids (above) or as `- object_id: ...`, as before;
- a type without its options block when no option is needed (`type3d: light` without `light:`).

Existing configurations keep working as they are, and the editor rewrites them in the short form only when something is changed. The only visible change: in YAML-mode dashboards (`ui-lovelace.yaml`) Home Assistant reads an unquoted `yes`/`no` as `true`/`false`, which the card used to ignore (`shadow: yes` gave no shadows, `header: no` kept the header); now these switches are applied. A configuration saved by this editor needs this version of the card or a newer one: version 2.0.0 and the original card don't read object ids as plain strings.

`src/config.ts` holds both forms: `normalizeConfig()` (what the card and the editor work with) and `cleanConfig()` (what the editor writes).

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
| `globalLightPower` | `0.2` | Light that follows the camera (torch), as before. A number or a numeric sensor, read at every update |
| `sun` | `no` | `yes`: sunlight from `sun.sun` (azimuth and elevation), with shadows |
| `sun_entity` | `sun.sun` | Sun entity |
| `sun_power` | `1` | Multiplies the sunlight. A number or a numeric sensor (2.4): see [Sun and sky from sensors](#sun-and-sky-from-sensors) |
| `sun_roof` | none | List of the indoor floors: above them, at wall height, an invisible roof casts shadows for the sun only. The sun comes in through windows and doors, not from above; lamps and camera don't see the roof |
| `sky_power` | `0` (none) | Light of the sky (2.4): from all directions, without shadows, it fills the shade. A number or a numeric sensor; with `sun: yes` it follows the day like the sun |
| `sky_color` | `#e6eeff` | Colour of the sky light from above |
| `ground_color` | `#706458` | Colour of the sky light from below (reflected by the ground) |
| `north` | `{x: 0, z: -1}` | Where north points in the model: orients the sun |
| `max_pixel_ratio` | `2` | Maximum resolution relative to CSS pixels (phones reach 3× or more) |
| `log_depth` | `no` | `yes` turns the logarithmic depth buffer back on (expensive on phones) |
| `reversed_depth` | `yes` | Reversed depth buffer where `EXT_clip_control` is available |

### Sun and sky from sensors

The sun of `sun: yes` follows `sun.sun`, so it shines at full strength under an overcast sky too: hard patches of sun and dark rooms, the opposite of a cloudy day. Two options take the weather into account (the idea comes from [issue #9](https://github.com/giosci1994/floor3d-card/issues/9)):

- `sun_power` can be the id of a numeric sensor instead of a number: the direct light of the sun, which also makes the shadows. With clouds it goes towards 0, and the sun and its shadows fade.
- `sky_power` adds the light of the sky: a hemisphere light (`sky_color` from above, `ground_color` from below) that lights everything evenly and casts no shadows. It fills the shade the sun leaves, and with an overcast sky it is most of the light. Without `sky_power`, or with 0, there is no sky light and the render stays as before.

Both take a number or a sensor, read at every update of Home Assistant (like `globalLightPower`). A sensor that is `unavailable`, or whose state is not a number, counts as the default (1 for the sun, 0 for the sky); a negative value counts as 0. With `sun: yes`, the sky follows the day like the sun: off below -3° of elevation, full from 8°; without the sun it stays as set.

A typical setup reads the solar radiation, for example from [Open-Meteo](https://open-meteo.com/en/docs) (`direct_radiation` and `diffuse_radiation`) through a REST sensor, and turns it into powers between 0 and 1 with two template sensors. 800 W/m² of direct radiation and 300 W/m² of diffuse radiation give 1:

```yaml
template:
  - sensor:
      - name: floor3d sun power
        state: "{{ [states('sensor.direct_radiation') | float(0) / 800, 1] | min }}"
      - name: floor3d sky power
        state: "{{ [states('sensor.diffuse_radiation') | float(0) / 300, 1] | min }}"
```

```yaml
sun: 'yes'
sun_power: sensor.floor3d_sun_power
sky_power: sensor.floor3d_sky_power
```

With only the cloud cover of a weather entity, something like `{{ 1 - state_attr('weather.home', 'cloud_coverage') | float(0) / 100 }}` for the sun and a fixed `sky_power` (0.3, for example) already gives a cloudy day its soft light. The shadow map of the sun is redrawn when the sun moves, not when its power changes.

### Shadows

Shadows are redrawn only when needed, and only for the lights that are on. While a door moves they are redrawn at most every 300 ms, plus once when it stops; before, it was every frame and for every light. Each light with shadows takes a GPU texture unit (16 on phones): beyond the limit the last lights get no shadow, and the sun comes first. `shadow: no` on a light excludes it. With `extralightmode: yes` the limit counts only the lights that are on: a light gets its shadow when it is switched on, if the lights already casting one leave room, or later when one of them is switched off.

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

### Views from the page address

With `url_parameters`, a parameter of the page address picks the view. The syntax is the one of [MephistoJB/floor3d-card](https://github.com/MephistoJB/floor3d-card), where the idea comes from.

```yaml
url_parameters:
  zoom: area # the name of the parameter: ?area=...
zoom_areas:
  - zoom: Kitchen
    object_id: Kitchen_floor
    distance: 400
```

Any card can then open the view, for example a button:

```yaml
type: button
name: Kitchen
tap_action:
  action: navigate
  navigation_path: /dashboard-home/0?area=kitchen
```

- The value is compared with the names of the views without case, spaces, `_` and `-`: `kitchen`, `Kitchen` and `living_room` for "Living room" all work.
- When the card opens with the parameter in the address, it starts on that view. Later the camera flies to the view when the parameter changes, also with the back button. It doesn't move when the address stays the same (a dialog that opens and closes, for example), so a view moved by hand stays where it is.
- A value that names no view leaves the camera where it is, with a warning in the browser console.

### Fans

Rotating objects (`type3d: rotate`) speed up when they are switched on and slow down when they are switched off, instead of starting and stopping at once. `ramp` is the time from stopped to full speed, in seconds: 1.5 by default, `0` for the old behaviour. A fan with a `percentage` attribute turns at that fraction of `round_per_second`, and with `direction: reverse` the other way; a change of direction slows down and speeds up again. The idea comes from [Steven-D-Morgan/hass-3d-floorplan](https://github.com/Steven-D-Morgan/hass-3d-floorplan).

```yaml
- entity: fan.ceiling
  type3d: rotate
  object_id: <Fan_blades>
  rotate:
    axis: y
    round_per_second: 1.5
    ramp: 3
    hinge: Fan_hub
```

### Object ids with *

An `object_id` with `*` stands for all the objects of the model whose name matches it, as an object group: `*` is any text. With `object_id: Lamp_*` a light entity gets a light in every object whose name starts with `Lamp_`, and a colour entity colours all of them. It saves updating a group by hand when Sweet Home 3D numbers the objects again after a change to the model. It works in `object_groups` too.

The editor says how many objects match (`Lamp_* (4 objects)`), warns when none does, and outlines them in the preview. The types that use a single object (text, room label, info box, TV screen, tracker) take a plain name. The idea comes from [anasmadrhar/floor3d-card](https://github.com/anasmadrhar/floor3d-card).

### Compressed models

A `.glb` model can be compressed with [glTF Transform](https://gltf-transform.dev) (Node.js needed), then set as `objfile`:

```bash
npx @gltf-transform/cli meshopt home.glb home-meshopt.glb
npx @gltf-transform/cli draco home.glb home-draco.glb
```

The names of the objects stay the same, so the entities keep working. Use only these two commands: `gltf-transform optimize` also merges objects, and the entities would no longer find them.

- **meshopt**: the decoder is part of the card, in a chunk of about 25 KB loaded only by these models. Their positions are stored as integers with a scale on every object: the card turns them back into plain positions when the model loads, so doors, covers and fans move as in the uncompressed model.
- **Draco**: usually the smallest file. The decoder (about 350 KB) comes the first time from Google's CDN (`www.gstatic.com`), then from the cache of the browser. For a Home Assistant without Internet access, copy `draco_wasm_wrapper.js` and `draco_decoder.wasm` from `https://www.gstatic.com/draco/versioned/decoders/1.5.7/` into a folder of `config/www`, for example `config/www/draco/`, and set `draco_decoder_path: /local/draco/`.

The card reads the file first and loads a decoder only when the model needs it: an uncompressed model loads as before. The idea comes from [Steven-D-Morgan/hass-3d-floorplan](https://github.com/Steven-D-Morgan/hass-3d-floorplan).

### State colours

- `state_colors: yes`: open doors and windows (`type3d: door`) light up (`open_color`, amber). With `alarm_entity` armed they turn red (`alarm_color`), and they blink when the alarm is triggered.
- `rooms`: transparent copies of the floors, coloured by temperature (blue to red between `temperature_min` and `temperature_max`, 17 and 27 by default, with the value written on it), by presence (`presence_color`) or by illuminance (2.5, below).
- **Illuminance** (`illuminance` of a room, an illuminance sensor): dark blue at `illuminance_min` lux (5 by default) to yellow at `illuminance_max` (1000), through purple and orange, with the value written on it. The scale is logarithmic, as the eye sees light: a few lux at night, a few hundred in a lit room, thousands next to a sunny window. The idea comes from [issue #13](https://github.com/giosci1994/floor3d-card/issues/13).
- A "Map" menu next to "Views" switches between no map, temperatures, presence and, when a room has an illuminance sensor, illuminance; `room_colors` sets the initial choice (`none`, `temperature`, `presence` or `illuminance`).

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
    illuminance: sensor.living_room_illuminance
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
- Original bug: removing a zoom area in the editor replaced all the zoom areas with the list of entities.
- Original bug: moving a colour condition up or down in the editor had no effect and added a `colorconditions` list the card doesn't read.
- The refresh button of the editor reloads the preview in section views too (it looked for the preview where only masonry views put it).
- An entity set up wrongly (a door without its type, for example) is left out, with a warning in the console, and the rest of the model is shown. Before, the whole model stopped loading.
- A model file that doesn't load, or an error while the model is set up: the console says which file and why. Before, the error was thrown again without its message.
- Original bug (2.2.1): covers. A cover that reports `current_position` is drawn at that position also while it is `opening` or `closing`, and 0 counts as a position; before, a blind that started to open stayed drawn shut. A cover without `current_position` that was closed at startup never opened in the model. A cover without `pane` was not set up, and its first change of state stopped every other update of the card: now its first object is the pane, as the card already did when it moved it.
- Original bug (2.2.1): `entity_template` gets the state as a value instead of having it pasted into its code. A state such as `unavailable` no longer breaks the template (`$entity == "open"` now works), and a state with quotes can't run as code. Numeric states are still numbers and `'$entity'` in quotes is still the text of the state, so existing templates work as before. A template that fails is logged once and the entity keeps its state.
- Original bug (2.2.1): text sensors and room labels released the texture of the previous text only when the model was reloaded: one texture per update on the GPU. A text entity whose attribute is missing was redrawn at every change of any entity in Home Assistant.
- 2.2.1: reloading the card (refresh button of the editor) frees the model and the WebGL context. Before, each reload kept a context, and past the browser limit (about 16) the oldest was dropped, which could be another card of the dashboard.
- 2.2.1: when the browser gives back a WebGL context it had taken away (an app in the background on a phone), the card redraws the model and its shadows. Before, it stayed empty until a touch.
- 2.2.1: `extralightmode: yes` no longer lets a light that is switched on go past the shadow limit of the GPU (see [Shadows](#shadows)).
- TV screen (2.4): the face of the screen disappeared instead of showing the picture. The new picture went on before it had loaded, the face was transparent meanwhile, and nothing redrew the card when the picture arrived; it showed only with `lighting_lumens`, and not always. Now the picture replaces the previous one once it has loaded, and the card redraws then: a screen capture of Android TV that changes every few seconds no longer flickers. Without `lumens`, a dark screen no longer hides the picture, and the picture is no longer black after the TV is switched off and on again. A picture that doesn't load leaves the previous one, with a warning in the console; one that arrives after a newer one, or after the TV was switched off, is dropped. The light of the room takes its colour from the picture already loaded instead of downloading it a second time.
- TV screen (2.4.1): with a GLB model the screen still vanished when the TV was switched on, on GPUs with 16 texture units and many lights with shadows. The standard material of three.js (the one of GLB models) takes a texture unit for its lighting, and the picture and its glow took two more: one past the units the shadows leave, so the shader of the screen didn't compile (`FRAGMENT shader texture image units count exceeds MAX_TEXTURE_IMAGE_UNITS(16)` in the console). Now a screen with `lumens` is drawn without lights and shadows, with the picture as its only texture, and without `lumens` it keeps the picture as its only texture. The light of the TV no longer makes a bright spot on its own screen.
- Original bug (2.4.1): lamp colours. A lamp that changes colour temperature (Adaptive Lighting, for example) turned white at its first change and stayed white: the card read the temperature in mireds (`color_temp`), which Home Assistant removed from the state of lights in 2026.3. Lamps in `xy` or `hs` mode kept the colour they had when the card was loaded. Now the colour comes from `rgb_color`, which Home Assistant gives in every colour mode (computed from the temperature in `color_temp` mode), else from `color_temp_kelvin`, or from `color_temp` on older versions.
- Original bug (2.4): `globalLightPower` as a sensor was read only when the model was loaded, and a state such as `unavailable` gave the torch an invalid intensity; `globalLightPower: 0` left the torch at 0.2. Now the sensor is read at every update, an unavailable one counts as the default (0.2), and 0 turns the torch off.

Some of these were found and fixed first in other forks: [Steven-D-Morgan/hass-3d-floorplan](https://github.com/Steven-D-Morgan/hass-3d-floorplan) (covers, templates, textures, reload, WebGL context) and [dawidkulpa/HomeControl3D-card](https://github.com/dawidkulpa/HomeControl3D-card) (shadow limit).

## Test page

`test/` holds a page that runs the card outside Home Assistant, with fake states, a fake WebGL context and `requestAnimationFrame` on a timer. `config.json` is an example that uses all the new options. `states.json` and `states-off.json` are two sets of states: lights on and during the day, lights off and at night.

1. Put your model (`.obj` and `.mtl`) where `path`, `objfile` and `mtlfile` of `test/config.json` point, and replace the `object_id` values with the ones of your model.
2. Copy all the `dist/*.js` files into `test/`.
3. Serve the folder from a web server (for example from a random folder of `config/www`, to be removed after the test) and open `index.html?v=dist&fakegl=1&raf=timeout`.

- `fakegl=1` replaces WebGL with a fake context: three.js loads the real model and counts the textures and draw calls;
- `raf=timeout` is needed when the browser window is hidden, because `requestAnimationFrame` doesn't fire then;
- `st=states-off.json` picks the other set of states, `cfg=` another configuration, and `ov=` overrides configuration keys with a JSON object;
- `window.__setState(entity, state, attributes)` changes a state from the console, and `window.__card` is the card.
