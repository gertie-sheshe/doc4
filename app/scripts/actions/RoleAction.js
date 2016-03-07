(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants');
  var BaseActions = require('./BaseActions');

  module.exports = {
    getUserRole: function(token) {
      BaseActions.get('/api/role', DocConstants.GET_ROLE, token);
    }
  };
})();
