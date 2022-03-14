import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { VERSION_APP } from './constants/index';

import App from './App';
import { store } from './store';
import './plugins/i18n';

import './index.css';

import reportWebVitals from './reportWebVitals';

console.log(VERSION_APP);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
