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

  // addPoint(mapId, payload) {
  //   const { type, coordinates } = payload;

  //   const properties = {
  //     title: payload.title,
  //     description: '',
  //     marker: payload.title
  //   };

  //   switch (payload.title) {
  //     case 'tower':
  //       properties.marker = `tower${payload.description}`;
  //       break;
  //     case 'aviary':
  //       properties.description = payload.description;
  //       break;
  //     case 'resupply-point':
  //       properties.description = payload.description;
  //       break;
  //     case 'easter-egg':
  //       properties.description = payload.description;
  //       break;
  //     case 'boss':
  //       const arr = payload.description
  //         .split(',')
  //         .slice(1)
  //         .map(e => (e === '1' ? true : false));

  //       for (let i = 0; i < arr.length; i++) {
  //         if (arr[i]) {
  //           properties.description += typesField.boss.title[i] + ', ';
  //         }
  //       }
  //       properties.description += '<br>';
  //       properties.description += typesField.boss.level[payload.description[0]];
  //       if (arr[0]) {
  //         properties.marker = 'boss-a';
  //       }
  //       if (arr[1]) {
  //         properties.marker = 'boss-b';
  //       }
  //       if (arr[2]) {
  //         properties.marker = 'boss-s';
  //       }
  //       if (arr[0] && arr[1]) {
  //         properties.marker = 'boss-ab';
  //       }
  //       if (arr[0] && arr[2]) {
  //         properties.marker = 'boss-as';
  //       }
  //       if (arr[1] && arr[2]) {
  //         properties.marker = 'boss-bs';
  //       }
  //       if (arr[0] && arr[1] && arr[2]) {
  //         properties.marker = 'boss-all';
  //       }
  //       break;
  //   }

  //   const data = {
  //     type: 'Feature',
  //     properties: properties,
  //     geometry: {
  //       type: type,
  //       coordinates: [coordinates.lat, coordinates.lng]
  //     }
  //   };

  //   return this.DB.collection(`dev_${mapId}`)
  //     .doc()
  //     .set(data)
  //     .then(() => {
  //       console.log('Document successfully written!');
  //     })
  //     .catch(error => {
  //       console.error('Error writing document: ', error);
  //     });
  // }

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
