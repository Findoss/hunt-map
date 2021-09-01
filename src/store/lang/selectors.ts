import type { RootState } from '../index';

export const getLang = (state: RootState) => state.lang;

export const selectLang = (state: RootState) => getLang(state).lang;

export const selectSupportedLangs = (state: RootState) => {
  return Object.entries(getLang(state).supportedLangs).map(([k, v]) => {
    return { id: k, label: v as string };
  });
};
