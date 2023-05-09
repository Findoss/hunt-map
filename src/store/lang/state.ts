import { getUrlData } from 'utils/URL';

export type LangList = Record<string, string>;
export type LangState = {
  lang: string;
  supportedLangs: LangList;
};

export const initialState: LangState = {
  lang: getUrlData().path[0] || 'en',
  supportedLangs: {
    en: 'English',
    // ru: 'Русский',
    // de: 'Deutsch',
  },
};
