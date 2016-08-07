import React from 'react';
import { render } from 'react-dom';
import Router from 'coeus';
import routes from './routes.yml';

require('normalize.css');
require('./assets/scss/global.scss')

let middlewares = [
  function(action, next) {
    console.log(action);

    return next(action);
  }
];

render(
  <Router routes={routes} middlewares={middlewares} />,
  document.getElementById('app')
);
