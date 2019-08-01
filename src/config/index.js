export default {
  realtime: localStorage.getItem('REALTIME'),

  mapId: localStorage.getItem('MAP-ID') || 'SB',

  currentLayers: JSON.parse(localStorage.getItem('LAYERS')) || [],

  types: [
    'boss',
    'spawn-player',
    'extraction-point',
    'resupply-point',
    'easter-egg',
    'tower',
    'aviary'
    // "clue",
    // "cash"
  ],

  extraTypes: ['label', 'new-object'],

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
        min: 0,
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
        min: 0,
        default: localStorage.getItem('ZOOM') || 1
      },
      width: 1000,
      height: 1000,
      center: JSON.parse(localStorage.getItem('CENTER')) || [-500, 500],
      padding: 300
    }
  },

  author: 'by <a target="_blank" href="https://steamcommunity.com/id/Findoss/">Findoss</a> | ',
  contributors: `<span id="contributors">contributors</span>`,
  contributorNames: ['Lapin', 'Святобор', 'varshevsky'],

  firebaseConfig: {
    apiKey: 'AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w',
    authDomain: 'hunt-map-1.firebaseapp.com',
    databaseURL: 'https://hunt-map-1.firebaseio.com',
    projectId: 'hunt-map-1'
  },

  optionsRuler: {
    position: 'topleft',
    textColor: 'white',
    lineColor: 'crimson',
    simbolButton: '',
    formatDistance(val) {
      return Math.round(val) + 'm';
    }
  },

  optionsPoint: {
    position: 'topleft',
    // optionsSelect: this.types
    optionsSelect: []
  },

  optionsPoligon: {
    position: 'topleft'
  },

  optionsAuth: {
    position: 'bottomleft'
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
