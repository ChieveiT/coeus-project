import React from 'react';
import { storeShape } from 'coeux/lib/types';
import TreeView from './TreeView';
import style from '../assets/scss/State.scss';

function isClass(v) {
  return typeof v === 'function' && v.prototype.constructor === v;
}

class State extends React.Component {
  componentWillMount() {
    let store = this.context.store;

    this.unsubscribe = store.subscribe((state) => {
      this.setState({ tree: state });
    });

    // init
    this.setState({
      tree: {},
      position: { x: 0, y: 0 }
    });

    store.initState();

    // for header
    this.isPressed = false;
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();  
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
  }

  render() {
    let { tree, position: { x, y } } = this.state;

    return (
      <div
        className={style.background}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
          WebkitTransform: `translate3d(${x}px, ${y}px, 0)`
        }}
      >
        <div
          className={style.header}
          onMouseDown={this.handleMouseDown.bind(this, { x, y })}
        >
          {'State'}
        </div>
        <div className={style.body}>
          <TreeView tree={tree} />
        </div>
      </div>
    );
  }
}

State.contextTypes = {
  store: storeShape.isRequired
};

export default State;
