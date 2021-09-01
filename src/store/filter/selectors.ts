import type { RootState } from '../index';

export const getFilters = (state: RootState) => state.filters;

export const selectMarkerFilters = (state: RootState) => Object.keys(getFilters(state).types);

// по умолчанию собирается в категорию компаундов
export const selectCompoundFilters = () => ['label', 'zone'];

export const selectViewMarkerFilters = (state: RootState) => getFilters(state).view.filters;
