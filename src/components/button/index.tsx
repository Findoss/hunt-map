import { ReactElement } from 'react';
import classNames from 'classnames';
import type { MouseEventHandler } from 'react';

import './style.css';

export type Props = {
  icon?: ReactElement;
  children: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ children, icon, active, onClick }: Props) => {
  const className = classNames('button', { 'button--active': active });

  return (
    <button onClick={onClick} className={className}>
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};
