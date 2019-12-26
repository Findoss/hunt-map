import L from '../../../node_modules/leaflet/dist/leaflet';
import { getLocalesProp } from '../../utils/translate';
import { PopupText } from '../popupText';
import { Circle } from '../circle';

export function Marker(doc, id, isLogin) {
  if (this.allTypes.findIndex(type => doc.properties.title === type) > -1) {
    const type = doc.properties.title;

    switch (doc.properties.title) {
      case 'label':
        return new L.marker(doc.geometry.coordinates, {
          icon: L.divIcon({
            className: 'marker-' + type,
            html: `<div class="marker-label_text">${getLocalesProp(doc.properties.name)}</div>`
          })
        });
        break;

      default:
        const circles = [];
        if (type === 'boss') {
          circles.push(Circle(doc, 40, 'darkred'));
          circles.push(Circle(doc, 80, 'white'));
        }

        return new L.marker(doc.geometry.coordinates, {
          icon: L.divIcon({
            className: 'marker-base marker-' + doc.properties.marker
          }),
          draggable: isLogin
        })
          .on('mouseover', () => {
            if (type === 'boss') {
              circles.forEach(circle => {
                circle.addTo(this.groups[doc.properties.title]);
              });
            }
          })
          .on('mouseout', () => {
            if (type === 'boss') {
              circles.forEach(circle => {
                circle.remove();
              });
            }
          })
          .on('click', () => console.log('Marker id = ', id))
          .bindPopup(L.responsivePopup().setContent(new PopupText().show(id, doc.properties)))
          .bindTooltip(t('types', doc.properties.title));

        break;
    }
  }
}
