import type { LatLngTuple, LatLngLiteral } from 'leaflet';

export type TypeFeature = {
  type: string;
  properties: Record<string, string | Record<string, string>>;
  geometry: {
    type: string;
    coordinates: LatLngTuple | LatLngTuple[] | LatLngLiteral[] | number[];
  };
};
