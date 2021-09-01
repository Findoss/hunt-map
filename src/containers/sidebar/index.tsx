import { useState, useCallback } from 'react';
import classNames from 'classnames';

import { Sections } from './sections';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import './style.css';

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value), []);

  const styleSidebar = classNames('sidebar', {
    sidebar_show: showSidebar,
  });

  return (
    <div className={styleSidebar}>
      <div onClick={toggleSidebar} className="sidebar__toggle">
        <ArrowIcon />
      </div>
      <Sections className="sidebar__sections" />
    </div>
  );
};
