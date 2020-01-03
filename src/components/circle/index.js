import './index.css';
import L from 'leaflet/dist/leaflet';

export function Circle(doc, radius, color) {
  return L.circle(doc.geometry.coordinates, {
    radius: radius,
    color: color,
    fillColor: color,
    fillOpacity: 0.03,
    dashArray: [20, 15],
    className: 'circle'
  });
}
