(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants.js');
  var BaseActions = require('./BaseActions');

  module.exports = {
    login: function(user) {
      BaseActions.post('/api/users/login', user, DocConstants.USER_LOGIN);
    }
  };
})();
