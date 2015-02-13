var showChat = require('../actions/showChat');
var showMessage = require('../actions/showMessage');
var showThread = require('../actions/showThread');

module.exports = {
  home: {
    path: '/',
    method: 'get',
    action: function (context, payload, done) {
      context.executeAction(showChat, {}, done);
    }
  },
  message: {
    path: '/message/:id',
    method: 'get',
    action: function (context, payload, done) {
      context.executeAction(showChat, {messageId: payload.params.id}, function () {
        context.executeAction(showMessage, {messageId: payload.params.id}, function () {
          done();
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
          done();
        });
      });
    }
  }
};
