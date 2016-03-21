(function() {
  'use strict';
  var supertest = require('supertest');
  var expect = require('chai').expect;
  var assert = require('assert');
  var request = require('supertest');
  var app = require('../app.js');

  describe('User tests', function() {
    var user, user2, admin, token, token1;
    describe('User', function() {
      it('A new user can be created', function(done) {
        request(app)
          .post('/api/users')
          .send({
            firstname: 'Sherlock',
            lastname: 'Holmes',
            username: 'Watson',
            email: 'bakerstreet@gmail.com',
            password: 'gertrudenyenyeshi',
            role: 'Staff'
          })
          .end(function(err, res) {
            user = res.body;
            assert.strictEqual(res.status, 200);
            assert.strictEqual(user.name.first, 'Sherlock');
            expect(user.name.first).to.have.string('Sherlock');
            expect(user.name.first).to.be.a('string');
            done();
          });
      });

      it('The new user must be unique', function(done) {
        request(app)
          .post('/api/users')
          .send({
            firstname: 'Sherlock',
            lastname: 'Holmes',
            username: 'Watson',
            email: 'bakerstreet@gmail.com',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            expect(res.status).to.equal(401);
            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.body.error, 'Sign up failed. This Email or Username is already in use');
            expect(res.body.error).to.have.string('Sign up failed. This Email or Username is already in use');
            done();
          });
      });

      it('The user has a first and last name', function(done) {
        assert.strictEqual(user.name.first, 'Sherlock');
        assert.strictEqual(user.name.last, 'Holmes');
        expect(user.name.first).to.be.a('string');
        expect(user.name.last).to.be.a('string');
        done();
      });

      it('User created must have a role', function(done) {
        expect(user.roleId).to.not.be.undefined;
        expect(user.roleId).to.be.a('string');
        done();
      });

      it('User must be authenticated to see list of other users', function(done) {
        request(app)
          .get('/api/users')
          .end(function(err, res) {
            assert.strictEqual(res.status, 401);
            assert.strictEqual(res.body.error, 'You are not authenticated user');
            expect(res.body.error).to.be.a('string');
            expect(res.body.error).to.have.a.string('not authenticated');
            done();
          });
      });

      it('Logged in user gets a token', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Watson',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            token = res.body.token;
            assert.strictEqual(res.status, 200);
            expect(res.body.token).to.not.be.undefined;
            done();
          });
      });
      it('Authenticated user can see list of all users in the system', function(done) {
        request(app)
          .get('/api/users')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            expect(res.body).to.have.length.above(0);
            expect(res.body).to.be.instanceof(Array);
            done();
          });
      });
      it('User can update his/her details', function(done) {
        request(app)
          .put('/api/users/' + user._id)
          .set('x-access-token', token)
          .send({
            lastname: 'Smaug'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.name.last, 'Smaug');
            expect(res.body.name.last).to.have.a.string('Smaug');
            expect(res.body.name.last).to.be.a('string');
            done();
          });
      });
      it('User cannot update another\'s details', function(done) {
        request(app)
          .put('/api/users/' + '6754323478')
          .set('x-access-token', token)
          .send({
            lastname: 'Smaug'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.message, 'Sorry. Only the Owner can update the profile');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });

      it('User can view all documents he/she created. User without document.', function(done) {
        request(app)
          .get('/api/users/' + user._id + '/documents')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 404);
            assert.strictEqual(res.body.message, 'No documents found');
            done();
          });
      });
      it('User cannot view a document that does not exist', function(done) {
        request(app)
          .get('/api/users/' + '676554378990' + '/documents')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 404);
            assert.strictEqual(res.body.message, 'Document not found');
            done();
          });
      });
      it('User can view his own profile', function(done) {
        request(app)
          .get('/api/users/' + user._id)
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            expect(res.body).to.be.a('object');
            done();
          });
      });

      it('Users can update documents availabe to their role', function(done) {
        request(app)
          .put('/api/users/' + user._id)
          .set('x-access-token', token)
          .send({
            username: 'Jane Edited',
            email: 'we@you.com',
            firstname: 'Jenny'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.username, 'Jane Edited');
            assert.strictEqual(res.body.email, 'we@you.com');
            assert.strictEqual(res.body.name.first, 'Jenny');
            done();
          });
      });

      it('User can be deleted, but by Admin only', function(done) {
        request(app)
          .delete('/api/users/' + user._id)
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.message, 'You need to be an Admin to perform this action');
            expect(res.body.message).to.have.a.string('You need to be an Admin to perform this action');
            done();
          });
      });
      it('Admin has the rights to delete any user', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Sheshe',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            token1 = res.body.token;
            admin = res.body;
            assert.strictEqual(res.status, 200);
            request(app)
              .delete('/api/users/' + user._id)
              .set('x-access-token', token1)
              .end(function(err, res) {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.message, 'User deleted successfully');
                done();
              });
          });
      });
      it('User can view all documents he/she created. User with documents.', function(done) {
        request(app)
          .get('/api/users/' + admin._id + '/documents')
          .set('x-access-token', token1)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.length, 7);
            done();
          });
      });
      it('User can log out', function(done) {
        request(app)
          .get('/api/users/logout')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body.message, 'You have logged out successfully');
            request(app)
              .get('/api/users')
              .set('x-access-token', token + 'p')
              .end(function(err, res) {
                assert.strictEqual(res.status, 401);
                assert.strictEqual(res.body.error, 'Failed to Authenticate');
                done();
              });
          });
      });
    });
  });
})();
