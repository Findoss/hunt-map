import { MarkerLabel } from '../marker-label';
import { MarkerSpawnPlayer } from '../marker-spawn-player';
import { MarkerBoss } from '../marker-boss';
import { MarkerResupplyPoint } from '../marker-resupply-point';
import { MarkerExtractionPoint } from '../marker-extraction-point';
import { MarkerAviary } from '../marker-aviary';
import { MarkerTower } from '../marker-tower';
import { MarkerEasterEgg } from '../marker-easter-egg';

import { PolygonZone } from '../poligon-zone';

import type { Feature } from 'store/data/state';

export const switchTypeFeature = (v: Feature, id: string) => {
  switch (v.properties.title) {
    case 'label':
      return <MarkerLabel feature={v} key={id} />;
    case 'spawn-player':
      return <MarkerSpawnPlayer feature={v} key={id} />;
    // case 'boss':
    //   return <MarkerBoss feature={v} key={id} />;
    // case 'resupply-point':
    //   return <MarkerResupplyPoint feature={v} key={id} />;
    // case 'extraction-point':
    //   return <MarkerExtractionPoint feature={v} key={id} />;
    // case 'aviary':
    //   return <MarkerAviary feature={v} key={id} />;
    // case 'tower':
    //   return <MarkerTower feature={v} key={id} />;
    // case 'easter-egg':
    //   return <MarkerEasterEgg feature={v} key={id} />;
    // case 'zone':
    //   return <PolygonZone feature={v} key={id} />;
    default:
      return null;
  }
};
