import L from 'leaflet/dist/leaflet';

export function Polyline(doc, id) {
  L.polyline(doc.geometry.coordinates, {
    color: 'lime',
    opacity: 0.3,
    weight: 10,
    className: `polyline-base polyline-${doc.properties.title}`
  })
    .on('click', () => console.log('Polyline id = ', id))
    .addTo(this.groups[doc.properties.title]);
}
