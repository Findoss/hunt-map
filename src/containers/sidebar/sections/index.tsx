import classNames from 'classnames';

import { SectionLang } from './lang';
import { SectionMaps } from './maps';
import { SectionFilters } from './filters';

import './style.css';

type Props = {
  className?: string;
};

export const Sections = ({ className }: Props) => {
  const styleSections = classNames('sections', className);

  return (
    <div className={styleSections}>
      <SectionLang className="section section__lang" />
      <SectionMaps className="section section__map-switch" />
      <SectionFilters className="section" />

      {/* <div className="section">
        <span>{t('sections.tools')}</span>
      </div>
      <div className="section">
        <span>{t('sections.editor')}</span>
      </div> */}

      <a
        className="section section__adv"
        href="https://discord.gg/FyutvHpS"
        target="_blank"
        rel="noopener noreferrer"
      >
        .
      </a>
    </div>
  );
};
