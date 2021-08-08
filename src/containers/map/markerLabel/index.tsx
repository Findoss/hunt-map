import * as L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useTranslation } from 'react-i18next';

import type { LatLngTuple } from 'leaflet';
import type { TypeFeatureLabel } from './types';

import './style.css';

type Props = { feature: TypeFeatureLabel };

export const MarkerLabel = ({ feature }: Props) => {
  const { language } = useTranslation().i18n;
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const { name, title } = properties;
  const formatLabel = name[language];

  const icon = L.divIcon({
    className: 'marker-' + title,
    html: `<div class="marker-label_text">${formatLabel}</div>`,
  });

  return <Marker position={coordinates as LatLngTuple} icon={icon}></Marker>;
};
