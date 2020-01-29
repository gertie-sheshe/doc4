(function() {
  'use strict';
  module.exports = function(app, passport) {
    require('./users')(app);
    require('./role')(app);
    require('./document')(app);
    require('./doc-type')(app);
    app.get('*', function(req, res) {
      res.sendFile('index.html', {
        root: './public/',
      });
    });
  };
})();
