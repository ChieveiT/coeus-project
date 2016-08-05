import React from 'react';
import { storeShape } from 'coeus/lib/types';
import TreeView from 'react-treeview';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import map from 'lodash/map';

require('react-treeview/react-treeview.css');

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
      collapsed: []
    });

    store.initState();
  }

  componentWillUnmount() {
    this.unsubscribe();  
  }

  toggle(key) {
    let collapsed = this.state.collapsed;
    let value = !collapsed[key];

    this.setState({
      collapsed: { ...collapsed, key: value }
    });
  }

  renderTree(node, keyTrace = []) {
    if (!(isPlainObject(node) || isArray(node))) {
      return node;
    }

    return map(node, (value, key) => {
      const flattenKey = [ ...keyTrace, key ];
      const flattenKeyStr = flattenKey.join('.');

      if (isPlainObject(value) || isArray(value)) {
        const label = (
          <span className="node" onClick={
            this.toggle.bind(this, flattenKeyStr)
          }>
            {key}
          </span>
        );
        const collapsed = this.state.collapsed[flattenKeyStr];

        return (
          <TreeView
            key={key}
            nodeLabel={label}
            collapsed={collapsed}
          >
            {this.renderTree(value, flattenKey)}
          </TreeView>
        );
      } else {
        if (isClass(value)) {
          value = `class ${value.name}`;
        }

        return (
          <div className="node" key={key}>
            {`${key}: ${value}`}
          </div>
        );
      }
    });
  }

  render() {
    return <div>{this.renderTree(this.state.tree)}</div>;
  }
}

State.contextTypes = {
  store: storeShape.isRequired
};

export default State;
