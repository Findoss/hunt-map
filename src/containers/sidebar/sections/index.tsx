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
  const styleSections = cn(`${styles.section}`, className);
  const styleSectionLang = cn(`${styles.section} ${styles.section__lang}`);
  const styleSection = cn(`${styles.section}`);
  //что такое -br и __adv? Не понял смысла сокращения.
  const styleSectionBr = cn(`${styles.section__br}`);
  const styleSectionAdv = cn(`${styles.section__adv}`);

  return (
    <>
      <div className={styleSections}>
        <SectionLang className={styleSectionLang} />
        <SectionMaps className={styleSection} />
        <SectionFilters className={styleSection} />
        <SectionTools className={styleSection} />
        <SectionEditor className={styleSection} />
        <div className={styleSectionBr} />
      </div>

      <a
        className={styleSectionAdv}
        href={INVITE_LINK_DISCORD_RUHUNT}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SponsorSVG />
      </a>
    </>
  );
};
