import './main.css';

import config from './config';
import template from './main.html';

import { Map } from './components/map';
import { SwitchMap } from './components/switchMap';

import { DB } from './services/database';
import { Static } from './services/static';
import { Cache } from './services/cache';

import { version } from '../package.json';
console.log(`%cver ${version}`, 'font-size: x-large');

class ViewController {
  constructor() {
    this.static = new Static();
    this.cache = new Cache();
    this.api = new DB(config);

    document.getElementById('app').outerHTML = template;

    this.initializeMap();
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
    this.initializeAuth();
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
    localStorage.setItem('MAP-ID', id);
    config.mapId = id;
    this.mapComponent.delete();
    this.initializeMap();
  }

  async initializeAuth() {
    this.api.firebase.auth().onAuthStateChanged(isLogin => {
      if (isLogin) {
        console.log('Hello, user', isLogin.uid);
        this.loadMapData(true);
        this.loadMapDevData(true);
      } else {
        this.loadMapDevData();
      }
    });
  }
}

window.ctrl = new ViewController();
