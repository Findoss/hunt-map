import classNames from 'classnames';

import { useTranslation } from 'react-i18next';

import { Button } from '../../../../components/button';

type Props = {
  className?: string;
};
export const SectionEditor = ({ className }: Props) => {
  const { t } = useTranslation();

  const style = classNames(className);

  return (
    <div className={style}>
      <span>{t('sections.editor')}</span>
      <div className="tools__container">
        <Button>{t(`tools.editor`)}</Button>
      </div>
    </div>
  );
};
