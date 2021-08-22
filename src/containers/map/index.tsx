import { MapContainer, LayerGroup } from 'react-leaflet';
import { useAppSelector } from '../../hooks/redux-toolkit';

import { TileLayerMap } from './tileLayer';
import { switchTypeFeature } from './switchTypeFeature';

import {
  selectViewMap,
  selectOptionsViewMap,
  selectIdMaps,
  selectMaps,
} from '../../store/map/selectors';
import { selectViewMarkerFilters } from '../../store/filter/selectors';

import { createCRS } from './crs';

import { markers } from '../../data';

import './markerBase/style.css';
import './tooltip/style.css';
import './style.css';

export const Map = () => {
  const idMaps = useAppSelector(selectIdMaps);
  const maps = useAppSelector(selectMaps);
  const filters = useAppSelector(selectViewMarkerFilters);
  const { center, zoom } = useAppSelector(selectViewMap);
  const { width, height } = useAppSelector(selectOptionsViewMap).image;
  const { id: idMap } = useAppSelector(selectViewMap);

  return (
    <MapContainer
      zoom={zoom}
      zoomSnap={0.1}
      center={center}
      zoomControl={false}
      maxBoundsViscosity={0.6}
      crs={createCRS(width, height)}
    >
      {idMaps.map((id) => idMap === id && <TileLayerMap optionsMap={maps[id]} key={id} />)}

      {filters.map((filter) => (
        <LayerGroup key={filter}>
          {markers[idMap].features
            .filter((v) => v.properties.title === filter)
            .map((v, i) => switchTypeFeature(v, i))}
        </LayerGroup>
      ))}
    </MapContainer>
  );
};
