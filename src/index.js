console.log("v1.2.1");

const mapId = localStorage.getItem("mapId") || "SB";

const MAP = createMap(mapId);
toggleMap(MAP);
authorList();
