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

  const padding = 100;

  const boundsLoadTiles = new L.LatLngBounds(
    map.unproject([0 - padding - 500, width + padding], org),
    map.unproject([height + padding, 0 - padding], org)
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
