(function() {
  'use strict';
  var docTypes = require('../controllers/doc-type');

  module.exports = function(app) {
    app.route('/api/types')
      .post(docTypes.session, docTypes.create)
      .get(docTypes.session, docTypes.find);
    app.route('/api/types/:type_id')
      .put(docTypes.session, docTypes.update)
      .delete(docTypes.session, docTypes.delete);
  };
})();
