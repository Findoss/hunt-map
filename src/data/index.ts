import LABELS_SB from './names/SB.json';
import LABELS_LD from './names/LD.json';
import LABELS_DS from './names/DS.json';
import CACHE_SB from './cache/SB.json';
import CACHE_LD from './cache/LD.json';
import CACHE_DS from './cache/TMP.json';

import type { TypeFeature } from '../containers/map/markerBase/types';

type TypeCollectionFeatures = {
  type: string;
  features: TypeFeature[];
};
type TypeFeatureMarkerCollection = Record<string, TypeCollectionFeatures>;

const cache: TypeFeatureMarkerCollection = {
  SB: CACHE_SB,
  LD: CACHE_LD,
  DS: CACHE_DS,
};

const labels: TypeFeatureMarkerCollection = {
  SB: LABELS_SB,
  LD: LABELS_LD,
  DS: LABELS_DS,
};

const markers: TypeFeatureMarkerCollection = labels;

Object.entries(markers).map(([k, v]) => {
  return v.features.push(...cache[k].features);
});

export { markers };
