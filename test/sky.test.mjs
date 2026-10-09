// Tests of src/sky.ts and src/weather.ts: npm test (Node 22 or newer).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { moonPath, moonPhase, moonSvg, nightSky, skyBackground, skyColors, skyGradient, starsSvg, weatherClouds } from '../src/sky.ts';
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

test('night: the stars come out after the sunset, the moon from the sunset; clouds hide them', () => {
  assert.deepEqual(nightSky(20), { stars: 0, moon: 0 }, 'day');
  assert.deepEqual(nightSky(NaN), { stars: 0, moon: 0 }, 'without the sun: the day');
  assert.equal(nightSky(-1).stars, 0, 'just after the sunset: no stars yet');
  assert.ok(nightSky(-1).moon > 0, 'but the moon');
  assert.deepEqual(nightSky(-15), { stars: 1, moon: 1 }, 'night');
  assert.ok(nightSky(-7).stars > 0 && nightSky(-7).stars < 1, 'twilight: some');
  assert.equal(nightSky(-15, 1).stars, 0, 'overcast: no stars');
  assert.ok(nightSky(-15, 1).moon > 0 && nightSky(-15, 1).moon < 0.25, 'overcast: a glow of the moon');
  for (let e = 0; e >= -20; e -= 0.5) assert.ok(Math.abs(nightSky(e).stars * 50 - Math.round(nightSky(e).stars * 50)) < 1e-9, 'steps of 0.02');
});

test('moon: phase from the date (real new and full moons), the lit side', () => {
  const near = (a, b) => Math.min(Math.abs(a - b), 1 - Math.abs(a - b)) < 0.03;
  assert.ok(near(moonPhase(new Date('2024-04-08T18:21:00Z')), 0), 'new moon of the eclipse');
  assert.ok(near(moonPhase(new Date('2024-04-15T19:13:00Z')), 0.25), 'first quarter');
  assert.ok(near(moonPhase(new Date('2024-04-23T23:49:00Z')), 0.5), 'full moon');
  assert.ok(near(moonPhase(new Date('2024-05-01T11:27:00Z')), 0.75), 'last quarter');
  assert.ok(near(moonPhase(new Date('1999-12-22T17:31:00Z')), 0.5), 'before the reference new moon too');
  assert.equal(moonPath(0.25, 18), 'M0 -18A18 18 0 0 1 0 18A0 18 0 0 0 0 -18Z', 'half: a straight edge');
  assert.match(moonPath(0.1, 18), /A14\.56 18 0 0 0 0 -18Z$/, 'crescent: the edge bulges out');
  assert.match(moonPath(0.4, 18), /A14\.56 18 0 0 1 0 -18Z$/, 'gibbous: the edge bulges in');
  assert.ok(!moonSvg(0.3).includes('scale(-1 1)'), 'growing: lit on the right');
  assert.ok(moonSvg(0.7).includes('scale(-1 1)'), 'waning: lit on the left');
  assert.ok(moonSvg(0.3, true).includes('scale(-1 1)'), 'south of the equator: the other way round');
  assert.ok(moonSvg(0.5, false, 0.4).includes('opacity="0.4"'));
});

test('sky background: at night the stars and the moon over the gradient, by day only the gradient', () => {
  const gradient = skyGradient(skyColors(30));
  assert.equal(skyBackground(30, 0, { stars: true, moon: true, phase: 0.5 }), gradient);
  const night = skyBackground(-20, 0, { stars: true, moon: true, phase: 0.5 });
  const layers = night.split(/, (?=url|linear)/);
  assert.equal(layers.length, 3);
  assert.match(layers[0], /^url\("data:image\/svg\+xml,.*"\) 78% 12% \/ 83px 83px no-repeat$/, 'the moon first, over the stars: a disc of 30 px');
  assert.match(layers[1], /^url\("data:image\/svg\+xml,.*"\) 0 0 \/ 1600px 900px repeat-x$/);
  assert.equal(layers[2], skyGradient(skyColors(-20)));
  assert.ok(!/["#<>]/.test(layers[0].slice(5, -40)), 'the picture is encoded');
  const pictures = (background) => (background.match(/url\("data/g) || []).length;
  assert.equal(pictures(night), 2);
  assert.equal(pictures(skyBackground(-20, 0, { stars: false, moon: true, phase: 0.5 })), 1, 'stars_show: no');
  assert.ok(skyBackground(-20, 0, { stars: true, moon: false, phase: 0.5 }).includes('repeat-x'), 'moon_show: no');
  assert.equal(pictures(skyBackground(-20, 0, { stars: true, moon: false, phase: 0.5 })), 1);
  assert.equal(skyBackground(-20, 0, {}), skyGradient(skyColors(-20)), 'neither');
  assert.equal(
    skyBackground(-20, 0, { moon: true, phase: 0.5 }),
    skyBackground(-20, 0, { moon: true, phase: 0.502 }),
    'the moon changes picture rarely',
  );
  assert.match(skyBackground(-20, 0, { moon: true, phase: 0.5, moonSize: 60 }), / 167px 167px no-repeat/, 'moon_size: 60');
  assert.equal(starsSvg(), starsSvg(), 'always the same stars');
  assert.equal((starsSvg().match(/<circle/g) || []).length, 280);
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
