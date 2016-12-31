import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import map from 'lodash/map';
import style from '../assets/scss/TreeView.scss';

function isClass(v) {
  return typeof v === 'function' && v.prototype.constructor === v;
}

class TreeView extends React.Component {
  componentWillMount() {
    // init
    this.setState({ collapsed: [] });
  }

  handleCollapse(key, e) {
    e.stopPropagation();

    let collapsed = this.state.collapsed;
    let value = !collapsed[key];

    this.setState({
      collapsed: { ...collapsed, [key]: value }
    });
  }

  renderTree(node, flattenKey = []) {
    return map(node, (value, key) => {
      if (isPlainObject(value) || isArray(value)) {
        const _flattenKey = [ ...flattenKey, key ];
        const _flattenKeyStr = _flattenKey.join('.');

        let keyLabel = '';
        if (isPlainObject(value)) {
          let keys = Object.keys(value);
          switch (keys.length) {
            case 0: keyLabel = `{}`;break;
            case 1: keyLabel = `{} 1 key`;break;
            default: keyLabel = `{} ${keys.length} keys`;
          }
        } else {
          switch (value.length) {
            case 0: keyLabel = `[]`;break;
            case 1: keyLabel = `[] 1 item`;break;
            default: keyLabel = `[] ${value.length} items`;
          }
        }

        const collapsed = !this.state.collapsed[_flattenKeyStr];
        const handleCollapse = this.handleCollapse.bind(
          this, _flattenKeyStr
        );

        return (
          <div key={key}>
            <div className={style.node} onClick={handleCollapse}>
              <span className={classNames({
                [style.arrow]: true,
                [style.arrowCollapsed]: collapsed
              })} />
              <span>
                {`${key} : `}
              </span>
              <span className={style.label}>
                {keyLabel}
              </span>
            </div>
            {
              collapsed ? null : (
                <div className={style.children}>
                  {this.renderTree(value, _flattenKey)}
                </div>
              )
            }
          </div>
        );
      } else {
        if (isClass(value)) {
          value = `class ${value.name}`;
        } else if (isString(value)) {
          value = `"${value}"`;
        }

        return (
          <div className={style.leaf} key={key}>
            <div className={style.node}>
              <span>
                {`${key} : `}
              </span>
              <span className={style.value}>
                {value}
              </span>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
        {
          isEmpty(this.props.tree) ? null :
          this.renderTree(this.props.tree)
        }
      </div>
    );
  }
}

TreeView.propsTypes = {
  tree: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
};

export default TreeView;
