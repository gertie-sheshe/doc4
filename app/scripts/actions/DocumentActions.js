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
    },
    createDocument: function(doc, token) {
      BaseActions.post('/api/documents', doc, DocConstants.CREATE_DOCS, token);
    },
    deleteDocument: function(id, token) {
      BaseActions.delete('/api/documents/' + id, DocConstants.DELETE_DOC, token);
    },
    setDoc: function(id, token) {
      BaseActions.get('/api/documents/' + id, DocConstants.ONE_DOCS, token);
    },
    updateDoc: function(id, doc, token) {
      BaseActions.put('/api/documents/' + id, doc, DocConstants.UPDATE_DOC, token);
    }
  };
})();
