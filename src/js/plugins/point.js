L.Control.Point = L.Control.extend({
  /** PRIVATE */

  _addPoint: false,
  _currentPopup: {},
  _currentSelect: {},

  _toggleAddPoint: function() {
    this._addPoint = !this._addPoint;
    if (this._addPoint) {
      this._map._container.style.cursor = "crosshair";
      L.DomUtil.addClass(this._container, "leaflet-control-add-marker_on");
      this._start();
    } else {
      this._map._container.style.cursor = "";
      L.DomUtil.removeClass(this._container, "leaflet-control-add-marker_on");
      this._stop();
    }
  },

  _mouseClick: function(e) {
    this._currentPopup = new L.popup()
      .setLatLng(e.latlng)
      .setContent(this._popupData())
      .openOn(this._map);
  },

  _start: function() {
    L.DomEvent.on(this._map, "click", this._mouseClick, this);
  },

  _stop: function() {
    L.DomEvent.off(this._map, "click", this._mouseClick, this);
  },

  _popupData: function() {
    const container = L.DomUtil.create("div", "popup-add-marker");

    this._currentSelect = L.DomUtil.create(
      "select",
      "control-add-marker_select-type",
      container
    );

    this.options.optionsSelect.forEach(type => {
      const option = L.DomUtil.create(
        "option",
        "control-add-marker_option",
        this._currentSelect
      );
      option.innerHTML = type;
    });

    this._description = L.DomUtil.create(
      "input",
      "control-add-marker_description",
      container
    );
    this._description.type = "text";
    this._description.placeholder = "description";

    L.DomUtil.create("br", "", container);

    const btn1 = L.DomUtil.create(
      "button",
      "control-add-marker_button-del",
      container
    );
    btn1.innerHTML = "cancel";

    const btn2 = L.DomUtil.create(
      "button",
      "control-add-marker_button-save",
      container
    );
    btn2.innerHTML = "send";

    L.DomUtil.create("div", "clear", container);

    L.DomEvent.on(btn1, "click", L.DomEvent.stopPropagation)
      .on(btn1, "click", L.DomEvent.preventDefault)
      .on(btn1, "click", () => {
        this._currentPopup.remove();
      });

    L.DomEvent.on(btn2, "click", L.DomEvent.stopPropagation)
      .on(btn2, "click", L.DomEvent.preventDefault)
      .on(btn2, "click", () => {
        const selected = this._currentSelect.selectedIndex;

        API.addPoint(this.options.mapId, {
          type: "Point",
          title: this._currentSelect.options[selected].text,
          description: this._description.value,
          coordinates: this._currentPopup.getLatLng()
        })
          .then(() => {
            this._currentPopup.setContent(
              "Data send to server, information will appear as soon as it is checked by the moderator."
            );
            setTimeout(() => {
              this._currentPopup.remove();
            }, 5000);
          })
          .catch(error => {
            console.error("Error send document: ", error);
          });
      });

    return container;
  },

  /** PUBLIC */

  options: {
    position: "topleft",
    optionsSelect: ["test"],
    mapId: "SB"
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function(map) {
    const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    const link = L.DomUtil.create("a", "leaflet-control-add-marker", container);
    link.innerHTML = "";
    link.href = "#";
    link.title = "Add point";

    L.DomEvent.on(link, "click", L.DomEvent.stopPropagation)
      .on(link, "click", L.DomEvent.preventDefault)
      .on(link, "click", this._toggleAddPoint, this);

    return container;
  },

  onRemove: function(map) {
    if (this.options.keyboard) {
      L.DomEvent.off(document, "keydown", this._onKeyDown, this);
    }
  }
});

L.control.point = options => new L.Control.Point(options);
