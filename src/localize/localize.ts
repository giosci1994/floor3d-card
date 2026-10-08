import * as en from './languages/en.json';
import * as it from './languages/it.json';
import * as de from './languages/de.json';
import * as nb from './languages/nb.json';

// Texts of the card in each language. The editor has its own (src/localize/editor/), loaded with it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = { en, it, de, nb };

// The language of a card, from the most specific choice: its language option, the language of the
// profile of the user in Home Assistant (hass.locale.language, hass.language before 2023), the one
// saved by the frontend. A regional variant uses the language when there is no file for it
// (de-CH: de); a language without texts is English.
export function pickLanguage(...choices: (string | undefined | null)[]): string {
  for (const choice of choices) {
    if (!choice || choice === 'auto') continue;
    const lang = String(choice).replace(/['"]+/g, '').replace('_', '-').toLowerCase();
    if (languages[lang]) return lang;
    const base = lang.split('-')[0];
    if (languages[base]) return base;
    return 'en';
  }
  return 'en';
}

function savedLanguage(): string | null {
  try {
    return localStorage.getItem('selectedLanguage');
  } catch {
    return null;
  }
}

// key: 'common.views'. {name} in the text is replaced with vars.name.
export function localize(key: string, language?: string, vars: { [name: string]: string | number } = {}): string {
  const lang = pickLanguage(language, savedLanguage());
  const find = (texts: any): any => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), texts);
  const text: string = find(languages[lang]) ?? find(languages.en) ?? key;
  return text.replace(/\{(\w+)\}/g, (all, name) => (name in vars ? String(vars[name]) : all));
}
