'use strict';

var React = require('react');
var ThreadStore = require('../stores/ThreadStore');
var FluxibleMixin = require('fluxible').Mixin;
var createThread = require('../actions/createThread');
var NavLink = require('flux-router-component').NavLink;
var MessageSection = require('./MessageSection.jsx');

function createThreadListItem (thread) {
  return (
    /*jshint ignore:start */
    <li key={thread.id}>
      <NavLink href={'/thread/' + thread.id}>{thread.title}</NavLink>
    </li>
    /*jshint ignore:end */
  );
}

var ThreadSection = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [ThreadStore]
  },
  getInitialState: function () {
    return {
      threads: this.getStore(ThreadStore).getAll(),
      primaryThread: this.getStore(ThreadStore).getPrimary()
    };
  },
  onChange: function () {
    this.setState({
      threads: this.getStore(ThreadStore).getAll(),
      primaryThread: this.getStore(ThreadStore).getPrimary()
    });
  },
  handleSubmit: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var threadTitle = this.refs.threadInput.getDOMNode().value.trim();
    if (threadTitle) {
      this.executeAction(createThread, {
        title: threadTitle
      });
    }
  },
  render: function () {
    /*jshint ignore:start */
    var threadListItems = Object.keys(this.state.threads).map(function (threadId) {
      return createThreadListItem(this.state.threads[threadId]);
    }.bind(this));
    var primaryThread = this.state.primaryThread;
    var MessageSectionEl
    if (primaryThread && this.props.currentRoute[0] === 'thread') {
      MessageSectionEl = (
        <MessageSection threadId={primaryThread.id} />
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="threadInput" placeholder="New Thread" />
        </form>
        {threadListItems}
        {MessageSectionEl}
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = ThreadSection;
