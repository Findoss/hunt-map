import L from '../../../node_modules/leaflet/dist/leaflet';
import { PopupText } from '../popupText';

export function Marker(doc, id) {
  if (this.allTypes.findIndex(type => doc.properties.title === type) > -1) {
    switch (doc.properties.title) {
      case 'new-object':
        new L.marker(doc.geometry.coordinates, {
          icon: L.divIcon({
            className: 'marker-base marker-' + doc.properties.title
          })
        })
          .on('click', () => console.log('Marker id = ', id))
          .bindPopup(/*this.popupApprove(id, doc)*/)
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
          .bindPopup(L.responsivePopup().setContent(new PopupText().show(id, doc.properties)))
          .bindTooltip(doc.properties.title.replace('-', ' '))
          .addTo(this.groups[doc.properties.title]);
        break;
    }
  }
}
