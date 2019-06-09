function createMap() {
  const mapId = localStorage.getItem('MAP-ID') || 'SB';
  let currentLayers = JSON.parse(localStorage.getItem('LAYERS')) || types;
  localStorage.setItem('LAYERS', '[]');

  L.CRS.Pr = L.extend({}, L.CRS.Simple, {
    infinite: true,
    transformation: new L.Transformation(
      optionsMaps[mapId].factor.x,
      0,
      -optionsMaps[mapId].factor.y,
      0
    ),
    projection: L.Projection.LonLat,
    scale(zoom) {
      return Math.pow(2, zoom);
    },
    zoom(scale) {
      return Math.log(scale) / Math.LN2;
    },
    distance(latlng1, latlng2) {
      const dx = latlng2.lng - latlng1.lng;
      const dy = latlng2.lat - latlng1.lat;
      return Math.sqrt(dx * dx + dy * dy);
    }
  });

  function addMarkers(doc, id) {
    if (types.findIndex(type => doc.properties.title === type) > -1) {
      return new L.marker(doc.geometry.coordinates, {
        icon: L.divIcon({
          className: 'marker-base marker-' + doc.properties.marker
        })
      })
        .on('click', () => {
          console.log('Marker id = ', id);
        })
        .bindPopup(popupMarker(doc.properties.title, doc.properties.description))
        .addTo(groups[doc.properties.title]);
    }
  }

  const map = L.map('map', {
    crs: L.CRS.Pr,
    maxBoundsViscosity: 0.8,
    // padding: [300, 300],
    zoomSnap: 0.2
  });

  const sw = map.unproject([-300, optionsMaps[mapId].image.height], optionsMaps[mapId].levels.org);
  const ne = map.unproject(
    [optionsMaps[mapId].image.width + 300, -300],
    optionsMaps[mapId].levels.org
  );

  const sw2 = map.unproject([0, optionsMaps[mapId].image.height], optionsMaps[mapId].levels.org);
  const ne2 = map.unproject([optionsMaps[mapId].image.width, 0], optionsMaps[mapId].levels.org);
  const bounds = new L.LatLngBounds(sw, ne); // для ограничения
  const bounds2 = new L.LatLngBounds(sw2, ne2); // для загрузки слоя

  const groups = {};
  const icons = {};
  const legendItems = {};

  icons['NEW_OBJECT'] = L.divIcon({ className: 'marker-NEW_OBJECT' });
  groups['NEW_OBJECT'] = L.layerGroup().addTo(map);

  icons['label'] = L.divIcon({ className: 'marker-label' });
  groups['label'] = L.layerGroup();
  legendItems['Compounds label'] = groups['label'];

  namesCamp[mapId].forEach(data => {
    new L.marker(data.geometry.coordinates, {
      icon: L.divIcon({
        className: 'marker-label',
        html: `<div class="label-text">${data.properties.title}</div>`
      })
    }).addTo(groups['label']);
  });

  types.forEach(type => {
    groups[type] = L.layerGroup();
    groups[type].title = type;
    legendItems[legendMarker(type)] = groups[type];
  });

  L.tileLayer(optionsMaps[mapId].image.path, {
    minZoom: optionsMaps[mapId].levels.min,
    maxZoom: optionsMaps[mapId].levels.max,
    bounds: bounds2,
    continuousWorld: true,
    zIndex: options.zIndex,
    attribution: options.attribution
  }).addTo(map);

  L.control.measure(optionsRuler).addTo(map);
  L.control.point({ ...optionsPoint, mapId: mapId }).addTo(map);
  L.control.layers(null, legendItems).addTo(map);

  if (localStorage.getItem('REALTIME')) {
    API.getItems(mapId)
      .then(snapshot => {
        snapshot.forEach(doc => addMarkers(doc.data(), doc.id));
        for (type in groups) {
          if (currentLayers.findIndex(el => el === type) > -1) {
            groups[type].addTo(map);
          }
        }
      })
      .catch(error => {
        console.log('Error API', error);
      });
  } else {
    API.getItemsChache(mapId)
      .then(data => {
        Object.keys(data).forEach(id => addMarkers(data[id], id));
        for (type in groups) {
          if (currentLayers.findIndex(el => el === type) > -1) {
            groups[type].addTo(map);
          }
        }
      })
      .catch(error => {
        console.log('Error API', error);
      });
  }

  firebase.auth().onAuthStateChanged(isLogin => {
    loginButton('login', 'login-popup', isLogin);
    if (isLogin) {
      console.log('Hello, user', isLogin.uid);
      localStorage.setItem('REALTIME', true);
      API.getForСheckItems(mapId)
        .then(data => {
          data.forEach(doc => {
            const data = doc.data();
            new L.marker(data.geometry.coordinates, {
              icon: icons['NEW_OBJECT']
            })
              .bindPopup(popupApprovePoint(data.properties.marker, mapId, doc.id, data))
              .addTo(groups['NEW_OBJECT']);
          });
        })
        .catch(error => {
          console.log('Error API', error);
        });
    } else {
      localStorage.removeItem('REALTIME');
    }
  });

  groups['label'].addTo(map);

  map.on('click', e => {
    // console.log(e.latlng);
  });
  map.on('overlayadd', e => {
    const currentLayers = JSON.parse(localStorage.getItem('LAYERS'));
    currentLayers.push(e.layer.title);
    localStorage.setItem('LAYERS', JSON.stringify(currentLayers));
  });
  map.on('overlayremove', e => {
    const currentLayers = JSON.parse(localStorage.getItem('LAYERS'));
    currentLayers.splice(currentLayers.indexOf(e.layer.title), 1);
    localStorage.setItem('LAYERS', JSON.stringify(currentLayers));
  });
  map.on('zoom', e => {
    localStorage.setItem('ZOOM', e.target.getZoom());
  });
  map.on('moveend', e => {
    localStorage.setItem('CENTER', JSON.stringify(e.target.getCenter()));
  });

  map.setMaxBounds(bounds);

  const center = JSON.parse(localStorage.getItem('CENTER')) || [-500, 500];
  const zoom = localStorage.getItem('ZOOM') || 2;

  map.setView(center, zoom);

  return map;
}
