import './index.css';
import template from './index.html';
import { Component } from '../index';
import { getLocalesProp } from '../../utils/translate';

import { Modal } from '../modal';

export class PopupText extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
  }

  show(id, doc) {
    this.refs.title.innerText = t('types', doc.title);
    this.refs.content.innerHTML = doc.description ? getLocalesProp(doc.description) : '';

    this.refs.content.onclick = e => {
      if (e.target instanceof HTMLElement) {
        if (e.target.hasAttribute('data-modal')) {
          new Modal('img-full-size-placeholder', { data: e.target.currentSrc });
        }
      }
    };

    return this.getElement();
  }
}
