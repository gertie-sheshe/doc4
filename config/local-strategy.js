var passport = require('passport'),
  User = require('../server/models/user'),
  bcrypt = require('bcrypt-nodejs'),
  Users = require('../server/controllers/users'),
  Roles = require('../server/models/role'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'username',
    passReqToCallback: true
  }, function createUser(req, email, username, done) {
    process.nextTick(function() {
      // Checking if email is in use
      User.findOne({
        $or: [{
          'email': email
        }, {
          'username': username
        }]
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        } else {
          //Create user if email is not in use
          var newUser = new User();
          newUser.name.first = req.body.firstname;
          newUser.name.last = req.body.lastname;
          newUser.username = req.body.username;
          newUser.email = req.body.email;
          newUser.loggedIn = false;
          newUser.password = newUser.generateHash(req.body.password);
          Roles.find({
            title: req.body.role || 'Viewer'
          }).exec(function(err, role) {
            if (err)
              console.log(err);
            newUser.roleId = role[0]._id;
            // Save the user
            newUser.save(function(err, user) {
              if (err) {
                console.log('Error Inserting New Data');
                if (err.name == 'ValidationError') {
                  for (field in err.errors) {
                    console.log(err.errors[field].message);
                  }
                }
              }
              user.password = null;
              return done(null, newUser);
            });
          });
        }
      });
    });
  }));

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.findOne({
      'username': username
    }, function(err, user) {
      if (err) {
        // In case of any error
        return done(err);
      }
      if (!user) {
        // If user with that username is not found
        console.log('User not found with username ' + username);
        return done(null, false);
      }
      // If user exists but wrong password
      if (!validPassword(user, password)) {
        return done(null, false);
      }
      // Success
      User.findOneAndUpdate({
        username: user.username
      }, {
        $set: {
          loggedIn: true
        }
      }, {
        new: true
      }, function(err, result) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else {
          result.password = null;
          return done(null, result);
        }
      });
    });
  }));

  var validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
  };
};
