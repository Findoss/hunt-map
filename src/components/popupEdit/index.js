import './index.css';
import template from './index.html';
import { Component } from '../index';

export class PopupEdit extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.api = props.api;
    this.mapId = props.mapId;
  }

  _handleSubmit(props, e) {
    const data = JSON.parse(this.refs.doc.value);
    if (props.isNew) {
      this.api
        .approveObject(this.mapId, props.id, data)
        .then(() => {
          this._success(props);
        })
        .catch(error => {
          this._error(error);
        });
    } else {
      this.api
        .updateObject(this.mapId, props.id, data)
        .then(() => {
          this._success(props);
        })
        .catch(error => {
          this._error(error);
        });
    }
  }

  _handleDelete(props, e) {
    this.api
      .deleteObject(this.mapId, props.id, props.isNew ? 'dev_' : '')
      .then(() => {
        this._success(props);
      })
      .catch(error => {
        this._error(error);
      });
  }

  _success(props) {
    props.root.setPopupContent('<h1 style="color:green">SUCCESS</h1>');
  }

  _error(error) {
    props.root.setPopupContent('<h1 style="color:red">ERROR</h1>' + error.message);
  }

  _updateCoordsDoc(doc, newCoord) {
    doc.geometry.coordinates = newCoord;
    this.refs.doc.value = JSON.stringify(doc, null, 2);
  }

  show(props) {
    this.refs.doc.value = JSON.stringify(props.doc, null, 2);

    this.refs.cansel.onclick = this._handleDelete.bind(this, props);
    this.refs.send.onclick = this._handleSubmit.bind(this, props);

    props.root.on('moveend', e => {
      this._updateCoordsDoc(props.doc, e.target._latlng);
    });

    return this.getElement();
  }
}
