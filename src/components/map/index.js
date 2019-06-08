import 'leaflet/dist/leaflet.css';
import 'leaflet-responsive-popup/leaflet.responsive.popup.css';
// import 'leaflet-draw/dist/leaflet.draw.css';

import './index.css';
import '../markers/index.css';

import L from 'leaflet';
// plugins
import '../ruler';
// import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-responsive-popup/leaflet.responsive.popup.js';
// components
import { Component } from '../index';
import { PopupText } from '../popupText';
import { legendItem } from '../legendItem';
import { minPow } from '../../utils';

const template = '<div ref="mapContainer" class="map-container"></div>';

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

    const {
      mapId,
      optionsMaps,
      types,
      typesMarkers,
      author,
      contributors,
      buttonAuth,
      realtime,
      extraTypes,
      currentLayers,
      contributorNames,
      optionsRuler
    } = props.data;

    this.types = types;
    this.extraTypes = extraTypes;
    this.realtime = realtime;
    this.currentLayers = currentLayers;

    const optionMap = optionsMaps[mapId];

    const width = optionMap.image.width;
    const height = optionMap.image.height;
    const padding = optionMap.padding;

    const factorX = ((width / minPow(width)) * 256) / 1000;
    const factorY = ((height / minPow(height)) * 256) / 1000;

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

    this.map = L.map(this.refs.mapContainer, {
      crs: L.CRS.Pr,
      maxBoundsViscosity: 0.8,
      zoomSnap: 0.2
    });

    // const sw = this.map.unproject([-padding, height], optionMap.levels.org);
    // const ne = this.map.unproject([width + padding, -padding], optionMap.levels.org);
    // const boundsMove = new L.LatLngBounds(sw, ne);

    const sw2 = this.map.unproject([0, height], optionMap.levels.org);
    const ne2 = this.map.unproject([width, 0], optionMap.levels.org);
    const boundsLoadTiles = new L.LatLngBounds(sw2, ne2);

    const attribution = author + contributors + buttonAuth;

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
    // this.editableLayers = new L.FeatureGroup();

    [...types, ...extraTypes].forEach(type => {
      this.groups[type] = L.layerGroup();
      this.groups[type].title = type;
      this.legendItems[legendItem(type)] = this.groups[type];
    });

    //
    // const drawControl = new L.Control.Draw({
    //   edit: {
    //     featureGroup: editableLayers,
    //     poly: {
    //       allowIntersection: false
    //     }
    //   },
    //   draw: {
    //     polygon: {
    //       allowIntersection: false,
    //       showArea: true
    //     }
    //   }
    // });

    //
    // this.map.addControl(drawControl);
    //
    L.control.layers(null, this.legendItems).addTo(this.map);
    L.control.measure(optionsRuler).addTo(this.map);
    //
    // this.map.addLayer(this.editableLayers);
    this.map.setMaxBounds(/*boundsMove*/ boundsLoadTiles);
    this.map.setView(optionMap.center, optionMap.levels.default);

    this.map.on('click', e => {
      if (this.realtime) console.log(e.latlng);
    });

    this.map.on('overlayadd', e => {
      let currentLayers = JSON.parse(localStorage.getItem('LAYERS')) || [];
      if (currentLayers.indexOf(e.layer.title) === -1) {
        currentLayers.push(e.layer.title);
        localStorage.setItem('LAYERS', JSON.stringify(currentLayers));
      }
    });

    this.map.on('overlayremove', e => {
      const currentLayers = JSON.parse(localStorage.getItem('LAYERS'));
      currentLayers.splice(currentLayers.indexOf(e.layer.title), 1);
      localStorage.setItem('LAYERS', JSON.stringify(currentLayers));
    });

    this.map.on('zoom', e => {
      localStorage.setItem('ZOOM', e.target.getZoom());
    });

    this.map.on('moveend', e => {
      localStorage.setItem('CENTER', JSON.stringify(e.target.getCenter()));
    });
  }

  addMarkers(data) {
    let countMarkers = 0;
    Object.keys(data).forEach(id => {
      countMarkers++;
      const doc = data[id];
      const allTypes = [...this.extraTypes, ...this.types];

      if (allTypes.findIndex(type => doc.properties.title === type) > -1) {
        switch (doc.properties.title) {
          case 'new-object':
            new L.marker(doc.geometry.coordinates, {
              icon: L.divIcon({
                className: 'marker-base marker-' + doc.properties.title
              })
            })
              .on('click', () => console.log('Marker id = ', id))
              .bindPopup(this.popupApprove(id, doc))
              .addTo(this.groups[doc.properties.title]);
            break;

          case 'label':
            new L.marker(doc.geometry.coordinates, {
              icon: L.divIcon({
                className: 'marker-' + doc.properties.title,
                html: `<div class="marker-label_text">${doc.properties.name}</div>`
              })
            }).addTo(this.groups[doc.properties.title]);
            break;

          default:
            new L.marker(doc.geometry.coordinates, {
              icon: L.divIcon({
                className: 'marker-base marker-' + doc.properties.marker
              })
            })
              .on('click', () => console.log('Marker id = ', id))
              .bindPopup(this.createPopupMarker(id, doc))
              .addTo(this.groups[doc.properties.title]);
            break;
        }
      }
    });

    if (!this.currentLayers || !this.currentLayers.length) this.currentLayers = allTypes;
    this.currentLayers.forEach(layer => {
      this.groups[layer].addTo(this.map);
    });

    // for (const type in this.groups) {
    //   if (this.groups.hasOwnProperty(type)) {
    //     const el = this.groups[type];
    //     console.log(type, Object.keys(el._layers).length);
    //   }
    // }
    // console.log('markers', countMarkers);
  }

  createPopupMarker(id, doc) {
    if (this.realtime) {
      return this.popupEdit();
    } else {
      return L.responsivePopup().setContent(new PopupText().show(id, doc.properties).getElement());
    }
  }

  popupEdit() {
    return `EDIT`;
  }

  popupApprove() {
    return `APPROVE`;
  }

  delete() {
    this.map.remove();
  }
}
