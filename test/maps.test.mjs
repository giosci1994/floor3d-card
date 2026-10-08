// Tests of src/maps.ts: sensor maps, alarms and climate. npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  PRESET_MAPS,
  activeAlarms,
  alarmKind,
  climateAction,
  climateTarget,
  colorAt,
  legendGradient,
  mapScales,
  normalizeUnit,
  roomReading,
  roomSensors,
} from '../src/maps.ts';

const scale = (key, config = {}) => mapScales(config).find((s) => s.key === key);
const sensor = (state, unit, extra = {}) => ({ state: String(state), attributes: { unit_of_measurement: unit, ...extra } });

test('colours: the stops, mixed in between, kept outside the range', () => {
  const stops = [
    [0, '#000000'],
    [10, '#ff0000'],
    [20, '#ffffff'],
  ];
  assert.equal(colorAt(stops, -5), '#000000');
  assert.equal(colorAt(stops, 10), '#ff0000');
  assert.equal(colorAt(stops, 5), '#800000');
  assert.equal(colorAt(stops, 15), '#ff8080');
  assert.equal(colorAt(stops, 99), '#ffffff');
  assert.equal(legendGradient(stops), 'linear-gradient(to right, #000000 0%, #ff0000 50%, #ffffff 100%)');
});

test('units: the spellings of the same unit', () => {
  assert.equal(normalizeUnit('µg/m³'), 'µg/m³');
  assert.equal(normalizeUnit('μg/m³'), 'µg/m³'); // Greek mu
  assert.equal(normalizeUnit('ug/m3'), 'µg/m³');
  assert.equal(normalizeUnit(' kW '), 'kw');
  assert.equal(normalizeUnit(undefined), '');
});

test('readings: converted to the unit of the map, averaged or added up', () => {
  // formaldehyde in mg/m³ and in ppb
  assert.equal(Math.round(roomReading(scale('hcho'), [sensor('0.05', 'mg/m³')]).value), 50);
  assert.equal(Math.round(roomReading(scale('hcho'), [sensor('40', 'ppb')]).value), 49);
  // the plugs of a room are added up, kW included; unavailable ones don't count
  const power = roomReading(scale('power'), [sensor('120', 'W'), sensor('1.5', 'kW'), sensor('unavailable', 'W')]);
  assert.equal(power.value, 1620);
  assert.equal(power.unit, 'W');
  // humidity is averaged
  assert.equal(roomReading(scale('humidity'), [sensor('40', '%'), sensor('50', '%')]).value, 45);
  // no sensor with a number: no reading
  assert.equal(roomReading(scale('co2'), [sensor('unknown', 'ppm'), undefined]), undefined);
});

test('readings: a VOC index without unit has its own scale', () => {
  const r = roomReading(scale('voc'), [sensor('180', undefined)]);
  assert.equal(r.value, 180);
  assert.equal(r.unit, '');
  assert.equal(r.stops[0][0], 100);
  const ppb = roomReading(scale('voc'), [sensor('100', 'ppb')]);
  assert.equal(ppb.value, 450);
  assert.equal(ppb.unit, 'µg/m³');
});

test('maps of the configuration: a preset with other limits, a new map, reserved keys', () => {
  const co2 = scale('co2', { maps: [{ key: 'co2', min: 400, max: 1400 }] });
  assert.equal(co2.stops[0][0], 400);
  assert.equal(co2.stops[co2.stops.length - 1][0], 1400);
  assert.equal(co2.stops[0][1], PRESET_MAPS.find((p) => p.key === 'co2').stops[0][1], 'same colours');
  const fridge = scale('fridge', { maps: [{ key: 'fridge', name: 'Fridge', unit: '°C', min: '2', max: '8', colors: ['#0000ff', '#ff0000'] }] });
  assert.deepEqual(fridge.stops, [
    [2, '#0000ff'],
    [8, '#ff0000'],
  ]);
  assert.equal(fridge.name, 'Fridge');
  assert.equal(fridge.aggregate, 'mean');
  const stops = scale('noise', { maps: [{ key: 'noise', stops: [[60, '#00ff00'], [30, '#0000ff'], [45, 'blue']] }] });
  assert.deepEqual(stops.stops, [
    [30, '#0000ff'],
    [60, '#00ff00'],
  ], 'sorted, invalid colours left out');
  assert.equal(scale('temperature', { maps: [{ key: 'temperature', min: 0, max: 1 }] }), undefined, 'reserved key');
  assert.equal(mapScales({}).length, PRESET_MAPS.length);
});

test('sensors of a room: one id or a list', () => {
  assert.deepEqual(roomSensors({ power: 'sensor.a' }, 'power'), ['sensor.a']);
  assert.deepEqual(roomSensors({ power: ['sensor.a', '', 'sensor.b'] }, 'power'), ['sensor.a', 'sensor.b']);
  assert.deepEqual(roomSensors({}, 'power'), []);
});

test('alarms: the kind from the device class, the most serious first', () => {
  assert.equal(alarmKind('moisture').key, 'water');
  assert.equal(alarmKind('smoke').key, 'smoke');
  assert.equal(alarmKind(undefined).key, 'generic');
  const on = activeAlarms([
    { state: 'on', attributes: { device_class: 'moisture' } },
    { state: 'off', attributes: { device_class: 'gas' } },
    { state: 'on', attributes: { device_class: 'smoke' } },
    { state: 'Detected', attributes: {} },
  ]);
  assert.deepEqual(
    on.map((a) => a.key),
    ['smoke', 'generic', 'water'],
  );
});

test('climate: hvac_action, then the mode and the temperatures, then on/off', () => {
  const climate = (state, attributes) => ({ entity_id: 'climate.living', state, attributes });
  assert.equal(climateAction(climate('heat', { hvac_action: 'heating' })), 'heat');
  assert.equal(climateAction(climate('heat', { hvac_action: 'idle' })), null);
  assert.equal(climateAction(climate('cool', { hvac_action: 'cooling' })), 'cool');
  assert.equal(climateAction(climate('heat', { current_temperature: 19, temperature: 21 })), 'heat');
  assert.equal(climateAction(climate('heat', { current_temperature: 22, temperature: 21 })), null);
  assert.equal(climateAction(climate('heat_cool', { current_temperature: 26, target_temp_low: 20, target_temp_high: 24 })), 'cool');
  assert.equal(climateAction(climate('off', { current_temperature: 15, temperature: 21 })), null);
  assert.equal(climateAction(climate('unavailable', {})), null);
  assert.equal(climateAction({ entity_id: 'switch.boiler', state: 'on', attributes: {} }), 'heat');
  assert.equal(climateAction({ entity_id: 'switch.ac', state: 'on', attributes: {} }, 'cool'), 'cool');
  assert.equal(climateAction({ entity_id: 'switch.boiler', state: 'off', attributes: {} }), null);
  const f = (n) => String(n);
  assert.equal(climateTarget(climate('heat', { temperature: 21.5 }), f), '21.5');
  assert.equal(climateTarget(climate('heat_cool', { target_temp_low: 20, target_temp_high: 24 }), f), '20–24');
  assert.equal(climateTarget(climate('off', { temperature: 21 }), f), undefined);
});
