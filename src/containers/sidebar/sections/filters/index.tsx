import cn from 'classnames';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-toolkit';
import { Checkbox } from '../../../../components/checkbox';

import { filterSlice } from '../../../../store/filter/slice';
import {
  selectMarkerFilters,
  selectCompoundFilters,
  selectViewMarkerFilters,
} from '../../../../store/filter/selectors';
import React from 'react';

const { addFilter, removeFilter } = filterSlice.actions;

type Props = {
  className?: string;
};
export const SectionFilters = ({ className }: Props) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const markerFilters = useAppSelector(selectMarkerFilters);
  const viewMarkerFilters = useAppSelector(selectViewMarkerFilters);
  const compoundFilters = selectCompoundFilters();

  const updateFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) dispatch(addFilter(value));
    else dispatch(removeFilter(value));
  };

  const style = cn(className);

  return (
    <>
      <div className={style}>
        <span>{t('sections.compounds')}</span>
        {compoundFilters.map((filter) => (
          <Checkbox
            onClick={updateFilter}
            id={filter}
            key={filter}
            name={filter}
            value={filter}
            initValue={viewMarkerFilters.includes(filter)}
            label={t(`types.${filter}`)}
          />
        ))}
      </div>
      <div className={style}>
        <span>{t('sections.filters')}</span>
        {markerFilters.map((filter) => (
          <Checkbox
            onClick={updateFilter}
            id={filter}
            key={filter}
            name={filter}
            value={filter}
            label={t(`types.${filter}`)}
            initValue={viewMarkerFilters.includes(filter)}
            icon={<div className={cn('legend-item', `marker-${filter}`)} />}
          />
        ))}
      </div>
    </>
  );
};
