'use strict';

var MessageStore = require('../stores/MessageStore');
var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var createMessage = require('../actions/createMessage');
var NavLink = require('flux-router-component').NavLink;

function createMessageListItem (message) {
  return (
    /*jshint ignore:start */
    <li key={message.id}>
      <NavLink href={'/message/' + message.id}>{message.text}</NavLink>
    </li>
    /*jshint ignore:end */
  );
}

var MessageSection = React.createClass({
  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [MessageStore]
  },
  getInitialState: function () {
    return {
      messages: this.getStore(MessageStore).getAllForThreadId(this.props.threadId)
    };
  },
  onChange: function (messageStore, newProps) {
    var threadId;
    if (newProps) {
      threadId = newProps.threadId;
    } else {
      threadId = this.props.threadId;
    }
    this.setState({
      messages: this.getStore(MessageStore).getAllForThreadId(threadId)
    });
  },
  componentWillReceiveProps: function (newProps) {
    this.onChange(null, newProps);
  },
  handleSubmit: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var messageText = this.refs.messageInput.getDOMNode().value.trim();
    if (messageText) {
      this.executeAction(createMessage, {
        text: messageText
      });
    }
  },
  render: function () {
    /*jshint ignore:start */
    var messageListItems = Object.keys(this.state.messages).map(function (messageId) {
      return createMessageListItem(this.state.messages[messageId]);
    }.bind(this));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input ref="messageInput" placeholder="New Message" />
        </form>
        {messageListItems}
      </div>
    );
    /*jshint ignore:end */
  }
});

module.exports = MessageSection;
