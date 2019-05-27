console.log("v1.2.0");

const mapId = localStorage.getItem("mapId") || "SB";

const MAP = createMap(mapId);
toggleMap(MAP);
authorList();
