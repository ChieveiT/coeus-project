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
  "match": function match(path) {
    var self = this;

    return new Promise(function(resolve, reject) {
      var result = function traverse(children, context) {
        for (var i = 0; i < children.length; i++) {
          var node = children[i];

          // create current context to avoid children's contexts
          // affect each other
          var remain = context.remain;
          var componentsPromises = context.componentsPromises.slice(0);
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
        // It seems hard to support es6 syntax in meta programming.
        // _slicedToArray() will be missing.
        // If you can solve this, please give me a PR:)
        //
        // let [ componentsPromises, routeArguments ] = result;

        Promise.all(result[0]).then(function(components) {
          resolve({
            components: components,
            args: result[1]
          });
        }, function(e) {
          reject(e);
        });
      }
    });
  },
  "check": function check(path) {
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
  "_names": {},
  "link": function link(name, args) {
    var named = this._names[name];
    args = args || {};

    if (named === undefined) {
      throw new Error('Unknown name \'' + name + '\'');
    }

    for (var i in args) {
      if (named.paramsOptional[i] === undefined) {
        throw new Error('Unknown argument \'' + i + '\'');
      }
    }

    var result = named.pathTemplate;
    for (var _i in named.paramsOptional) {
      if (named.paramsOptional[_i] === false && args[_i] === undefined) {
        throw new Error('Argument \'' + _i + '\' is required');
      }

      var regex = new RegExp('^' + named.paramsRegex[_i] + '$');
      if (args[_i] && regex.test(String(args[_i])) === false) {
        throw new Error('Argument \'' + _i + '\' is illegal');
      }

      result = result.replace('<' + _i + '>', args[_i] || '');
    }

    return result;
  }
}