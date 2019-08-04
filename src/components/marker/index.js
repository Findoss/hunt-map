import L from 'leaflet/dist/leaflet';
import { PopupText } from '../popupText';

export function Marker(doc, id) {
  if (this.allTypes.findIndex(type => doc.properties.title === type) > -1) {
    const type = doc.properties.title;

    if (type === 'label') {
      return new L.marker(doc.geometry.coordinates, {
        icon: L.divIcon({
          className: 'marker-' + doc.properties.title,
          html: `<div class="marker-label_text">${doc.properties.name}</div>`
        })
      });
    } else {
      return new L.marker(doc.geometry.coordinates, {
        icon: L.divIcon({
          className: 'marker-base marker-' + doc.properties.marker
        }),
        draggable: false
      })
        .on('click', () => console.log('Marker id = ', id))
        .bindPopup(L.responsivePopup().setContent(new PopupText().show(id, doc.properties)))
        .bindTooltip(doc.properties.title.replace('-', ' '));
    }
  }
}
