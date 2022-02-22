import { Polygon } from 'react-leaflet';

import type { LatLngLiteral } from 'leaflet';
import type { TypeFeature } from '../../../data';

import './style.css';

type Props = { feature: TypeFeature };

export const PolygonZone = ({ feature }: Props) => {
  const { geometry } = feature;
  const coordinates = geometry.coordinates as LatLngLiteral[];

  return (
    <Polygon
      positions={coordinates}
      color="darkred"
      fillColor="darkred"
      fillOpacity={0}
      dashArray={[20, 15]}
      className="poligon-base poligon-zone"
    />
  );
};
