(function() {
  'use strict';
  var Documents = require('../controllers/documents.js');
  var User = require('../controllers/users.js');

  module.exports = function(app) {
    app.post('/api/documents', Documents.session, Documents.create);
    app.get('/api/documents', Documents.session, Documents.find);
    app.route('/api/documents/:document_id')
      .put(Documents.session, Documents.update)
      .get(Documents.session, Documents.findADoc)
      .delete(Documents.session, Documents.delete);
  };
})();
