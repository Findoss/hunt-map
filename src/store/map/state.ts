import { IS_DEV } from 'constants/index';
import { getUrlData } from 'utils/URL';

import type { LatLngTuple } from 'leaflet';
import type { idMaps, Map } from './types';

export interface MapState {
  view: {
    id: idMaps;
    center: LatLngTuple;
    zoom: number;
  };
  maps: Record<idMaps, Map>;
}

const [, mapId] = getUrlData().path;

const mapsConfig:Record<idMaps, Map> = {
  SB: {
    id: 'SB',
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
  },
  LD: {
    id: 'LD',
    image: {
      width: 4096,
      height: 4096,
      path: '/images/tiles/LD/{z}-{x}-{y}.jpg',
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
  },
  DS: {
    id: 'DS',
    image: {
      width: 2048,
      height: 2048,
      path: '/images/tiles/DS/{z}-{x}-{y}.jpg',
    },
    levels: {
      org: 3,
      max: 6,
      min: 1,
      default: 1,
    },
    width: 1000,
    height: 1000,
    center: [-500, 500],
    padding: 300,
  },
};

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
  }
}

export const initialState: MapState = {
  view: {
    id: mapId ?? 'SB',
    center: [-500, 500],
    zoom: 1,
  },
  maps: mapsConfig
};
