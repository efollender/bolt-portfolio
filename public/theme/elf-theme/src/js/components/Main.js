import React, {Component, PropTypes} from 'react';
import Projects from './Projects';

export default class Main extends Component {
  render() {
    return (
      <div className="main-wrapper">
      <div className="column left">
        <iframe src="http://efollender.github.io/redux-skifree" frameBorder="0"/>
      </div>
      <div className="column right">
        <Projects/>
      </div>
      </div>
    );
  }
}