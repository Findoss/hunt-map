import template from './index.html';
import { Component } from '../index';

export class PopupNewPoly extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.selectedFile = undefined;
    this.refFile = undefined;
    this.api = props.api;
    this.mapId = props.mapId;
  }

  _handleSelectTypes(props, e) {}

  _handleSubmit(props, e) {
    this._loading(props);
    this.api
      .addPoly(this.mapId, {
        geometry: props.geometry,
        type: this.refs.types.value,
        coordinates: props.coords
      })
      .then(() => {
        this._success(props);
      })
      .catch(error => {
        this._error(props, error);
      });
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

  _error(props, error) {
    props.root.setPopupContent(`<h1 class="error">${t('error')}</h1>` + error.message);
  }

  show(props) {
    this.refs.types.innerText = props.geometry;
    this.refs.typesLable.innerText = t('type');
    this.refs.cansel.innerText = t('cancel');
    this.refs.send.innerText = t('send');

    props.types.forEach(type => {
      const option = document.createElement('option');
      option.innerText = t('types', type);
      option.value = type;
      this.refs.types.appendChild(option);
    });

    this.refs.types.onchange = this._handleSelectTypes.bind(this, props);
    this.refs.cansel.onclick = this._handleCansel.bind(this, props);
    this.refs.send.onclick = this._handleSubmit.bind(this, props);

    return this.getElement();
  }
}
