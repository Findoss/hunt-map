import LABELS_SB from './names/SB.json';
import ZONES_SB from './zone/SB.json';
import CACHE_SB from './cache/SB.json';

import LABELS_LD from './names/LD.json';
import CACHE_LD from './cache/LD.json';
import ZONES_LD from './zone/LD.json';

import LABELS_DS from './names/DS.json';
import CACHE_DS from './cache/DS.json';
import ZONES_DS from './zone/DS.json';

import CACHE_TEST from './cache/TMP.json';

import type { LatLngTuple, LatLngLiteral } from 'leaflet';
import { IS_DEV } from '../constants';

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

const labels: TypeFeatureMarkerCollection = {
  SB: LABELS_SB as any,
  LD: LABELS_LD as any,
  DS: LABELS_DS as any,
};

const cache: TypeFeatureMarkerCollection = {
  SB: CACHE_SB as any,
  LD: CACHE_LD as any,
  DS: CACHE_DS as any,
};

if (IS_DEV) {
  cache.TEST = CACHE_TEST as any;
}

const zones: TypeFeatureMarkerCollection = {
  SB: ZONES_SB as any,
  LD: ZONES_LD as any,
  DS: ZONES_DS as any,
};

const allData: TypeFeatureMarkerCollection = labels;

Object.entries(allData).map(([k, v]) => {
  return v.features.push(...cache[k].features);
});

Object.entries(allData).map(([k, v]) => {
  return v.features.push(...zones[k].features);
});

export const markers = allData;
