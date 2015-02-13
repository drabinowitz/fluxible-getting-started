'use strict';

var createStore = require('fluxible/utils/createStore');

var ThreadStore = createStore({
  storeName: 'ThreadStore',
  handlers: {
    'RECEIVE_THREADS': 'receiveThreads',
    'SHOW_THREAD': 'showThread'
  },
  initialize: function () {
    this.threads = {};
    this.primaryThread = null;
  },
  lastId: function () {
    var lastId = -1;
    for (var threadId in this.threads) {
      if (threadId > lastId) lastId = threadId;
    }
    return lastId;
  },
  receiveThreads: function (threads) {
    threads.forEach(function (thread) {
      this.threads[thread.id] = thread;
    }.bind(this));
    this.emitChange();
  },
  showThread: function (payload) {
    this.primaryThread = this.threads[payload.threadId];
    this.emitChange();
  },
  getAll: function () {
    return this.threads;
  },
  get: function (id) {
    return this.threads[id];
  },
  getPrimary: function () {
    return this.primaryThread;
  },
  dehydrate: function () {
    return {
      threads: this.threads,
      primaryThread: this.primaryThread
    };
  },
  rehydrate: function (state) {
    this.threads = state.threads;
    this.primaryThread = state.primaryThread;
  },
  createThread: function (thread) {
    return {
      title: thread.title,
      id: parseInt(this.lastId(), 10) + 1
    };
  }
});

module.exports = ThreadStore;
