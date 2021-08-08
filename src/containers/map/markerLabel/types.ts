import type { LatLngTuple } from 'leaflet';

export type TypeFeatureLabel = {
  type: string;
  properties: {
    title: string;
    name: Record<string, string>;
  };
  geometry: {
    type: string;
    coordinates: LatLngTuple | number[];
  };
};
