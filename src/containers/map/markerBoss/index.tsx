import * as L from 'leaflet';
import { useState } from 'react';
import { Marker, Tooltip, Circle } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeatureMarker } from '../markerBase/types';

import './style.css';

const DETECTION_HUNT = 50;
const DARK_VISION = 100;

type Props = { feature: TypeFeatureMarker };

export const MarkerBoss = ({ feature }: Props) => {
  const [hover, setHover] = useState(false);
  const { t } = useTranslation();
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const { title, marker } = properties;

  const icon = L.divIcon({
    className: 'marker-base marker-' + marker,
  });

  return (
    <Marker
      position={coordinates as LatLngTuple}
      icon={icon}
      eventHandlers={{
        mouseover: () => setHover(() => true),
        mouseout: () => setHover(() => false),
      }}
    >
      {hover && (
        <>
          <Circle
            center={coordinates as LatLngTuple}
            radius={DARK_VISION}
            color="darkorange"
            fillColor="darkorange"
            fillOpacity={0.03}
            dashArray={[20, 15]}
          />
          <Circle
            center={coordinates as LatLngTuple}
            radius={DETECTION_HUNT}
            color="white"
            fillColor="white"
            fillOpacity={0.03}
            dashArray={[20, 15]}
          />
        </>
      )}

      <Tooltip>{t(`types.${title}`)}</Tooltip>
    </Marker>
  );
};
