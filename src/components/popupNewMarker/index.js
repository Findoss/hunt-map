import './index.css';
import template from './index.html';
import templateImage from './image.js';
import { Component } from '../index';

export class PopupNewMarker extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.selectedFile = undefined;
    this.refFile = undefined;
    this.api = props.api;
    this.mapId = props.mapId;
  }

  _createMarkerSelect(props, type) {
    this.refs.typeMarkers.innerText = '';

    if (Object.keys(props.typesMarkers).indexOf(type) !== -1) {
      props.typesMarkers[this.refs.types.value].forEach(typeMarker => {
        const option = document.createElement('option');
        option.innerText = typeMarker.title;
        option.value = typeMarker.label;
        this.refs.typeMarkers.appendChild(option);
      });
    } else {
      const option = document.createElement('option');
      option.innerText = type;
      option.value = type;
      this.refs.typeMarkers.appendChild(option);
    }
  }

  _handleSelectTypes(props, e) {
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
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        break;

      default:
        break;
    }
  }

  _handleSelectTypeMarkeds(props, e) {
    this.refs.description.value = '';
    switch (this.refs.types.value) {
      case 'boss':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        break;

      default:
        break;
    }
  }

  _handleFileUploadChange(props, e) {
    this.selectedFile = e.target.files[0];
    this.refFile = this.api.createFileURL();
  }

  _handleSubmit(props, e) {
    switch (this.refs.types.value) {
      case 'easter-egg':
        this.api.uploadFile(this.refFile, this.selectedFile).then(url => {
          this.refs.description.value += templateImage({ url });
          this.api
            .addMarker(this.mapId, {
              type: this.refs.types.value,
              coordinates: props.latlng,
              marker: this.refs.typeMarkers.value,
              description: this.refs.description.value
            })
            .then(() => {
              this._success();
            });
        });

        break;

      default:
        this.api
          .addMarker(this.mapId, {
            type: this.refs.types.value,
            coordinates: props.latlng,
            marker: this.refs.typeMarkers.value,
            description: this.refs.description.value
          })
          .then(() => {
            this._success();
          });
        break;
    }
  }

  _success() {
    this.refs.container.innerHTML =
      'Data send to server, information will appear as soon as it is checked by the moderator.';
  }

  _handleCansel(props, e) {
    console.log('_handleCansel');
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

    this.refs.types.onchange = this._handleSelectTypes.bind(this, props);
    this.refs.typeMarkers.onchange = this._handleSelectTypeMarkeds.bind(this, props);
    this.refs.file.onchange = this._handleFileUploadChange.bind(this, props);
    this.refs.cansel.onclick = this._handleCansel.bind(this, props);
    this.refs.send.onclick = this._handleSubmit.bind(this, props);

    return this.getElement();
  }
}
