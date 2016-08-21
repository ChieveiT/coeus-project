var fs = require('fs');

var yamlL = require('yaml-loader');
var routesL = require('coeus-router/lib/routes-loader');
var js_beautify = require('js-beautify').js_beautify;
function beautify(content) {
  return js_beautify(content, { indent_size: 2 });
}

// mock this object
var yamlLoader = yamlL.bind({ });
var routeLoader = routesL.bind({ });

// generate routes module
var routeTree = fs.readFileSync('app/routes.yml');
source = beautify(routeLoader(yamlLoader(routeTree)));
fs.writeFileSync('server/routes.js', source);

var koa = require('koa');
var koaStatic = require('koa-static');
var server = koa();

var routes = require('./routes');
var _404 = fs.readFileSync('server/404.html');
var _index = fs.readFileSync('build/index.html');
var _indexPath = /^\/index\.html(\/.*)?$/;

// A little fix for index path. Index path should be
// excluded from static middleware because Router can
// not regonize '/index.html' prefix when matching 
// paths.
server.use(function *(next) {
  if (this.path.match(_indexPath)) {
    this.status = 404;
    this.type = '.html';
    this.body = _404;
    return;
  }

  yield next;
});

// middleware to handle static resources
server.use(koaStatic('build'));

// middleware to check whether a path is
// 404 or not
server.use(function *() {
  if (routes.check(this.path) === false) {
    this.status = 404;
    this.type = '.html';
    this.body = _404;
    return;
  }

  this.type = '.html';
  this.body = _index;
});

server.listen(3001);