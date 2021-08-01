import classNames from 'classnames';

import { Dropdown } from '../../../components/dropdown';

import './style.css';

type Props = {
  className?: string;
};

export const Sections = ({ className }: Props) => {
  const styleSections = classNames('sections', className);

  return (
    <div className={styleSections}>
      <div className="section section__lang">
        <span>Language</span>
        <Dropdown />
      </div>
      <div className="section">maps</div>
      <div className="section">compounds</div>
      <div className="section">markers</div>
      <div className="section">admin</div>
      <div className="section section__adv">adv</div>
    </div>
  );
};
