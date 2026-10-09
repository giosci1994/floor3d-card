/* eslint-disable @typescript-eslint/no-explicit-any */
// Fields of the editor, as ha-form schemas. Their labels, help texts, menu entries and headings are
// in the language files of the editor (src/localize/editor/), by the name of the field: see
// localizeSchema, labelFor and helperFor. The defaults written in the help texts are the values the
// card uses when an option is missing.

export type Schema = any;

const text = (name: string, options: any = {}): Schema => ({ name, selector: { text: options } });
const num = (name: string, options: any = {}): Schema => ({
  name,
  selector: { number: { mode: 'box', step: 'any', ...options } },
});
const bool = (name: string): Schema => ({ name, selector: { boolean: {} } });
// A menu: the label of each value is the text <key>.<value> (options.<name>.<value> by default).
const choice = (name: string, values: string[], key = 'options.' + name): Schema => ({
  name,
  options_key: key,
  selector: { select: { mode: 'dropdown', options: values.map((value) => ({ value, label: value })) } },
});
const entity = (name: string, domain?: string | string[], multiple = false): Schema => ({
  name,
  selector: { entity: { ...(domain ? { filter: { domain } } : {}), ...(multiple ? { multiple: true } : {}) } },
});
// Several fields side by side, their values at the same level as the others.
const row = (...schema: Schema[]): Schema => ({ type: 'grid', name: '', flatten: true, column_min_width: '140px', schema });
// { x, y, z } (or the given keys) stored under one name.
export const vector = (name: string, keys = ['x', 'y', 'z']): Schema => ({
  type: 'grid',
  name,
  column_min_width: '70px',
  schema: keys.map((key) => num(key)),
});

// An object of the model: a list of its objects and groups, where any other name can be typed too.
export const objectField = (name: string, objects: string[]): Schema => ({
  name,
  selector: { select: { mode: 'dropdown', custom_value: true, sort: false, options: objects } },
});
export const objectListField = (name: string, objects: string[]): Schema => ({
  name,
  selector: { select: { mode: 'dropdown', custom_value: true, multiple: true, options: objects } },
});

// Switches written 'yes'/'no' in the YAML and shown as toggles, with the value used when missing.
export const SWITCHES: { [key: string]: 'yes' | 'no' } = {
  header: 'yes',
  click: 'no',
  overlay: 'no',
  lock_camera: 'no',
  show_axes: 'no',
  shadow: 'no',
  extralightmode: 'no',
  hideLevelsMenu: 'no',
  hideZoomMenu: 'no',
  editModeNotifications: 'yes',
  selectionMode: 'no',
  sun: 'no',
  sun_shadow: 'yes',
  log_depth: 'no',
  reversed_depth: 'yes',
  state_colors: 'no',
  alarm_view: 'no',
};
// The same inside the options block of a type.
export const BLOCK_SWITCHES: { [block: string]: { [key: string]: 'yes' | 'no' } } = {
  light: { single: 'no' },
  image: { lighting_shadow: 'yes' },
  room: { label: 'no' },
  tracker: { label: 'yes', flip_x: 'no', flip_y: 'no' },
};
// Options written as [x, y, z] lists, edited as three numbers.
export const ARRAY_VECTORS: { [block: string]: string[] } = {
  info: ['position'],
  tracker: ['sensor_position'],
};

export interface Section {
  key: string; // its title is the text sections.<key>
  icon: string;
  // Fields and headings, in order; a heading is a string.
  content: (config: any) => (Schema[] | string)[];
}

export const SECTIONS: Section[] = [
  {
    key: 'model',
    icon: 'mdi:cube-outline',
    content: () => [
      [row(text('name'), choice('language', ['auto', 'en', 'it', 'de', 'nb'])), bool('header')],
      [text('path'), row(text('objfile'), text('mtlfile')), text('objectlist')],
      [
        row(
          // A colour, or one of the backgrounds of the menu: the sky that follows the sun, or none.
          {
            name: 'backgroundColor',
            options_key: 'options.backgroundColor',
            selector: { select: { mode: 'dropdown', custom_value: true, options: ['sky', 'transparent'].map((value) => ({ value, label: value })) } },
          },
          text('style'),
        ),
      ],
    ],
  },
  {
    key: 'view',
    icon: 'mdi:camera-outline',
    content: () => [
      'initial_view',
      [vector('camera_position')],
      [vector('camera_target')],
      [vector('camera_rotate')],
      [row(bool('lock_camera'), bool('hideZoomMenu')), row(bool('hideLevelsMenu'), num('initialLevel', { step: 1 }))],
      [
        {
          name: 'url_parameters',
          type: 'grid',
          column_min_width: '140px',
          schema: [{ ...text('zoom'), label_key: 'url_zoom', helper_key: 'url_zoom' }],
        },
      ],
      'north',
      [vector('north', ['x', 'z'])],
    ],
  },
  {
    key: 'light',
    icon: 'mdi:lightbulb-on-outline',
    content: (config) => [
      [
        row(text('globalLightPower'), num('light_power', { min: 0 })),
        row(num('exposure', { min: 0 }), choice('tone_mapping', ['neutral', 'agx', 'aces', 'linear'])),
        row(bool('shadow'), bool('extralightmode')),
      ],
      // How many shadows the preview draws, against the limit of the GPU.
      ...(config.shadow === 'yes' || config.shadow === true ? ['shadow_status'] : []),
      [
        text('sky_power'),
        // The colours of the sky light, once it is on (a number other than 0, or a sensor).
        ...(config.sky_power != null && Number(config.sky_power) !== 0 ? [row(text('sky_color'), text('ground_color'))] : []),
        bool('sun'),
      ],
      ...(config.sun === 'yes' || config.sun === true
        ? [[row(entity('sun_entity', 'sun'), text('sun_power')), bool('sun_shadow')], 'sun_roof']
        : []),
    ],
  },
  {
    key: 'weather',
    icon: 'mdi:weather-partly-cloudy',
    content: () => [
      [
        entity('weather', 'weather'),
        row(
          choice('weather_position', ['top-left', 'top-right', 'bottom-left', 'bottom-right'], 'options.overlay_alignment'),
          choice('weather_forecast', ['daily', 'hourly', 'twice_daily']),
          num('weather_count', { min: 0, max: 12, step: 1 }),
        ),
      ],
    ],
  },
  {
    key: 'interaction',
    icon: 'mdi:gesture-tap',
    content: (config) => [
      [row(bool('click'), bool('editModeNotifications')), row(bool('selectionMode'), bool('show_axes')), bool('overlay')],
      ...(config.overlay === 'yes' || config.overlay === true
        ? [
            'overlay',
            [
              row(text('overlay_bgcolor'), text('overlay_fgcolor')),
              row(
                choice('overlay_alignment', ['top-left', 'top-right', 'bottom-left', 'bottom-right']),
                num('overlay_width', { min: 0, max: 100, unit_of_measurement: '%' }),
                num('overlay_height', { min: 0, max: 100, unit_of_measurement: '%' }),
              ),
              row(text('overlay_font'), text('overlay_fontsize')),
            ],
          ]
        : []),
    ],
  },
  {
    key: 'colours',
    icon: 'mdi:palette-outline',
    content: () => [
      [
        bool('state_colors'),
        row(text('open_color'), text('alarm_color')),
        entity('alarm_entity', 'alarm_control_panel'),
        row(
          choice('room_colors', ['none', 'temperature', 'presence', 'illuminance', ...MAP_KEYS]),
          text('presence_color'),
        ),
        row(num('temperature_min'), num('temperature_max')),
        row(num('illuminance_min', { min: 0 }), num('illuminance_max', { min: 0 })),
        bool('alarm_view'),
      ],
      'rooms',
      'maps',
    ],
  },
  {
    key: 'rendering',
    icon: 'mdi:tune-variant',
    content: () => [
      [row(num('max_pixel_ratio', { min: 0.5, max: 4 }), bool('log_depth')), bool('reversed_depth'), text('draco_decoder_path')],
    ],
  },
];

// Types of entity and their icons; the name of each is the text types.<type>.
export const TYPES: [string, string][] = [
  ['light', 'mdi:lightbulb-outline'],
  ['hide', 'mdi:eye-off-outline'],
  ['show', 'mdi:eye-outline'],
  ['color', 'mdi:palette-outline'],
  ['text', 'mdi:format-text'],
  ['room', 'mdi:floor-plan'],
  ['door', 'mdi:door-open'],
  ['cover', 'mdi:window-shutter'],
  ['rotate', 'mdi:fan'],
  ['gesture', 'mdi:gesture-tap'],
  ['camera', 'mdi:cctv'],
  ['image', 'mdi:television'],
  ['info', 'mdi:information-outline'],
  ['shower', 'mdi:shower-head'],
  ['tracker', 'mdi:account-search-outline'],
  ['climate', 'mdi:radiator'],
  ['alarm', 'mdi:alarm-light-outline'],
];

const ACTIONS = ['more-info', 'overlay', 'default'];

// First fields of an entity (object_id is added by the editor, with the objects of the model).
export const entitySchema = (): Schema[] => [
  entity('entity'),
  { name: 'type3d', options_key: 'types', selector: { select: { mode: 'dropdown', options: TYPES.map(([value]) => ({ value, label: value })) } } },
];
export const entityActionsSchema = (): Schema[] => [
  row(choice('action', ACTIONS), choice('long_press_action', ACTIONS, 'options.action')),
  text('entity_template'),
];

// Options of each type, stored under its name (light: {...}), except the text style of text and room.
// parts: the objects of the entity (those of its group, or those its name with * matches).
export const typeSchema = (type: string, objects: string[], item: any = {}, parts: string[] = []): (Schema[] | string)[] => {
  switch (type) {
    case 'light': {
      const single = item.light && (item.light.single === 'yes' || item.light.single === true || item.light.light_object);
      return [
        [
          {
            name: 'light',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              num('lumens', { min: 0, max: 20000, step: 50 }),
              text('color'),
              num('decay', { min: 0 }),
              num('distance', { min: 0, unit_of_measurement: 'cm' }),
              choice('shadow', ['yes', 'no']),
              choice('vertical_alignment', ['top', 'middle', 'bottom']),
            ],
          },
        ],
        // A lamp made of several objects: one light for them all.
        [{ name: 'light', type: 'grid', column_min_width: '140px', schema: [bool('single'), ...(single ? [objectField('light_object', parts.length ? parts : objects)] : [])] }],
        'spot',
        [
          {
            name: 'light',
            type: 'grid',
            column_min_width: '140px',
            schema: [objectField('light_target', objects), num('angle', { min: 0, max: 180, unit_of_measurement: '°' })],
          },
        ],
        'light.light_direction',
      ];
    }
    case 'door':
      return [
        [
          {
            name: 'door',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              choice('doortype', ['swing', 'slide']),
              choice('side', ['left', 'right', 'up', 'down']),
              choice('direction', ['inner', 'outer']),
              num('degrees', { min: -180, max: 180, unit_of_measurement: '°' }),
              num('percentage', { min: 0, max: 100, unit_of_measurement: '%' }),
              objectField('hinge', objects),
              objectField('pane', objects),
            ],
          },
        ],
      ];
    case 'cover':
      return [
        [
          {
            name: 'cover',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              objectField('pane', objects),
              choice('side', ['up', 'down', 'left', 'right']),
              choice('motion', ['slide', 'shrink', 'none']),
            ],
          },
        ],
        // Venetian blinds: the slats turn with the tilt of the cover.
        'slats',
        [
          {
            name: 'cover',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              objectField('slats', objects),
              num('tilt_closed', { min: -180, max: 180, unit_of_measurement: '°' }),
              num('tilt_open', { min: -180, max: 180, unit_of_measurement: '°' }),
            ],
          },
        ],
      ];
    case 'rotate':
      return [
        [
          {
            name: 'rotate',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              choice('axis', ['x', 'y', 'z']),
              num('round_per_second', { min: 0 }),
              num('ramp', { min: 0, unit_of_measurement: 's' }),
              objectField('hinge', objects),
            ],
          },
        ],
      ];
    case 'room':
      return [
        [
          {
            name: 'room',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              text('color'),
              num('transparency', { min: 0, max: 100, unit_of_measurement: '%' }),
              num('elevation', { min: 0, unit_of_measurement: 'cm' }),
              bool('label'),
              choice('label_text', ['state', 'template']),
              text('attribute'),
              num('width', { min: 0 }),
              num('height', { min: 0 }),
            ],
          },
        ],
        'label_text',
        textStyle(),
        'colorcondition',
      ];
    case 'text':
      return [[{ name: 'text', type: 'grid', column_min_width: '140px', schema: [text('attribute')] }], textStyle()];
    case 'color':
      return ['colorcondition'];
    case 'hide':
    case 'show':
      return [[{ name: type, type: 'grid', column_min_width: '140px', schema: [text('state')] }]];
    case 'gesture':
      return [[{ name: 'gesture', type: 'grid', column_min_width: '140px', schema: [text('domain'), text('service')] }]];
    case 'image':
      return [
        [
          {
            name: 'image',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              text('attribute'),
              num('rotate', { unit_of_measurement: '°' }),
              bool('mirror'),
              num('lumens', { min: 0 }),
            ],
          },
        ],
        'picture_light',
        [
          {
            name: 'image',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              num('lighting_lumens', { min: 0 }),
              choice('lighting_direction', ['positive_z', 'negative_z', 'positive_x', 'negative_x', 'positive_y', 'negative_y']),
              num('lighting_distance', { min: 0, unit_of_measurement: 'cm' }),
              text('lighting_off_state'),
              bool('lighting_shadow'),
            ],
          },
        ],
      ];
    case 'info':
      return [
        [
          {
            name: 'info',
            type: 'grid',
            column_min_width: '140px',
            schema: [text('text'), text('textfgcolor'), text('textbgcolor'), text('font'), num('size', { min: 0 })],
          },
        ],
        'info.position',
      ];
    case 'shower':
      return [
        [
          {
            name: 'shower',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              num('velocity', { min: 0 }),
              num('count', { min: 1, step: 1 }),
              text('color'),
              num('size', { min: 0 }),
              num('width', { min: 0, unit_of_measurement: 'cm' }),
              num('height', { min: 0, unit_of_measurement: 'cm' }),
            ],
          },
        ],
      ];
    case 'tracker':
      return [
        [
          {
            name: 'tracker',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              entity('sensor_x', 'sensor'),
              entity('sensor_y', 'sensor'),
              choice('unit', ['mm', 'cm', 'm']),
              num('scale', { min: 0 }),
              bool('flip_x'),
              bool('flip_y'),
              entity('zone'),
              bool('label'),
              text('color'),
              num('size', { min: 0 }),
              num('height', { min: 0, unit_of_measurement: 'cm' }),
              num('sensor_rotation', { unit_of_measurement: '°' }),
            ],
          },
        ],
        'tracker.sensor_position',
      ];
    case 'climate':
      return [
        [
          {
            name: 'climate',
            type: 'grid',
            column_min_width: '140px',
            schema: [text('heat_color'), text('cool_color'), num('glow', { min: 0, max: 3, step: 0.1 }), choice('mode', ['heat', 'cool'])],
          },
        ],
      ];
    case 'alarm':
      return [[{ name: 'alarm', type: 'grid', column_min_width: '140px', schema: [{ ...text('color'), helper_key: 'alarm_object_color' }] }]];
    default:
      return [];
  }
};

// Font and colours of the text of the text and room types (at the level of the entity).
const textStyle = (): Schema[] => [
  row(text('font'), num('span', { min: 0, max: 100, unit_of_measurement: '%' })),
  row(text('textfgcolor'), text('textbgcolor')),
];

export const groupSchema = (): Schema[] => [text('object_group')];
export const roomSchema = (objects: string[]): Schema[] => [
  row(text('name'), objectField('object_id', objects)),
  row(entity('temperature', 'sensor'), entity('illuminance', 'sensor')),
  entity('presence', ['binary_sensor', 'person', 'device_tracker'], true),
];
// The sensors of a room for the sensor maps: the ready ones, then those of the maps of the
// configuration (custom: [{ key, name }]), labelled with their name.
export const MAP_KEYS = ['humidity', 'co2', 'pm25', 'pm10', 'voc', 'hcho', 'radon', 'noise', 'power'];
export const roomSensorsSchema = (custom: { key: string; name?: string }[] = []): Schema[] => [
  row(entity('humidity', 'sensor'), entity('co2', 'sensor')),
  row(entity('pm25', 'sensor'), entity('pm10', 'sensor')),
  row(entity('voc', 'sensor'), entity('hcho', 'sensor')),
  row(entity('radon', 'sensor'), entity('noise', 'sensor')),
  entity('power', 'sensor', true),
  ...custom.map((m) => ({ ...entity(m.key, 'sensor'), label_text: m.name || m.key })),
];
export const roomAlarmsSchema = (): Schema[] => [
  entity('alarms', ['binary_sensor'], true),
  entity('climate', ['climate', 'switch', 'input_boolean', 'binary_sensor']),
];
// A map of the configuration: a ready one with other colours, or a map for other sensors.
export const mapSchema = (): Schema[] => [
  row(
    { name: 'key', options_key: 'options.map_key', selector: { select: { mode: 'dropdown', custom_value: true, options: MAP_KEYS.map((v) => ({ value: v, label: v })) } } },
    text('name'),
  ),
  row(text('unit'), choice('aggregate', ['mean', 'sum', 'max'])),
  row(num('min'), num('max'), num('decimals', { min: 0, max: 3, step: 1 })),
  { name: 'colors', selector: { text: { multiple: true } } },
];
export const zoomSchema = (): Schema[] => [row(text('zoom'), num('level', { step: 1 }))];
export const zoomObjectSchema = (objects: string[]): Schema[] => [
  row(objectField('object_id', objects), num('distance', { min: 0, unit_of_measurement: 'cm' })),
];
export const colorConditionSchema = (): Schema[] => [row(text('state'), text('color'))];

// The texts of the fields, in the language of the editor (see Translator in localize/editor.ts). A
// field can name its own texts (label_key, helper_key), when its name is used elsewhere with another
// meaning.
export const labelFor =
  (lookup: (key: string) => string | undefined) =>
  (schema: Schema): string =>
    schema.label_text ?? lookup('labels.' + (schema.label_key || schema.name)) ?? schema.name;
export const helperFor =
  (lookup: (key: string) => string | undefined) =>
  (schema: Schema): string | undefined =>
    lookup('helpers.' + (schema.helper_key || schema.name));

// The labels of the menus, in the language of the editor.
export const localizeSchema = (schemas: Schema[], lookup: (key: string) => string | undefined): Schema[] =>
  schemas.map((schema) => {
    if (schema.schema) return { ...schema, schema: localizeSchema(schema.schema, lookup) };
    const select = schema.selector && schema.selector.select;
    if (!schema.options_key || !select) return schema;
    const options = select.options.map((o: any) => ({ value: o.value, label: lookup(schema.options_key + '.' + o.value) ?? o.label }));
    return { ...schema, selector: { select: { ...select, options } } };
  });

// Vectors shown under a heading (a grid has no label of its own): the text headings.<name>, with _
// for the . of a vector inside an options block.
export const VECTOR_HEADINGS = ['camera_position', 'camera_target', 'camera_rotate', 'light.light_direction', 'info.position', 'tracker.sensor_position'];
export const headingKey = (name: string): string => 'headings.' + name.replace('.', '_');
