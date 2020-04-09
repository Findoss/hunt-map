import t from './utils/translate';
window.t = t;

import './main.css';

import config from './config';
import template from './main.html';

import { Map } from './components/map';
import { SwitchMap } from './components/switchMap';

import { DB } from './services/database';
import { Static } from './services/static';
import { Cache } from './services/cache';

import { isInIframe } from './utils';
import { version } from '../package.json';
console.log(`%cver ${version}`, 'font-size: x-large');

class ViewController {
  constructor() {
    this.static = new Static();
    this.cache = new Cache();
    if (!isInIframe()) this.api = new DB(config);

    document.getElementById('app').outerHTML = template;

    // map
    this.initializeMap();
    // data
    if (!isInIframe()) this.initializeAuth();
    else this.loadMapData();
    // components
    this.initializeComponents();
  }

  async initializeMap() {
    this.mapComponent = new Map('map-placeholder', {
      data: config,
      api: this.api,
      events: {
        testEvent: event => {
          console.log('testEvent');
        }
      }
    });
  }

  async initializeComponents() {
    this.switchMapComponent = new SwitchMap('switch-map-placeholder', {
      data: config.optionsMaps,
      events: {
        switchMap: event => {
          this.switchMap(event.detail);
        }
      }
    });
  }

  async loadMapData(isLogin) {
    let apiData = {};
    apiData = await this.cache.getItems(config.mapId);
    const staticData = await this.static.getItems(config.mapId);
    const data = { ...staticData, ...apiData };
    this.mapComponent.addObjects(data, false, isLogin);
  }

  async loadMapDevData(isLogin) {
    this.api.getItems(config.mapId, 'dev_').then(newData => {
      this.mapComponent.addObjects(newData, true, isLogin);
    });
  }

  async switchMap(id) {
    if (!isInIframe()) localStorage.setItem('MAP-ID', id);
    config.mapId = id;
    this.mapComponent.delete();
    this.initializeMap();
    if (!isInIframe()) this.initializeAuth();
    else this.loadMapData();
  }

  async initializeAuth() {
    this.api.firebase.auth().onAuthStateChanged(isLogin => {
      if (isLogin) {
        console.log('Hello, user', isLogin.uid);
        this.loadMapData(true);
        this.loadMapDevData(true);
      } else {
        this.loadMapData();
      }
    });
  }
}

window.ctrl = new ViewController();
