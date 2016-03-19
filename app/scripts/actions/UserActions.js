(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants.js');
  var BaseActions = require('./BaseActions');

  module.exports = {
    login: function(user) {
      BaseActions.post('/api/users/login', user, DocConstants.USER_LOGIN);
    },
    signup: function(user) {
      console.log('User sign up');
      BaseActions.post('/api/users', user, DocConstants.USER_SIGNUP);
    },
    decode: function(token) {
      BaseActions.get('/api/users/decode', DocConstants.USER_DECODE, token);
    },
    update: function(token, id, user) {
      console.log('uPDATING');
      BaseActions.put('/api/users/' + id, user, DocConstants.USER_UPDATE, token);
    },
    userData: function(token) {
      BaseActions.get('/api/users', DocConstants.USER_DATA, token);
    },
    getUser: function(token, id) {
      BaseActions.get('/api/users/' + id, DocConstants.GET_USER, token);
    }
  };
})();
