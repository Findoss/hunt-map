import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';

import { mapSlice } from 'store/map/slice';
import { selectIdMaps, selectViewMap } from 'store/map/selectors';

import { Radio } from 'components/radio';

import './style.css';

type Props = {
  className?: string;
};

const { setMapId } = mapSlice.actions;

export const SectionMaps = ({ className }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { id: idMap } = useAppSelector(selectViewMap);
  const idMaps = useAppSelector(selectIdMaps);
  const style = classNames(className);

  return (
    <div className={style}>
      <span>{t('sections.maps')}</span>
      <div className="map-switch map-switch__container">
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
