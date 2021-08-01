import { isInIframe } from '../utils';

export default {
  // Id текущей карты
  mapId: !isInIframe() ? localStorage.getItem('MAP-ID') || 'SB' : 'SB',

  // Язык
  lang: window.location.hash.substr(1) || 'en',

  // Выбранные слои
  currentLayers: !isInIframe() ? JSON.parse(localStorage.getItem('LAYERS')) || null : null,
  defaultLayers: ['label', 'boss', 'spawn-player', 'easter-egg', 'tower'],

  //
  // Типы объектов на карте
  //
  // типы для маркеров
  types: [
    'boss',
    'spawn-player',
    'extraction-point',
    'resupply-point',
    'easter-egg',
    'tower',
    'aviary',
    'clue',
    'cash',
  ],

  // типы для особых маркеров
  extraTypes: ['label', 'new-object'],

  // типы для зон
  polygonTypes: ['zone', 'zone-double-clue'],

  // типы для линий
  polylineTypes: ['water-low'],

  // у каждого типа может быть несколько видов маркеров
  typesMarkers: {
    'resupply-point': ['resupply-point', 'resupply-point-b', 'resupply-point-rc'],
    'extraction-point': [
      'extraction-point-t',
      'extraction-point-b',
      'extraction-point-r',
      'extraction-point-l',
    ],
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
    aviary: ['aviary', 'aviary-d', 'aviary-c'],
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
    ],
  },

  // Основные настройки карт
  optionsMaps: {
    SB: {
      id: 'SB',
      image: {
        width: 4096,
        height: 4096,
        path: 'public/images/tiles/SB/{z}-{x}-{y}.jpg',
      },
      levels: {
        org: 4,
        max: 7,
        min: 1,
        default: !isInIframe() ? localStorage.getItem('ZOOM') || 1 : 1,
      },
      width: 1000,
      height: 1000,
      center: !isInIframe()
        ? JSON.parse(localStorage.getItem('CENTER')) || [-500, 500]
        : [-500, 500],
      padding: 300,
    },
    LD: {
      id: 'LD',
      image: {
        width: 4096,
        height: 4096,
        path: 'public/images/tiles/LD/{z}-{x}-{y}.jpg',
      },
      levels: {
        org: 4,
        max: 7,
        min: 1,
        default: !isInIframe() ? localStorage.getItem('ZOOM') || 1 : 1,
      },
      width: 1000,
      height: 1000,
      center: !isInIframe()
        ? JSON.parse(localStorage.getItem('CENTER')) || [-500, 500]
        : [-500, 500],
      padding: 300,
    },
    DS: {
      id: 'DS',
      image: {
        width: 2048,
        height: 2048,
        path: 'public/images/tiles/DS/{z}-{x}-{y}.jpg',
      },
      levels: {
        org: 3,
        max: 6,
        min: 1,
        default: !isInIframe() ? localStorage.getItem('ZOOM') || 1 : 1,
      },
      width: 1000,
      height: 1000,
      center: !isInIframe()
        ? JSON.parse(localStorage.getItem('CENTER')) || [-500, 500]
        : [-500, 500],
      padding: 300,
    },
  },

  //
  contributors: `<a target="_blank" href="./public/contributors.txt">contributors</a>`,

  // Публичный ключ к API firebase
  firebaseConfig: {
    apiKey: 'AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w',
    authDomain: 'hunt-map-1.firebaseapp.com',
    databaseURL: 'https://hunt-map-1.firebaseio.com',
    storageBucket: 'gs://hunt-map-1.appspot.com/',
    projectId: 'hunt-map-1',
  },

  //
  // Настройки плагинов
  //
  optionsRuler: {
    position: 'topleft',
    textColor: 'white',
    lineColor: 'crimson',
    simbolButton: '',
    formatDistance(val) {
      return Math.round(val) + 'm';
    },
  },

  optionsAuth: {
    position: 'bottomleft',
  },

  optionsDraw: {
    polyline: {
      allowIntersection: false,
      shapeOptions: {
        stroke: true,
        color: 'aqua',
        weight: 12,
        opacity: 0.8,
        fill: false,
        clickable: false,
      },
    },
    polygon: {
      allowIntersection: false,
      shapeOptions: {
        stroke: true,
        color: 'aqua',
        weight: 4,
        opacity: 0.8,
        fill: true,
        fillColor: null,
        fillOpacity: 0.2,
        showArea: false,
        clickable: false,
      },
    },
    circle: {
      allowIntersection: false,
      shapeOptions: {
        stroke: true,
        color: 'aqua',
        weight: 4,
        opacity: 0.8,
        fill: true,
        fillColor: null,
        fillOpacity: 0.2,
        showArea: false,
        clickable: false,
      },
    },
    circlemarker: false,
    rectangle: false,
  },

  optionsPrint: {
    position: 'topleft',
    exportOnly: true,
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    filename: 'hunt-map',
  },
};
