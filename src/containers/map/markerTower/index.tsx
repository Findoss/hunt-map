import * as L from 'leaflet';
import { useState } from 'react';
import { Marker, Tooltip, Polyline } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple, LatLngExpression } from 'leaflet';
import type { TypeFeatureMarker } from '../markerBase/types';

import './style.css';

type Props = { feature: TypeFeatureMarker };

const ANGLES: Record<string, number> = {
  tower: 0,
  tower1: 30,
  tower2: 60,
  tower3: 90,
  tower4: 120,
  tower5: 150,
  tower6: 180,
  tower7: 210,
  tower8: 240,
  tower9: 270,
  tower10: 300,
  tower11: 330,
};

const arrow = (coordinates: LatLngTuple, marker: string) => {
  const start = coordinates;
  const x = start[0] + 50 * Math.cos((ANGLES[marker] * Math.PI) / 180);
  const y = start[1] + 50 * Math.sin((ANGLES[marker] * Math.PI) / 180);
  const end = [x, y];
  return [start, end];
};

export const MarkerTower = ({ feature }: Props) => {
  const [hover, setHover] = useState(false);
  const { t } = useTranslation();
  const { geometry, properties } = feature;
  const { title, marker } = properties;
  const coordinates = geometry.coordinates as LatLngTuple;

  const isNormalTower = marker !== 'tower-o' && marker !== 'tower-h';

  const icon = L.divIcon({
    className: 'marker-base marker-' + marker,
  });

  return (
    <Marker
      position={coordinates}
      icon={icon}
      eventHandlers={{
        mouseover: () => setHover(() => true),
        mouseout: () => setHover(() => false),
      }}
    >
      {/* {isNormalTower && hover && (
        <Polyline
          positions={arrow(coordinates, marker as string) as LatLngExpression[]}
          weight={5}
          opacity={0.5}
        />
      )} */}
      {!isNormalTower && <Tooltip>{t(`types.${title}`)}</Tooltip>}
    </Marker>
  );
};
