import React from 'react';
import * as L from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMap } from 'react-leaflet';

import { createDraw } from './editor';
import { Button } from '../../../components/button';

import { ReactComponent as AddMarkerIcon } from './newMarker.svg';
import './style.css';

export const editableLayers = new L.FeatureGroup();
export const drawControl = createDraw(editableLayers);

export const Draw = () => {
  const map = useMap();

  useEffect(() => {
    map.addLayer(editableLayers);
    map.addControl(drawControl);
  }, [map]);
  return null;
};

export const EditControl = React.memo(() => {
  const { t } = useTranslation();
  const [mode, setMode] = useState('');

  useEffect(() => {
    setTimeout(() => {
      drawControl._map.on('draw:drawstop', (data: any) => {
        setMode('');
      });
    }, 0);
  }, []);

  const toggleAddMarker = useCallback(
    (newMode: string) => {
      const m = drawControl._toolbars.draw._modes;
      setMode(() => newMode);

      if (mode !== newMode) {
        if (mode !== '') {
          m[mode].handler.disable();
        }
        m[newMode].handler.enable();
      } else {
        m[mode].handler.disable();
        setMode(() => '');
      }
    },
    [mode]
  );

  return (
    <Button
      onClick={() => toggleAddMarker('marker')}
      active={'marker' === mode}
      icon={<AddMarkerIcon />}
    >
      {t(`tools.addMarker`)}
    </Button>
  );
});
