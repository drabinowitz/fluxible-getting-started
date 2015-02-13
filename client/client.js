'use strict';

var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('../shared/app');
var dehydratedState = window.App;

debug.enable('*');

bootstrapDebug('rehydrating app');

app.rehydrate(dehydratedState, function (err, context) {
  if (err) throw err;
  window.context = context;
  var mountNode = window.document.getElementById('app');

  bootstrapDebug('React Rendering');

  React.withContext(context.getComponentContext(), function () {
    React.render(app.getAppComponent()(), mountNode, function () {
      bootstrapDebug('React Rendered');
    });
  });
});
