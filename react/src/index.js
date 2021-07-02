import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/AppComponent';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();