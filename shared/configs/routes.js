var showChat = require('../actions/showChat');
var showMessage = require('../actions/showMessage');
var showThread = require('../actions/showThread');
var displayRoute = require('../actions/displayRoute');

module.exports = {
  home: {
    path: '/',
    method: 'get',
    action: function (context, payload, done) {
      context.executeAction(showChat, {}, function () {
        context.executeAction(displayRoute, {}, done);
      });
    }
  },
  message: {
    path: '/message/:id',
    method: 'get',
    action: function (context, payload, done) {
      context.executeAction(showChat, {messageId: payload.params.id}, function () {
        context.executeAction(showMessage, {messageId: payload.params.id}, function () {
          context.executeAction(displayRoute, {message: true}, done);
        });
      });
    }
  },
  thread: {
    path: '/thread/:id',
    method: 'get',
    action: function (context, payload, done) {
      context.executeAction(showChat, {threadId: payload.params.id}, function () {
        context.executeAction(showThread, {threadId: payload.params.id}, function () {
          context.executeAction(displayRoute, {thread: true}, done);
        });
      });
    }
  }
};
