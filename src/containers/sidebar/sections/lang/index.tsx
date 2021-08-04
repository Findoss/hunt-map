import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-toolkit';

import { langSlice } from '../../../../store/lang/slice';
import { selectSupportedLangs } from '../../../../store/lang/selectors';

import { Dropdown } from '../../../../components/dropdown';

type Props = {
  className?: string;
};

const { setLang } = langSlice.actions;

export const SectionLang = ({ className }: Props) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const langs = useAppSelector(selectSupportedLangs);
  const style = classNames(className);

  return (
    <div className={style}>
      <span>Language</span>
      <Dropdown
        options={langs}
        onChange={({ id }) => {
          dispatch(setLang(id));
          i18n.changeLanguage(id);
        }}
      />
    </div>
  );
};
