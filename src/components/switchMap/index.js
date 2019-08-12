import './index.css';
import template from './index.html';
import { Component } from '../index';

export class SwitchMap extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);

    this.addSwitchButtons(props.data);
  }

  addSwitchButtons(data) {
    Object.keys(data).forEach(mapId => {
      let button = document.createElement('button');
      button.value = mapId;
      button.className = 'switch-map-button';
      button.innerHTML = t(mapId);

      button.addEventListener('click', e => {
        this.triggerEvent('switchMap', e.target.value);
      });

      this.refs.container.appendChild(button);
    });
  }
}
