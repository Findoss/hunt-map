import cn from 'classnames';

import { SectionLang } from './lang';
import { SectionMaps } from './maps';
import { SectionFilters } from './filters';
import { SectionTools } from './tools';

import styles from './sections.module.css';

type Props = {
  extraClass?: string;
};

export const Sections = ({ extraClass }: Props) => {
  return (
    <>
      <div className={cn(styles.section, extraClass)}>
        <SectionLang extraClass={cn(styles.section, styles.section__lang)} />
        <SectionMaps extraClass={cn(styles.section)} />
        {/*<SectionFilters extraClass={cn(styles.section)} /> */}
        <SectionTools extraClass={cn(styles.section)} />
      </div>
    </>
  );
};
