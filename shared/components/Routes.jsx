var Route = require('react-router').Route;
var App = require('./App.jsx');
/*jshint ignore:start*/
module.exports = (
  <Route handler={App} path='/'>

  </Route>
);
/*jshint ignore:end*/

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
