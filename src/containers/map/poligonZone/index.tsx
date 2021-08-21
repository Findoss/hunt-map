import { Polygon } from 'react-leaflet';
// import { useTranslation } from 'react-i18next';

import type { LatLngLiteral } from 'leaflet';
import type { TypeFeature } from '../markerBase/types';

import './style.css';

type Props = { feature: TypeFeature };

export const PolygonZone = ({ feature }: Props) => {
  // const { t } = useTranslation();
  const { geometry, properties } = feature;
  // const { title } = properties;
  const coordinates = geometry.coordinates as LatLngLiteral[];

  return (
    <Polygon
      positions={coordinates}
      color="darkred"
      fillColor="darkred"
      fillOpacity={0}
      dashArray={[20, 15]}
      className="poligon-base poligon-zone"
    >
      {/* {!isNormalTower && <Tooltip>{t(`types.${title}`)}</Tooltip>} */}
    </Polygon>
  );
};

// export function PolygonZone() {

//   return L.polygon(doc.geometry.coordinates, {
//     color: 'darkred',
//     fillColor: 'darkred',
//     fillOpacity: 0,
//     dashArray: [20, 15],
//     className: 'poligon-base poligon-zone'
//   }).on('click', e => {
//     console.log('Polygon id = ', id);
//   });
// }
