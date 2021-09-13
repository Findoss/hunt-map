export type Config = Record<string, string>;

export const cfgFirebase: Config = {
  apiKey: 'AIzaSyCK08_cm6iXguaw10EgT1GIzSfz1G2Nm-w',
  authDomain: 'hunt-map-1.firebaseapp.com',
  databaseURL: 'https://hunt-map-1.firebaseio.com',
  storageBucket: 'gs://hunt-map-1.appspot.com/',
  projectId: 'hunt-map-1',
};

export const cfgApp: Config = {
  prefixDevCollection: 'dev_',
};
