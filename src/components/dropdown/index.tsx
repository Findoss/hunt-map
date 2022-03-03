import { useState } from 'react';
import cn from 'classnames';

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import styles from './dropdown.module.css';

export type Item = {
  id: string;
  label?: string;
};

export type Props = {
  options: Item[];
  initId?: string;
  onChange?: (item: Item) => void;
};

export const Dropdown = ({ initId, options, onChange }: Props) => {
  const init = initId ?? options[0].id;
  const [isOpen, setOpen] = useState(false);
  const [items] = useState(options);
  const [selectedId, setSelectedId] = useState(init);

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
    <div className={cn(styles.dropdown)}>
      <div className={cn(styles.header)} onClick={toggleDropdown}>
        {selectedId ? selectedItem?.label : 'Select your destination'}
        <ArrowIcon className={cn(styles.arrow, {[styles.arrow_open]: isOpen,})} />
      </div>
      <div className={cn(styles.body, {[styles.body_open]: isOpen,})}>
        {items.map(({ id, label }) => (
          <div className={cn(styles.item)} onClick={handleItemClick} id={id} key={id}>
            {label ? label : id}
          </div>
        ))}
      </div>
    </div>
  );
};
