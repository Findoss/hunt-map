import * as L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeature } from '../../../data';

import './style.css';

type Props = { feature: TypeFeature };

export const MarkerTower = ({ feature }: Props) => {
  const { t } = useTranslation();
  const { geometry, properties } = feature;
  const { title, marker } = properties;
  const coordinates = geometry.coordinates as LatLngTuple;

  const isNormalTower = marker !== 'tower-o' && marker !== 'tower-h';

  const icon = L.divIcon({
    className: 'marker-base marker-' + marker,
    html: `<div class="vector"></div>`,
  });

  return (
    <Marker position={coordinates} icon={icon}>
      {!isNormalTower && <Tooltip>{t(`types.${title}`)}</Tooltip>}
    </Marker>
  );
};
