'use strict';

var debug = require('debug')('Example:createMessageAction');
var MessageStore = require('../stores/MessageStore');

module.exports = function (context, payload, done) {
  var messageStore = context.getStore(MessageStore);
  var message = messageStore.createMessage({
    text: payload.text,
  });
  debug('dispatching RECEIVE_MESSAGES', message);
  context.dispatch('RECEIVE_MESSAGES', [message]);
  context.service.create('message', message, {}, function (err) {
    if (err) {
      debug('dispatching RECEIVE_MESSAGES_FAILURE', message);
      context.dispatch('RECEIVE_MESSAGES_FAILURE', [message]);
      done();
      return;
    }
    debug('dispatching RECEIVE_MESSAGES_SUCCESS', message);
    context.dispatch('RECEIVE_MESSAGES_SUCCESS', [message]);
    done();
  });
};
