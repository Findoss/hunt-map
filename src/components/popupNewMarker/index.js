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
      props.typesMarkers[type].forEach(typeMarker => {
        const option = document.createElement('option');
        option.innerText = t('typesMarkers', type, typeMarker);
        option.value = typeMarker;
        this.refs.typeMarkers.appendChild(option);
      });
    } else {
      const option = document.createElement('option');
      option.innerText = t('types', type);
      option.value = type;
      this.refs.typeMarkers.appendChild(option);
    }
  }

  _handleSelectTypes(props, e) {
    const type = this.refs.types.value;
    this._createMarkerSelect(props, type);

    this.refs.description.value = '';
    this.refs.file.classList.add('hidden');

    switch (type) {
      case 'easter-egg':
        this.refs.file.classList.remove('hidden');
        break;

      case 'clue':
        this.refs.file.classList.remove('hidden');
        break;

      case 'cash':
        this.refs.file.classList.remove('hidden');
        break;

      case 'resupply-point':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        this.refs.description.value += '<br/>' + t('fastDescription', type);
        break;

      case 'aviary':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
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
    const type = this.refs.types.value;
    this.refs.description.value = '';

    switch (type) {
      case 'boss':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        break;

      case 'aviary':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        break;

      case 'resupply-point':
        this.refs.description.value = this.refs.typeMarkers.options[
          this.refs.typeMarkers.selectedIndex
        ].text;
        this.refs.description.value += '<br/>' + t('fastDescription', type);
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
        if (this.selectedFile) {
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
        } else {
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
        }
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
    props.root.setPopupContent(t('upload'));
  }

  _success(props) {
    props.root.setPopupContent(`<h1 class="success">${t('success')}</h1>${t('msgModer')}`);
  }

  _error(error) {
    props.root.setPopupContent(`<h1 class="error">${t('error')}</h1>` + error.message);
  }

  show(props) {
    this.refs.typesLable.innerText = t('type');
    this.refs.markerLable.innerText = t('marker');
    this.refs.descriptionLable.innerText = t('description');
    this.refs.cansel.innerText = t('cancel');
    this.refs.send.innerText = t('send');

    props.types.forEach(type => {
      const option = document.createElement('option');
      option.innerHTML = t('types', type);
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
