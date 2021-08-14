import * as L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeatureMarker } from '../markerBase/types';

import './style.css';

type Props = { feature: TypeFeatureMarker };

export const MarkerSpawnPlayer = ({ feature }: Props) => {
  const { t } = useTranslation().i18n;
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const { title, marker } = properties;

  const icon = L.divIcon({
    className: 'marker-base marker-' + marker,
  });

  return (
    <Marker position={coordinates as LatLngTuple} icon={icon}>
      <Tooltip>{651651}</Tooltip>
      {/* t(`types.${title}`) */}
    </Marker>
  );
};

