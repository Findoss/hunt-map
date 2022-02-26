import { ReactElement } from 'react';
import cn from 'classnames';
import type { MouseEventHandler } from 'react';

import styles from './button.module.css';

export type Props = {
  icon?: ReactElement;
  children: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ children, icon, active, onClick }: Props) => {

  return (
    <button onClick={onClick} className={cn(styles.button, {[styles.button_active]: active})}>
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};
