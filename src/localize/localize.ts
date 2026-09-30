import * as en from './languages/en.json';
import * as nb from './languages/nb.json';
import * as it from './languages/it.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  nb: nb,
  it: it,
};

// language: the one of Home Assistant when known (hass.language), otherwise the saved choice.
export function localize(string: string, search = '', replace = '', language?: string): string {
  const lang = (language || localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
