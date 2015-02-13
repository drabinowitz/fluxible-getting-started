'use strict';

var React = require('react');
var ThreadSection = require('./ThreadSection.jsx');
var PrimaryMessageSection = require('./PrimaryMessageSection.jsx');
var AppStore = require('../stores/AppStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

var App = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],
  statics: {
    storeListeners: [AppStore]
  },
  getInitialState: function () {
    return this.getStore(AppStore).getState();
  },
  onChange: function () {
    this.setState(this.getStore(AppStore).getState());
  },
  render: function () {
    return (
      /*jshint ignore:start */
      <div>
        <PrimaryMessageSection />
        <ThreadSection />
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = App;
