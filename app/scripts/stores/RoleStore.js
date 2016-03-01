(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var DocConstants = require('../constants/DocConstants');
  var assign = require('object-assign');
  var BaseStore = require('./BaseStore');


var RoleStore = assign({}, BaseStore, {
  userRole: null,

  setRole: function(userRole) {
    this.userRole = userRole;
    this.emitChange('role');
  },

  getRole: function() {
  console.log('HUKU NI NULL?', this.userRole);
  },
});
  AppDispatcher.register(function(action) {
    switch(action.actionType) {
      case DocConstants.GET_ROLE:
        RoleStore.setRole(action.data);
        break;
      default:
    }
    return true;
  });
  module.exports = RoleStore;
})();
