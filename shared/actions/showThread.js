'use strict';

var debug = require('debug')('Example:openThreadAction');

module.exports = function (context, payload, done) {
  debug('dispatching SHOW_THREAD', payload);
  context.dispatch('SHOW_THREAD', payload);
  done();
};
