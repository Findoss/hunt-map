import cn from 'classnames';

import { SectionLang } from './lang';
import { SectionMaps } from './maps';
import { SectionFilters } from './filters';
import { SectionTools } from './tools';
import { SectionEditor } from './panel';

import { INVITE_LINK_DISCORD_RUHUNT } from '../../../constants';

import { ReactComponent as SponsorSVG } from '../../../assets/sponsor/ruhuntwhite.svg';
import styles from './sections.module.css';

type Props = {
  className?: string;
};

export const Sections = ({ className }: Props) => {
  return (
    <>
      <div className={cn(`${styles.section}`, className)}>
        <SectionLang className={cn(`${styles.section} ${styles.section__lang}`)} />
        <SectionMaps className={cn(`${styles.section}`)} />
        <SectionFilters className={cn(`${styles.section}`)} />
        <SectionTools className={cn(`${styles.section}`)} />
        <SectionEditor className={cn(`${styles.section}`)} />
        <div className={cn(`${styles.section__br}`)} />
      </div>

      <a
        className={cn(`${styles.section__adv}`)}
        href={INVITE_LINK_DISCORD_RUHUNT}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SponsorSVG />
      </a>
    </>
  );
};
