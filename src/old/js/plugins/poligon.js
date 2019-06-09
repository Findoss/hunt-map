L.Control.Poligon = L.Control.extend({
  /** PRIVATE */

  _addPoligon: false,
  _container: L.DomUtil.create("div", "leaflet-bar leaflet-control"),

  _toggleAddPoligon: function() {
    this._addPoligon = !this._addPoligon;
    if (this._addPoligon) {
      this._map._container.style.cursor = "crosshair";
      L.DomUtil.addClass(this._container, "leaflet-control-new-poligon_on");
    } else {
      this._map._container.style.cursor = "";
      L.DomUtil.removeClass(this._container, "leaflet-control-new-poligon_on");
    }
  },

  /** PUBLIC */

  options: {},

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function(map) {
    const link = L.DomUtil.create(
      "a",
      "leaflet-control-new-poligon",
      this._container
    );
    link.innerHTML = "";
    link.href = "#";
    link.title = "Add poligon";

    // L.DomEvent.on(link, "click", L.DomEvent.stopPropagation)
    //   .on(link, "click", L.DomEvent.preventDefault)
    //   .on(link, "click", this._toggleAddPoligon, this);

    return this._container;
  },

  onRemove: function(map) {}
});

L.control.poligon = options => new L.Control.Poligon(options);
