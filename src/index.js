console.log("v1.1.0");

const mapId = localStorage.getItem("mapId") || "SB";

const MAP = createMap(mapId);
toggleMap(MAP);
