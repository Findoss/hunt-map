import L from '../../../node_modules/leaflet/dist/leaflet';

export function Polyline(doc, id) {
  return L.polyline(doc.geometry.coordinates, {
    color: 'lime',
    opacity: 0.1,
    weight: 10,
    className: `polyline-base polyline-${doc.properties.title}`
  }).on('click', () => console.log('Polyline id = ', id));
}
