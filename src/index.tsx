import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { store } from './store';
import { IS_DEV, IS_PROD, VERSION_APP } from './constants/index';

import './plugins/i18n';
import './index.css';

if (IS_PROD || IS_DEV) {
  console.log(VERSION_APP);
}

const $container = document.getElementById('root');
const root = createRoot($container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

if (IS_PROD) {
  reportWebVitals();
}
