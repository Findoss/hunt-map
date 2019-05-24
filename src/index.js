console.log("v1.0.15");

const mapId = localStorage.getItem("mapId") || "SB";

const MAP = createMap(mapId);
toggleMap(MAP);
