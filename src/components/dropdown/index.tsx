import { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import './style.css';

export type Item = {
  id: string;
  label?: string;
};

export type Props = {
  options: Item[];
  onChange?: (item: Item) => void;
};

export const Dropdown = ({ options, onChange }: Props) => {
  const init = options[0].id;
  const [isOpen, setOpen] = useState(false);
  const [items] = useState(options);
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

    const selectedItem = items.find((item) => item.id === id) as Item;
    if (onChange) onChange(selectedItem);
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
            {label ? label : id}
          </div>
        ))}
      </div>
    </div>
  );
};
