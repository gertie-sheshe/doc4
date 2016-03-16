(function() {
  'use strict';
  var expect = require('chai').expect;
  var should = require('should');
  var assert = require('assert');
  var server = require('superagent');
  var request = require('supertest');
  var app = require('../app.js');

  describe('Document tests', function() {
    var user, user2, documents, documents1, result, result1;
    describe('Documents', function() {
      var content = {
        title: 'Mega Mind',
        content: 'TightenVille'
      };
      it('You must be logged in to create a document', function(done) {
        request(app)
          .post('/api/documents')
          .send({
            title: 'Mega Mind',
            content: 'TightenVille'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.body.message, 'You are not authenticated documents');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
      it('Login to create Document', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Kachuna',
            password: 'anitamrunde'
          })
          .end(function(err, res) {
            result = res.body.token;
            user = res.body;
            done();
          });
      });
      it('User can create a document if they are authenticated', function(done) {
        request(app)
          .post('/api/documents')
          .set('x-access-token', result)
          .send({
            title: 'Utonium',
            content: 'TownsVille'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.content, 'TownsVille');
            assert.strictEqual(res.body.ownerId, user.user._id);
            assert.strictEqual(res.body.title, 'Utonium');
            expect(res.body).to.not.be.undefined;
            expect(res.body).to.be.a('object');
            done();
          });
      });
      it('Document title is unique', function(done) {
        request(app)
          .post('/api/documents')
          .set('x-access-token', result)
          .send({
            title: 'Utonium',
            content: 'Power Puff'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 409);
            expect(res.status).to.equal(409);
            expect(res.body.error.errmsg).to.have.a.string('E11000 duplicate key error index');
            expect(res.body.message).to.equal('Document cannot be duplicate');
            done();
          });
      });
      it('User with any role can only view documents available to that role and are not private', function(done) {
        request(app)
          .get('/api/documents')
          .set('x-access-token', result)
          .end(function(err, res) {
            documents = res.body;
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body[0].accessId, user.user.roleId);
            assert.strictEqual(res.body[1].accessId, user.user.roleId);
            assert.strictEqual(res.body[2].accessId, user.user.roleId);
            assert.strictEqual(res.body[0].accessType, 'None');
            assert.strictEqual(res.body[1].accessType, 'None');
            assert.strictEqual(res.body[2].accessType, 'None');
            expect(res.body.length).to.equal(4);
            expect(res.body).to.have.length.above(0);
            done();
          });
      });
      it('User can update any document they are owners of', function(done) {
        request(app)
          .put('/api/documents/' + documents[0]._id)
          .set('x-access-token', result)
          .send({
            title: 'Prof Utonium'
          })
          .end(function(err, res) {
            // console.log('Doc tests', res);
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.title, 'Prof Utonium');
            assert.strictEqual(documents[0].ownerId, user.user._id);
            expect(typeof res.status).to.equal('number');
            expect(typeof res.body).to.equal('object');
            expect(res.body).to.not.be.undefined;
            done();
          });
      });
      it('Users can update documents availabe to their role', function(done) {
        request(app)
          .put('/api/documents/' + documents[0]._id)
          .set('x-access-token', result)
          .send({
            content: 'Jane Doe'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.content, 'Jane Doe');
            assert.strictEqual(documents[0].accessId, user.user.roleId);
            expect(typeof res.status).to.equal('number');
            expect(typeof res.body).to.equal('object');
            expect(res.body).to.not.be.undefined;
            done();
          });
      });
      it('User cannot delete a document unless they are the owner or an Admin', function(done) {
        request(app)
          .delete('/api/documents/' + documents[1]._id)
          .set('x-access-token', result)
          .end(function(err, res) {
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.message, 'You need to be Owner or Admin to delete this Document');
            done();
          });
      });
      it('User can delete a document if they are the owner', function(done) {
        request(app)
          .delete('/api/documents/' + documents[0]._id)
          .set('x-access-token', result)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.message, 'Document has been deleted');
            done();
          });
      });
      it('Returns document by limit provided', function(done) {
        request(app)
          .get('/api/documents/?limit=2')
          .set('x-access-token', result)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.length, 2);
            expect(res.body).to.have.length.above(1);
            done();
          });
      });
      it('Returns documents according to date created', function(done) {
        request(app)
          .get('/api/documents')
          .set('x-access-token', result)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            (res.body[0].dateCreated).should.be.above(res.body[1].dateCreated);
            expect(res.body).to.be.instanceof(Array);
            done();
          });
      });
      it('User can find his/her document', function(done) {
        request(app)
          .get('/api/documents/' + documents[1]._id)
          .set('x-access-token', result)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(documents[1]._id, res.body[0]._id);
            done();
          });
      });
      it('Login another user', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Sheshe',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            result1 = res.body.token;
            user2 = res.body.user;
            done();
          });
      });
      it('User can view a different user\'s document that the user has set visible to them', function(done) {
        request(app)
          .get('/api/users/' + user.user._id + '/documents')
          .set('x-access-token', result1)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.length, 1);
            expect(res.body).to.have.length.above(0);
            expect(res.body[0].ownerId).to.be.equal(user.user._id);
            expect(res.body[0].accessId).to.be.equal(user2.roleId);
            expect(res.body).to.be.instanceof(Array);
            done();
          });
      });
    });
  });
})();
