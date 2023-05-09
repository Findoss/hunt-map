import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';
import { usePrevious } from 'hooks/usePrevious';

import { createDraw } from './editor';

import { Button } from 'components/button';

import { editorSlice } from 'store/editor/slice';
import { selectEdit } from 'store/editor/selectors';

import { ReactComponent as AddMarkerIcon } from './newMarker.svg';
import './style.css';

export const DrawControl = () => {
  const map = useMap();
  const context = useLeafletContext();

  const mode = useAppSelector(selectEdit);
  const preMode = usePrevious(mode);

  const dispatch = useAppDispatch();

  const { setEdit } = editorSlice.actions;
  const [drawControl, setDrawControl] = useState<any>();

  useEffect(() => {
    const editableLayers = context.layerContainer!;
    setDrawControl(() => createDraw(editableLayers));

    map.on('draw:created', (e) => {
      console.log('draw:created');
      editableLayers.addLayer(e.layer);
    });

    map.on('draw:drawstop', (e) => {
      console.log('draw:drawstop');
      dispatch(setEdit(''));
    });

    map.on('draw:deleted', (e) => {
      console.log('draw:deleted');
    });
  }, [map]);

  useEffect(() => {
    if (drawControl === undefined) return;
    map.addControl(drawControl);
  }, [drawControl]);

  useEffect(() => {
    if (drawControl === undefined) return;
    if (preMode === undefined) return;

    const m = drawControl._toolbars.draw._modes;

    if (mode !== '' && mode !== preMode) {
      if (preMode !== '') {
        m[preMode].handler.disable();
      }
      m[mode].handler.enable();
    }

    if (mode === '' && preMode !== '') {
      m[preMode].handler.disable();
    }
  }, [mode]);

  return null;
};

export const EditControl = React.memo(() => {
  const { t } = useTranslation();
  const mode = useAppSelector(selectEdit);
  const dispatch = useAppDispatch();

  const { setEdit } = editorSlice.actions;

  return (
    <>
      <Button
        onClick={() => dispatch(setEdit('marker'))}
        active={'marker' === mode}
        icon={<AddMarkerIcon />}
      >
        {t(`tools.addMarker`)}
      </Button>
      {/* <Button
        onClick={() => dispatch(setEdit('circle'))}
        active={'circle' === mode}
        icon={<AddMarkerIcon />}
      >
        {t(`tools.addCircle`)}
      </Button> */}
      {/* <Button
        onClick={() => dispatch(setEdit('polyline'))}
        active={'polyline' === mode}
        icon={<AddMarkerIcon />}
      >
        {t(`tools.addPolyline`)}
      </Button> */}
    </>
  );
});
