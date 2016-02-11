(function() {
 'use strict';
 // Require mongoose
 var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 module.exports = mongoose.model('Type', new Schema({
  type: {
   type: String,
   unique: true,
   default: 'General'
  }
 }));
})();
