import React from 'react';
import { storeShape } from 'coeus/lib/types';
import State from './State';

class Navigator extends React.Component {
  route(path) {
    let store = this.context.store;
    console.log(store.getState());

    return function () {
      store.dispatch({
        type: 'ROUTE', path
      });
    }
  }

  render() {
    return (
      <div>
        <State />

        <ul>
          <li onClick={this.route('/')}>
            {'index'}
          </li>
          <li onClick={this.route('/another')}>
            {'another'}
          </li>
          <li onClick={this.route('/not_found')}>
            {'not_found'}
          </li>
        </ul>

        {this.props.children}
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
