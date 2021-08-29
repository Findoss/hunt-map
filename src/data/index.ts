import LABELS_SB from './names/SB.json';
import LABELS_LD from './names/LD.json';
import LABELS_DS from './names/DS.json';
import CACHE_SB from './cache/SB.json';
import CACHE_LD from './cache/LD.json';
import CACHE_DS from './cache/DS.json';
import TMP from './cache/TMP.json';

import type { LatLngTuple, LatLngLiteral } from 'leaflet';

export type TypeFeature = {
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

export type TypeFullFeature = Record<string, TypeFeature>;

type TypeCollectionFeatures = {
  type: string;
  features: TypeFullFeature[];
};
type TypeFeatureMarkerCollection = Record<string, TypeCollectionFeatures>;

const cache: TypeFeatureMarkerCollection = {
  SB: CACHE_SB,
  // LD: CACHE_LD,
  // DS: TMP,
};

const labels: TypeFeatureMarkerCollection = {
  SB: LABELS_SB as any,
  // LD: LABELS_LD,
  // DS: LABELS_DS,
};

const allData: TypeFeatureMarkerCollection = labels;

Object.entries(allData).map(([k, v]) => {
  return v.features.push(...cache[k].features);
});

export const markers = allData;
