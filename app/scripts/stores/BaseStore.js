(function() {
  'use strict';
  var EventEmitter = require('events').EventEmitter;
  var assign = require('object-assign');

  var BaseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
      this.on('change', callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener('change', callback);
    },

    emitChange: function() {
      this.emit('change');
    }
  });
})();
