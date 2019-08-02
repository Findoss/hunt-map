import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { newId } from '../../utils';

export class DB {
  constructor(config) {
    const { firebaseConfig } = config;
    this.base = firebase.initializeApp(firebaseConfig).firestore();
    this.storage = firebase.storage();

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

  // DB
  //
  async getItems(mapId) {
    const data = {};
    await this.base
      .collection(mapId)
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
    return this.base.collection(`dev_${mapId}`).get();
  }

  addMarker(mapId, payload) {
    const { type, coordinates, marker, description } = payload;

    const coords = Object.assign({}, coordinates);

    const data = {
      type: 'Feature',
      properties: {
        title: type,
        marker,
        description
      },
      geometry: {
        type: 'point',
        coordinates: coords
      }
    };

    return this.base
      .collection(`dev_${mapId}`)
      .doc()
      .set(data)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  addPoly(mapId, payload) {
    const { type, coordinates, geometry } = payload;

    const arrCoords = coordinates.map(obj => Object.assign({}, obj));

    const data = {
      type: 'Feature',
      properties: {
        title: type
      },
      geometry: {
        type: geometry,
        coordinates: arrCoords
      }
    };

    return this.base
      .collection(`dev_${mapId}`)
      .doc()
      .set(data)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  // FS
  //

  createFileURL(ext) {
    const storageRef = this.storage.ref();
    const imgRef = storageRef.child('images/' + newId() + ext);
    return imgRef;
  }

  uploadFile(ref, file) {
    const uploadTask = ref.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => reject(error),
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              console.log('Success upload file');
              resolve(downloadURL);
            })
            .catch(error => reject(error));
        }
      );
    });
  }

  // approvePoint(mapId, docId, data) {
  //   return Promise.all([
  //     this.base.collection(mapId)
  //       .doc()
  //       .set(data),
  //     this.base.collection(`dev_${mapId}`)
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
  //   return this.base.collection(`dev_${mapId}`)
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
