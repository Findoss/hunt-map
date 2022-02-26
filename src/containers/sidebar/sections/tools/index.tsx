import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ButtonRuler } from '../../../map/tool-ruler';

import styles from './tools.module.css';

type Props = {
  className?: string;
};
export const SectionTools = ({ className }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cn(className)}>
      <span>{t('sections.tools')}</span>
      <div className={cn(`${styles.container}`)}>
        <ButtonRuler />
      </div>
    </div>
  );
};
