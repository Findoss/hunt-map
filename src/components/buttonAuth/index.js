import './index.css';
import '../../../node_modules/firebaseui/dist/firebaseui.css';
import template from './index.html';
import { Component } from '../index';
import L from '../../../node_modules/leaflet/dist/leaflet';
import firebase from 'firebase/app';

export class ButtonAuth extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);
    this.createButton();
  }

  createButton() {
    L.Control.Auth = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: () => {
        const button = this.refs.buttonAuth;
        button.onclick = e => {
          if (firebase.auth().currentUser) {
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log('signOut');
              });
          } else {
            var x = document.getElementById('auth-placeholder');
            x.style.display === 'none' ? (x.style.display = 'block') : (x.style.display = 'none');
          }
        };

        return button;
      }
    });

    L.control.auth = options => {
      return new L.Control.Auth(options);
    };
  }
}
