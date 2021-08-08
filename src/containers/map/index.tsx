import { MapContainer, LayerGroup } from 'react-leaflet';
import { useAppSelector } from '../../hooks/redux-toolkit';

import { TileLayerMap } from './tileLayer';
import { MarkerLabel } from './markerLabel';

import { selectViewMap, selectOptionsViewMap } from '../../store/map/selectors';

import { createCRS } from './crs';

import namesCompounds from '../../data/names/SB.json';
import type { TypeFeatureLabel } from './markerLabel/types';

import './markerBase/style.css';
import './style.css';

export const Map = () => {
  const { center, zoom } = useAppSelector(selectViewMap);
  const { width, height } = useAppSelector(selectOptionsViewMap).image;
  const optionsMap = useAppSelector(selectOptionsViewMap);
  console.log(optionsMap);

  return (
    <MapContainer
      zoom={zoom}
      zoomSnap={0.1}
      center={center}
      zoomControl={false}
      maxBoundsViscosity={0.6}
      crs={createCRS(width, height)}
    >
      <TileLayerMap optionsMap={optionsMap} />
      {/* <GeoJSON data={data as GeoJsonObject} /> */}
      <LayerGroup>
        {namesCompounds.features.map((v, i) => (
          <MarkerLabel feature={v as TypeFeatureLabel} key={i} />
        ))}
      </LayerGroup>
      <LayerGroup></LayerGroup>
    </MapContainer>
  );
};

//  {/* <img src={process.env.PUBLIC_URL + '/images/maps/LD.jpg'} alt="map" /> */}
// contributors: `<a target="_blank" href="./public/contributors.txt">contributors</a>`,
