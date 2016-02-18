(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocConstants = require('../constants/DocConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

var UserStore = assign({}, BaseStore, {

  loginData: null,

  setLoginData: function(loginData) {
    this.loginData = loginData;
    this.emitChange();
  }
});
  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case DocConstants.USER_LOGIN:
        UserStore.setLoginData(action.data);
        break;
      default:
    }
    return true;
  });
  module.exports = UserStore;
})();
