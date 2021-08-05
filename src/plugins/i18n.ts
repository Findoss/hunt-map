import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { langDetector } from './langDetector';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(langDetector);

export default i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    preload: ['en'],
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
