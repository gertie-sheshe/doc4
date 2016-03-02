(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants.js');
  var BaseActions = require('./BaseActions');

  module.exports = {
    login: function(user) {
      BaseActions.post('/api/users/login', user, DocConstants.USER_LOGIN);
    },
    signup: function(user) {
      BaseActions.post('/api/users', user, DocConstants.USER_SIGNUP);
    },
    decode: function(token) {
      console.log('decoding token');
      BaseActions.get('/api/users/decode', DocConstants.USER_DECODE, token);
    },
    userData: function(token) {
      console.log('Getting users');
      BaseActions.get('/api/users', DocConstants.USER_DATA, token);
    }
  };
})();
