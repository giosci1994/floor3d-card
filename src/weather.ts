// The forecast box (weather: weather.home): icons, forecast types and labels. No three.js and no
// Home Assistant: the tests run in Node.

// The icons Home Assistant gives the conditions of the weather.
const ICONS: { [condition: string]: string } = {
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  exceptional: 'mdi:alert-circle-outline',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  pouring: 'mdi:weather-pouring',
  rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
};

// At night (is_daytime false in hourly and twice daily forecasts) the sun becomes the moon.
export function weatherIcon(condition?: string, daytime?: boolean): string {
  if (daytime === false && condition === 'sunny') return 'mdi:weather-night';
  if (daytime === false && condition === 'partlycloudy') return 'mdi:weather-night-partly-cloudy';
  return (condition && ICONS[condition]) || 'mdi:weather-cloudy-alert';
}

export type ForecastType = 'daily' | 'hourly' | 'twice_daily';
const FEATURES: [ForecastType, number][] = [
  ['daily', 1],
  ['hourly', 2],
  ['twice_daily', 4],
];

// The forecast to ask for: the one wanted if the entity has it, else the first one it has (its
// supported_features say which).
export function forecastType(wanted: string | undefined, supportedFeatures: unknown): ForecastType {
  const features = Number(supportedFeatures) || 0;
  const has = (type: ForecastType) => FEATURES.some(([t, bit]) => t === type && (features & bit) !== 0);
  const want = (FEATURES.find(([t]) => t === wanted) || FEATURES[0])[0];
  if (has(want)) return want;
  const first = FEATURES.find(([t]) => has(t));
  return first ? first[0] : want;
}

// The label of a forecast: the day of the week, or the hour for hourly forecasts.
export function forecastLabel(datetime: string, type: ForecastType, language: string, timeZone?: string): string {
  const date = new Date(datetime);
  if (isNaN(date.getTime())) return '';
  const options: Intl.DateTimeFormatOptions = type === 'hourly' ? { hour: 'numeric' } : { weekday: 'short' };
  try {
    return new Intl.DateTimeFormat(language, { ...options, ...(timeZone ? { timeZone } : {}) }).format(date);
  } catch {
    return new Intl.DateTimeFormat('en', options).format(date);
  }
}

// Temperatures without decimals, as weather cards show them.
export const formatDegrees = (value: unknown): string => {
  const n = Number(value);
  return value === null || value === undefined || value === '' || isNaN(n) ? '' : Math.round(n) + '°';
};
