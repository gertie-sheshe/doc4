(function() {
  'use strict';
  var Documents = require('../controllers/documents.js');
  var User = require('../controllers/users.js');

  module.exports = function(app) {
    app.use(Documents.session);
    app.post('/api/documents', Documents.create);
    app.get('/api/documents', Documents.find);
    app.get('/api/users/:user_id/documents', User.getDocs);
    app.route('/api/documents/:document_id')
      .put(Documents.update)
      .get(Documents.findADoc)
      .delete(Documents.delete);
  };
})();
