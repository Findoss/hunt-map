import classNames from 'classnames';

import { useTranslation } from 'react-i18next';

import { Button } from '../../../../components/button';

import { ReactComponent as RulerIcon } from '../../../map/toolRuler/ruler.svg';
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
        <Button icon={<RulerIcon />}>{t(`tools.ruler`)}</Button>
      </div>
    </div>
  );
};
