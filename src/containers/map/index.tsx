import { MapContainer, LayerGroup } from 'react-leaflet';
import { useAppSelector } from '../../hooks/redux-toolkit';

import { TileLayerMap } from './tileLayer';
import { switchTypeFeature } from './switchTypeFeature';

import { selectViewMap, selectOptionsViewMap, selectMaps } from '../../store/map/selectors';
import { selectMarkersId, selectMarkerById } from '../../store/data/selectors';

import { createCRS } from './crs';
import { Ruler } from '../map/toolRuler/index';

import './markerBase/style.css';
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
    </MapContainer>
  );
};
