import { ReactElement } from 'react';
import classNames from 'classnames';

import './style.css';

export type Props = {
  icon?: ReactElement;
  children: string;
  active?: boolean;
};

export const Button = ({ children, icon, active }: Props) => {
  const className = classNames('button', { [`${active}`]: 'button--active' });

  return (
    <button className={className}>
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};
