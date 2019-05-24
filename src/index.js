const mapId = localStorage.getItem("mapId") || "SB";

const MAP = createMap(mapId);
toggleMap(MAP);
