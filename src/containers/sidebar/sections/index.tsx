import classNames from 'classnames';

import { SectionLang } from './lang';
import { SectionMaps } from './maps';
import { SectionFilters } from './filters';
import { SectionTools } from './tools';
import { SectionEditor } from './panel';

import { INVITE_LINK_DISCORD_RUHUNT } from '../../../constants';

import { ReactComponent as SponsorSVG } from '../../../assets/sponsor/ruhuntwhite.svg';
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
      <SectionTools className="section" />
      <SectionEditor className="section" />

      <a
        className="section section__adv"
        href={INVITE_LINK_DISCORD_RUHUNT}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SponsorSVG />
      </a>
    </div>
  );
};
