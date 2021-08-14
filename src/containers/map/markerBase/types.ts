import type { LatLngTuple } from 'leaflet';

export type TypeFeatureMarker = {
  type: string;
  properties: Record<string, string | Record<string, string>>;
  geometry: {
    type: string;
    coordinates: LatLngTuple | number[];
  };
};
