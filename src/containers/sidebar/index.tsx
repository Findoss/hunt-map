import { useState, useCallback } from 'react';
import cn from 'classnames';

import { Sections } from './sections';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import styles from './sidebar.module.css';

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value), []);

  const styleSidebar = cn(`${styles.sidebar}`, {
    [styles.sidebar_show]: showSidebar,
  });

  return (
    <div className={styleSidebar}>
      <div onClick={toggleSidebar} className={cn(`${styles.sidebar__toggle}`)}>
        <ArrowIcon />
      </div>
      <Sections className={cn(`${styles.sections}`)} />
    </div>
  );
};
