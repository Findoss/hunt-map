import type { RootState } from '../index';
import type { idsMap } from './types';

export const getMap = (state: RootState) => state.map;
export const selectViewMap = (state: RootState) => getMap(state).view;
export const selectOptionsMap = (state: RootState) => (id: idsMap) => getMap(state).maps[id];

// 0tLzQ6I$sHpp5UH:W8cU
