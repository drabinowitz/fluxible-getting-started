//use jsx in node
require('node-jsx').install({extension: '.jsx'});

//express
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var debug =  require('debug')('Example');

//React and fluxible
var React = require('react');
var app = require('../shared/app');
var HtmlComponent = React.createFactory(require('../shared/components/Html.jsx'));
var navigateAction = require('flux-router-component').navigateAction;
var exposeOnWindow = require('../utils/exposeOnWindow');

var server = express();
server.set('state namespace', 'App');
console.log(__dirname);
server.use('/public', express.static(__dirname + '/../build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

var fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('./services/message'));
fetchrPlugin.registerService(require('./services/thread'));
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
  var context = app.createContext({
    req: req,
    xhrContext: {
      _csrf: req.csrfToken()
    }
  });

  debug('Executing showChat action');
  context.executeAction(navigateAction, {
    url: req.url,
    type: 'pageload'
  }, function (err) {
    if (err) {
      if (err.status === 404) {
        next();
      } else {
        next(err);
      }
      return;
    }

    debug('Exposing context state');
    var exposed = exposeOnWindow('App', app.dehydrate(context));

    debug('Rendering Application component into html');
    var AppComponent = app.getAppComponent();
    React.withContext(context.getComponentContext(), function () {
      var html = React.renderToStaticMarkup(HtmlComponent({
        state: exposed,
        markup: React.renderToString(AppComponent())
      }));
      debug('sending markup');
      res.send(html);
    });
  });
});

module.exports = server;
