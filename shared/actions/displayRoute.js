'use strict';

var debug = require('debug')('Example:displayRouteAction');

module.exports = function (context, payload, done) {
  debug('dispatching DISPLAY_ROUTE', payload);
  context.dispatch('DISPLAY_ROUTE', payload);
  done();
};
