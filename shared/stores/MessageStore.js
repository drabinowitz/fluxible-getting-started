'use strict';

var createStore = require('fluxible/utils/createStore');
var ThreadStore = require('./ThreadStore');

var MessageStore = createStore({
  storeName: 'MessageStore',
  handlers: {
    'RECEIVE_MESSAGES': 'receiveMessages',
    'SHOW_MESSAGE': 'showMessage'
  },
  initialize: function (dispatcher) {
    this.messages = {};
    this.primaryMessage = null;
  },
  lastId: function () {
    var lastId = -1;
    for (var messageId in this.messages) {
      if (messageId > lastId) lastId = messageId;
    }
    return lastId;
  },
  receiveMessages: function (messages) {
    messages.forEach(function (message) {
      this.messages[message.id] = message;
    }.bind(this));
    this.emitChange();
  },
  showMessage: function (payload) {
    this.primaryMessage = this.messages[payload.messageId];
    this.emitChange();
  },
  getAll: function () {
    return this.messages;
  },
  getAllForThreadId: function (threadId) {
    return Object.keys(this.messages).reduce(function (messagesInThread, messageId) {
      var message = this.messages[messageId];
      if (message.threadId === threadId) {
        messagesInThread.push(message);
      }
      return messagesInThread;
    }.bind(this), []);
  },
  get: function (id) {
    return this.messages[id];
  },
  getPrimary: function () {
    return this.primaryMessage;
  },
  dehydrate: function () {
    return {
      messages: this.messages,
      primaryMessage: this.primaryMessage
    };
  },
  rehydrate: function (state) {
    this.messages = state.messages;
    this.primaryMessage = state.primaryMessage;
  },
  createMessage: function (message) {
    var threadId = this.dispatcher.getStore(ThreadStore).getPrimary().id;
    return {
      text: message.text,
      id: parseInt(this.lastId(), 10) + 1,
      threadId: threadId
    };
  }
});

module.exports = MessageStore;
