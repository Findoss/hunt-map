import type { Middleware } from '@reduxjs/toolkit';

import { selectViewMarkerFilters } from '../filter/selectors';
import { selectViewMap } from '../map/selectors';
import { selectLang } from '../lang/selectors';

import { updateUrlData } from '../../utils/URL';

export const urlMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const newState = store.getState();
  switch (action.type) {
    case 'map/setMapId':
    case 'lang/setLang':
    case 'filter/removeFilter':
    case 'filter/addFilter':
      const path: string[] = [];
      const search: Record<string, string | string[]> = { filters: [] };

      path.push(selectLang(newState));
      path.push(selectViewMap(newState).id);
      search.filters = selectViewMarkerFilters(newState);

      updateUrlData({ path, search });

      break;
  }
  return result;
};
