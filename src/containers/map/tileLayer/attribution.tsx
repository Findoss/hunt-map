import ReactDOMServer from 'react-dom/server';
import { ReactComponent as SponsorSVG } from '../../../assets/sponsor/ruhuntwhite.svg';

const Attribution = () => {
  return (
    <>
      <a target="_blank" href="./public/contributors.txt">
        contributors
      </a>
      <a
        href="https://discord.gg/FyutvHpS"
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
