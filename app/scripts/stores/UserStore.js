(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocConstants = require('../constants/DocConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

console.log('BASE',BaseStore);
var UserStore = assign({}, BaseStore, {
  loginData: null,
  signUpData: null,
  decodedData: null,

  setLoginData: function(loginData) {
    this.loginData = loginData;
    this.emitChange('login');
  },

  getLoginData: function() {
    return this.loginData;
  },

  setSignUpData: function(signUpData) {
    this.signUpData = signUpData;
    this.emitChange('signup');
  },

  getSignUpData: function() {
    return this.signUpData;
  },

  setDecodedData: function(decodedData) {
    this.decodedData = decodedData;
    this.emitChange('decode');
  },

  getDecodedData: function() {
    return this.decodedData;
  }
});
  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case DocConstants.USER_LOGIN:
        UserStore.setLoginData(action.data);
        break;
      case DocConstants.USER_SIGNUP:
        UserStore.setSignUpData(action.data);
        break;
      case DocConstants.USER_DECODE:
      console.log('USER STORE', action.data);
        UserStore.setDecodedData(action.data);
        break;
      default:
    }
    return true;
  });
  module.exports = UserStore;
})();
