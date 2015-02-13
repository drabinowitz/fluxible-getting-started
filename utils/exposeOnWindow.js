var serialize = require('serialize-javascript');
module.exports = function (keyOnWindow, data) {
  return 'window.' + keyOnWindow + '=' + serialize(data) + ';';
};
