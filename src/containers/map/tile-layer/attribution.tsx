import ReactDOMServer from 'react-dom/server';

const Attribution = () => {
  return (
    <>
      <a target="_blank" href="./contributors.txt">
        contributors
      </a>
    </>
  );
};

export const ATTRIBUTION = ReactDOMServer.renderToString(<Attribution />);
