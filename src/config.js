const types = [
  "boss",
  "spawn-player",
  "extraction-point",
  "resupply-point",
  "easter-egg",
  "tower",
  "aviary"
  // "clue",
  // "cash"
];

const typesField = {
  boss: {
    title: ["Assassin", "Butcher", "Spider"],
    level: ["", "underground", "1st floor", "2st floor"]
  }
};

const optionsMaps = {
  SB: {
    id: "SB",
    title: "Stillwater Bayou",
    image: {
      width: 4096,
      height: 4096,
      path: "public/images/tiles/SB/{z}-{x}-{y}.jpg"
    },
    levels: {
      org: 4,
      max: 7,
      min: 2
    },
    factor: {
      x: 0.256,
      y: 0.256
    },
    width: 1000,
    height: 1000,
    center: [500, 500]
  },
  LD: {
    id: "LD",
    title: "Lawson Delta",
    image: {
      width: 4096,
      height: 4096,
      path: "public/images/tiles/LD/{z}-{x}-{y}.jpg"
    },
    levels: {
      org: 4,
      max: 7,
      min: 2
    },
    factor: {
      x: 0.256,
      y: 0.256
    },
    width: 1000,
    height: 1000,
    center: [500, 500]
  }
};

const buttonAuth = `<span id="login" class="login">login</span>`;
const author =
  'by <a target="_blank" href="https://steamcommunity.com/id/Findoss/">Findoss</a> | ';
const contributors = `<span id="contributors">contributors</span> | `;
const contributorNames = ["Lapin", "Святобор", "varshevsky"].join("\n");

const options = {
  zIndex: 1,
  attribution: author + contributors + buttonAuth
};

const firebaseConfig = {
  apiKey: "AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w",
  authDomain: "hunt-map-1.firebaseapp.com",
  databaseURL: "https://hunt-map-1.firebaseio.com",
  projectId: "hunt-map-1"
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
