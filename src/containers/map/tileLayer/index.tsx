import * as L from 'leaflet';
import { TileLayer, useMap } from 'react-leaflet';
import type { Map as TypeMap } from '../../../store/map/types';

export const TileLayerMap = ({ optionsMap }: { optionsMap: TypeMap }) => {
  const { levels, image } = optionsMap;
  const { height, width, path } = image;
  const { org, min, max } = levels;

  const map = useMap();
  const boundsLoadTiles = new L.LatLngBounds(
    map.unproject([0, height], org),
    map.unproject([width, 0], org)
  );
  map.setMaxBounds(boundsLoadTiles);

  return (
    <TileLayer
      minZoom={min}
      maxZoom={max}
      bounds={boundsLoadTiles}
      zIndex={1}
      attribution='<a target="_blank" href="./public/contributors.txt">contributors</a>'
      url={process.env.PUBLIC_URL + path}
    />
  );
};
