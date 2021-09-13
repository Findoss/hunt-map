import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMap } from 'react-leaflet';

import { createRuler } from './ruler';

import { Button } from '../../../components/button';
import { ReactComponent as RulerIcon } from './ruler.svg';
import './style.css';

export const ruler = createRuler();

export const Ruler = () => {
  const map = useMap();

  useEffect(() => {
    map.addControl(ruler);
  }, [map]);

  return null;
};

export const ButtonRuler = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const toggleDraw = () => {
    ruler.toggleMeasure();
    setToggle((v) => !v);
  };

  return (
    <Button onClick={toggleDraw} active={toggle} icon={<RulerIcon />}>
      {t(`tools.ruler`)}
    </Button>
  );
};
