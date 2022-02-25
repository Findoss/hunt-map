import { useState, useCallback } from 'react';
import cn from 'classnames';

import { Sections } from './sections';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import styles from './sidebar.module.css';

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value), []);

  const styleSidebar = cn(`${styles.sidebar}`, {
    // не доконца понимаю почему не сработала запись `${styles.sidebar_show}`.
    // потому что она возвращает строку?
    [styles.sidebar_show]: showSidebar,
  });
  const styleSections = cn(`${styles.sections}`)
  const styleToggle = cn(`${styles.sidebar__toggle}`)

  return (
    <div className={styleSidebar}>
      <div onClick={toggleSidebar} className={styleToggle}>
        <ArrowIcon />
      </div>
      <Sections className={styleSections} />
    </div>
  );
};
