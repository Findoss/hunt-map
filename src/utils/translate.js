import ru from '../../public/locales/ru.json';
import en from '../../public/locales/en.json';
import config from '../config';

export default function t(...keys) {
  const langs = { ru, en };
  const lang = config.lang;

  let tmp = langs[lang];
  keys.forEach(key => (tmp = tmp[key]));

  if (tmp === undefined) return 'null translate';
  return tmp;
}
