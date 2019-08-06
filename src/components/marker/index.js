import L from 'leaflet/dist/leaflet';
import { PopupText } from '../popupText';

export function Marker(doc, id, isLogin) {
  if (this.allTypes.findIndex(type => doc.properties.title === type) > -1) {
    const type = doc.properties.title;

    if (type === 'label') {
      return new L.marker(doc.geometry.coordinates, {
        icon: L.divIcon({
          className: 'marker-' + type,
          html: `<div class="marker-label_text">${doc.properties.name}</div>`
        })
      });
    } else {
      return new L.marker(doc.geometry.coordinates, {
        icon: L.divIcon({
          className: 'marker-base marker-' + doc.properties.marker
        }),
        draggable: isLogin
      })
        .on('click', () => console.log('Marker id = ', id))
        .bindPopup(L.responsivePopup().setContent(new PopupText().show(id, doc.properties)))
        .bindTooltip(t('types', type));
    }
  }
}
