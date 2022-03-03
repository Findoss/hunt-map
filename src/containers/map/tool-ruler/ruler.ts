// @ts-nocheck

import * as L from 'leaflet';

const Ruler = L.Control.extend({
  options: {
    circleMarker: {
      color: 'red',
      radius: 2,
    },
    lineStyle: {
      color: 'red',
      dashArray: '1,6',
    },
    lengthUnit: {
      factor: null,
    },
    angleUnit: {
      factor: null,
    },
    formatTooltip: function ({ bearing, distance }) {
      return `${Number(distance).toFixed(0)}m`;
    },
  },

  onAdd: function (map) {
    this._map = map;
    this._choice = false;
    this._defaultCursor = this._map._container.style.cursor;
    this._allLayers = L.layerGroup();
    return document.createElement('div');
  },

  onRemove: function () {},

  toggleMeasure: function () {
    this._toggleMeasure();
  },

  _toggleMeasure: function () {
    this._choice = !this._choice;
    this._clickedLatLong = null;
    this._clickedPoints = [];
    this._totalLength = 0;
    if (this._choice) {
      this._map.doubleClickZoom.disable();
      this._clickCount = 0;
      this._tempLine = L.featureGroup().addTo(this._allLayers);
      this._tempPoint = L.featureGroup().addTo(this._allLayers);
      this._pointLayer = L.featureGroup().addTo(this._allLayers);
      this._polylineLayer = L.featureGroup().addTo(this._allLayers);
      this._allLayers.addTo(this._map);
      this._map.on('click', this._clicked, this);
      this._map.on('mousemove', this._moving, this);
      this._map._container.style.cursor = 'crosshair';
    } else {
      this._map.doubleClickZoom.enable();
      this._map.removeLayer(this._allLayers);
      this._allLayers = L.layerGroup();
      this._map.off('click', this._clicked, this);
      this._map.off('mousemove', this._moving, this);
      this._map._container.style.cursor = this._defaultCursor;
    }
  },

  _clicked: function (e) {
    this._clickedLatLong = e.latlng;
    this._clickedPoints.push(this._clickedLatLong);
    L.circleMarker(this._clickedLatLong, this.options.circleMarker).addTo(this._pointLayer);
    if (
      this._clickCount > 0 &&
      !e.latlng.equals(this._clickedPoints[this._clickedPoints.length - 2])
    ) {
      if (this._movingLatLong) {
        L.polyline(
          [this._clickedPoints[this._clickCount - 1], this._movingLatLong],
          this.options.lineStyle
        ).addTo(this._polylineLayer);
      }
      L.circleMarker(this._clickedLatLong, this.options.circleMarker)
        .bindTooltip(this.options.formatTooltip(this._result), {
          permanent: true,
          className: 'ruler-tooltip',
        })
        .addTo(this._pointLayer)
        .openTooltip();
    }
    this._clickCount++;
    if (this._clickCount > 1) {
      this._closePath();
    }
  },

  _moving: function (e) {
    if (this._clickedLatLong) {
      this._movingLatLong = e.latlng;
      if (this._tempLine) {
        this._map.removeLayer(this._tempLine);
        this._map.removeLayer(this._tempPoint);
      }
      this._tempLine = L.featureGroup();
      this._tempPoint = L.featureGroup();
      this._tempLine.addTo(this._map);
      this._tempPoint.addTo(this._map);
      this._calculateBearingAndDistance();
      L.polyline([this._clickedLatLong, this._movingLatLong], this.options.lineStyle).addTo(
        this._tempLine
      );
      L.circleMarker(this._movingLatLong, this.options.circleMarker)
        .bindTooltip(this.options.formatTooltip(this._result), {
          sticky: true,
          offset: L.point(0, -40),
          className: 'ruler-moving-tooltip',
        })
        .addTo(this._tempPoint)
        .openTooltip();
    }
  },

  _closePath: function () {
    this._map.removeLayer(this._tempLine);
    this._map.removeLayer(this._tempPoint);
    if (this._clickCount <= 1) this._map.removeLayer(this._pointLayer);
    this._choice = false;
    this._toggleMeasure();
  },

  _calculateBearingAndDistance: function () {
    var f1 = this._clickedLatLong.lat,
      l1 = this._clickedLatLong.lng,
      f2 = this._movingLatLong.lat,
      l2 = this._movingLatLong.lng;
    var toRadian = Math.PI / 180;
    // haversine formula
    // bearing
    var y = Math.sin((l2 - l1) * toRadian) * Math.cos(f2 * toRadian);
    var x =
      Math.cos(f1 * toRadian) * Math.sin(f2 * toRadian) -
      Math.sin(f1 * toRadian) * Math.cos(f2 * toRadian) * Math.cos((l2 - l1) * toRadian);
    var bearing =
      Math.atan2(y, x) *
      ((this.options.angleUnit.factor ? this.options.angleUnit.factor / 2 : 180) / Math.PI);
    bearing +=
      bearing < 0 ? (this.options.angleUnit.factor ? this.options.angleUnit.factor : 360) : 0;
    // distance
    const dx = l1 - l2;
    const dy = f1 - f2;
    var distance = Math.sqrt(dx * dx + dy * dy);
    this._result = {
      bearing: bearing,
      distance: distance,
    };
  },
});

export function createRuler(options?) {
  return new Ruler(options);
}
