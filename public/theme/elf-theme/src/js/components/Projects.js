import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import ReactDOM from 'react-dom';
import Anime from 'animejs';
import ReactAnime from 'react-anime/dist/anime';
import Project from './Project';
import * as actions from '../actions/api';

const mapStateToProps = state => {
  return {
    projects: state.get('projects'),
    loading: state.get('loading')
  }
};

class Projects extends Component {
  static propTypes = {
    projects: PropTypes.instanceOf(List),
    loading: PropTypes.bool
  };
  renderProjects() {
    const {projects} = this.props;
    return (
      <ReactAnime
            className="anime-project-wrapper"
            loop={true}
            translateX={'100%'}
            duration={1000}
            direction="normal">
          {projects.toJS().map( project => {
            return (
              <Project 
                key={`project-${project.id}`} 
                {...project.attributes} />
            ) 
          })}
          </ReactAnime>
    );
  }
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const {
      projects,
      loading
    } = this.props;
    return (
      <div className="projects-wrapper">
        {(projects && !loading) &&
          projects.toJS().map( (project, index) => {
            return (
              <Project 
                key={`project-${project.id}`}
                delay={index} 
                {...project.attributes} />
            ) 
          })
        }
        {loading &&
          <div className="anime-wrapper">
            <ReactAnime 
             easing="easeOutElastic"
             duration={2400}
             direction="alternate"
             loop={true}
             delay={(el, index) => index * 100}
             translateX={(el, index) => index * 100 + 'px'}
             forwards={true}
             scale={[.5, .9]}>
              <div className="green"/>
              <div className="green"/>
              <div className="green"/>
           </ReactAnime>
         </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, actions)(Projects);