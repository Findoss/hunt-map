import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { store } from './store';
import { VERSION_APP } from './constants/index';

import './plugins/i18n';
import './index.css';

console.log(VERSION_APP);

const $container = document.getElementById('root');
const root = createRoot($container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
