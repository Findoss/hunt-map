import type { idsMap, Map, Coords } from './types';

export interface MapState {
  view: {
    id: idsMap;
    center: Coords;
    zoom: number;
  };
  maps: Record<idsMap, Map>;
}

export const initialState: MapState = {
  view: {
    id: 'SB',
    center: [-500, 500],
    zoom: 1,
  },
  maps: {
    SB: {
      id: 'SB',
      image: {
        width: 4096,
        height: 4096,
        path: 'public/images/tiles/SB/{z}-{x}-{y}.jpg',
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
        path: 'public/images/tiles/LD/{z}-{x}-{y}.jpg',
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
        path: 'public/images/tiles/DS/{z}-{x}-{y}.jpg',
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
  },
};
