import { selectOptionsViewMap } from '../map/selectors';
import { selectViewMarkerFilters } from '../filter/selectors';

import type { RootState } from '../index';

export const getMarkers = (state: RootState) => state.data;

export const selectMarkers = (state: RootState) =>
  getMarkers(state)[selectOptionsViewMap(state).id].features;

export const selectMarkersId = (state: RootState) =>
  selectMarkers(state)
    .filter((v) => {
      return selectViewMarkerFilters(state).some(
        (f) => f === v[Object.keys(v)[0]].properties.title
      );
    })
    .map((v) => Object.keys(v)[0]);

export const selectMarkerById = (state: RootState) => (id: string) => {
  const marker = selectMarkers(state).find((v) => Object.keys(v)[0] === id);
  if (marker) {
    return marker[id];
  }
  return {
    type: 'default',
    properties: {
      title: 'string',
      marker: 'string',
    },
    geometry: {
      type: 'point',
      coordinates: [0, 0],
    },
  };
};
