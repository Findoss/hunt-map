export interface LangState {
  lang: string;
  supportedLangs: Record<string, string>;
}

export const initialState: LangState = {
  lang: 'id',
  supportedLangs: {
    en: 'English',
    ru: 'Русский',
  },
};
