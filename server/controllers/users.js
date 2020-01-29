(function() {
  'use strict';
  var User = require('../models/user');
  var Documents = require('../models/document');
  var Roles = require('../models/role');
  var passport = require('passport');
  var jwt = require('jsonwebtoken');
  var secretKey = require('../../config/config').secret;
  var roles;

  module.exports = {
    createUser: function(req, res, next) {
      passport.authenticate('signup', function(err, user) {
        if (err) return res.status(500).send(err.errmessage || err);
        if (!user) {
          return res.status(401).json({
            error: 'Sign up failed. This Email or Username is already in use',
          });
        }
        if (user) {
          var token = jwt.sign(user, req.app.get('superSecret'), {
            expireIn: '24h',
          });
          user.token = token;
          return res.status(200).json(user);
        }
      })(req, res, next);
    },

    decode: function(req, res) {
      User.findById(req.decoded._doc._id).then(function(user) {
        if (user && user.loggedIn) {
          user.password = null;
          return res.send(user);
        } else {
          return res.status(401).send({
            error: 'Not authenticated',
          });
        }
      });
    },

    session: function(req, res, next) {
      var token = req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
          if (!err) {
            req.decoded = decoded;
            req.token = token;
            // // Check if loggedIn has been set to true
            User.findOne({ _id: req.decoded._doc._id }, function(err, user) {
              if (err) {
                return res.status(401).send(err.errmessage || err);
              } else {
                if (user && user.loggedIn) {
                  next();
                } else {
                  return res.status(401).json({
                    error: 'Failed to Authenticate. You are not logged in.',
                  });
                }
              }
            });
          } else {
            return res.status(401).send({
              error: 'Failed to Authenticate',
            });
          }
        });
      } else {
        return res
          .status(401)
          .send({ error: 'You are not authenticated user' });
      }
    },

    login: function(req, res, next) {
      passport.authenticate('login', function(err, user) {
        if (err) return res.status(500).send(err.errmessage || err);
        if (!user) {
          return res.status(409).json({
            error: 'Sorry. Wrong username and password combination',
          });
        }
        if (user) {
          var token = jwt.sign(user, req.app.get('superSecret'), {
            expireIn: '24h',
          });
          user.token = token;
          return res.status(200).json(user);
        }
      })(req, res, next);
    },

    logout: function(req, res) {
      User.findOneAndUpdate(
        {
          _id: req.decoded._doc._id,
        },
        {
          $set: {
            loggedIn: false,
          },
        },
        {
          new: true,
        },
        function(err, result) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else {
            return res.status(200).json({
              message: 'You have logged out successfully',
            });
          }
        },
      );
    },

    find: function(req, res) {
      User.find(function(err, users) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else {
          return res.status(200).json(users);
        }
      });
    },

    getDocs: function(req, res) {
      // Get all the documents that belong to the user
      if (req.params.user_id === req.decoded._doc._id) {
        Documents.find({
          ownerId: req.params.user_id,
        })
          .sort({
            dateCreated: -1,
          })
          .exec(function(err, docs) {
            if (err) {
              return res.status(500).send(err.errmessage || err);
            } else if (docs && docs.length) {
              return res.status(200).json(docs);
            } else {
              return res.status(404).json({
                message: 'No documents found',
              });
            }
          });
      } else {
        Documents.find({
          ownerId: req.params.user_id,
          accessType: 'None',
          accessId: req.decoded._doc.roleId,
        })
          .sort({
            dateCreated: -1,
          })
          .exec(function(err, document) {
            if (err) {
              return res.status(500).send(err.errmessage || err);
            } else if (document.length < 1) {
              return res.status(404).json({
                message: 'Document not found',
              });
            } else {
              return res.status(200).json(document);
            }
          });
      }
    },

    findOne: function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else {
          return res.status(200).json(user);
        }
      });
    },

    update: function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (req.decoded._doc._id === req.params.user_id) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else {
            if (req.body.firstname) {
              user.name.first = req.body.firstname;
            }
            if (req.body.lastname) {
              user.name.last = req.body.lastname;
            }
            if (req.body.username) {
              user.username = req.body.username;
            }
            if (req.body.email) {
              user.email = req.body.email;
            }
            user.save(function(err) {
              if (err) {
                return res.status(500).send(err.errmessage || err);
              } else {
                return res.status(200).json(user);
              }
            });
          }
        } else {
          return res.status(403).json({
            message: 'Sorry. Only the Owner can update the profile',
          });
        }
      });
    },

    delete: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err) return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          if (req.params.user_id) {
            User.remove(
              {
                _id: req.params.user_id,
              },
              function(err) {
                if (err) return res.status(500).send(err.errmessage || err);
                return res.status(200).json({
                  message: 'User deleted successfully',
                });
              },
            );
          }
        } else {
          return res.status(403).json({
            message: 'You need to be an Admin to perform this action',
          });
        }
      });
    },

    loggedOut: function(req, res) {
      return res.status(200).json({
        message: 'You have logged out successfully',
      });
    },
  };
})();
