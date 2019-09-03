const serviceAccount = require('./key.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hunt-map-1.firebaseio.com'
});

const DB = admin.firestore();

const collect = 'SB';

const props = 'properties.title';
const value = 'aviary';

const newData = {
  en: 'Dogs or Chicken',
  ru: 'Собаки или курицы',
  fr: 'Chiens ou Poules'
};

const prop = {
  properties: {
    description: newData,
    marker: 'aviary',
    title: 'aviary'
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
