const DB = firebase.initializeApp(firebaseConfig).firestore();

const API = {
  getItems(mapId) {
    return DB.collection(mapId).get();
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
