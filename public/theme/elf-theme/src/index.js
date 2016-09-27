import React from 'react';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {render} from 'react-dom';
import App from './js/App';
import RouteContainer from './js/routes';
import store from './js/store';
import './stylus/index.styl';

const mount = document.getElementById('app');

if (mount) {
  if (module.hot) {
    module.hot.accept();
  }
  render(
    <Provider store={store}>
      <RouteContainer/>
    </Provider>, mount
  );
};