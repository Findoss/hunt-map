import 'leaflet/dist/leaflet.css';
import 'leaflet-responsive-popup/leaflet.responsive.popup.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import './index.css';
import '../draw/index.css';
import '../marker/index.css';
import '../print/index.css';
import '../fullscreen/index.css';

import L from '../../../node_modules/leaflet/dist/leaflet';
// plugins
import '../ruler';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet.fullscreen';
import 'leaflet-easyprint';
import 'leaflet-responsive-popup/leaflet.responsive.popup.js';
// components
import { minPow, merge, isInIframe } from '../../utils';

import { Component } from '../index';
import { Marker } from '../marker';
import { Polygon } from '../polygon';
import { Polyline } from '../polyline';
import { LegendItem } from '../legendItem';
import { ButtonAuth } from '../buttonAuth';
import { ButtonStyleAlt } from '../buttonStyleAlt';

import { PopupNewMarker } from '../popupNewMarker';
import { PopupNewPoly } from '../popupNewPoly';
import { PopupEdit } from '../popupEdit';

import template from './index.html';

/**
 * Leaflet Map Component
 * @extends Component
 */
export class Map extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   * @param { Object } config
   */
  constructor(mapPlaceholderId, props) {
    super(mapPlaceholderId, props, template);

    //
    // Пропсы
    //
    const {
      mapId,
      currentLayers,
      defaultLayers,
      //
      types,
      extraTypes,
      polygonTypes,
      polylineTypes,
      typesMarkers,
      //
      contributors,
      //
      optionsMaps,
      optionsDraw,
      optionsAuth,
      optionsRuler,
      optionsPrint
    } = props.data;

    this.mapId = mapId;
    this.api = props.api;
    this.types = types;

    this.allTypes = [...polylineTypes, ...polygonTypes, ...extraTypes, ...this.types];

    if (currentLayers === null) this.currentLayers = defaultLayers;
    else this.currentLayers = currentLayers; // localStorage

    const optionMap = optionsMaps[mapId];

    const width = optionMap.image.width;
    const height = optionMap.image.height;
    const padding = optionMap.padding;

    const factorX = ((width / minPow(width)) * 256) / 1000;
    const factorY = ((height / minPow(height)) * 256) / 1000;

    //
    // "Плоское" представление мира
    //
    L.CRS.Pr = L.extend({}, L.CRS.Simple, {
      infinite: true,
      transformation: new L.Transformation(factorX, 0, -factorY, 0),
      projection: L.Projection.LonLat,
      scale(zoom) {
        return Math.pow(2, zoom);
      },
      zoom(scale) {
        return Math.log(scale) / Math.LN2;
      },
      distance(latlng1, latlng2) {
        const dx = latlng2.lng - latlng1.lng;
        const dy = latlng2.lat - latlng1.lat;
        return Math.sqrt(dx * dx + dy * dy);
      }
    });

    // Инициализация карты
    this.map = L.map(this.refs.mapContainer, {
      crs: L.CRS.Pr,
      maxBoundsViscosity: 0.6,
      zoomSnap: 0.1,
      zoomControl: false
    });

    const sw = this.map.unproject([0, height], optionMap.levels.org);
    const ne = this.map.unproject([width, 0], optionMap.levels.org);
    const boundsLoadTiles = new L.LatLngBounds(sw, ne);

    const attribution = contributors;

    // Добавление слоев
    L.tileLayer(optionsMaps[mapId].image.path, {
      minZoom: optionMap.levels.min,
      maxZoom: optionMap.levels.max,
      bounds: boundsLoadTiles,
      continuousWorld: true,
      zIndex: 1,
      attribution
    }).addTo(this.map);

    this.groups = {};
    this.legendItems = {};
    this.editableLayers = new L.FeatureGroup();

    this.allTypes.forEach(type => {
      this.groups[type] = L.layerGroup();
      this.groups[type].title = type;
      this.legendItems[LegendItem(type)] = this.groups[type];
    });

    // Добавление контролов

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.editableLayers,
        remove: false,
        edit: false
      },
      draw: {
        ...optionsDraw,
        marker: {
          icon: L.divIcon({
            className: 'marker-base marker-new-object'
          })
        }
      }
    });
    L.drawLocal.draw = merge(L.drawLocal.draw, t('draw'));

    new ButtonStyleAlt();
    new ButtonAuth();

    this.map.addControl(L.control.zoom(t('zoom')));
    if (!isInIframe()) this.map.addControl(L.control.fullscreen(t('fullscreen')));
    this.map.addControl(L.control.measure(merge(optionsRuler, t('ruler'))));
    if (!isInIframe()) this.map.addControl(drawControl);
    this.map.addControl(L.control.buttonStyleAlt());
    this.map.addControl(L.control.layers(null, this.legendItems));
    this.map.addControl(L.easyPrint(merge(optionsPrint, t('print'))));
    if (!isInIframe()) this.map.addControl(L.control.auth(optionsAuth));

    //
    // Рендр
    //
    this.map.addLayer(this.editableLayers);
    this.map.setMaxBounds(/*boundsMove*/ boundsLoadTiles);
    this.map.setView(optionMap.center, optionMap.levels.default);

    //
    // События
    //
    this.map.on('overlayadd', e => {
      if (this.currentLayers.indexOf(e.layer.title) === -1) {
        this.currentLayers.push(e.layer.title);
        if (!isInIframe()) localStorage.setItem('LAYERS', JSON.stringify(this.currentLayers));
      }
    });

    this.map.on('overlayremove', e => {
      this.currentLayers.splice(this.currentLayers.indexOf(e.layer.title), 1);
      if (!isInIframe()) localStorage.setItem('LAYERS', JSON.stringify(this.currentLayers));
    });

    this.map.on('zoom', e => {
      if (!isInIframe()) localStorage.setItem('ZOOM', e.target.getZoom());
    });

    this.map.on('moveend', e => {
      if (!isInIframe()) localStorage.setItem('CENTER', JSON.stringify(e.target.getCenter()));
    });

    this.map.on('draw:created', e => {
      const layer = e.layer;
      switch (e.layerType) {
        case 'marker':
          layer.bindPopup(this.createPopupNewMarker(layer, layer.getLatLng(), types, typesMarkers));
          break;
        case 'polygon':
          layer.bindPopup(
            this.createPopupNewPoly(layer, 'polygon', layer._latlngs[0], polygonTypes)
          );
          break;
        case 'polyline':
          layer.bindPopup(
            this.createPopupNewPoly(layer, 'polyline', layer._latlngs, polylineTypes)
          );
          break;
        default:
          break;
      }

      this.groups['new-object'].addLayer(layer);
      layer.openPopup();
    });
  }

  testEvent(msg) {
    console.log(msg);
  }

  //
  // Создание объектов на карте
  //
  addObjects(data, isNew = false, isLogin = false) {
    Object.keys(data).forEach(id => {
      const doc = data[id];
      let object = {};

      switch (doc.geometry.type.toLowerCase()) {
        case 'polygon':
          object = Polygon.call(this, doc, id);
          break;
        case 'polyline':
          object = Polyline.call(this, doc, id);
          break;
        default:
          object = Marker.call(this, doc, id, isLogin);
          break;
      }

      if (isLogin) {
        object.unbindPopup();
        object.bindPopup(this.createPopupEdit(object, doc, id, isNew));
      }

      if (isNew) {
        object.addTo(this.groups['new-object']);
      } else {
        try {
          object.addTo(this.groups[doc.properties.title]);
        } catch (error) {
          console.error(`ID ERROR ${id}`);
        }
      }
    });

    this.currentLayers.forEach(layer => {
      this.groups[layer].addTo(this.map);
    });

    if (isLogin) {
      var x = document.getElementById('button-auth');
      x.classList.add('button-auth_login');
    }
  }

  createPopupEdit(layer, doc, id, isNew) {
    return L.responsivePopup().setContent(
      new PopupEdit(undefined, { api: this.api, mapId: this.mapId }).show({
        root: layer,
        id,
        doc,
        isNew
      })
    );
  }

  createPopupNewMarker(layer, coord, types, typesMarkers) {
    return L.responsivePopup().setContent(
      new PopupNewMarker(undefined, {
        api: this.api,
        mapId: this.mapId,
        events: { testEvent: this.testEvent }
      }).show({
        root: layer,
        coord,
        types,
        typesMarkers
      })
    );
  }

  createPopupNewPoly(layer, geometry, coords, polygonTypes) {
    return L.responsivePopup().setContent(
      new PopupNewPoly(undefined, { api: this.api, mapId: this.mapId }).show({
        root: layer,
        geometry,
        coords,
        types: polygonTypes
      })
    );
  }

  delete() {
    this.map.remove();
  }
}
