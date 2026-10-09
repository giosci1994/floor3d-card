// Language files: every text the code asks for exists in English, the other languages have no
// keys English doesn't, and their {placeholders} are the same. npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import {
  SECTIONS,
  TYPES,
  VECTOR_HEADINGS,
  entityActionsSchema,
  entitySchema,
  mapSchema,
  personSchema,
  roomAlarmsSchema,
  roomSchema,
  roomSensorsSchema,
  typeSchema,
} from '../src/editor-schema.ts';

const read = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), 'utf8'));
const flat = (o, p = '', out = {}) => {
  Object.entries(o).forEach(([k, v]) => (v && typeof v === 'object' ? flat(v, p + k + '.', out) : (out[p + k] = v)));
  return out;
};
const placeholders = (text) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

for (const [dir, languages] of [['../src/localize/languages/', ['it', 'de', 'nb']], ['../src/localize/editor/', ['it', 'de']]]) {
  const en = flat(read(dir + 'en.json'));
  for (const lang of languages) {
    test(`${dir}${lang}.json: keys and placeholders of English`, () => {
      const texts = flat(read(dir + lang + '.json'));
      for (const [key, text] of Object.entries(texts)) {
        assert.ok(key in en, 'not in English: ' + key);
        assert.equal(placeholders(text), placeholders(en[key]), 'placeholders of ' + key);
      }
    });
  }
}

test('card: every common.* key the card asks for is in English', () => {
  const en = flat(read('../src/localize/languages/en.json'));
  const src = fs.readFileSync(new URL('../src/floor3d-card.ts', import.meta.url), 'utf8');
  // Keys built from a name ('map_' + key) are checked below, with the names they are built from.
  const keys = [...src.matchAll(/_t\(\s*'(\w+)'/g)].map((m) => 'common.' + m[1]).filter((k) => !k.endsWith('_'));
  const ternary = [...src.matchAll(/_t\([^)]*\? '(\w+)' : '(\w+)'/g)].flatMap((m) => ['common.' + m[1], 'common.' + m[2]]);
  assert.ok(keys.length > 10);
  for (const key of [...keys, ...ternary]) assert.ok(key in en, 'missing: ' + key);
});

test('card: every map and every kind of alarm has its name in every language', async () => {
  const { PRESET_MAPS, alarmKind } = await import('../src/maps.ts');
  const kinds = ['smoke', 'gas', 'carbon_monoxide', 'heat', 'moisture', 'cold', 'safety', 'problem', 'tamper', undefined].map((d) => alarmKind(d).key);
  for (const lang of ['en', 'it', 'de', 'nb']) {
    const texts = flat(read('../src/localize/languages/' + lang + '.json'));
    for (const key of ['temperature', 'presence', 'illuminance', ...PRESET_MAPS.map((p) => p.key)]) assert.ok('common.map_' + key in texts, lang + ': map_' + key);
    for (const kind of kinds) assert.ok('common.alarm_' + kind in texts, lang + ': alarm_' + kind);
  }
});

test('card: the boxes have their texts in every language: the kinds of the status box, the states of the alarm panel', async () => {
  const { STATUS_KINDS, PANEL_STATES } = await import('../src/boxes.ts');
  for (const lang of ['en', 'it', 'de', 'nb']) {
    const texts = flat(read('../src/localize/languages/' + lang + '.json'));
    for (const kind of STATUS_KINDS) assert.ok('common.status_' + kind in texts, lang + ': status_' + kind);
    for (const state of Object.keys(PANEL_STATES)) assert.ok('common.panel_' + state in texts, lang + ': panel_' + state);
  }
});

test('editor: every text the editor asks for is in English', () => {
  const en = flat(read('../src/localize/editor/en.json'));
  const src = fs.readFileSync(new URL('../src/editor.ts', import.meta.url), 'utf8');
  const keys = [...src.matchAll(/_t\(\s*'([\w.]+)'/g)].map((m) => m[1]).filter((k) => !k.endsWith('.') && !k.endsWith('_'));
  const ternary = [...src.matchAll(/_t\([^)]*\? '([\w.]+)' : '([\w.]+)'/g)].flatMap((m) => [m[1], m[2]]);
  for (const key of [...keys, ...ternary]) assert.ok(key in en, 'missing: ' + key);
  // Keys built from names: sections, types, list titles, vectors.
  SECTIONS.forEach((s) => assert.ok('sections.' + s.key in en, s.key));
  TYPES.forEach(([type]) => assert.ok('types.' + type in en, type));
  ['entities', 'object_groups', 'zoom_areas', 'rooms', 'maps', 'people'].forEach((list) => assert.ok('ui.title_' + list in en, list));
  VECTOR_HEADINGS.forEach((name) => assert.ok('headings.' + name.replace('.', '_') in en, name));
});

test('editor: every field, menu entry and heading has its English text', () => {
  const en = flat(read('../src/localize/editor/en.json'));
  const config = { sun: 'yes', overlay: 'yes', shadow: 'yes', sky_power: 1 };
  const contents = [
    ...SECTIONS.map((s) => s.content(config)),
    ...TYPES.map(([type]) => typeSchema(type, [], { light: { single: 'yes' } })),
    [entitySchema(), entityActionsSchema(), roomSchema([]), roomSensorsSchema(), roomAlarmsSchema(), mapSchema(), personSchema()],
  ].flat();
  const walk = (schema) => {
    if (typeof schema === 'string') {
      if (!['sun_roof', 'rooms', 'maps', 'colorcondition', 'shadow_status'].includes(schema)) {
        assert.ok(('headings.' + schema.replace('.', '_')) in en, 'heading ' + schema);
      }
      return;
    }
    if (Array.isArray(schema)) return schema.forEach(walk);
    if (schema.schema) return walk(schema.schema);
    assert.ok('labels.' + (schema.label_key || schema.name) in en, 'label ' + schema.name);
    const select = schema.selector && schema.selector.select;
    if (schema.options_key && select) select.options.forEach((o) => assert.ok(schema.options_key + '.' + o.value in en, schema.options_key + '.' + o.value));
  };
  walk(contents);
});
