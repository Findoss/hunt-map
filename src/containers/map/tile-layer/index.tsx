import * as L from 'leaflet';
import { TileLayer, useMap } from 'react-leaflet';

import { ATTRIBUTION } from './attribution';

import type { Map as TypeMap } from 'store/map/types';

import './style.css';

type Props = { optionsMap: TypeMap };

export const TileLayerMap = ({ optionsMap }: Props) => {
  const { levels, image } = optionsMap;
  const { height, width, path } = image;
  const { org, min, max } = levels;

  const map = useMap();

  const boundsLoadTiles = new L.LatLngBounds(
    map.unproject([0, width], org),
    map.unproject([height, 0], org)
  );

  map.setMaxBounds(boundsLoadTiles);

  return (
    <TileLayer
      minZoom={min}
      maxZoom={max}
      bounds={boundsLoadTiles}
      zIndex={1}
      attribution={ATTRIBUTION}
      url={`../${path}`}
    />
  );
};
