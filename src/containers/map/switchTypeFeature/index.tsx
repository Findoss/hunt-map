import { MarkerLabel } from '../markerLabel';
import { MarkerSpawnPlayer } from '../markerSpawnPlayer';
import { MarkerBoss } from '../markerBoss';
import { MarkerResupplyPoint } from '../markerResupplyPoint';
import { MarkerExtractionPoint } from '../markerExtractionPoint';
import { MarkerAviary } from '../markerAviary';
import { MarkerTower } from '../markerTower';
import { MarkerEasterEgg } from '../markerEasterEgg';

import { PolygonZone } from '../poligonZone';

import type { TypeFeature } from '../../../data';

export const switchTypeFeature = (v: TypeFeature, id: string) => {
  switch (v.properties.title) {
    case 'label':
      return <MarkerLabel feature={v} key={id} />;
    case 'spawn-player':
      return <MarkerSpawnPlayer feature={v} key={id} />;
    case 'boss':
      return <MarkerBoss feature={v} key={id} />;
    case 'resupply-point':
      return <MarkerResupplyPoint feature={v} key={id} />;
    case 'extraction-point':
      return <MarkerExtractionPoint feature={v} key={id} />;
    case 'aviary':
      return <MarkerAviary feature={v} key={id} />;
    case 'tower':
      return <MarkerTower feature={v} key={id} />;
    case 'easter-egg':
      return <MarkerEasterEgg feature={v} key={id} />;
    case 'zone':
      return <PolygonZone feature={v} key={id} />;
    default:
      return null;
  }
};
