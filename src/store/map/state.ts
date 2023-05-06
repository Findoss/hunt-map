import { getUrlData } from '../../utils/URL';
import { IS_DEV } from '../../constants';

import type { LatLngTuple } from 'leaflet';
import type { idMaps, Map } from './types';

export type MapState = {
  view: {
    id: idMaps;
    center: LatLngTuple;
    zoom: number;
  };
  maps: Record<idMaps, Map>;
};

const mapsConfig: Record<idMaps, Map> = {};

if (IS_DEV) {
  mapsConfig.TEST = {
    id: 'TEST',
    image: {
      width: 4096,
      height: 4096,
      path: '/images/tiles/SB/{z}-{x}-{y}.jpg',
    },
    levels: {
      org: 4,
      max: 7,
      min: 1,
      default: 1,
    },
    width: 1000,
    height: 1000,
    center: [-500, 500],
    padding: 300,
  };
}

export const initialState: MapState = {
  view: {
    id: getUrlData().path[1] ?? 'SB',
    center: [-500, 500],
    zoom: 1,
  },
  maps: mapsConfig,
};
