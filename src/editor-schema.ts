/* eslint-disable @typescript-eslint/no-explicit-any */
// Fields of the editor, as ha-form schemas, with their labels and help texts.
// The defaults written in the help texts are the values the card uses when an option is missing.

export type Schema = any;

const text = (name: string, options: any = {}): Schema => ({ name, selector: { text: options } });
const num = (name: string, options: any = {}): Schema => ({
  name,
  selector: { number: { mode: 'box', step: 'any', ...options } },
});
const bool = (name: string): Schema => ({ name, selector: { boolean: {} } });
const choice = (name: string, options: [string, string][]): Schema => ({
  name,
  selector: { select: { mode: 'dropdown', options: options.map(([value, label]) => ({ value, label })) } },
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
  key: string;
  title: string;
  icon: string;
  // Fields and headings, in order; a heading is a string.
  content: (config: any) => (Schema[] | string)[];
}

export const SECTIONS: Section[] = [
  {
    key: 'model',
    title: '3D model',
    icon: 'mdi:cube-outline',
    content: () => [
      [text('name'), bool('header')],
      [text('path'), row(text('objfile'), text('mtlfile')), text('objectlist')],
      [row(text('backgroundColor'), text('style'))],
    ],
  },
  {
    key: 'view',
    title: 'Camera and navigation',
    icon: 'mdi:camera-outline',
    content: () => [
      'Initial view',
      [vector('camera_position')],
      [vector('camera_target')],
      [vector('camera_rotate')],
      [row(bool('lock_camera'), bool('hideZoomMenu')), row(bool('hideLevelsMenu'), num('initialLevel', { step: 1 }))],
      [
        {
          name: 'url_parameters',
          type: 'grid',
          column_min_width: '140px',
          schema: [{ ...text('zoom'), label: 'View from the page address', helper: 'A parameter name, e.g. area: ?area=kitchen shows the view kitchen' }],
        },
      ],
      'North (orients the sun)',
      [vector('north', ['x', 'z'])],
    ],
  },
  {
    key: 'light',
    title: 'Light and shadows',
    icon: 'mdi:lightbulb-on-outline',
    content: (config) => [
      [
        row(text('globalLightPower'), num('light_power', { min: 0 })),
        row(num('exposure', { min: 0 }), choice('tone_mapping', [['neutral', 'Neutral'], ['agx', 'AgX'], ['aces', 'ACES Filmic'], ['linear', 'Linear']])),
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
    key: 'interaction',
    title: 'Interaction',
    icon: 'mdi:gesture-tap',
    content: (config) => [
      [row(bool('click'), bool('editModeNotifications')), row(bool('selectionMode'), bool('show_axes')), bool('overlay')],
      ...(config.overlay === 'yes' || config.overlay === true
        ? [
            'Overlay',
            [
              row(text('overlay_bgcolor'), text('overlay_fgcolor')),
              row(
                choice('overlay_alignment', [
                  ['top-left', 'Top left'],
                  ['top-right', 'Top right'],
                  ['bottom-left', 'Bottom left'],
                  ['bottom-right', 'Bottom right'],
                ]),
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
    title: 'State colours and room maps',
    icon: 'mdi:palette-outline',
    content: () => [
      [
        bool('state_colors'),
        row(text('open_color'), text('alarm_color')),
        entity('alarm_entity', 'alarm_control_panel'),
        row(
          choice('room_colors', [
            ['none', 'None'],
            ['temperature', 'Temperature'],
            ['presence', 'Presence'],
            ['illuminance', 'Illuminance'],
          ]),
          text('presence_color'),
        ),
        row(num('temperature_min'), num('temperature_max')),
        row(num('illuminance_min', { min: 0 }), num('illuminance_max', { min: 0 })),
      ],
      'rooms',
    ],
  },
  {
    key: 'rendering',
    title: 'Rendering',
    icon: 'mdi:tune-variant',
    content: () => [
      [row(num('max_pixel_ratio', { min: 0.5, max: 4 }), bool('log_depth')), bool('reversed_depth'), text('draco_decoder_path')],
    ],
  },
];

export const TYPES: [string, string, string][] = [
  ['light', 'Light', 'mdi:lightbulb-outline'],
  ['hide', 'Hidden in a state', 'mdi:eye-off-outline'],
  ['show', 'Shown in a state', 'mdi:eye-outline'],
  ['color', 'Colour by state', 'mdi:palette-outline'],
  ['text', 'Text', 'mdi:format-text'],
  ['room', 'Room label and colour', 'mdi:floor-plan'],
  ['door', 'Door or window', 'mdi:door-open'],
  ['cover', 'Cover (roller shutter)', 'mdi:window-shutter'],
  ['rotate', 'Rotating object (fan)', 'mdi:fan'],
  ['gesture', 'Service on tap', 'mdi:gesture-tap'],
  ['camera', 'Camera', 'mdi:cctv'],
  ['image', 'Picture (TV screen)', 'mdi:television'],
  ['info', 'Info box', 'mdi:information-outline'],
  ['shower', 'Shower', 'mdi:shower-head'],
  ['tracker', 'Person tracker', 'mdi:account-search-outline'],
];

const ACTIONS: [string, string][] = [
  ['more-info', 'Show the entity details'],
  ['overlay', 'Show the state in the overlay'],
  ['default', 'Default (toggle a light, run the service, open the camera)'],
];

// First fields of an entity (object_id is added by the editor, with the objects of the model).
export const entitySchema = (): Schema[] => [
  entity('entity'),
  { name: 'type3d', selector: { select: { mode: 'dropdown', options: TYPES.map(([value, label]) => ({ value, label })) } } },
];
export const entityActionsSchema = (): Schema[] => [
  row(choice('action', ACTIONS), choice('long_press_action', ACTIONS)),
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
              choice('shadow', [
                ['yes', 'Yes'],
                ['no', 'No'],
              ]),
              choice('vertical_alignment', [
                ['top', 'Top'],
                ['middle', 'Middle'],
                ['bottom', 'Bottom'],
              ]),
            ],
          },
        ],
        // A lamp made of several objects: one light for them all.
        [{ name: 'light', type: 'grid', column_min_width: '140px', schema: [bool('single'), ...(single ? [objectField('light_object', parts.length ? parts : objects)] : [])] }],
        'Spot (optional)',
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
              choice('doortype', [
                ['swing', 'Swing'],
                ['slide', 'Slide'],
              ]),
              choice('side', [
                ['left', 'Left'],
                ['right', 'Right'],
                ['up', 'Up'],
                ['down', 'Down'],
              ]),
              choice('direction', [
                ['inner', 'Inner'],
                ['outer', 'Outer'],
              ]),
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
              choice('side', [
                ['up', 'Up'],
                ['down', 'Down'],
              ]),
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
              choice('axis', [
                ['x', 'X'],
                ['y', 'Y'],
                ['z', 'Z'],
              ]),
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
              choice('label_text', [
                ['state', 'State'],
                ['template', 'Template'],
              ]),
              text('attribute'),
              num('width', { min: 0 }),
              num('height', { min: 0 }),
            ],
          },
        ],
        'Label text',
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
        'Room light from the picture',
        [
          {
            name: 'image',
            type: 'grid',
            column_min_width: '140px',
            schema: [
              num('lighting_lumens', { min: 0 }),
              choice('lighting_direction', [
                ['positive_z', '+Z'],
                ['negative_z', '−Z'],
                ['positive_x', '+X'],
                ['negative_x', '−X'],
                ['positive_y', '+Y'],
                ['negative_y', '−Y'],
              ]),
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
              choice('unit', [
                ['mm', 'mm'],
                ['cm', 'cm'],
                ['m', 'm'],
              ]),
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
export const zoomSchema = (): Schema[] => [row(text('zoom'), num('level', { step: 1 }))];
export const zoomObjectSchema = (objects: string[]): Schema[] => [
  row(objectField('object_id', objects), num('distance', { min: 0, unit_of_measurement: 'cm' })),
];
export const colorConditionSchema = (): Schema[] => [row(text('state'), text('color'))];

const LABELS: { [name: string]: string } = {
  name: 'Name',
  header: 'Show the header',
  path: 'Folder of the model',
  objfile: 'Model file (.obj or .glb)',
  mtlfile: 'Materials file (.mtl)',
  objectlist: 'Object list (JSON file)',
  backgroundColor: 'Background colour',
  style: 'Canvas style (CSS)',
  x: 'X',
  y: 'Y',
  z: 'Z',
  lock_camera: 'Lock the camera',
  hideZoomMenu: 'Buttons instead of the Views menu',
  hideLevelsMenu: 'Hide the levels menu',
  initialLevel: 'Initial level',
  globalLightPower: 'Light following the camera',
  light_power: 'Lamp power',
  exposure: 'Exposure',
  tone_mapping: 'Tone mapping',
  shadow: 'Shadows',
  extralightmode: 'Extra light mode',
  sun: 'Sunlight',
  sun_entity: 'Sun entity',
  sun_power: 'Sun power',
  sun_shadow: 'Sun shadows',
  sky_power: 'Sky light',
  sky_color: 'Sky colour',
  ground_color: 'Ground colour',
  click: 'Tap runs the action',
  editModeNotifications: 'Object names on double click (dashboard in edit mode)',
  selectionMode: 'Selection mode',
  show_axes: 'Show the axes',
  overlay: 'Overlay',
  overlay_bgcolor: 'Background colour',
  overlay_fgcolor: 'Text colour',
  overlay_alignment: 'Position',
  overlay_width: 'Width',
  overlay_height: 'Height',
  overlay_font: 'Font',
  overlay_fontsize: 'Font size',
  state_colors: 'Colour open doors and windows',
  open_color: 'Colour when open',
  alarm_color: 'Colour when the alarm is armed',
  alarm_entity: 'Alarm',
  room_colors: 'Initial room map',
  presence_color: 'Presence colour',
  temperature_min: 'Temperature for blue',
  temperature_max: 'Temperature for red',
  illuminance_min: 'Lux for dark blue',
  illuminance_max: 'Lux for yellow',
  max_pixel_ratio: 'Maximum pixel ratio',
  log_depth: 'Logarithmic depth buffer',
  reversed_depth: 'Reversed depth buffer',
  entity: 'Entity',
  type3d: 'Type',
  object_id: 'Object',
  action: 'Tap action',
  long_press_action: 'Long press action',
  entity_template: 'Entity template',
  lumens: 'Lumens',
  color: 'Colour',
  decay: 'Decay',
  distance: 'Distance',
  vertical_alignment: 'Vertical position',
  light_target: 'Spot target object',
  single: 'One light for all the objects',
  light_object: 'Light on the object',
  angle: 'Spot angle',
  doortype: 'Door type',
  side: 'Side',
  direction: 'Direction',
  degrees: 'Opening angle (swing)',
  percentage: 'Opening (slide)',
  hinge: 'Hinge object',
  pane: 'Pane object',
  axis: 'Axis',
  round_per_second: 'Rounds per second',
  ramp: 'Spin-up and coast-down',
  draco_decoder_path: 'Draco decoder folder',
  transparency: 'Transparency',
  elevation: 'Height of the room',
  label: 'Label',
  label_text: 'Label shows',
  attribute: 'Attribute',
  width: 'Width',
  height: 'Height',
  font: 'Font',
  span: 'Width of the text',
  textfgcolor: 'Text colour',
  textbgcolor: 'Background colour',
  state: 'State',
  domain: 'Service domain',
  service: 'Service',
  mirror: 'Mirror',
  lighting_lumens: 'Lumens',
  lighting_direction: 'Direction',
  lighting_distance: 'Distance',
  lighting_off_state: 'Off in state',
  lighting_shadow: 'Shadows',
  text: 'Text or template',
  size: 'Size',
  velocity: 'Speed',
  count: 'Drops',
  sensor_x: 'X sensor',
  sensor_y: 'Y sensor',
  unit: 'Unit of the coordinates',
  scale: 'Scale',
  flip_x: 'Mirror X',
  flip_y: 'Mirror Y',
  zone: 'Zone entity',
  sensor_rotation: 'Sensor rotation',
  object_group: 'Group name',
  temperature: 'Temperature sensor',
  illuminance: 'Illuminance sensor',
  presence: 'Presence entities',
  zoom: 'Name',
  level: 'Level',
};

const HELPERS: { [name: string]: string } = {
  path: 'For example /local/floor3d/',
  objectlist: 'Optional: a JSON list of the object names, for the object menus',
  backgroundColor: 'A colour, #rrggbb or transparent. Default #aaaaaa',
  globalLightPower: 'From 0 to 1, or a numeric sensor. Default 0.2',
  light_power: 'Multiplies all the lamps. Default 1',
  exposure: 'Default 1',
  sun_power: 'A number or a numeric sensor, to dim it with clouds. Default 1',
  sky_power: 'Fills the shade, without shadows: a number or a numeric sensor. Default 0 (off)',
  sky_color: 'Light from above. Default #e6eeff',
  ground_color: 'Light from below. Default #706458',
  extralightmode: 'Only the lights that are on cast shadows',
  click: 'Off: a double click runs it',
  selectionMode: 'Taps color the objects and list them, to build groups',
  max_pixel_ratio: 'Default 2',
  temperature_min: 'Default 17',
  temperature_max: 'Default 27',
  illuminance_min: 'Default 5 (the scale is logarithmic)',
  illuminance_max: 'Default 1000',
  entity_template: 'JavaScript between [[[ ]]], $entity is the state',
  lumens: 'Default 800',
  decay: 'Default 2',
  distance: 'Default 600 cm',
  single: 'For a lamp made of several objects: fewer lights and shadows',
  light_object: 'Empty: in the middle of all the objects',
  round_per_second: '2 or less',
  ramp: 'Seconds to full speed or to stop. Default 1.5, 0 for none',
  objfile: 'A .glb can be compressed with Draco or meshopt',
  draco_decoder_path: 'Only for .glb models compressed with Draco. Default: Google CDN',
  span: 'Of the object, in %',
  lighting_off_state: 'Default off, standby, unavailable, unknown',
  scale: 'Default 0.001',
  text: 'A text or a template',
};

// A field can bring its own label and help text, when its name is used elsewhere with another meaning.
export const computeLabel = (schema: Schema): string => schema.label ?? LABELS[schema.name] ?? schema.name;
export const computeHelper = (schema: Schema): string | undefined => schema.helper ?? HELPERS[schema.name];

export const HEADINGS: { [key: string]: string } = {
  camera_position: 'Camera position',
  camera_target: 'Camera target',
  camera_rotate: 'Camera rotation',
  'light.light_direction': 'Spot direction',
  'info.position': 'Position (optional)',
  'tracker.sensor_position': 'Sensor position',
};
