'use strict';

var createStore = require('fluxible/utils/createStore');

var AppStore = createStore({
  storeName: 'AppStore',
  handlers: {
    'DISPLAY_ROUTE' : 'displayRoute'
  },
  initialize: function (dispatcher) {
    this.currentRoute = null;
  },
  displayRoute: function (routeToDisplay) {
    this.currentRoute = routeToDisplay;
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
