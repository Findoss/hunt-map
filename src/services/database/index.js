import firebase from 'firebase/app';
import firebaseui from 'firebaseui';
import auth from './auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { newId } from '../../utils';

export class DB {
  constructor(config) {
    const { firebaseConfig } = config;
    this.firebase = firebase;
    this.firestore = firebase.initializeApp(firebaseConfig).firestore();
    this.storage = firebase.storage();
    this.auth = auth(firebase, firebaseui);

    this.firestore.enablePersistence().catch(function(err) {
      if (err.code == 'failed-precondition') {
        console.error('Multiple tabs open.');
      } else if (err.code == 'unimplemented') {
        console.error('The current browser does not support to enable persistence');
      }
    });
  }

  // DB
  //
  async getItems(mapId, dev = '') {
    const data = {};
    await this.firestore
      .collection(`${dev}${mapId}`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => (data[doc.id] = doc.data()));
      })
      .catch(error => {
        console.error('Error API', error);
      });
    return data;
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

    return this.firestore
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

    return this.firestore
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

  approveObject(mapId, docId, data) {
    console.log(data);

    return Promise.all([
      this.firestore
        .collection(mapId)
        .doc()
        .set(data),
      this.firestore
        .collection(`dev_${mapId}`)
        .doc(docId)
        .delete()
    ])
      .then(() => {
        console.log('Document successfully move!');
      })
      .catch(error => {
        console.error('Error moving document: ', error);
      });
  }

  updateObject(mapId, docId, data) {
    return this.firestore
      .collection(mapId)
      .doc(docId)
      .set(data)
      .then(() => {
        console.log('Document successfully updated');
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });
  }

  deleteObject(mapId, docId, dev = '') {
    return this.firestore
      .collection(`${dev}${mapId}`)
      .doc(docId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
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
}
