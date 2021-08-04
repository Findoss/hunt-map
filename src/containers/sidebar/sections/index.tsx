import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-toolkit';

import { Radio } from '../../../components/radio';
import { Dropdown } from '../../../components/dropdown';
import { Checkbox } from '../../../components/checkbox';

import { selectSupportedLangs } from '../../../store/lang/selectors';
import { selectIdMaps, selectViewMap } from '../../../store/map/selectors';
import {
  selectMarkerFilters,
  selectCompoundFilters,
  selectViewMarkerFilters,
} from '../../../store/filter/selectors';

import { langSlice } from '../../../store/lang/slice';
import { mapSlice } from '../../../store/map/slice';
import { filterSlice } from '../../../store/filter/slice';

import './style.css';

type Props = {
  className?: string;
};

const { setLang } = langSlice.actions;
const { setMapId } = mapSlice.actions;
const { addFilter, removeFilter } = filterSlice.actions;

export const Sections = ({ className }: Props) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { id: idMap } = useAppSelector(selectViewMap);
  const idMaps = useAppSelector(selectIdMaps);
  const langs = useAppSelector(selectSupportedLangs);
  const markerFilters = useAppSelector(selectMarkerFilters);
  const viewMarkerFilters = useAppSelector(selectViewMarkerFilters);
  const compoundFilters = selectCompoundFilters();

  const styleSections = classNames('sections', className);

  return (
    <div className={styleSections}>
      <div className="section section__lang">
        <span>Language</span>
        <Dropdown
          options={langs}
          onChange={(e) => {
            dispatch(setLang(e.id));
          }}
        />
      </div>
      <div className="section section__map-switch">
        <span>{t('sections.maps')}</span>
        <div className="map-switch map-switch__container">
          {idMaps.map((id) => (
            <Radio
              id={id}
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
      <div className="section">
        <span>{t('sections.compounds')}</span>
        {compoundFilters.map((filter) => (
          <Checkbox
            onClick={(e) => {
              const checked = e.currentTarget.checked!;
              const value = e.currentTarget.value!;
              if (checked) dispatch(addFilter(value));
              else dispatch(removeFilter(value));
            }}
            id={filter}
            key={filter}
            name={filter}
            value={filter}
            initValue={viewMarkerFilters.includes(filter)}
            label={t(`types.${filter}`)}
          />
        ))}
      </div>
      <div className="section">
        <span>{t('sections.filters')}</span>
        {markerFilters.map((filter) => (
          <Checkbox
            onClick={(e) => {
              const checked = e.currentTarget.checked!;
              const value = e.currentTarget.value!;
              if (checked) dispatch(addFilter(value));
              else dispatch(removeFilter(value));
            }}
            id={filter}
            key={filter}
            name={filter}
            value={filter}
            label={t(`types.${filter}`)}
            initValue={viewMarkerFilters.includes(filter)}
            icon={
              <img
                src={`${process.env.PUBLIC_URL}/images/markers/${filter}.png`}
                alt="icon-marker"
              />
            }
          />
        ))}
      </div>
      {/* <div className="section">
        <span>{t('sections.tools')}</span>
      </div>
      <div className="section">
        <span>{t('sections.editor')}</span>
      </div> */}
      <div className="section section__adv">ADV</div>
    </div>
  );
};
