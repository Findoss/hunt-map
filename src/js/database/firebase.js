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
    return fetch(`./public/cache/${mapId}.json`).then(function(response) {
      return response.json();
    });
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
      case "boss-butcher":
        properties.description = payload.description;
        break;
      case "boss-spider":
        properties.description = payload.description;
        break;
      case "boss-player":
        properties.description = payload.description;
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
