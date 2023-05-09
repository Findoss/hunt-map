import { MapContainer, LayerGroup, FeatureGroup } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';
import { createCRS } from './crs';

import {
  selectViewMap,
  selectOptionsViewMap,
  selectMaps,
  selectImageSettingsMap,
} from 'store/map/selectors';

import { DrawControl } from './tool-editor';
import { TileLayerMap } from './tile-layer';

import { switchTypeFeature } from './switch-type-feature';

import { Ruler } from './tool-ruler';

import './marker-base/style.css';
import './tooltip/style.css';
import './style.css';
import { getContentMap } from 'store/data/selectors';
import { useEffect } from 'react';
import { fetchContentMap } from 'store/data/thunk';
import { PlaceholderMap } from 'components/placeholder';

export const Map = () => {
  const dispatch = useAppDispatch();

  const { id: idMap } = useAppSelector(selectViewMap);
  const { center, zoom } = useAppSelector(selectViewMap);
  const imageSettingsMap = useAppSelector(selectImageSettingsMap);
  const maps = useAppSelector(selectMaps);
  const contents = useAppSelector(getContentMap);

  useEffect(() => {
    if (idMap) {
      dispatch(fetchContentMap(idMap));
    }
  }, [idMap]);

  if (idMap === '' || imageSettingsMap === undefined) {
    return <PlaceholderMap />;
  }

  return (
    <MapContainer
      zoom={zoom}
      zoomSnap={0.1}
      center={center}
      zoomControl={false}
      maxBoundsViscosity={0.6}
      crs={createCRS(imageSettingsMap.width, imageSettingsMap.height)}
    >
      <LayerGroup>
        {contents.map((content) => {
          const idContent = Object.keys(content)[0];
          return switchTypeFeature(content[idContent], idContent);
        })}
      </LayerGroup>

      <TileLayerMap optionsMap={maps[idMap]} key={idMap} />

      <Ruler />

      <FeatureGroup>
        <DrawControl />
      </FeatureGroup>
    </MapContainer>
  );
};
