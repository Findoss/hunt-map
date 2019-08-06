import './index.css';
import template from './index.html';
import { Component } from '../index';

export class PopupText extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
  }

  show(id, doc) {
    this.refs.title.innerHTML = t('types', doc.title);
    this.refs.content.innerHTML = doc.description ? doc.description : '';
    return this.getElement();
  }
}
