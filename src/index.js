import './main.css';

import config from './config';
import template from './main.html';

import { Map } from './components/map';
import { SwitchMap } from './components/switchMap';

// import { DB } from './services/database';
import { Static } from './services/static';
import { Cache } from './services/cache';

class ViewController {
  constructor() {
    console.log('v2.0.4');

    this.static = new Static();
    this.cache = new Cache();
    // this.api = new DB(config);

    document.getElementById('app').outerHTML = template;

    this.initializeMap();
    this.initializeComponents();
  }

  initializeMap() {
    this.mapComponent = new Map('map-placeholder', {
      data: config,
      events: {
        testEvent: event => {
          console.log('testEvent');
        }
      }
    });
    this.loadMapData();
  }

  initializeComponents() {
    this.switchMapComponent = new SwitchMap('switch-map-placeholder', {
      data: config.optionsMaps,
      events: {
        switchMap: event => {
          this.switchMap(event.detail);
        }
      }
    });
  }

  async loadMapData() {
    const staticData = await this.static.getItems(config.mapId);
    let apiData = {};
    if (config.realtime) {
      const tmpData = await this.api.getItems(config.mapId);
      const tmpNewData = await this.api.getForСheckItems(config.mapId);
      apiData = { ...tmpData, ...tmpNewData };
    } else {
      apiData = await this.cache.getItems(config.mapId);
    }

    const data = { ...staticData, ...apiData };
    this.mapComponent.addMarkers(data);
  }

  switchMap(id) {
    localStorage.setItem('MAP-ID', id);
    config.mapId = id;
    this.mapComponent.delete();
    this.initializeMap();
  }
}

window.ctrl = new ViewController();
