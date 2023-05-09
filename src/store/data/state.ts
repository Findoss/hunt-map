import type { LatLngTuple, LatLngLiteral } from 'leaflet';

export type FeatureData = {
  type: string;
  properties: {
    title: string;
    marker: string;
    name?: string;
    event?: string;
  };
  geometry: {
    type: string;
    coordinates: LatLngTuple | LatLngTuple[] | LatLngLiteral[] | number[];
  };
};

export type Feature = Record<string, FeatureData>;

export type ContentMap = {
  data: Feature[];
  view: Feature | null;
};

export const initialState: ContentMap = { data: [], view: null };
