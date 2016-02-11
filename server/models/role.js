(function() {
  'use strict';
  // Require Mongoose
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  // Role schema
  var roleSchema = new Schema({
    title: {
      type: String,
      required: true,
      unique: true,
      default: 'Viewer'
    }
  });

  // Create model and export
  module.exports = mongoose.model('Role', roleSchema);
})();
