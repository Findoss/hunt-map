import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { ButtonRuler } from '../../../map/toolRuler';

import './style.css';

type Props = {
  className?: string;
};
export const SectionTools = ({ className }: Props) => {
  const { t } = useTranslation();

  const style = classNames(className);

  return (
    <div className={style}>
      <span>{t('sections.tools')}</span>
      <div className="tools__container">
        <ButtonRuler />
      </div>
    </div>
  );
};
