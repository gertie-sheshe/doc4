(function() {
  'use strict';
  var supertest = require('supertest');
  var expect = require('chai').expect;
  var assert = require('assert');
  var request = require('supertest');
  var app = require('../app.js');

  describe('Document Management System', function() {
    var user, token;
    describe('Search functions', function() {
      it('Documents can be searched by date', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Kidoti',
            password: 'cynthiaasingwa'
          })
          .end(function(err, res) {
            user = res.body;
            token = res.body.token;
            request(app)
              .get('/api/documents/' + '?from=2016-03-09&to=2016-09-11')
              .set('x-access-token', token)
              .end(function(err, res) {
                assert.strictEqual(res.body.length, 2);
                assert.strictEqual(res.status, 200);
                expect(res.body).to.have.length(2);
                done();
              });
          });
      });
      it('Documents can be searched by title', function(done) {
        request(app)
          .get('/api/documents/?title=Eight')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body[0].title, 'Eight');
            done();
          });
      });
      it('User can only search documents by title available to him/her', function(done) {
        request(app)
          .get('/api/documents/?title=Two')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 404);
            assert.strictEqual(res.body.message, 'No documents found');
            done();
          });
      });
      it('Documents can be searched by role. Only Roles available to them', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Sheshe',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            user = res.body;
            token = res.body.token;
            request(app)
              .get('/api/documents/?role=Viewer')
              .set('x-access-token', token)
              .end(function(err, res) {
                assert.strictEqual(res.status, 401);
                assert.strictEqual(res.body.message, 'Sorry, you are not allowed to view documents with this role');
                done();
              });
          });
      });
      it('User can only search documents by title available to him/her', function(done) {
        request(app)
          .get('/api/documents/?role=Admin')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.accessId, user.roleId);
            done();
          });
      });
    });
  });
})();
