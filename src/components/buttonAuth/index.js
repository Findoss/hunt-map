import '../../../node_modules/firebaseui/dist/firebaseui.css';
import './index.css';
import firebase from 'firebase/app';

L.Control.Auth = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function() {
    const container = L.DomUtil.create('div', 'leaflet-control leaflet-control-auth');
    container.onclick = e => {
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

    return container;
  }
});

L.control.auth = function(options) {
  return new L.Control.Auth(options);
};
