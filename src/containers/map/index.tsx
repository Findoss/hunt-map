import { MapContainer, LayerGroup, FeatureGroup } from 'react-leaflet';
import { DrawControl } from './tool-editor';
import { useAppSelector } from '../../hooks/redux-toolkit';

import { TileLayerMap } from './tile-layer';
import { switchTypeFeature } from './switch-type-feature';

import { selectViewMap, selectOptionsViewMap, selectMaps } from '../../store/map/selectors';
import { selectMarkersId, selectMarkerById } from '../../store/data/selectors';

import { createCRS } from './crs';
import { Ruler } from './tool-ruler/index';

import './marker-base/style.css';
import './tooltip/style.css';
import './style.css';

export const Map = () => {
  const maps = useAppSelector(selectMaps);
  const { center, zoom } = useAppSelector(selectViewMap);
  const { width, height } = useAppSelector(selectOptionsViewMap).image;
  const { id: idMap } = useAppSelector(selectViewMap);
  const markersId = useAppSelector(selectMarkersId);
  const marker = useAppSelector(selectMarkerById);

  return (
    <MapContainer
      zoom={zoom}
      zoomSnap={0.1}
      center={center}
      zoomControl={false}
      maxBoundsViscosity={0.6}
      crs={createCRS(width, height)}
    >
      <LayerGroup>{markersId.map((id) => switchTypeFeature(marker(id), id))}</LayerGroup>
      <TileLayerMap optionsMap={maps[idMap]} key={idMap} />
      <Ruler />
      <FeatureGroup>
        <DrawControl />
      </FeatureGroup>
    </MapContainer>
  );
};
