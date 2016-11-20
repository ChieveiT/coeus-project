module.exports = {
  "path": "/",
  "componentsPath": "./components",
  "components": [":Navigator"],
  "children": [{
    "components": [":Hello"],
    "_components": function _components() {
      return new Promise(function(resolve) {
        require.ensure([], function(require) {
          resolve([require("./components/Hello").default || require("./components/Hello")]);
        });
      });
    }
  }, {
    "path": "another",
    "components": [":Another"],
    "name": "another",
    "_path": "another",
    "_params": [],
    "_components": function _components() {
      return new Promise(function(resolve) {
        require.ensure([], function(require) {
          resolve([require("./components/Another").default || require("./components/Another")]);
        });
      });
    }
  }],
  "_path": "/",
  "_params": [],
  "_components": function _components() {
    return new Promise(function(resolve) {
      require.ensure([], function(require) {
        resolve([require("./components/Navigator").default || require("./components/Navigator")]);
      });
    });
  },
  "match": function match(target) {
    var _tmp = target.split('?');
    var path = _tmp.shift();
    var searchStr = _tmp.shift() || '';

    var self = this;
    return new Promise(function(resolve, reject) {
      var result = function traverse(children, context) {
        for (var i = 0; i < children.length; i++) {
          var node = children[i];

          // create current context to avoid children's contexts
          // affect each other
          var remain = context.remain;
          var componentsPromises = context.componentsPromises.slice();
          var routeArguments = Object.assign({}, context.routeArguments);

          if (node._path) {
            var regex = new RegExp('^' + node._path, 'g');

            var match = null;
            if (match = regex.exec(remain)) {
              if (node._components) {
                componentsPromises.push(node._components());
              }

              for (var j = 1; j < match.length; j++) {
                // optional arguments will be matched as
                // undefined, so filter them
                if (match[j]) {
                  routeArguments[node._params[j - 1]] = match[j];
                }
              }

              if (regex.lastIndex === remain.length) {
                if (node.children) {
                  // search for index route
                  for (var k = 0; k < node.children.length; k++) {
                    if (node.children[k]._path === undefined) {
                      var index = node.children[i];

                      if (index._components) {
                        componentsPromises.push(index._components());
                      }

                      break;
                    }
                  }
                }

                return [componentsPromises, routeArguments];
              }

              if (node.children) {
                return traverse(node.children, {
                  remain: remain.substr(regex.lastIndex),

                  componentsPromises: componentsPromises,
                  routeArguments: routeArguments
                });
              }
            }
          }
        }

        return false;
      }([self], {
        remain: path,

        componentsPromises: [],
        routeArguments: {}
      });

      // not match
      if (result === false) {
        resolve(false);
      } else {
        Promise.all(result[0]).then(function(components) {
          // search parse
          var s = searchStr.split('&');
          var searchObj = {};
          for (var i in s) {
            var pair = s[i].split('=');
            var key = decodeURIComponent(pair.shift());
            var value = decodeURIComponent(pair.shift() || '');

            if (key !== '') {
              searchObj[key] = value;
            }
          }

          resolve({
            components: components,
            args: Object.assign(searchObj, result[1])
          });
        }, function(e) {
          reject(e);
        });
      }
    });
  },
  "check": function check(target) {
    var path = target.split('?').shift();

    return function traverse(children, context) {
      for (var i = 0; i < children.length; i++) {
        var node = children[i];

        // create current context to avoid children's contexts
        // affect each other
        var remain = context.remain;

        if (node._path) {
          var regex = new RegExp('^' + node._path, 'g');

          if (regex.exec(remain)) {
            if (regex.lastIndex === remain.length) {
              return true;
            }

            if (node.children) {
              return traverse(node.children, {
                remain: remain.substr(regex.lastIndex)
              });
            }
          }
        }
      }

      return false;
    }([this], {
      remain: path
    });
  },
  "_names": {
    "another": {
      "pathTemplate": "/another",
      "paramsRegex": {},
      "paramsOptional": {}
    }
  },
  "linkByName": function linkByName(name, args) {
    var named = this._names[name];
    args = args || {};

    if (named === undefined) {
      throw new Error('Unknown name \'' + name + '\'');
    }

    var result = named.pathTemplate;
    for (var i in named.paramsOptional) {
      if (named.paramsOptional[i] === false && args[i] === undefined) {
        throw new Error('Argument \'' + i + '\' is required');
      }

      var regex = new RegExp('^' + named.paramsRegex[i] + '$');
      if (args[i] && regex.test(String(args[i])) === false) {
        throw new Error('Argument \'' + i + '\' is illegal');
      }

      result = result.replace('<' + i + '>', args[i] || '');
    }

    // search stringify
    var search = [];
    for (var _i in args) {
      if (named.paramsOptional[_i] === undefined) {
        search.push(encodeURIComponent(_i) + '=' + encodeURIComponent(args[_i]));
      }
    }
    search = search.join('&');
    if (search !== '') {
      result += '?' + search;
    }

    return result;
  },
  "linkByPath": function linkByPath(path, args) {
    // search stringify
    var search = [];
    for (var i in args) {
      search.push(encodeURIComponent(i) + '=' + encodeURIComponent(args[i]));
    }
    search = search.join('&');
    if (search !== '') {
      path += '?' + search;
    }

    return path;
  }
}