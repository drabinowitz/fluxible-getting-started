'use strict';

var debug = require('debug')('Example:showChatAction');
var MessageStore = require('../stores/MessageStore');

function fetchMessages(context, payload, done) {
  debug('fetching messages');
  context.service.read('message', {}, {}, function (err, messages) {
    context.dispatch('RECEIVE_MESSAGES', messages);
    fetchThreads(context, payload, done);
  });
}

function fetchThreads(context, payload, done) {
  debug('fetching threads');
  context.service.read('thread', {}, {}, function (err, threads) {
    context.dispatch('RECEIVE_THREADS', threads);
    done();
  });
}

module.exports = function (context, payload, done) {
  context.dispatch('SHOW_CHAT_START');
  var messageStore = context.getStore(MessageStore);
  if (Object.keys(messageStore.getAll()).length === 0) {
    fetchMessages(context, payload, done);
  } else {
    debug('dispatching SHOW_CHAT_END');
    context.dispatch('SHOW_CHAT_END');
    done();
  }
};
