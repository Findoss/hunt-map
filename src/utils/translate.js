import ru from '../../public/locales/ru.json';
import en from '../../public/locales/en.json';
import fr from '../../public/locales/fr.json';
import config from '../config';

export default function t(...keys) {
  const langs = { ru, en, fr };
  let lang = config.lang;

  if (Object.keys(langs).indexOf(lang) === -1) lang = 'en';

  let tmp = langs[lang];
  keys.forEach(key => (tmp = tmp[key]));

  if (tmp === undefined) return 'null';
  return tmp;
}

export function getLocalesProp(prop) {
  const lang = config.lang;
  if (typeof prop === 'string') return prop;
  else if (!prop.hasOwnProperty(lang)) return prop['en'];
  return prop[lang];
}
