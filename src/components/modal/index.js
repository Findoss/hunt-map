import './index.css';
import template from './index.html';
import { Component } from '../index';
import { runInThisContext } from 'vm';

export class Modal extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.create(props.data);
  }

  create(data) {
    this.refs.fullImg.src = data;
    this.refs.container.onclick = () => {
      const elem = this.refs.container;
      if (elem.style.display === 'none') {
        elem.style.display = 'flex';
      } else {
        elem.style.display = 'none';
      }
    };
  }
}
