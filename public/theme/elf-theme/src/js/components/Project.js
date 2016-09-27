import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Anime from 'animejs';
import ReactAnime from 'react-anime/dist/anime';

export default class Project extends Component {
  static propTypes = {
    title: PropTypes.string,
    imagelist: PropTypes.array,
    delay: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  onClick() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    const {
      title,
      imagelist,
      delay
    } = this.props;
    const {collapsed} = this.state;
    return (
      <ReactAnime
            translateX={['-400%','0%']}
            easing="easeInOutQuart"
            duration={1000}
            direction="normal"
            delay={delay * 250}
            >
      <div 
          onClick={::this.onClick}
          className="project-item" 
          data-project-title={title}>
        <h2>{title}</h2>
        {imagelist &&
          <div className={classNames(['image-list__wrapper'], {
            collapsed: collapsed
          })}>
          {imagelist.map((image, index) => {
            return <img key={`image-${index}`}src={image.thumbnail}/>
          })}
          </div>
        }
      </div>
      </ReactAnime>
    );
  }
}