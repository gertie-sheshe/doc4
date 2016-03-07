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
    deleted: null,
    selected: null,
    updated: null,

    setUserDocs: function(userDocs) {
      this.userDocs = userDocs;
      this.emitChange('documents');
    },

    getUserDocs: function() {
      return this.userDocs;
    },

    setOwnerDocs: function(ownerDocs) {
      console.log('owner docs set', ownerDocs);
      this.ownerDocs = ownerDocs;
      this.emitChange('owner');
    },

    getOwnerDocs: function() {
      return this.ownerDocs;
    },

    deleteDoc: function(deleted) {
      this.deleted = deleted;
    },

    getDeleted: function() {
      if(this.deleted === 'Document has been deleted') {
        return this.deleted;
      } else {
        return null;
      }
    },
    createDocs: function(createDoc) {
      this.createDoc = createDoc;
    },
    setSelectedDoc: function(selected) {
      this.selected = selected;
      this.emitChange('doc');
      console.log(selected);
    },
    getSelectedDoc: function() {
      return this.selected;
    },

    setUpdatedDoc: function(updated) {
      console.log('Updated doc store', updated);
      this.updated = updated;
    },

    getUpdatedDoc: function() {
      return this.updated;
    }
  });

  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case DocConstants.GET_DOCS:
      DocumentStore.setUserDocs(action.data);
      break;
      case DocConstants.OWNER_DOCS:
      DocumentStore.setOwnerDocs(action.data);
      break;
      case DocConstants.CREATE_DOCS:
      DocumentStore.createDocs(action.data);
      break;
      case DocConstants.DELETE_DOC:
      DocumentStore.deleteDoc(action.data);
      break;
      case DocConstants.ONE_DOCS:
      DocumentStore.setSelectedDoc(action.data);
      break;
      case DocConstants.UPDATE_DOC:
      DocumentStore.setUpdatedDoc(action.data);
      break;
    default:
    }
    return true;
  });
  module.exports = DocumentStore;
})();
