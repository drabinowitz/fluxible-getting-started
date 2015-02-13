var _threads = [
  {
    id: 0,
    title: 'awesome thread'
  },
  {
    id: 1,
    title: 'less awesome thread'
  }
];

module.exports = {
  name: 'thread',
  read: function (req, res, params, config, callback) {
    setTimeout(function () {
      callback(null, _threads);
    }, 10);
  },
  create: function (req, res, params, body, config, callback) {
    setTimeout(function () {
      _threads.push({
        id: params.id,
        title: params.title
      });
      callback(null, _threads);
    }, 10);
  }
};
