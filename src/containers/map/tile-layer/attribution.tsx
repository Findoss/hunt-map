import ReactDOMServer from 'react-dom/server';

import { INVITE_LINK_DISCORD_RUHUNT } from '../../../constants';
import { ReactComponent as SponsorSVG } from '../../../assets/sponsor/ruhuntwhite.svg';

const Attribution = () => {
  return (
    <>
      <a target="_blank" href="./contributors.txt">
        contributors
      </a>
      <a
        href={INVITE_LINK_DISCORD_RUHUNT}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor"
      >
        <SponsorSVG />
      </a>
    </>
  );
};

export const ATTRIBUTION = ReactDOMServer.renderToString(<Attribution />);
