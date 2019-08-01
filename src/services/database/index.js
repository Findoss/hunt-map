import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class DB {
  constructor(config) {
    const { firebaseConfig } = config;
    this.DB = firebase.initializeApp(firebaseConfig).firestore();

    firebase
      .firestore()
      .enablePersistence()
      .catch(function(err) {
        if (err.code == 'failed-precondition') {
          console.error('Multiple tabs open.');
        } else if (err.code == 'unimplemented') {
          console.error('The current browser does not support to enable persistence');
        }
      });
  }

  async getItems(mapId) {
    const data = {};
    await this.DB.collection(mapId)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => (data[doc.id] = doc.data()));
      })
      .catch(error => {
        console.error('Error API', error);
      });
    return data;
  }

  getForСheckItems(mapId) {
    return this.DB.collection(`dev_${mapId}`).get();
  }

  addMarker(mapId, payload) {
    const { type, coordinates, marker, description } = payload;

    const data = {
      type: 'Feature',
      properties: {
        title: type,
        marker,
        description
      },
      geometry: {
        type: 'point',
        coordinates: [coordinates.lat, coordinates.lng]
      }
    };

    return this.DB.collection(`dev_${mapId}`)
      .doc()
      .set(data)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  // approvePoint(mapId, docId, data) {
  //   return Promise.all([
  //     this.DB.collection(mapId)
  //       .doc()
  //       .set(data),
  //     this.DB.collection(`dev_${mapId}`)
  //       .doc(docId)
  //       .delete()
  //   ])
  //     .then(() => {
  //       console.log('Document successfully move!');
  //     })
  //     .catch(error => {
  //       console.error('Error moving document: ', error);
  //     });
  // }

  // rejectPoint(mapId, docId) {
  //   return this.DB.collection(`dev_${mapId}`)
  //     .doc(docId)
  //     .delete()
  //     .then(() => {
  //       console.log('Document successfully deleted!');
  //     })
  //     .catch(error => {
  //       console.error('Error removing document: ', error);
  //     });
  // }
}
