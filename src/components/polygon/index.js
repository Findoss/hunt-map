import './index.css';
import L from 'leaflet/dist/leaflet';

export function Polygon(doc, id) {
  return L.polygon(doc.geometry.coordinates, {
    color: 'darkred',
    fillColor: 'darkred',
    fillOpacity: 0,
    dashArray: [20, 15],
    className: 'poligon-base poligon-zone'
  }).on('click', e => {
    console.log('Polygon id = ', id);
  });
}
