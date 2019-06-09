function toggleMap(map) {
  const switchContainer = document.getElementById("switch");
  Object.keys(optionsMaps).forEach(mapId => {
    var button = document.createElement("button");
    button.className = "switch-map-button";
    button.value = mapId;
    button.innerHTML = optionsMaps[mapId].title;
    switchContainer.appendChild(button);

    button.onclick = e => {
      map.remove();
      localStorage.setItem("MAP-ID", e.target.value);
      map = createMap(e.target.value);
    };
  });
}
