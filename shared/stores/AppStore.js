'use strict';

var createStore = require('fluxible/utils/createStore');

var AppStore = createStore({
  storeName: 'AppStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS' : 'handleNavigate'
  },
  initialize: function (dispatcher) {
    this.currentRoute = null;
  },
  handleNavigate: function (route) {
    this.currentRoute = route;
    this.emitChange();
  },
  getState: function () {
    return {
      route: this.currentRoute
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.currentRoute = state.route;
  }
});

module.exports = AppStore;
