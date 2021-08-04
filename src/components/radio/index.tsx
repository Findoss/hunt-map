import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import './style.css';

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
    <label htmlFor={id} className="radio">
      <input
        className="radio__input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <ArrowIcon className="radio__marker" />
      <span className="radio__label">{label}</span>
    </label>
  );
};
