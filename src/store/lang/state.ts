import { getUrlData } from '../../utils/URL';

export interface LangState {
  lang: string;
  supportedLangs: Record<string, string>;
}

const [langId] = getUrlData().path;

export const initialState: LangState = {
  lang: langId ?? 'en',
  supportedLangs: {
    en: 'English',
    ru: 'Русский',
  },
};
