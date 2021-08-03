import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../../../components/dropdown';
import { useAppSelector } from '../../../hooks/redux-toolkit';
import { selectSupportedLangs } from '../../../store/lang/selectors';

import './style.css';

type Props = {
  className?: string;
};

export const Sections = ({ className }: Props) => {
  const { t } = useTranslation();
  const langs = useAppSelector(selectSupportedLangs);
  const styleSections = classNames('sections', className);

  return (
    <div className={styleSections}>
      <div className="section section__lang">
        <span>Language</span>
        <Dropdown
          options={langs}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div className="section">{t('sections.maps')}</div>
      <div className="section">{t('sections.compounds')}</div>
      <div className="section">{t('sections.filters')}</div>
      <div className="section">{t('sections.admin')}</div>
      <div className="section section__adv">ADV</div>
    </div>
  );
};
