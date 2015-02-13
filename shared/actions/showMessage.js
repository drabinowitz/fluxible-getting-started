'use strict';

var debug = require('debug')('Example:openMessageAction');

module.exports = function (context, payload, done) {
  debug('dispatching SHOW_MESSAGE', payload);
  context.dispatch('SHOW_MESSAGE', payload);
  done();
};
