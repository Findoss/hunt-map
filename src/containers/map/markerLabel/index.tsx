import * as L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeature } from '../../../data';

import './style.css';

type Props = { feature: TypeFeature };

export const MarkerLabel = ({ feature }: Props) => {
  const { t } = useTranslation();
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const { title, marker, name } = properties;

  const icon = L.divIcon({
    className: `marker-${title} `,
    html: `<div class="marker-label_text marker-${marker}">
      ${t(`typesDescription.label.${name}`)}
    </div>`,
  });

  return <Marker position={coordinates as LatLngTuple} icon={icon}></Marker>;
};
