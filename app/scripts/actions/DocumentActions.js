(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants');
  var BaseActions = require('./BaseActions');

  module.exports = {
    userDocuments: function(token) {
      BaseActions.get('/api/documents', DocConstants.GET_DOCS, token);
    },
    ownerDocuments: function(token, id) {
      BaseActions.get('/api/users/' + id +'/documents', DocConstants.OWNER_DOCS, token);
    }
  };
})();
