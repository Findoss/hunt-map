import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import './style.css';

const data = [
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
];

export const Dropdown = () => {
  const init = data[0].id;
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedId, setSelectedId] = useState(init);

  const styleArrow = classNames('dropdown__header__arrow', {
    dropdown__header__arrow_open: isOpen,
  });

  const styleBody = classNames('dropdown__body', {
    dropdown__body_open: isOpen,
  });

  const styleItem = classNames('dropdown__item-dot', {
    'dropdown__item-dot_selected': '0' === selectedId,
  });

  const selectedItem = items.find((item) => item.id === selectedId);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (e: React.BaseSyntheticEvent) => {
    const id: string = e.target.id;
    setSelectedId(id);
    toggleDropdown();
  };

  return (
    <div className="dropdown">
      <div className="dropdown__header" onClick={toggleDropdown}>
        {selectedId ? selectedItem?.label : 'Select your destination'}
        <ArrowIcon className={styleArrow} />
      </div>
      <div className={styleBody}>
        {items.map(({ id, label }) => (
          <div className="dropdown__item" onClick={handleItemClick} id={id} key={id}>
            <span className={styleItem}>• </span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
