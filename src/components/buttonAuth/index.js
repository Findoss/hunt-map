import './index.css';
import './index.css';

L.Control.Auth = L.Control.extend({
  options: {
    position: 'bottomleft'
  },
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'leaflet-control leaflet-control-auth');

    // container.onclick = function() {
    //   console.log('button auth clicked');
    // };
    return container;
  }
});

L.control.auth = function(options) {
  return new L.Control.Auth(options);
};
