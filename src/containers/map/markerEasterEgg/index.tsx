import * as L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeature } from '../markerBase/types';

import './style.css';

type Props = { feature: TypeFeature };

export const MarkerEasterEgg = ({ feature }: Props) => {
  const { t } = useTranslation();
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const { title, marker } = properties;

  const icon = L.divIcon({
    className: 'marker-base marker-' + marker,
  });

  return (
    <Marker position={coordinates as LatLngTuple} icon={icon}>
      <Tooltip>{t(`types.${title}`)}</Tooltip>
    </Marker>
  );
};
