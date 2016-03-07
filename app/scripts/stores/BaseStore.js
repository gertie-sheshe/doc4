(function() {
  'use strict';
  var EventEmitter = require('events').EventEmitter;
  var assign = require('object-assign');

  var BaseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback, event) {
      if (event) {
        this.on(event, callback);
      } else {
        this.on('change', callback);
      }
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    },

    emitChange: function(event) {
      if (event) {
        this.emit(event);
      } else {
        this.emit('change');
      }
    }
  });

  module.exports = BaseStore;
})();
