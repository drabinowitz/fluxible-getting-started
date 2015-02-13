var _messages = [
  {
    id: 0,
    text: 'some text',
    threadId: 0
  },
  {
    id: 1,
    text: 'some other text',
    threadId: 0
  },
  {
    id: 2,
    text: 'more text',
    threadId: 1
  },
  {
    id: 3,
    text: 'lotsa text',
    threadId: 1
  },
  {
    id: 4,
    text: 'look at all this text',
    threadId: 1
  }
];

module.exports = {
  name: 'message',
  read: function (req, res, params, config, callback) {
    setTimeout(function () {
      callback(null, _messages);
    }, 10);
  },
  create: function (req, res, params, body, config, callback) {
    setTimeout(function () {
      _messages.push({
        id: params.id,
        text: params.text,
        threadId: params.threadId
      });
      callback(null, _messages);
    }, 10);
  }
};
