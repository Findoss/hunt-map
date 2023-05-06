import type { RootState } from '../index';

export const getMap = (state: RootState) => state.map;

export const selectMaps = (state: RootState) => getMap(state).maps;

export const selectIdMaps = (state: RootState) => Object.keys(selectMaps(state));

export const selectViewMap = (state: RootState) => getMap(state).view;

export const selectOptionsMapById = (state: RootState) => (id: string) => selectMaps(state)[id];

export const selectOptionsViewMap = (state: RootState) =>
  selectOptionsMapById(state)(selectViewMap(state).id);
