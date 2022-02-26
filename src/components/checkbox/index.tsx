import React, { ReactElement, useState } from 'react';
import cn from 'classnames';
import styles  from './checkbox.module.css';

export type Props = {
  id: string;
  name: string;
  initValue?: boolean;
  value?: string;
  label?: string;
  icon?: ReactElement;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  name,
  id,
  label,
  icon,
  value,
  initValue = true,
  onClick,
  onChange,
}: Props) => {
  const [checked, toggleCheck] = useState(initValue);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    toggleCheck((v) => !v);
    if (onClick) onClick(e);
  };

  return (
    <label className={cn(`${styles.checkbox}`, {
      checkbox_checked: checked,
    })} htmlFor={name}>
      <div className={cn(`${styles.icon}`)}>{icon ? icon : '●'}</div>
      <input
        className={cn(`${styles.input}`)}
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onClick={handleClick}
        onChange={onChange ? onChange : () => {}}
        value={value}
      />
      <span className={cn(`${styles.label}`, {
        [styles.label_active]: checked,
      })}>{label ? label : name}</span>
    </label>
  );
};
