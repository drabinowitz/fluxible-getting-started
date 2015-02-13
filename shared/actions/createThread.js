'use strict';

var debug = require('debug')('Example:createThreadAction');
var ThreadStore = require('../stores/ThreadStore');

module.exports = function (context, payload, done) {
  var threadStore = context.getStore(ThreadStore);
  var thread = threadStore.createThread({
    title: payload.title
  });
  debug('dispatching RECEIVE_THREADS', thread);
  context.dispatch('RECEIVE_THREADS', [thread]);
  context.service.create('thread', thread, {}, function (err) {
    if (err) {
      debug('dispatching RECEIVE_THREADS_FAILURE', thread);
      context.dispatch('RECEIVE_THREADS_FAILURE', [thread]);
      done();
      return;
    }
    debug('dispatching RECEIVE_THREADS_SUCCESS', thread);
    context.dispatch('RECEIVE_THREADS_SUCCESS', [thread]);
    done();
  });
};
