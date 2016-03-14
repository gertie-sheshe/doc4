(function() {
  'use strict';
  var Document = require('../models/document'),
    Role = require('../models/role'),
    Type = require('../models/doc-type');
  var roles;
  var jwt = require('jsonwebtoken');
  var secretKey = require('../../config/config').secret;

  module.exports = {
    create: function(req, res) {
        var document = new Document();
        document.ownerId = req.decoded._doc._id;
        document.owner = req.decoded._doc.username;
        document.title = req.body.title;
        document.content = req.body.content;
        document.dateCreated = new Date();
        document.lastModified = Date.now();
        document.accessType = req.body.accessType || "None";


      // Get RoleId of the role assigned to the document
      Role.find({
        title: req.body.access || 'Viewer'
      }).exec(function(err, access) {
        if (err) {
          res.status(500).send(err.errormessage || err);
        } else {
          document.accessId = access[0]._id;

          // Get TypeId of the role assigned to the document
          Type.find({
            type: req.body.type || 'General'
          }).exec(function(err, type) {
            if (err)
              return res.status(500).send(err.errormessage || err);
            document.typeId = type[0]._id;
            document.save(function(err, document) {
              if (err)
                return res.status(409).send({
                  'error': err.errmessage || err,
                  'message': 'Document cannot be duplicate'
                });
              return res.status(200).json(document);
            });
          });
        }
      });
    },

    session: function(req, res, next) {
      var tokenOne = req.headers['x-access-token'];
      if(tokenOne) {
        jwt.verify(tokenOne, secretKey, function(err, decoded) {
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
        return res.status(401).send({message: 'You are not authenticated documents'});
      }
    },

    find: function(req, res) {
      // Users can only view documents available to their roles and are not private.
      if (req.query.from) {
        Document.find({
          accessType: 'None',
          accessId: req.decoded._doc.roleId,
          dateCreated: {
            $gte: new Date(req.query.from),
            $lt: new Date(req.query.to)
          }
        }, function(err, documents) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else if (documents.length < 1) {
            res.status(404).json({
              'message': 'No documents found'
            });
          } else {
            res.status(200).json(documents);
          }
        });
      } else if (req.query.title) {
        Document.find({
          accessType: 'None',
          accessId: req.decoded._doc.roleId,
          title: req.query.title
        }, function(err, documents) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else if (documents.length < 1) {
            res.status(404).json({
              'message': 'No documents found'
            });
          } else {
            res.status(200).json(documents);
          }
        });
      } else if (req.query.role) {
        Role.find({
          title: req.query.role
        }).exec(function(err, role) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else {
            if (role[0]._id != req.decoded._doc.roleId) {
              return res.status(401).json({
                'message': 'Sorry, you are not allowed to view documents with this role'
              });
            } else {
              Document.find({
                accessType: 'None',
                accessId: role[0]._id,
              }, function(err, documents) {
                if (err) {
                  return res.status(500).send(err.errmessage || err);
                } else if (documents.length < 1) {
                  res.status(404).json({
                    'message': 'No documents found'
                  });
                } else {
                  res.status(200).json(documents);
                }
              });
            }
          }
        });
      } else {
        Document.find({
          accessType: 'None',
          accessId: req.decoded._doc.roleId
        }).limit(req.query.limit).sort({
          dateCreated: -1
        }).exec(function(err, document) {
          if (err) {
            return res.status(500).send(err.errmessage || err);
          } else {
            return res.status(200).json(document);
          }
        });
      }
    },

    findADoc: function(req, res) {
      Document.find({
        _id: req.params.document_id
      }).exec(function(err, documents) {
        return res.status(200).json(documents);
        // console.log('Ndio hapa', documents);
        // if (documents === undefined) {
        //    return res.status(404).json({
        //      'message' : 'No documents are available'
        //    });
        //  } else {
        //    if (documents[0].id !== req.decoded._doc.roleId) {
        //      Document.find({
        //        _id : req.params.document_id,
        //        accessId: req.decoded._doc.roleId,
        //        accessType: 'None'
        //      }).exec(function(err, docs) {
        //        if (docs.length < 1) {
        //          return res.status(200).json({
        //            'message': 'This document does not exist or you are  not allowed to view it'
        //          });
        //        }
        //        if (err) {
        //          return res.status(500).send(err.errmessage || err);
        //        } else {
        //          return res.status(200).json(docs);
        //        }
        //      });
        //    }
        //  }
      });
    },

    findByRole: function(req, res) {
      Document.find({
        accessId: req.params.access_id,
        accessType: 'None'
      }, function(err, doc) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else if (doc && doc.length) {
          return res.status(200).json(doc);
        } else {
          return res.status(404).json({
            'message': 'No documents found'
          });
        }
      });
    },

    delete: function(req, res) {
      Document.findById(req.params.document_id, function(err, doc) {
        if (err) {
          return res.status(500).send(err.message || err);
        } else {
          // Documents can only be deleted by Admin or Owner
          Role.findById(req.decoded._doc.roleId, function(err, role) {
            if (err)
              return res.status(500).send(err.errmessage || err);
            roles = role.title;
            if (roles === 'Admin' || doc.ownerId === req.decoded._doc._id) {
              Document.remove({
                _id: req.params.document_id
              }, function(err) {
                if (err)
                  return res.status(500).send(err.errmessage || err);
                return res.status(200).json({
                  'message': 'Document has been deleted'
                });
              });
            } else {
              return res.status(403).json({
                'message': 'You need to be Owner or Admin to delete this Document'
              });
            }
          });
        }
      });
    },

    update: function(req, res) {
      Document.findById(req.params.document_id, function(err, doc) {
        if (err) {
          return res.status(500).send(err.errmessage || err);
        } else {
          // Users can only edit documents available to their role or they are the owner

            if (req.body.title) {
              doc.title = req.body.title;
            }
            if (req.body.content) {
              doc.content = req.body.content;
            }
            doc.save(function(err) {
              if (err) {
                return res.status(500).send(err.errmessage || err);
              } else {
                return res.status(200).json(doc);
              }
            });

        }
      });
    }
  };
})();
