import * as en from './editor/en.json';
import * as it from './editor/it.json';
import * as de from './editor/de.json';

// Texts of the card editor in each language, loaded with the editor only. A text missing in a
// language is the English one. The language comes from pickLanguage (localize.ts).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = { en, it, de };

export interface Translator {
  // The text of key ('labels.lumens'), with {name} replaced by vars.name; the key when there is none.
  t: (key: string, vars?: { [name: string]: string | number }) => string;
  // The text of key, or undefined when there is none (help texts are optional).
  lookup: (key: string) => string | undefined;
}

const find = (texts: any, key: string): any => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), texts);

export function translator(language: string): Translator {
  const texts = languages[language] || en;
  const lookup = (key: string): string | undefined => {
    const text = find(texts, key) ?? find(en, key);
    return typeof text === 'string' ? text : undefined;
  };
  const t = (key: string, vars: { [name: string]: string | number } = {}): string =>
    (lookup(key) ?? key).replace(/\{(\w+)\}/g, (all, name) => (name in vars ? String(vars[name]) : all));
  return { t, lookup };
}
