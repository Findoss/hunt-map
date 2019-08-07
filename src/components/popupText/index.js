import './index.css';
import template from './index.html';
import { Component } from '../index';
import { getLocalesProp } from '../../utils/translate';

export class PopupText extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
  }

  show(id, doc) {
    this.refs.title.innerText = t('types', doc.title);
    this.refs.content.innerHTML = doc.description ? getLocalesProp(doc.description) : '';
    return this.getElement();
  }
}
