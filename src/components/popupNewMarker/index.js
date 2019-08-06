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

    // props.events.testEvent('123');
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
        this.refs.description.value = '3 Medkit <br/>3 Ammunition box <br/>1-2 Lantern';
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
    const ext = e.target.value.slice(e.target.value.lastIndexOf('.'));
    this.selectedFile = e.target.files[0];
    this.refFile = this.api.createFileURL(ext);
  }

  _handleSubmit(props, e) {
    switch (this.refs.types.value) {
      case 'easter-egg':
        this._loading(props);
        this.api.uploadFile(this.refFile, this.selectedFile).then(url => {
          this.refs.description.value += templateImage({ url });
          this.api
            .addMarker(this.mapId, {
              type: this.refs.types.value,
              coordinates: props.coord,
              marker: this.refs.typeMarkers.value,
              description: this.refs.description.value
            })
            .then(() => {
              this._success(props);
            })
            .catch(error => {
              this._error(error);
            });
        });
        break;

      default:
        this._loading(props);
        this.api
          .addMarker(this.mapId, {
            type: this.refs.types.value,
            coordinates: props.coord,
            marker: this.refs.typeMarkers.value,
            description: this.refs.description.value
          })
          .then(() => {
            this._success(props);
          })
          .catch(error => {
            this._error(error);
          });
        break;
    }
  }

  _handleCansel(props, e) {
    props.root.remove();
  }

  _loading(props) {
    props.root.setPopupContent('Uploading data...');
  }

  _success(props) {
    props.root.setPopupContent(
      '<h1 style="color:green">SUCCESS</h1>Data send to server, information will appear as soon as it is checked by the moderator.'
    );
  }

  _error(error) {
    props.root.setPopupContent('<h1 style="color:red">ERROR</h1>' + error.message);
  }

  show(props) {
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
