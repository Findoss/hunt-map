const serviceAccount = require('./key.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hunt-map-1.firebaseio.com'
});

const DB = admin.firestore();

const collect = 'LD';

const props = 'properties.title';
const value = 'XXX';

const newData = {
  en: 'Assassin, Butcher, Spider',
  ru: 'Убийца, Мясник, Паук',
  fr: 'Assassin, Boucher, Araignée'
};

const prop = {
  properties: {
    description: newData,
    marker: 'XXX',
    title: 'XXX'
  }
};

let data = {};
DB.collection(collect)
  .where(props, '==', value)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => (data[doc.id] = doc.data()));
    return data;
  })
  .then(data => {
    Object.keys(data).forEach(id => {
      DB.collection(collect)
        .doc(id)
        .update(prop)
        .then(() => {
          console.log('Document successfully updated');
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    });
  });
