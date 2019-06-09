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
        label: 'a'
      },
      {
        title: 'Butcher',
        label: 'b'
      },
      {
        title: 'Assassin',
        label: 'a'
      },
      {
        title: 'Spider',
        label: 's'
      },
      {
        title: 'Assassin + Butcher',
        label: 'ab'
      },
      {
        title: 'Assassin + Spider',
        label: 'as'
      },
      {
        title: 'Butcher + Spider',
        label: 'bs'
      },
      {
        title: 'Assassin + Butcher + Spider',
        label: 'abs'
      }
    ],
    tower: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
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
        min: 2,
        default: localStorage.getItem('ZOOM') || 2
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
        min: 2,
        default: localStorage.getItem('ZOOM') || 2
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
  }
};
