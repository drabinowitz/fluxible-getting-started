'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
  appComponent: React.createFactory(require('./components/App.jsx'))
});

app.plug(fetchrPlugin({
  xhrPath: '/api'
}));

app.plug(routrPlugin({
  routes: require('./configs/routes')
}));

app.registerStore(require('./stores/AppStore'));
app.registerStore(require('./stores/MessageStore'));
app.registerStore(require('./stores/ThreadStore'));

module.exports = app;
