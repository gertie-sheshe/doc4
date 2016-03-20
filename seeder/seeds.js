(function() {
  'use strict';
  var config = require('../config/config'),
    Users = require('../server/models/user'),
    Roles = require('../server/models/role'),
    supertest = require('supertest'),
    server = supertest.agent('http://localhost:4040'),
    async = require('async'),
    Types = require('../server/models/doc-type'),
    Documents = require('../server/models/document'),
    app = require('../app.js');


  function roleSeed(next) {
    var roles = [{
      title: 'Viewer'
    }, {
      title: 'Admin'
    }, {
      title: 'Staff'
    }];
    Roles.create(roles, function(err, role) {
      next(err, role);
    });
  }

  function typeSeed(next) {
    var types = [{
      type: 'General'
    }, {
      type: 'Business'
    }, {
      type: 'Education'
    }, {
      type: 'Personal'
    }];

    Types.create(types, function(err, type) {
      next(err, type);
    });
  }

  function userSeed(roles, done) {
    var one, two, three;
    async.waterfall([
      function(callback) {
        server
          .post('/api/users')
          .send({
            username: 'Sheshe',
            firstname: 'Gertrude',
            lastname: 'Nyenyeshi',
            email: 'gertienyesh@gmail.com',
            password: 'gertrudenyenyeshi',
            role: roles[1].title
          })
          .expect("Content-type", /json/)
          .end(function(err, res) {
            one = res.body;
            callback(null, one);
          });
      },
      function(one, callback) {
        server
          .post('/api/users')
          .send({
            username: 'Kachuna',
            firstname: 'Anita',
            lastname: 'Mrunde',
            email: 'anita@gmail.com',
            password: 'anitamrunde',
            role: roles[0].title
          })
          .expect("Content-type", /json/)
          .end(function(err, res) {
            two = res.body;
            callback(null, two, one);
          });
      },
      function(one, two, callback) {
        server
          .post('/api/users')
          .send({
            username: 'Kidoti',
            firstname: 'Cynthia',
            lastname: 'Asingwa',
            email: 'asingwa@gmail.com',
            password: 'cynthiaasingwa',
            role: roles[2].title
          })
          .expect("Content-type", /json/)
          .end(function(err, res) {
            three = res.body;
            callback(null, one, two, three);
          });
      }
    ], function(err, one, two, three) {
      done({
        one: one,
        two: two,
        three: three
      });
    });
  }

  function documentSeed(user, role, type, next) {
    var date = new Date();
    var documents = [{
      title: 'One',
      content: 'Tony Stark',
      ownerId: user.one._id,
      owner: 'Kidoti',
      accessType: 'None',
      typeId: type[0]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(2),
      accessId: role[0]._id
    }, {
      title: 'Two',
      content: 'Clark Kent',
      ownerId: user.one._id,
      owner: 'Kidoti',
      accessType: 'Private',
      typeId: type[0]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(3),
      accessId: role[0]._id
    }, {
      title: 'Three',
      content: 'Winker Watson',
      ownerId: user.one._id,
      owner: 'Kidoti',
      accessType: 'None',
      typeId: type[0]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(4),
      accessId: role[1]._id
    }, {
      title: 'Four',
      content: 'Magnus Bane',
      ownerId: user.two._id,
      owner: 'Sheshe',
      accessType: 'None',
      typeId: type[0]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(5),
      accessId: role[0]._id
    }, {
      title: 'Five',
      content: 'Christian Bale',
      ownerId: user.two._id,
      owner: 'Sheshe',
      accessType: 'Private',
      typeId: type[1]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(6),
      accessId: role[1]._id
    }, {
      title: 'Dennis the Menace',
      content: 'Mischievous Dennis Mitchell makes ' +
      'the life of neighbor George Wilson miserable with ' +
      'his overactive energy and inadvertent troublemaking. ' +
      'Because his parents must leave town for work and cannot ' +
      'find a baby sitter for Dennis, they ask George and his wife, ' +
      ' Martha (Joan Plowright), to take care of him. But when burglar ' +
      'Switchblade Sam (Christopher Lloyd) breaks in to steal George\'s gold ' +
      'coin collection, he takes Dennis as a hostage, and crusty George must save the boy.',
      ownerId: user.two._id,
      owner: 'Sheshe',
      accessType: 'None',
      typeId: type[2]._id,
      lastModified: Date.now(),
      dateCreated: new Date(),
      accessId: role[2]._id
    }, {
      title: 'Seven',
      content: 'Gandalf the White',
      ownerId: user.three._id,
      owner: 'Kachuna',
      accessType: 'Private',
      typeId: type[2]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(8),
      accessId: role[2]._id
    }, {
      title: 'Eight',
      content: '221B Baker Street',
      ownerId: user.three._id,
      owner: 'Kachuna',
      accessType: 'None',
      typeId: type[2]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(9),
      accessId: role[2]._id
    }, {
      title: 'Nine',
      content: 'Gniper and Gnasher',
      ownerId: user.three._id,
      owner: 'Kachuna',
      accessType: 'None',
      typeId: type[3]._id,
      lastModified: Date.now(),
      dateCreated: date.setDate(10),
      accessId: role[0]._id
    },
    {
     title: 'Ein',
     content: 'Christian Balerina',
     ownerId: user.two._id,
     owner: 'Sheshe',
     accessType: 'Private',
     typeId: type[1]._id,
     lastModified: Date.now(),
     dateCreated: date.setDate(6),
     accessId: role[1]._id
   },
   {
    title: 'Zwei',
    content: 'Dead pool',
    ownerId: user.two._id,
    owner: 'Sheshe',
    accessType: 'Private',
    typeId: type[1]._id,
    lastModified: Date.now(),
    dateCreated: date.setDate(6),
    accessId: role[1]._id
  },
  {
   title: 'Drei',
   content: 'Bad Minton',
   ownerId: user.two._id,
   owner: 'Sheshe',
   accessType: 'Private',
   typeId: type[1]._id,
   lastModified: Date.now(),
   dateCreated: date.setDate(6),
   accessId: role[1]._id
 },
 {
  title: 'Vier',
  content: 'Closets closets closets closets',
  ownerId: user.two._id,
  owner: 'Sheshe',
  accessType: 'Private',
  typeId: type[1]._id,
  lastModified: Date.now(),
  dateCreated: date.setDate(6),
  accessId: role[1]._id
}];

    Documents.create(documents, function(err, docs) {
      if (err) {
        console.log('Error Inserting New Data');
        if (err.name == 'ValidationError') {
          console.log(err);
          return;
          for (field in err.errors) {
            console.log(err.errors[field].message);
          }
        }
      }
      next(err, docs);
    });
  }

  function cleardb(done) {
    async.waterfall([
      function(callback) {
        Documents.remove({}, function() {
          console.log('Document collection cleared');
          callback(null);
        });
      },

      function(callback) {
        Roles.remove({}, function() {
          console.log('Role collection cleared');
          callback(null);
        });
      },

      function(callback) {
        Types.remove({}, function() {
          console.log('Type collection cleared');
          callback(null);
        });
      },

      function(callback) {
        Users.remove({}, function() {
          console.log('Roles collection cleared');
          callback(null);
        });
      }
    ], function() {
      done('Finished');
    });
  }

  module.exports = {
    starter: function(done) {
      async.waterfall([
        function(callback) {
          cleardb(function(rs) {
            callback(null, rs);
          });
        },
        function(rs, callback) {
          console.log('Seeding Types');
          typeSeed(function(err, types) {
            callback(null, types, rs);
          });
        },
        function(rs, types, callback) {
          console.log('Seeding Roles');
          roleSeed(function(err, roles) {
            callback(null, types, rs, roles);
          });
        },
        function(rs, types, roles, callback) {
          console.log('Seeding Users');
          userSeed(roles, function(users) {
            callback(null, types, rs, roles, users);
          });
        },

        function(types, rs, roles, users, callback) {
          documentSeed(users, roles, types, function(err, documents) {
            console.log('Seeding Documents');
            callback(null, documents, types, roles, users, rs);
          });
        }
      ], function(err, documents, types, roles, users, rs) {
        done({
          types: types,
          roles: roles,
          users: users,
          message: rs,
          documents: documents
        });
      });
    }
  };
})();
