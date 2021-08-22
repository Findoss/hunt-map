import type { RootState } from '../index';

export const getMap = (state: RootState) => state.map;
export const selectMaps = (state: RootState) => getMap(state).maps;
export const selectIdMaps = (state: RootState) => Object.keys(getMap(state).maps);
export const selectViewMap = (state: RootState) => getMap(state).view;
export const selectOptionsMapById = (state: RootState) => (id: string) => getMap(state).maps[id];
export const selectOptionsViewMap = (state: RootState) =>
  selectOptionsMapById(state)(selectViewMap(state).id);
