import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';

import { mapSlice } from 'store/map/slice';
import { selectIdMaps, selectViewMap } from 'store/map/selectors';

import { Radio } from 'components/radio';

import styles from './maps.module.css';

type Props = {
  className?: string;
};

const { setMapId } = mapSlice.actions;

export const SectionMaps = ({ className }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { id: idMap } = useAppSelector(selectViewMap);
  const idMaps = useAppSelector(selectIdMaps);

  return (
    <div className={cn(className)}>
      <span>{t('sections.maps')}</span>
      <div className={cn(`${styles.map__container}`)}>
        {idMaps.map((id) => (
          <Radio
            id={id}
            key={id}
            value={id}
            name="map-switch"
            label={t(`maps.${id}`)}
            checked={id === idMap}
            onChange={(e) => {
              dispatch(setMapId(e.target.value));
            }}
          />
        ))}
      </div>
    </div>
  );
};
