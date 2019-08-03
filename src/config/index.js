export default {
  // Флаг для загрузки из Firestore
  realtime: localStorage.getItem('REALTIME'),

  // Id текущей карты
  mapId: localStorage.getItem('MAP-ID') || 'SB',

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
    'aviary'
    // "clue",
    // "cash",
    // "lift",
    // "door"
  ],

  // типы для особых маркеров
  extraTypes: ['label', 'new-object'],

  // типы для зон
  polygonTypes: ['zone'],

  // типы для линий
  polylineTypes: ['water-low'],

  // у каждого типа может быть несколько видов маркеров
  typesMarkers: {
    boss: [
      {
        title: 'Assassin',
        label: 'boss-a'
      },
      {
        title: 'Butcher',
        label: 'boss-b'
      },
      {
        title: 'Spider',
        label: 'boss-s'
      },
      {
        title: 'Assassin, Butcher',
        label: 'boss-ab'
      },
      {
        title: 'Assassin, Spider',
        label: 'boss-as'
      },
      {
        title: 'Butcher, Spider',
        label: 'boss-bs'
      },
      {
        title: 'Assassin, Butcher, Spider',
        label: 'boss-all'
      }
    ],
    tower: [
      {
        title: 'vector 0',
        label: ''
      },
      {
        title: 'vector 1',
        label: '1'
      },
      {
        title: 'vector 2',
        label: '2'
      },
      {
        title: 'vector 3',
        label: '3'
      },
      {
        title: 'vector 4',
        label: '4'
      },
      {
        title: 'vector 5',
        label: '5'
      },
      {
        title: 'vector 6',
        label: '6'
      },
      {
        title: 'vector 7',
        label: '7'
      },
      {
        title: 'vector 8',
        label: '8'
      },
      {
        title: 'vector 9',
        label: '9'
      },
      {
        title: 'vector 10',
        label: '10'
      },
      {
        title: 'vector 11',
        label: '11'
      }
    ]
  },

  // Основные настройки карт
  optionsMaps: {
    SB: {
      id: 'SB',
      title: 'Stillwater Bayou',
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
      title: 'Lawson Delta',
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
    title: 'Save map',
    sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    filename: 'hunt-map.online',
    defaultSizeTitles: {
      Current: 'Current Size',
      A4Landscape: 'A4 Landscape',
      A4Portrait: 'A4 Portrait'
    }
  }
};
