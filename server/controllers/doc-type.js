(function() {
  'use strict';
  var DocType = require('../models/doc-type');
  var Roles = require('../models/role');
  var jwt = require('jsonwebtoken');
  var secretKey = require('../../config/config').secret;
  var roles;

  module.exports = {
    create: function(req, res) {
      // Check User role to see if it is Admin
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          var doc = new DocType();
          doc.type = req.body.type;
          doc.save(function(err) {
            if (err)
              return res.status(409).send({
                'error': err.errmessage || err,
                'message': 'This Type already exists'
              });
            return res.status(200).json({
              'message': 'Type created'
            });
          });
        } else {
          return res.status(403).json({
            'message': 'You need to be an Admin'
          });
        }
      });
    },
    find: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          DocType.find(function(err, roles) {
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
    // Function to allow authenticated Users the respective rights.
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
        return res.status(401).send({message: 'You are not authenticated'});
      }
    },

    update: function(req, res) {
      Roles.findById(req.decoded._doc.roleId, function(err, role) {
        if (err)
          return res.status(500).send(err.errmessage || err);
        roles = role.title;
        if (roles === 'Admin') {
          DocType.findById(req.params.type_id, function(err, doc) {
            if (err) {
              return res.status(500).send(err.errmessage || err);
            } else {
              if (req.body.type) {
                doc.type = req.body.type;
              }
              doc.save(function(err) {
                if (err) {
                  return res.status(500).send(err.errmessage || err);
                } else {
                  return res.status(200).json({
                    'message': 'Type successfully updated',
                    'type': doc
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
            if (req.params.type_id) {
              Roles.remove({
                _id: req.params.type_id
              }, function(err) {
                if (err)
                  return res.status(500).send(err.errmessage || err);
                return res.status(200).json({
                  'message': 'Type deleted'
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
