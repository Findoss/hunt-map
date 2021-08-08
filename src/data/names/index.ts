import SB from './_SB.json';
import LD from './_LD.json';
import DS from './_DS.json';

import type { TypeFeatureLabel } from '../../containers/map/markerLabel/types';

type TypeCollectionFeatures = {
  type: string;
  features: TypeFeatureLabel[];
};
type TypeCollectionFeaturesLabel = Record<string, TypeCollectionFeatures>;

export const compoundsLabels: TypeCollectionFeaturesLabel = { SB, LD, DS };
