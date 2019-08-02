import L from 'leaflet/dist/leaflet';

export function Polygon(doc, id) {
  L.polygon(doc.geometry.coordinates, {
    color: 'darkred',
    fillColor: 'brown',
    fillOpacity: 0.1,
    dashArray: [20, 15],
    className: 'poligon-base poligon-zone'
  })
    .on('click', () => console.log('Polygon id = ', id))
    .addTo(this.groups[doc.properties.title]);
}
