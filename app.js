(function() {
  'use strict';
  // Require dependencies
  var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT || 4040,
    mongoose = require('mongoose'),
    config = require('./config/config'),
    users = require('./server/routes/users'),
    types = require('./server/routes/doc-type'),
    documents = require('./server/routes/document'),
    roles = require('./server/routes/role'),
    Strategy = require('./config/local-strategy'),

    // Passport
    passport = require('passport'),
    session = require('express-session'),
    app = express();

  // Environment
  app.set('superSecret', config.secret);
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan('combined'));
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  Strategy(app, passport);
  users(app, passport);
  types(app);
  roles(app);
  documents(app);


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
