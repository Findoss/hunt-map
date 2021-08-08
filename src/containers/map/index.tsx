import { MapContainer, LayerGroup } from 'react-leaflet';
import { useAppSelector } from '../../hooks/redux-toolkit';

import { TileLayerMap } from './tileLayer';
import { MarkerLabel } from './markerLabel';

import {
  selectViewMap,
  selectOptionsViewMap,
  selectIdMaps,
  selectMaps,
} from '../../store/map/selectors';
import { selectViewMarkerFilters } from '../../store/filter/selectors';

import { createCRS } from './crs';

import { compoundsLabels } from '../../data/names/index';

import './style.css';
import './markerBase/style.css';

export const Map = () => {
  const idMaps = useAppSelector(selectIdMaps);
  const maps = useAppSelector(selectMaps);
  const filters = useAppSelector(selectViewMarkerFilters);
  const { center, zoom } = useAppSelector(selectViewMap);
  const { width, height } = useAppSelector(selectOptionsViewMap).image;
  const { id: idMap } = useAppSelector(selectViewMap);

  // console.log(optionsMap);
  // console.log(filters.includes('label'));

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

      {filters.includes('label') && (
        <LayerGroup>
          {compoundsLabels[idMap].features.map((v, i) => (
            <MarkerLabel feature={v} key={i} />
          ))}
        </LayerGroup>
      )}

      <LayerGroup></LayerGroup>
    </MapContainer>
  );
};
