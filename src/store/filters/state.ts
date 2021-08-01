import type { typesMarker } from './types';

export interface FiltersState {
  view: {
    filters: string[];
  };
  types: typesMarker;
  extraTypes: string[];
  polygonTypes: string[];
  polylineTypes: string[];
}

export const initialState: FiltersState = {
  view: {
    filters: ['label', 'boss', 'spawn-player', 'easter-egg', 'tower'],
  },
  types: {
    boss: [
      'boss-a',
      'boss-b',
      'boss-s',
      'boss-h',
      'boss-hb',
      'boss-hs',
      'boss-ah',
      'boss-ab',
      'boss-as',
      'boss-bs',
      'boss-all',
    ],
    'spawn-player': ['spawn-player'],
    'extraction-point': [
      'extraction-point-t',
      'extraction-point-b',
      'extraction-point-r',
      'extraction-point-l',
    ],
    'resupply-point': ['resupply-point', 'resupply-point-b', 'resupply-point-rc'],
    'easter-egg': ['easter-egg'],
    tower: [
      'tower',
      'tower1',
      'tower2',
      'tower3',
      'tower4',
      'tower5',
      'tower6',
      'tower7',
      'tower8',
      'tower9',
      'tower10',
      'tower11',
      'tower-o',
      'tower-h',
    ],
    aviary: ['aviary', 'aviary-d', 'aviary-c'],
    clue: ['clue'],
    cash: ['cash'],
  },

  // типы для особых маркеров
  extraTypes: ['label', 'new-object'],

  // типы для зон
  polygonTypes: ['zone', 'zone-double-clue'],

  // типы для линий
  polylineTypes: ['water-low'],
};
