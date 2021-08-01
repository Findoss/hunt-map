import React from 'react';
import { useState, useCallback } from 'react';
import classNames from 'classnames';

import { ReactComponent as CloseIcon } from './close.svg';
import './style.css';

export const Banner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const toggleBanner = useCallback(() => setShowBanner((value) => !value), []);
  const styleBanner = classNames('avd', {
    avd_hide: showBanner,
  });

  return (
    <div className={styleBanner}>
      <div onClick={toggleBanner} className="avd__close-button">
        <CloseIcon />
      </div>
    </div>
  );
};
