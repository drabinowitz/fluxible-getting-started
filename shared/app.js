'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
  appComponent: React.createFactory(require('./components/Routes.jsx'))
});

app.plug(fetchrPlugin({
  xhrPath: '/api'
}));

app.registerStore(require('./stores/AppStore'));
app.registerStore(require('./stores/MessageStore'));
app.registerStore(require('./stores/ThreadStore'));

module.exports = app;
