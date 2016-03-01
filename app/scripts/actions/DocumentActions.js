(function() {
  'use strict';
  var DocConstants = require('../constants/DocConstants');
  var BaseActions = require('./BaseActions');

  module.exports = {
    userDocuments: function(token) {
      console.log('TUKO ACTION YA DOCUMENT');
      BaseActions.get('/api/documents', DocConstants.GET_DOCS, token);
    },
    ownerDocuments: function(token, id) {
      console.log('KWA DOCUMENT ACTION OWNER DOC', id);
      BaseActions.get('/api/users/' + id +'/documents', DocConstants.OWNER_DOCS, token);
    },
    createDocument: function(doc, token) {
      BaseActions.post('/api/documents', doc, DocConstants.CREATE_DOCS, token);
    },

    deleteDocument: function(id, token) {
      console.log('TUKooo', token);
      BaseActions.delete('/api/documents/' + id, DocConstants.DELETE_DOC, token);
    }
  };
})();
