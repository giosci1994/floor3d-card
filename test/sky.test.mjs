// Tests of src/sky.ts and src/weather.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { skyColors, skyGradient, weatherClouds } from '../src/sky.ts';
import { forecastLabel, forecastType, formatDegrees, weatherIcon } from '../src/weather.ts';

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const light = (hex) => rgb(hex).reduce((a, b) => a + b, 0) / 3;
const saturation = (hex) => Math.max(...rgb(hex)) - Math.min(...rgb(hex));

test('sky: dark at night, orange at the horizon at sunset, light blue by day', () => {
  const [nightTop, nightHorizon] = skyColors(-30);
  const [sunsetTop, sunsetHorizon] = skyColors(0);
  const [dayTop, dayHorizon] = skyColors(50);
  assert.ok(light(nightTop) < 50 && light(nightHorizon) < 60, 'night: ' + nightTop + ' ' + nightHorizon);
  const [r, g, b] = rgb(sunsetHorizon);
  assert.ok(r > g && g > b, 'sunset: orange at the horizon, ' + sunsetHorizon);
  const [, , blue] = rgb(sunsetTop);
  assert.ok(blue > rgb(sunsetTop)[0], 'sunset: blue at the top, ' + sunsetTop);
  assert.ok(rgb(dayTop)[2] > rgb(dayTop)[0] && light(dayHorizon) > light(dayTop), 'day: blue, lighter at the horizon');
  assert.deepEqual(skyColors(NaN), skyColors(45), 'without the sun: the day');
  assert.deepEqual(skyColors(-90), skyColors(-18), 'below the night: the night');
});

test('sky: in between, the colours change little by little', () => {
  let previous = light(skyColors(-18)[0]);
  for (let e = -16; e <= 30; e += 2) {
    const top = light(skyColors(e)[0]);
    assert.ok(Math.abs(top - previous) < 20, 'jump at ' + e);
    previous = top;
  }
});

test('sky: clouds turn it grey', () => {
  const [clear] = skyColors(40);
  const [grey] = skyColors(40, 1);
  assert.ok(saturation(grey) < saturation(clear) / 2, clear + ' → ' + grey);
  assert.deepEqual(skyColors(40, 0), skyColors(40));
  assert.equal(skyGradient(['#000000', '#ffffff']), 'linear-gradient(to bottom, #000000, #ffffff)');
});

test('clouds of a weather entity: cloud_coverage, else its condition', () => {
  assert.equal(weatherClouds({ state: 'sunny', attributes: { cloud_coverage: 80 } }), 0.8);
  assert.equal(weatherClouds({ state: 'cloudy', attributes: {} }), 0.9);
  assert.equal(weatherClouds({ state: 'sunny', attributes: {} }), 0);
  assert.equal(weatherClouds({ state: 'unknown', attributes: {} }), 0);
  assert.equal(weatherClouds(undefined), 0);
});

test('weather: icons of the conditions, the moon at night', () => {
  assert.equal(weatherIcon('rainy'), 'mdi:weather-rainy');
  assert.equal(weatherIcon('sunny', false), 'mdi:weather-night');
  assert.equal(weatherIcon('partlycloudy', false), 'mdi:weather-night-partly-cloudy');
  assert.equal(weatherIcon('sunny', true), 'mdi:weather-sunny');
  assert.equal(weatherIcon('something new'), 'mdi:weather-cloudy-alert');
});

test('weather: the forecast asked for is one the entity has', () => {
  assert.equal(forecastType('daily', 3), 'daily');
  assert.equal(forecastType('hourly', 3), 'hourly');
  assert.equal(forecastType('daily', 2), 'hourly', 'only hourly');
  assert.equal(forecastType('twice_daily', 1), 'daily');
  assert.equal(forecastType(undefined, 4), 'twice_daily');
  assert.equal(forecastType('nonsense', 0), 'daily', 'features unknown: as asked, daily by default');
});

test('weather: labels and temperatures', () => {
  assert.equal(forecastLabel('2026-10-12T10:00:00+00:00', 'daily', 'en', 'UTC'), 'Mon');
  assert.equal(forecastLabel('2026-10-12T10:00:00+00:00', 'daily', 'it', 'UTC'), 'lun');
  assert.equal(forecastLabel('2026-10-12T15:00:00+00:00', 'hourly', 'de', 'UTC'), '15 Uhr');
  assert.equal(forecastLabel('not a date', 'daily', 'en'), '');
  assert.equal(formatDegrees(21.6), '22°');
  assert.equal(formatDegrees(-0.4), '0°');
  assert.equal(formatDegrees(null), '');
  assert.equal(formatDegrees(''), '');
});
