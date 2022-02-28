import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/redux-toolkit';

import { EditControl } from '../../../map/tool-editor';

import { selectIsLoadModule } from '../../../../store/editor/selectors';

type Props = {
  extraClass?: string;
};
export const SectionEditor = ({ extraClass }: Props) => {
  const { t } = useTranslation();
  const isLoadModuleBackend = useAppSelector(selectIsLoadModule);

  return (
    <div className={cn(extraClass)}>
      <span>
        {t('sections.editor')}
        {isLoadModuleBackend && t('tools.editorReady')}
      </span>
      <div>
        <EditControl />
      </div>
    </div>
  );
};
