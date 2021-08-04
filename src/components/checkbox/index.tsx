import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';
import './style.css';

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

  const styleChekbox = classNames('checkbox', {
    checkbox_checked: checked,
  });

  return (
    <label className={styleChekbox} htmlFor={name}>
      <div className="checkbox__icon">{icon ? icon : '●'}</div>
      <input
        className="checkbox__input"
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onClick={handleClick}
        onChange={onChange ? onChange : () => {}}
        value={value}
      />
      <span className="checkbox__label">{label ? label : name}</span>
    </label>
  );
};
