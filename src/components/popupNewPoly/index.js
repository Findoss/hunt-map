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
    this._loading();
    this.api
      .addPoly(this.mapId, {
        geometry: props.geometry,
        type: this.refs.types.value,
        coordinates: props.coords
      })
      .then(() => {
        this._success();
      })
      .catch(error => {
        this._error(error);
      });
  }

  _handleCansel(props, e) {
    props.root.remove();
  }

  _loading() {
    this.refs.container.innerHTML = 'Uploading data...';
  }

  _success() {
    this.refs.container.innerHTML =
      '<h1 style="color:green">SUCCESS</h1>Data send to server, information will appear as soon as it is checked by the moderator.';
  }

  _error(error) {
    this.refs.container.innerHTML = '<h1 style="color:red">ERROR</h1>' + error.message;
  }

  show(props) {
    this.refs.types.innerText = props.geometry;

    props.types.forEach(type => {
      const option = document.createElement('option');
      option.innerHTML = type;
      option.value = type;
      this.refs.types.appendChild(option);
    });

    this.refs.types.onchange = this._handleSelectTypes.bind(this, props);
    this.refs.cansel.onclick = this._handleCansel.bind(this, props);
    this.refs.send.onclick = this._handleSubmit.bind(this, props);

    return this.getElement();
  }
}
