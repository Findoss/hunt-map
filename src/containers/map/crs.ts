import * as L from 'leaflet';
import { minPow } from '../../utils/min-pow';

import type { LatLngLiteral } from 'leaflet';

export const createCRS = (widthImage: number, heightImage: number) => {
  const factorX = ((widthImage / minPow(widthImage)) * 256) / 1000;
  const factorY = ((heightImage / minPow(heightImage)) * 256) / 1000;

  // Плоское представление мира
  // т.к. у нас маленькая карта
  const crs = L.extend({}, L.CRS.Simple, {
    infinite: true,
    transformation: new L.Transformation(factorX, 0, -factorY, 0),
    projection: L.Projection.LonLat,
    scale(zoom: number) {
      return Math.pow(2, zoom);
    },
    zoom(scale: number) {
      return Math.log(scale) / Math.LN2;
    },
    distance(latlng1: LatLngLiteral, latlng2: LatLngLiteral) {
      const dx = latlng2.lng - latlng1.lng;
      const dy = latlng2.lat - latlng1.lat;
      return Math.sqrt(dx * dx + dy * dy);
    },
  });

  return crs;
};
