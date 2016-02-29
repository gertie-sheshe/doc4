(function() {
  'use strict';
  var Roles = require('../controllers/roles');

  module.exports = function(app) {
    app.route('/api/roles')
      .post(Roles.session, Roles.create)
      .get(Roles.session, Roles.find);

    app.route('/api/roles/:role_id')
      .get(Roles.session, Roles.findOne)
      .put(Roles.session, Roles.update)
      .delete(Roles.session, Roles.delete);
  };
})();
