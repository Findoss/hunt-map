import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import './plugins/i18n';

import './index.css';

import reportWebVitals from './reportWebVitals';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
