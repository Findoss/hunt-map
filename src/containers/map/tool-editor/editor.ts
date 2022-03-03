// @ts-nocheck
import * as L from 'leaflet';
import { MarkerNew } from '../marker-new';
import 'leaflet-draw';

const optionsText = () => {
  L.drawLocal.draw.handlers.marker.tooltip.start = '';
};

const optionsDefault = {
  draw: {
    marker: {
      icon: MarkerNew,
    },
  },
};

export function createDraw(editableLayer, options? = optionsDefault) {
  optionsText();
  const opt = {
    ...options,
    edit: {
      featureGroup: editableLayer,
      remove: false,
      edit: false,
    },
  };
  const controlDraw = new L.Control.Draw(opt);
  return controlDraw;
}
