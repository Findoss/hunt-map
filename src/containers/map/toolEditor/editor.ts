// @ts-nocheck

import * as L from 'leaflet';
import 'leaflet-draw';
// import 'leaflet-draw/dist/leaflet.draw.css';

const optionsDefault = {
  position: 'topright',
  // polyline: {
  //   allowIntersection: false,
  //   shapeOptions: {
  //     stroke: true,
  //     color: 'aqua',
  //     weight: 12,
  //     opacity: 0.8,
  //     fill: false,
  //     clickable: false,
  //   },
  // },
  // polygon: {
  //   allowIntersection: false,
  //   shapeOptions: {
  //     stroke: true,
  //     color: 'aqua',
  //     weight: 4,
  //     opacity: 0.8,
  //     fill: true,
  //     fillColor: null,
  //     fillOpacity: 0.2,
  //     showArea: false,
  //     clickable: false,
  //   },
  // },
  // circle: {
  //   allowIntersection: false,
  //   shapeOptions: {
  //     stroke: true,
  //     color: 'aqua',
  //     weight: 4,
  //     opacity: 0.8,
  //     fill: true,
  //     fillColor: null,
  //     fillOpacity: 0.2,
  //     showArea: false,
  //     clickable: false,
  //   },
  // },
  polyline: false,
  polygon: false,
  circle: false,
  circlemarker: false,
  rectangle: false,
};

export function createDraw(editableLayer, options? = optionsDefault) {
  const opt = {
    ...options,
    edit: {
      featureGroup: editableLayer,
      remove: false,
      edit: false,
    },
  };
  const controlDraw = new L.Control.Draw(opt);
  return controlDraw;
}
