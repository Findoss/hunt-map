import './index.css';
import template from './index.html';
import { Component } from '../index';

export class PopupNewMarker extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
  }

  _createMarkerSelect(props, type) {
    this.refs.typeMarkers.innerText = '';

    if (Object.keys(props.typesMarkers).indexOf(type) !== -1) {
      props.typesMarkers[this.refs.types.value].forEach(typeMarker => {
        const option = document.createElement('option');
        option.innerHTML = typeMarker.title;
        option.value = typeMarker.title;
        this.refs.typeMarkers.appendChild(option);
      });
    } else {
      const option = document.createElement('option');
      option.innerHTML = type;
      option.value = type;
      this.refs.typeMarkers.appendChild(option);
    }
  }

  show(props) {

    this.refs.latlng.innerHTML = `[
      ${props.latlng.lat.toFixed(2)}, 
      ${props.latlng.lng.toFixed(2)}
    ]`;

    props.types.forEach(type => {
      const option = document.createElement('option');
      option.innerHTML = type;
      option.value = type;
      this.refs.types.appendChild(option);
    });

    this._createMarkerSelect(props, this.refs.types.value);

    this.refs.types.onchange = e => {
      this._createMarkerSelect(props, this.refs.types.value);

      this.refs.description.value = '';
      this.refs.file.classList.add('hidden');

      switch (this.refs.types.value) {
        case 'easter-egg':
          this.refs.file.classList.remove('hidden');
          break;

        case 'resupply-point':
          this.refs.description.value = '3 Medkit \n3 Ammunition box \n1-2 Lantern';
          break;

        case 'aviary':
          this.refs.description.value = 'Dogs or chickens';
          break;

        case 'boss':
          this.refs.description.value = this.refs.typeMarkers.value;
          break;

        default:
          break;
      }
    };

    this.refs.typeMarkers.onchange = e => {
      this.refs.description.value = '';
      switch (this.refs.types.value) {
        case 'boss':
          this.refs.description.value = this.refs.typeMarkers.value;
          break;

        default:
          break;
      }
    };

    return this.getElement();
  }
}
