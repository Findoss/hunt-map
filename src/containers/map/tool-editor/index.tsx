// @ts-nocheck
import 'leaflet-draw';
import * as L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';

const createDraw = (editableLayer) => {
  const opt = {
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

  const [drawControl, setDrawControl] = useState<any>();

  useEffect(() => {
    const editableLayers = context.layerContainer!;
    setDrawControl(() => createDraw(editableLayers));
    console.log(1);
  }, [map]);

  return null;
};
