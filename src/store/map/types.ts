import type { LatLngTuple } from 'leaflet';

export type idMaps = string;

export type Map = {
  id: idMaps;
  image: {
    width: number;
    height: number;
    path: string;
  };
  levels: {
    org: number;
    max: number;
    min: number;
    default: number;
  };
  width: number;
  height: number;
  center: LatLngTuple;
  padding: number;
};
