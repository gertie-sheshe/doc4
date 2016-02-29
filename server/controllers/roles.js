(function() {
  'use strict';
  var Roles = require('../models/role');
  var jwt = require('jsonwebtoken');
  var secretKey = require('../../config/config').secret;
  var roles, role1;
  module.exports = {
    create: function(req, res) {
      // Check the role of user in token Object.
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          role1 = new Roles();
          role1.title = req.body.title;
          role1.save(function(err) {
            if (err)
              return res.status(409).send({
                'error': err.errmessage || err,
                'message': 'You cannot create duplicate roles'
              });
            return res.status(200).json({
              'message': 'Role created'
            });
          });
        } else {
          return res.status(403).json({
            'message': 'You need to be an Admin'
          });
        }
      });
    },

    session: function(req, res, next) {
      var token = req.headers['x-access-token'];
      if(token) {
        jwt.verify(token, secretKey, function(err, decoded) {
          if (!err) {
            req.decoded = decoded;
            next();
          } else {
            return res.status(401).send({
              message: 'Failed to Authenticate'
            });
          }
        });
      } else {
        return res.status(401).send({message: 'You are not authenticated role'});
      }
    },

    find: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          Roles.find(function(err, roles) {
            if (err)
              return res.status(500).send(err.errmessage || err);
            return res.status(200).json(roles);
          });
        } else {
          return res.status(403).json({
            'message': 'You need to be an Admin to perform this'
          });
        }
      });
    },

    findOne: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          Roles.findById(req.params.role_id, function(err, roles) {
            if (err)
              return res.status(500).send(err.errmessage || err);
            return res.status(200).json(roles);
          });
        } else {
          return res.status(403).json({
            'message': 'You need to be an Admin to perform this.'
          });
        }
      });
    },

    update: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          Roles.findById(req.params.role_id, function(err, role) {
            if (err) {
              return res.status(500).sned(err.errmessage || err);
            } else {
              if (req.body.title) {
                role.title = req.body.title;
              }
              role.save(function(err, role) {
                if (err) {
                  return res.status(500).send(err.errmessage || err);
                } else {
                  return res.status(200).json({
                    'message': 'Role successfully updated',
                    'role': role
                  });
                }
              });
            }
          });
        } else {
          return res.status(403).json({
            'message': 'You must be an Admin to perform this action'
          });
        }
      });
    },

    delete: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, roles) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else {
          roles = roles.title;
          if (roles === 'Admin') {
            if (req.params.role_id) {
              Roles.remove({
                _id: req.params.role_id
              }, function(err) {
                if (err)
                  return res.status(500).send(err.errmessage || err);
                return res.status(200).json({
                  'message': 'Role deleted'
                });
              });
            }
          } else {
            return res.status(403).json({
              'message': 'You must be an Admin to perform this action'
            });
          }
        }
      });
    }
  };
})();
