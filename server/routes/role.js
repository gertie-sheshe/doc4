(function() {
  'use strict';
  var Roles = require('../controllers/roles');

  module.exports = function(app) {
    app.use(Roles.session);
    app.route('/api/roles')
      .post(Roles.create)
      .get(Roles.find);

    app.route('/api/roles/:role_id')
      .get(Roles.findOne)
      .put(Roles.update)
      .delete(Roles.delete);
  };
})();
