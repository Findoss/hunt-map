import type { RootState } from '../index';
import type { idMaps } from './types';

export const getMap = (state: RootState) => state.map;
export const selectIdMaps = (state: RootState) => Object.keys(getMap(state).maps);
export const selectViewMap = (state: RootState) => getMap(state).view;
export const selectOptionsMap = (state: RootState) => (id: idMaps) => getMap(state).maps[id];
