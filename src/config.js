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

const namesCamp = {
  SB: [
    {
      type: "Feature",
      properties: {
        title: "Alain & Son's <br> Fish"
      },
      geometry: {
        type: "Point",
        coordinates: [-110, 130]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Reynard <br> Mill & Lumber"
      },
      geometry: {
        type: "Point",
        coordinates: [-100, 350]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Port Reeker"
      },
      geometry: {
        type: "Point",
        coordinates: [-120, 615]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Scupper Lake"
      },
      geometry: {
        type: "Point",
        coordinates: [-95, 830]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Blanchett Graves"
      },
      geometry: {
        type: "Point",
        coordinates: [-395, 200]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Darrow Livestock"
      },
      geometry: {
        type: "Point",
        coordinates: [-250, 450]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Alice Farm"
      },
      geometry: {
        type: "Point",
        coordinates: [-370, 595]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "The Chapel <br> of Madonna Noire"
      },
      geometry: {
        type: "Point",
        coordinates: [-365, 840]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "The Chapel <br> of Madonna Noire"
      },
      geometry: {
        type: "Point",
        coordinates: [-365, 840]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Lockbay Docks"
      },
      geometry: {
        type: "Point",
        coordinates: [-475, 420]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Stillwater Bend"
      },
      geometry: {
        type: "Point",
        coordinates: [-575, 770]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Pitching Crematorium"
      },
      geometry: {
        type: "Point",
        coordinates: [-670, 340]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Cyprus Huts"
      },
      geometry: {
        type: "Point",
        coordinates: [-800, 120]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Davant Ranch"
      },
      geometry: {
        type: "Point",
        coordinates: [-880, 300]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "The Slaughterhouse"
      },
      geometry: {
        type: "Point",
        coordinates: [-900, 600]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Catfish Grove"
      },
      geometry: {
        type: "Point",
        coordinates: [-850, 850]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Hialing-Waters <br> Cherch"
      },
      geometry: {
        type: "Point",
        coordinates: [-665, 570]
      }
    }
  ],
  LD: [
    {
      type: "Feature",
      properties: {
        title: "Godard Docks"
      },
      geometry: {
        type: "Point",
        coordinates: [-120, 110]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Blanc Brinery"
      },
      geometry: {
        type: "Point",
        coordinates: [-130, 350]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Lawson Stantion"
      },
      geometry: {
        type: "Point",
        coordinates: [-250, 500]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Golden Acres"
      },
      geometry: {
        type: "Point",
        coordinates: [-120, 600]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Salter's Pork"
      },
      geometry: {
        type: "Point",
        coordinates: [-160, 850]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Maw Battary"
      },
      geometry: {
        type: "Point",
        coordinates: [-400, 200]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Sweetbell Flour"
      },
      geometry: {
        type: "Point",
        coordinates: [-500, 500]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Arden Parish"
      },
      geometry: {
        type: "Point",
        coordinates: [-380, 695]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Windy Run"
      },
      geometry: {
        type: "Point",
        coordinates: [-525, 910]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Nicholls Priston"
      },
      geometry: {
        type: "Point",
        coordinates: [-665, 715]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Fort Carmick"
      },
      geometry: {
        type: "Point",
        coordinates: [-665, 375]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Iron Works"
      },
      geometry: {
        type: "Point",
        coordinates: [-620, 135]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Wolfshead Arsenal"
      },
      geometry: {
        type: "Point",
        coordinates: [-870, 195]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Bradley & Craven <br> Brickworks"
      },
      geometry: {
        type: "Point",
        coordinates: [-850, 450]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "C&A Lumber"
      },
      geometry: {
        type: "Point",
        coordinates: [-830, 625]
      }
    },
    {
      type: "Feature",
      properties: {
        title: "Hemlock and Hide"
      },
      geometry: {
        type: "Point",
        coordinates: [-850, 870]
      }
    }
  ]
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
