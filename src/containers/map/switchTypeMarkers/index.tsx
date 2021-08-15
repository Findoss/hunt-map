import { MarkerLabel } from '../markerLabel';
import { MarkerSpawnPlayer } from '../markerSpawnPlayer';
import { MarkerBoss } from '../markerBoss';
import { MarkerResupplyPoint } from '../markerResupplyPoint';
import { MarkerExtractionPoint } from '../markerExtractionPoint';
import { MarkerAviary } from '../markerAviary';
import { MarkerTower } from '../markerTower';
import { MarkerEasterEgg } from '../markerEasterEgg';

import type { TypeFeatureMarker } from '../markerBase/types';

export const switchTypeMarkers = (v: TypeFeatureMarker, i: number) => {
  switch (v.properties.title) {
    case 'label':
      return <MarkerLabel feature={v} key={i} />;
    case 'spawn-player':
      return <MarkerSpawnPlayer feature={v} key={i} />;
    case 'boss':
      return <MarkerBoss feature={v} key={i} />;
    case 'resupply-point':
      return <MarkerResupplyPoint feature={v} key={i} />;
    case 'extraction-point':
      return <MarkerExtractionPoint feature={v} key={i} />;
    case 'aviary':
      return <MarkerAviary feature={v} key={i} />;
    case 'tower':
      return <MarkerTower feature={v} key={i} />;
    case 'easter-egg':
      return <MarkerEasterEgg feature={v} key={i} />;
    default:
      return null;
  }
};
