// @ts-nocheck
import * as L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';

import 'leaflet-draw';
import './style.css';

const createDraw = (editableLayer) => {
  const opt = {
    draw: {
      rectangle: false,
      circle: false,
      circlemarker: false,
    },
    edit: {
      featureGroup: editableLayer,
      remove: false,
      edit: false,
    },
  };

  const controlDraw = new L.Control.Draw(opt);
  return controlDraw;
};

export const DrawControl = () => {
  const map = useMap();
  const context = useLeafletContext();

  const [drawControl, setDrawControl] = useState<any>(null);

  useEffect(() => {
    console.log('start tool');
    const editableLayers = context.layerContainer!;

    setDrawControl(() => createDraw(editableLayers));

    map.on('draw:created', (e) => {
      editableLayers.addLayer(e.layer);
    });

    map.on('draw:drawstop', (e) => {});
  }, [map]);

  useEffect(() => {
    if (drawControl !== null) {
      map.addControl(drawControl);
    }

    return () => {
      if (drawControl !== null) {
        map.removeControl(drawControl);
      }
    };
  }, [drawControl]);

  return null;
};
