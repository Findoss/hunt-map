import React, { useEffect, useState } from 'react';

import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';
import { useLeafletContext } from '@react-leaflet/core';
import { usePrevious } from 'hooks/usePrevious';

// import { eventHandlers } from './events';
import { createDraw } from './editor';

import { Button } from 'components/button';

// import { addMarker } from 'store/editor/thunk';
import { editorSlice } from 'store/editor/slice';
import { selectEdit } from 'store/editor/selectors';

import { ReactComponent as AddMarkerIcon } from './newMarker.svg';
import './style.css';

export const DrawControl = () => {
  const map = useMap();
  const mode = useAppSelector(selectEdit);
  const preMode = usePrevious(mode);
  const dispatch = useAppDispatch();
  const context = useLeafletContext();
  const { setEdit } = editorSlice.actions;
  const [isEditReady, setEditReady] = useState(false);
  const [drawControl, setDrawControl] = useState<any>();

  useEffect(() => {
    const editableLayers = context.layerContainer!;
    setDrawControl(() => createDraw(editableLayers));

    map.on('draw:created', (e) => {
      editableLayers.addLayer(e.layer);
    });

    map.on('draw:drawstop', (e) => {
      console.log('draw:drawstop');
      dispatch(setEdit(''));
    });

    setEditReady(() => true);
  }, [map]);

  useEffect(() => {
    if (drawControl === undefined) return;
    map.addControl(drawControl);
  }, [drawControl]);

  useEffect(() => {
    if (!isEditReady) return;
    if (drawControl === undefined) return;
    if (preMode === undefined) return;

    const m = drawControl._toolbars.draw._modes;

    if (preMode === undefined) return;

    if (mode !== '' && mode !== preMode) {
      if (preMode !== '') {
        m[preMode].handler.disable();
      }
      m[mode].handler.enable();
    }

    if (mode === '' && preMode !== '') {
      m[preMode].handler.disable();
    }
  }, [mode, isEditReady]);

  return null;
};

export const EditControl = React.memo(() => {
  const { t } = useTranslation();
  const mode = useAppSelector(selectEdit);
  const dispatch = useAppDispatch();
  const { setEdit } = editorSlice.actions;

  return (
    <Button
      onClick={() => dispatch(setEdit('marker'))}
      active={'marker' === mode}
      icon={<AddMarkerIcon />}
    >
      {t(`tools.addMarker`)}
    </Button>
  );
});

// const [mode, setMode] = useState('');

// const m = drawControl._toolbars.draw._modes;

// const handleAddMarker = useCallback(() => {
//   addMarker();
// }, []);

// useEffect(() => {
//   setTimeout(() => {
//     drawControl._map.on('draw:drawstop', (data: any) => {
//       setMode('');
//     });
//   }, 0);
// }, []);