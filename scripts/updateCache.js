const fs = require('fs');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

const serviceAccount = require('./key.json');
const admin = require('firebase-admin');

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), err => {
    if (err) return cb(err);
    fs.writeFile(path, contents, cb);
  });
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hunt-map-1.firebaseio.com'
});

const collectionName = process.argv[2];
const DB = admin.firestore();
let data = {};

DB.collection(collectionName)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      data[doc.id] = doc.data();
    });
    return data;
  })
  .catch(err => {
    console.log('Error getting documents', err);
  })
  .then(data => {
    writeFile(`./public/cache/${collectionName}.json`, JSON.stringify(data), err => {
      if (err) return console.error(err);
      console.log(`The ${collectionName}.json was saved!`);
    });
  });
