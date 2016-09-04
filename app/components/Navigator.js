import React from 'react';
import { storeShape } from 'coeux/lib/types';
import State from './State';
import style from '../assets/scss/Navigator.scss';
import Link from 'coeus-router/lib/Link';
import { Motion, spring, presets } from 'react-motion';

class Navigator extends React.Component {
  componentWillMount() {
    // init
    this.setState({
      position: { x: 0, y: 0 }
    });

    this.isPressed = false;
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  route(path) {
    let store = this.context.store;

    return function () {
      store.dispatch({
        type: 'ROUTE', path
      });
    }
  }

  handleMouseDown({ x, y }, { pageX, pageY }) {
    this.isPressed = true;
    this.offsetX = pageX - x;
    this.offsetY = pageY - y;
  }

  handleMouseMove({ pageX, pageY }) {
    if (this.isPressed) {
      this.setState({
        position: {
          x: pageX - this.offsetX,
          y: pageY - this.offsetY
        }
      });
    }
  }

  handleMouseUp() {
    this.isPressed = false;

    // trigger render for starting motion
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <State />

        <div className={style.header}>
          <Link path={'/'}>{'index'}</Link>
          <Link name={'another'}>{'another'}</Link>
          <Link path={'/not_found'}>{'not_found'}</Link>
        </div>

        <Motion
          style={
            this.isPressed ? this.state.position : {
              x: spring(0, presets.gentle),
              y: spring(0, presets.gentle)
            }
          }
        >
          {({ x, y }) => (
            <div
              className={style.body}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                WebkitTransform: `translate3d(${x}px, ${y}px, 0)`
              }}
              onMouseDown={this.handleMouseDown.bind(this, { x, y })}
            >
              {this.props.children}
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

Navigator.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ])
};

Navigator.contextTypes = {
  store: storeShape.isRequired
};

export default Navigator;
