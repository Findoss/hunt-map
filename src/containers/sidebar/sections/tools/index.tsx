import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ButtonRuler } from '../../../map/tool-ruler';

import styles from './tools.module.css';

type Props = {
  extraClass?: string;
};
export const SectionTools = ({ extraClass }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cn(extraClass)}>
      <span>{t('sections.tools')}</span>
      <div className={cn(styles.container)}>
        <ButtonRuler />
      </div>
    </div>
  );
};
