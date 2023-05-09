import cn from 'classnames';
import { useState, useCallback } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow.svg';

import { Sections } from './sections';

import styles from './sidebar.module.css';

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value), []);

  return (
    <div className={cn(styles.sidebar, { [styles.sidebar_show]: showSidebar })}>
      <div onClick={toggleSidebar} className={cn(styles.sidebar__toggle)}>
        <ArrowIcon />
      </div>
      <Sections extraClass={cn(styles.sections)} />
    </div>
  );
};
