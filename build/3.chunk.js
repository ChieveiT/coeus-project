webpackJsonp([3,4],{156:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(2),u=n(s),c=r(150),f=r(157),p=n(f),d=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return l(t,e),i(t,[{key:"route",value:function(e){var t=this.context.store;return console.log(t.getState()),function(){t.dispatch({type:"ROUTE",path:e})}}},{key:"render",value:function(){return u["default"].createElement("div",null,u["default"].createElement(p["default"],null),u["default"].createElement("ul",null,u["default"].createElement("li",{onClick:this.route("/")},"index"),u["default"].createElement("li",{onClick:this.route("/another")},"another"),u["default"].createElement("li",{onClick:this.route("/not_found")},"not_found")),this.props.children)}}]),t}(u["default"].Component);d.propTypes={children:u["default"].PropTypes.oneOfType([u["default"].PropTypes.element,u["default"].PropTypes.arrayOf(u["default"].PropTypes.element)])},d.contextTypes={store:c.storeShape.isRequired},t["default"]=d},157:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return"function"==typeof e&&e.prototype.constructor===e}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(2),p=n(f),d=r(150),h=r(158),y=n(h),v=r(119),b=n(v),m=r(5),w=n(m),g=r(148),_=n(g),O=r(159),k=n(O);r(163);var P=function(e){function t(){return a(this,t),l(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"componentWillMount",value:function(){var e=this,t=this.context.store;this.unsubscribe=t.subscribe(function(t){e.setState({tree:t})}),this.setState({tree:{},collapsed:[]}),t.initState()}},{key:"componentWillUnmount",value:function(){this.unsubscribe()}},{key:"toggle",value:function(e){var t=this.state.collapsed,r=!t[e];this.setState({collapsed:u({},t,{key:r})})}},{key:"renderTree",value:function(e){var t=this,r=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return(0,b["default"])(e)||(0,w["default"])(e)?(0,_["default"])(e,function(e,n){var a=[].concat(o(r),[n]),l=a.join(".");if((0,b["default"])(e)||(0,w["default"])(e)){var i=p["default"].createElement("span",{className:"node",onClick:t.toggle.bind(t,l)},n),u=t.state.collapsed[l];return p["default"].createElement(y["default"],{key:n,nodeLabel:i,collapsed:u},t.renderTree(e,a))}return s(e)&&(e="class "+e.name),p["default"].createElement("div",{className:"node",key:n},n+": "+e)}):e}},{key:"render",value:function(){return p["default"].createElement("div",{className:k["default"].background},p["default"].createElement("div",{className:k["default"].head},"State"),this.renderTree(this.state.tree))}}]),t}(p["default"].Component);P.contextTypes={store:d.storeShape.isRequired},t["default"]=P},158:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l=r(2),i=n(l),s=i["default"].createClass({displayName:"TreeView",propTypes:{collapsed:l.PropTypes.bool,defaultCollapsed:l.PropTypes.bool,nodeLabel:l.PropTypes.node.isRequired,className:l.PropTypes.string,itemClassName:l.PropTypes.string},getInitialState:function(){return{collapsed:this.props.defaultCollapsed}},handleClick:function(){if(this.setState({collapsed:!this.state.collapsed}),this.props.onClick){var e;(e=this.props).onClick.apply(e,arguments)}},render:function(){var e=this.props,t=e.collapsed,r=void 0===t?this.state.collapsed:t,n=e.className,l=void 0===n?"":n,s=e.itemClassName,u=void 0===s?"":s,c=e.nodeLabel,f=e.children,p=o(e,["collapsed","className","itemClassName","nodeLabel","children"]),d="tree-view_arrow",h="tree-view_children";r&&(d+=" tree-view_arrow-collapsed",h+=" tree-view_children-collapsed");var y=i["default"].createElement("div",a({},p,{className:l+" "+d,onClick:this.handleClick}));return i["default"].createElement("div",{className:"tree-view"},i["default"].createElement("div",{className:"tree-view_item "+u},y,c),i["default"].createElement("div",{className:h},f))}});t["default"]=s,e.exports=t["default"]},159:function(e,t,r){var n=r(160);"string"==typeof n&&(n=[[e.id,n,""]]);r(162)(n,{});n.locals&&(e.exports=n.locals)},160:function(e,t,r){t=e.exports=r(161)(),t.push([e.id,".xqpT6oJEcH8ozhmpMuN00 div{background:#353b46}._1bcxgYYBxaP0y_PBgqebCS{background:#565a62;width:100%;height:25px}",""]),t.locals={background:"xqpT6oJEcH8ozhmpMuN00",head:"_1bcxgYYBxaP0y_PBgqebCS"}},163:function(e,t,r){var n=r(164);"string"==typeof n&&(n=[[e.id,n,""]]);r(162)(n,{});n.locals&&(e.exports=n.locals)},164:function(e,t,r){t=e.exports=r(161)(),t.push([e.id,".tree-view{overflow-y:hidden}.tree-view_children{margin-left:16px}.tree-view_children-collapsed{height:0}.tree-view_arrow{cursor:pointer;margin-right:6px;display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tree-view_arrow:after{content:'\\25BE'}.tree-view_arrow-collapsed{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}",""])}});