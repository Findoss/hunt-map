import './index.css';
import template from './index.html';
import { Component } from '../index';
import L from 'leaflet/dist/leaflet';

export class ButtonStyleAlt extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.createButton();
  }

  createButton() {
    L.Control.ButtonStyleAlt = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: () => {
        const button = this.refs.buttonStyleAlt;
        button.onclick = e => {
          var x = document.getElementById('style-alt');
          x.disabled = !x.disabled;
        };

        return button;
      }
    });

    L.control.buttonStyleAlt = options => {
      return new L.Control.ButtonStyleAlt(options);
    };
  }
}
