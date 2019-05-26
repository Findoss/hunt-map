function createMap(mapId, isLogin) {
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

  const map = L.map("map", { crs: L.CRS.Pr });

  const sw = map.unproject(
    [0, optionsMaps[mapId].image.height],
    optionsMaps[mapId].levels.org
  );
  const ne = map.unproject(
    [optionsMaps[mapId].image.width, 0],
    optionsMaps[mapId].levels.org
  );
  const bounds = new L.LatLngBounds(sw, ne);

  const groups = {};
  const icons = {};
  const legendItems = {};

  icons["NEW_OBJECT"] = L.divIcon({ className: "marker-NEW_OBJECT" });
  groups["NEW_OBJECT"] = L.layerGroup();

  types.forEach(type => {
    icons[type] = L.divIcon({ className: "marker-" + type });
    groups[type] = L.layerGroup();
    legendItems[legendMarker(type)] = groups[type];
  });

  L.tileLayer(optionsMaps[mapId].image.path, {
    minZoom: optionsMaps[mapId].levels.min,
    maxZoom: optionsMaps[mapId].levels.max,
    bounds: bounds,
    continuousWorld: true,
    zIndex: options.zIndex,
    attribution: options.attribution
  }).addTo(map);

  L.control.measure(optionsRuler).addTo(map);
  L.control.point({ ...optionsPoint, mapId: mapId }).addTo(map);
  L.control.layers(null, legendItems).addTo(map);

  API.getItemsChache(mapId)
    .then(data => {
      Object.keys(data).forEach(id => {
        const doc = data[id];
        if (types.findIndex(type => doc.properties.title === type) > -1) {
          const marker = new L.marker(doc.geometry.coordinates, {
            icon: icons[doc.properties.marker]
          })
            .on("click", () => {
              console.log("Marker id = ", id);
            })
            .bindTooltip(
              tooltipMarker(doc.properties.title, doc.properties.description)
            )
            .addTo(groups[doc.properties.marker]);
        }
      });
      for (type in groups) {
        groups[type].addTo(map);
      }
    })
    .catch(error => {
      console.log("Error API", error);
    });

  // API.getItems(mapId)
  //   .then(data => {
  //     console.log("From cache -", data.metadata.fromCache ? "yes" : "no");
  //     data.forEach(doc => {
  //       const data = doc.data();
  //       if (types.findIndex(type => data.properties.title === type) > -1) {
  //         const marker = new L.marker(data.geometry.coordinates, {
  //           icon: icons[data.properties.marker]
  //         })
  //           .on("click", () => {
  //             console.log("Marker id = ", doc.id);
  //           })
  //           .bindTooltip(
  //             tooltipMarker(data.properties.title, data.properties.description)
  //           )
  //           .addTo(groups[data.properties.marker]);
  //       }
  //     });
  //     for (type in groups) {
  //       groups[type].addTo(map);
  //     }
  //   })
  //   .catch(error => {
  //     console.log("Error API", error);
  //   });

  firebase.auth().onAuthStateChanged(isLogin => {
    loginButton("login", "login-popup", isLogin);
    if (isLogin) {
      console.log("Hello, user ", isLogin.uid);
      API.getForСheckItems(mapId)
        .then(data => {
          data.forEach(doc => {
            const data = doc.data();
            new L.marker(data.geometry.coordinates, {
              icon: icons["NEW_OBJECT"]
            })
              .bindPopup(
                popupApprovePoint(data.properties.marker, mapId, doc.id, data)
              )
              .addTo(groups["NEW_OBJECT"]);
          });
        })
        .catch(error => {
          console.log("Error API", error);
        });
    } else {
      //
    }
  });

  map.on("click", e => {
    // console.log(e.latlng);
  });

  map.setMaxBounds(bounds);
  map.setView(optionsMaps[mapId].center, optionsMaps[mapId].levels.min);

  return map;
}
