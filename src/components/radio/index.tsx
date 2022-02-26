import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import cn from 'classnames';
import styles from './radio.module.css';

export type Props = {
  id: string;
  value: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio = ({ id, value, name, label, checked, onChange }: Props) => {
  return (
    <label htmlFor={id} className={cn(`${styles.radio}`)}>
      <input
        className={cn(`${styles.input}`)}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {checked ? <ArrowIcon className={cn(`${styles.marker}`)} /> : <div className={cn(`${styles.marker}`)}>●</div>}
      <span className={cn(`${styles.label}`)}>{label}</span>
    </label>
  );
};
