(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocConstants = require('../constants/DocConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

var UserStore = assign({}, BaseStore, {
  loginData: null,
  signUpData: null,
  decodedData: null,
  usersData: null,
  updatedData: null,
  userData: null,

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
  },

  setUserData: function(usersData) {
    this.usersData = usersData;
    this.emitChange('users');
  },

  getUserData: function() {
    return this.userData;
  },

  setUpdatedData: function(updatedData) {
    this.updatedData = updatedData;
    this.emitChange('update');
  },

  getUpdatedData: function() {
    return this.updatedData;
  },

  setUser: function(userData) {
    this.userData = userData;
    this.emitChange('user');
  },

  getUser: function() {
    return this.userData;
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
        UserStore.setDecodedData(action.data);
        break;
      case DocConstants.USER_UPDATE:
        UserStore.setUpdatedData(action.data);
        break;
      case DocConstants.GET_USER:
        UserStore.setUser(action.data);
        break;
      default:
    }
    return true;
  });
  module.exports = UserStore;
})();
