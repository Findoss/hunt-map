import type { RootState } from '../index';

export const getFilters = (state: RootState) => state.filters;

export const selectMarkerFilters = (state: RootState) => Object.keys(getFilters(state).types);
export const selectCompoundFilters = () => ['label', 'zone', 'water-low'];

export const selectViewMarkerFilters = (state: RootState) => getFilters(state).view.filters;
