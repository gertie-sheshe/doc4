(function() {
  'use strict';
  // Require dependencies
  var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 4040,
    mongoose = require('mongoose'),
    // favicon = require('express-favicon'),
    routes = require('./server/routes'),
    config = require('./config/config'),
    users = require('./server/routes/users'),
    path = require('path'),
    types = require('./server/routes/doc-type'),
    documents = require('./server/routes/document'),
    roles = require('./server/routes/role'),
    strategy = require('./config/local-strategy'),
    // Passport
    passport = require('passport'),
    session = require('express-session'),
    app = express();

  // Environment
  app.set('superSecret', config.secret);
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(cookieParser());
  // app.use(favicon(__dirname + '/public/images/favicon.png'));
  app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Auth
  strategy(app, passport);

  //Routes
  routes(app, passport);

  // Connect to the database
  mongoose.connect(config.db, function(err) {
    if (err) {
      console.log('Error connecting to the db');
    } else {
      console.log('DB connection successful');
    }
  });

  // Listen to port
  app.listen(port, function() {
    console.log('Listening on port: ' + port);
  });
  module.exports = app;
})();
