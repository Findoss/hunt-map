import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/redux-toolkit';

import { EditControl } from '../../../map/toolEditor';

import { selectIsLoadModule } from '../../../../store/editor/selectors';

type Props = {
  className?: string;
};
export const SectionEditor = ({ className }: Props) => {
  const { t } = useTranslation();
  const isLoadModuleBackend = useAppSelector(selectIsLoadModule);

  const style = classNames(className);

  return (
    <div className={style}>
      <span>
        {t('sections.editor')}
        {isLoadModuleBackend && t('tools.editorReady')}
      </span>
      <div className="tools__container">
        <EditControl />
      </div>
    </div>
  );
};
