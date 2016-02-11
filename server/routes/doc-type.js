(function() {
  'use strict';
  var docTypes = require('../controllers/doc-type');

  module.exports = function(app) {
    app.use(docTypes.session);
    app.route('/api/types')
      .post(docTypes.create)
      .get(docTypes.find);
    app.route('/api/types/:type_id')
      .put(docTypes.update)
      .delete(docTypes.delete);
  };
})();
