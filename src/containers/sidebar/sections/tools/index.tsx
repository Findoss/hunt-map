import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ButtonRuler } from '../../../map/tool-ruler';

import styles from './tools.module.css';

type Props = {
  className?: string;
};
export const SectionTools = ({ className }: Props) => {
  const { t } = useTranslation();

  const styleSection = cn(className);
  const styleContainer = cn(`${styles.container}`);

  return (
    <div className={styleSection}>
      <span>{t('sections.tools')}</span>
      <div className={styleContainer}>
        <ButtonRuler />
      </div>
    </div>
  );
};
