import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { cfgFirebase, cfgApp } from './config';
import type { Config } from './config';

export class Firebase {
  cfgFB;
  cfgAPP;
  firebase;
  firestore;
  storage;

  constructor(cfgFB: Config, cfgAPP: Config) {
    this.cfgFB = cfgFB;
    this.cfgAPP = cfgAPP;
    this.firebase = initializeApp(cfgFirebase);
    this.firestore = getFirestore();
    this.storage = getStorage();
  }

  async getItems(mapId: string = '', draft: boolean = false) {
    const data: Record<string, any> = {};
    const collectionName = `${draft ? this.cfgAPP.prefixDevCollection : ''}${mapId}`;

    const snapshot = await getDocs(collection(this.firestore, collectionName));
    snapshot.forEach((doc) => (data[doc.id] = doc.data()));
    return data;
  }
}

export const backend = new Firebase(cfgFirebase, cfgApp);
