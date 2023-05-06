import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';

import { langSlice } from 'store/lang/slice';
import { selectSupportedLangs, selectLang } from 'store/lang/selectors';

import { Dropdown } from 'components/dropdown';
import type { Item } from 'components/dropdown/index';

type Props = {
  extraClass?: string;
};

const { setLang } = langSlice.actions;

export const SectionLang = ({ extraClass }: Props) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const idLang = useAppSelector(selectLang);
  const langs = useAppSelector(selectSupportedLangs);

  const handlerChange = ({ id }: Item) => {
    dispatch(setLang(id));
    i18n.changeLanguage(id);
  };

  return (
    <div className={cn(extraClass)}>
      <span>Language</span>
      <Dropdown options={langs} initId={idLang} onChange={handlerChange} />
    </div>
  );
};
