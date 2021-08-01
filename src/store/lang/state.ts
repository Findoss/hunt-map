export interface LangsState {
  lang: string;
  langs: Record<string, string>;
}

export const initialState: LangsState = {
  lang: 'id',
  langs: {
    en: 'English',
    ru: 'Русский',
  },
};
