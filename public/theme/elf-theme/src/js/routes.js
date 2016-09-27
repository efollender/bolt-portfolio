import React, {Component, PropTypes} from 'react';
import {Router, Route, hashHistory} from 'react-router';
import App from './App';
import Main from './components/Main';

const routes = (
  <Route name="app" component={App}>
    <Route name="main" component={Main} path="/" />
  </Route>
);

export default class RouteContainer extends Component {
  static propTypes = {
    history: PropTypes.object,
    store: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <Router
        routes={routes}
        history={hashHistory}/>
    );
  }
}