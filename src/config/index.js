export default {
  // Id текущей карты
  mapId: localStorage.getItem('MAP-ID') || 'SB',

  // Язык
  lang: window.location.hash.substr(1) || 'en',

  // Настройки выбранных слоев
  currentLayers: JSON.parse(localStorage.getItem('LAYERS')) || [],

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
    'cash'
    // "lift",
    // "metal-door"
  ],

  // типы для особых маркеров
  extraTypes: ['label', 'new-object'],

  // типы для зон
  polygonTypes: ['zone'],

  // типы для линий
  polylineTypes: ['water-low'],

  // у каждого типа может быть несколько видов маркеров
  typesMarkers: {
    'resupply-point': ['resupply-point', 'resupply-point-b', 'resupply-point-rc'],
    'extraction-point': [
      'extraction-point-t',
      'extraction-point-b',
      'extraction-point-r',
      'extraction-point-l'
    ],
    boss: ['boss-a', 'boss-b', 'boss-s', 'boss-ab', 'boss-as', 'boss-bs', 'boss-all'],
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
      'tower0'
    ]
  },

  // Основные настройки карт
  optionsMaps: {
    SB: {
      id: 'SB',
      image: {
        width: 4096,
        height: 4096,
        path: 'public/images/tiles/SB/{z}-{x}-{y}.jpg'
      },
      levels: {
        org: 4,
        max: 7,
        min: 1,
        default: localStorage.getItem('ZOOM') || 1
      },
      width: 1000,
      height: 1000,
      center: JSON.parse(localStorage.getItem('CENTER')) || [-500, 500],
      padding: 300
    },
    LD: {
      id: 'LD',
      image: {
        width: 4096,
        height: 4096,
        path: 'public/images/tiles/LD/{z}-{x}-{y}.jpg'
      },
      levels: {
        org: 4,
        max: 7,
        min: 1,
        default: localStorage.getItem('ZOOM') || 1
      },
      width: 1000,
      height: 1000,
      center: JSON.parse(localStorage.getItem('CENTER')) || [-500, 500],
      padding: 300
    }
  },

  //
  author: 'by <a target="_blank" href="https://steamcommunity.com/id/Findoss/">Findoss</a> | ',
  contributors: `<a target="_blank" href="./public/contributors.txt">contributors</a>`,

  // Публичный ключ к API firebase
  firebaseConfig: {
    apiKey: 'AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w',
    authDomain: 'hunt-map-1.firebaseapp.com',
    databaseURL: 'https://hunt-map-1.firebaseio.com',
    storageBucket: 'gs://hunt-map-1.appspot.com/',
    projectId: 'hunt-map-1'
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
    }
  },

  optionsAuth: {
    position: 'bottomleft'
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
        clickable: false
      }
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
        clickable: false
      }
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
        clickable: false
      }
    },
    circlemarker: false,
    rectangle: false
  },

  optionsPrint: {
    position: 'topleft',
    exportOnly: true,
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    filename: 'hunt-map.online'
  }
};
