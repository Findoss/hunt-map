const DB = firebase.initializeApp(firebaseConfig).firestore();

firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      console.error("Multiple tabs open.");
    } else if (err.code == "unimplemented") {
      console.error(
        "The current browser does not support to enable persistence"
      );
    }
  });

const API = {
  getItems(mapId) {
    return DB.collection(mapId).get();
  },

  getItemsChache(mapId) {
    return fetch(`./public/cache/${mapId}.json`).then(res => res.json());
  },

  getForСheckItems(mapId) {
    return DB.collection(`dev_${mapId}`).get();
  },

  addPoint(mapId, payload) {
    const { type, coordinates } = payload;

    const properties = {
      title: payload.title,
      description: "",
      marker: payload.title
    };

    switch (payload.title) {
      case "cash":
        properties.description = payload.description;
        break;
      case "easter-egg":
        properties.description = payload.description;
        break;
      case "boss":
        const arr = payload.description
          .split(",")
          .slice(1)
          .map(e => (e === "1" ? true : false));

        for (let i = 0; i < arr.length; i++) {
          if (arr[i]) {
            properties.description += typesField.boss.title[i] + ", ";
          }
        }
        properties.description += "<br>";
        properties.description += typesField.boss.level[payload.description[0]];
        if (arr[0]) {
          properties.marker = "boss-a";
        }
        if (arr[1]) {
          properties.marker = "boss-b";
        }
        if (arr[2]) {
          properties.marker = "boss-s";
        }
        if (arr[0] && arr[1]) {
          properties.marker = "boss-ab";
        }
        if (arr[0] && arr[2]) {
          properties.marker = "boss-as";
        }
        if (arr[1] && arr[2]) {
          properties.marker = "boss-bs";
        }
        if (arr[0] && arr[1] && arr[2]) {
          properties.marker = "boss-all";
        }
        break;
    }

    const data = {
      type: "Feature",
      properties: properties,
      geometry: {
        type: type,
        coordinates: [coordinates.lat, coordinates.lng]
      }
    };

    return DB.collection(`dev_${mapId}`)
      .doc()
      .set(data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  },

  approvePoint(mapId, docId, data) {
    return Promise.all([
      DB.collection(mapId)
        .doc()
        .set(data),
      DB.collection(`dev_${mapId}`)
        .doc(docId)
        .delete()
    ])
      .then(() => {
        console.log("Document successfully move!");
      })
      .catch(error => {
        console.error("Error moving document: ", error);
      });
  },

  rejectPoint(mapId, docId) {
    return DB.collection(`dev_${mapId}`)
      .doc(docId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }
};
