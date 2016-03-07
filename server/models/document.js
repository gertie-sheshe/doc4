(function() {
  'use strict';
  // Require mongoose
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  require('./user');

  // Document Schema
  var documentSchema = new Schema({
    ownerId: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    accessType: {
      type: String,
      default: 'None'
    },
    accessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: false
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true
    },
    dateCreated: {
      type: Date,
      required: true
    },
    lastModified: {
      type: Date,
      required: true
    }
  });

  // Create model and export
  module.exports = mongoose.model('Document', documentSchema);
})();
