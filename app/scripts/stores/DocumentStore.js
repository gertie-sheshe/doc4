(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocConstants = require('../constants/DocConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');

  var DocumentStore = assign({}, BaseStore, {
    userDocs: null,
    ownerDocs: null,
    createdDoc: null,

    setUserDocs: function(userDocs) {
      this.userDocs = userDocs;
      this.emitChange('documents');
    },

    getUserDocs: function() {
      return this.userDocs;
    },

    setOwnerDocs: function(ownerDocs) {
      this.ownerDocs = ownerDocs;
      this.emitChange('owner');
    },

    getOwnerDocs: function() {
      return this.ownerDocs;
    },

    createDoc: function(createDoc) {
      this.createDoc = createDoc;
    }
  });

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case DocConstants.GET_DOCS:
      DocumentStore.setUserDocs(action.data);
      break;
      case DocConstants.OWNER_DOCS:
      console.log('HUKU KWA DOCUMENT STORE', action.data);
      DocumentStore.setOwnerDocs(action.data);
      break;
      case DocConstants.CREATE_DOCS:
      DocumentStore.createDoc(action.data);
      break;
    default:
    }
    return true;
  });
  module.exports = DocumentStore;
})();
