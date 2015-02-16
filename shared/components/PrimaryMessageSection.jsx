'use strict';

var React = require('react');
var MessageStore = require('../stores/MessageStore');
var FluxibleMixin = require('fluxible').Mixin;

var PrimaryMessageSection = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [MessageStore]
  },
  getInitialState: function () {
    return {
      primaryMessage: this.getStore(MessageStore).getPrimary()
    };
  },
  onChange: function (store) {
    this.setState({
      primaryMessage: this.getStore(MessageStore).getPrimary()
    });
  },
  render: function () {
    /*jshint ignore:start*/
    var primaryMessage = this.state.primaryMessage;
    var primaryMessageEl;
    if (primaryMessage && this.props.currentRoute[0] === 'message') {
      primaryMessageEl = (
        <h1>{primaryMessage.text}</h1>
      );
    }
    return (
      <div>
        {primaryMessageEl}
      </div>
    );
    /*jshint ignore:end*/
  }
});

module.exports = PrimaryMessageSection;
