const types = [
  "clue",
  "resupply-point",
  "boss-assassin",
  "boss-butcher",
  "boss-spider",
  "spawn-player",
  "cash",
  "easter-egg"
  // "extraction-point",
  // "explosive-barrel"
  // "fuel-barrel",
  // "piano",
  // "crows",
  // "ducks",
  // "bell",
  // "engine"
];

const optionsMaps = {
  SB: {
    id: "SB",
    title: "Stillwater Bayou",
    image: {
      width: 1066,
      height: 1066,
      path: "public/images/SB_tiles/{z}-{x}-{y}.jpg"
    },
    levels: {
      org: 3,
      max: 6,
      min: 2
    },
    factor: {
      x: 0.13325,
      y: 0.13325
    },
    width: 1000,
    height: 1000,
    center: [500, 500]
  },
  LD: {
    id: "LD",
    title: "Lawson Delta",
    image: {
      width: 803,
      height: 803,
      path: "public/images/LD_tiles/{z}-{x}-{y}.jpg"
    },
    levels: {
      org: 2,
      max: 6,
      min: 2
    },
    factor: {
      x: 0.20075,
      y: 0.20075
    },
    width: 1000,
    height: 1000,
    center: [500, 500]
  }
};

const buttonAuth = `<span id="login" class="login">login</span>`;
const author =
  'by <a target="_blank" href="https://steamcommunity.com/id/Findoss/">Findoss</a> | ';
const contributors = "contributors | ";
const contributorNames = ["123", "456"].join("\n");

const options = {
  zIndex: 1,
  attribution: author + contributors + buttonAuth
};

const firebaseConfig = {
  apiKey: "AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w",
  authDomain: "hunt-map-1.firebaseapp.com",
  databaseURL: "https://hunt-map-1.firebaseio.com",
  projectId: "hunt-map-1"
  // storageBucket: "hunt-map-1.appspot.com",
  // messagingSenderId: "sender-id",
  // appID: "hunt-map-1",
};

const optionsRuler = {
  position: "topleft",
  textColor: "white",
  lineColor: "crimson",
  simbolButton: "",
  formatDistance(val) {
    return Math.round(val) + "m";
  }
};

const optionsPoint = {
  position: "topleft",
  optionsSelect: types
};

const optionsPoligon = {
  position: "topleft"
};
