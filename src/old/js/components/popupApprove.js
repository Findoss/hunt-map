function popupApprovePoint(type, mapId, docId, data) {
  const container = L.DomUtil.create("div", "popup-add-marker");

  const title = L.DomUtil.create("pre", "popup-add-marker-title", container);
  title.innerText = JSON.stringify({ docId, data }, null, 2);

  const btn1 = L.DomUtil.create(
    "button",
    "control-add-marker_button-del",
    container
  );
  btn1.innerHTML = "delete";

  const btn2 = L.DomUtil.create(
    "button",
    "control-add-marker_button-save",
    container
  );
  btn2.innerHTML = "save";

  L.DomUtil.create("div", "clear", container);

  L.DomEvent.on(btn1, "click", L.DomEvent.stopPropagation)
    .on(btn1, "click", L.DomEvent.preventDefault)
    .on(btn1, "click", () => {
      API.rejectPoint(mapId, docId)
        .then(() => {
          container.innerHTML = "Document successfully deleted.";
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    });

  L.DomEvent.on(btn2, "click", L.DomEvent.stopPropagation)
    .on(btn2, "click", L.DomEvent.preventDefault)
    .on(btn2, "click", () => {
      API.approvePoint(mapId, docId, data)
        .then(() => {
          container.innerHTML = "Document successfully written.";
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    });

  return container;
}
