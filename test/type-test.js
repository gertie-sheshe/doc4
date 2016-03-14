(function() {
  'use strict';
  var supertest = require('supertest');
  var expect = require('chai').expect;
  var assert = require('assert');
  var request = require('supertest');
  var app = require('../app.js');

  describe('Role tests', function() {
    var token, types, token1;
    describe('Role', function() {
      it('Role cannot be added by non-admin role', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Kachuna',
            password: 'anitamrunde'
          })
          .end(function(err, res) {
            token = res.body.token;
            assert.strictEqual(res.status, 200);
            request(app)
              .post('/api/types')
              .set('x-access-token', token)
              .send({
                title: 'Scientific'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 403);
                assert.strictEqual(res.body.message, 'You need to be an Admin');
                done();
              });
          });
      });
      it('Types cannot be listed to a non-admin role', function(done) {
        request(app)
          .get('/api/types')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.message, 'You need to be an Admin to perform this');
            done();
          });
      });
      it('Admin can add a type', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Sheshe',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            token1 = res.body.token;
            assert.strictEqual(res.status, 200);
            request(app)
              .post('/api/types')
              .set('x-access-token', token1)
              .send({
                type: 'Scientific'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.message, 'Type created');
                done();
              });
          });
      });
      it('Type title is unique', function(done) {
        request(app)
          .post('/api/users/login')
          .send({
            username: 'Sheshe',
            password: 'gertrudenyenyeshi'
          })
          .end(function(err, res) {
            token1 = res.body.token;
            assert.strictEqual(res.status, 200);
            request(app)
              .post('/api/types')
              .set('x-access-token', token1)
              .send({
                type: 'Scientific'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 409);
                expect(res.body.error.errmsg).to.have.a.string('E11000 duplicate key error index');
                assert.strictEqual(res.body.message, 'This Type already exists');
                done();
              });
          });
      });
      it('Admin can see list of Types', function(done) {
        request(app)
          .get('/api/types')
          .set('x-access-token', token1)
          .end(function(err, res) {
            types = res.body;
            // assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.length, 5);
            assert.strictEqual(res.body[0].type, 'General');
            assert.strictEqual(res.body[1].type, 'Business');
            assert.strictEqual(res.body[2].type, 'Education');
            assert.strictEqual(res.body[3].type, 'Personal');
            assert.strictEqual(res.body[4].type, 'Scientific');
            done();
          });
      });
      it('Admin can update types', function(done) {
        request(app)
          .put('/api/types/' + types[4]._id)
          .set('x-access-token', token1)
          .send({
            type: 'Historical'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.message, 'Type successfully updated');
            assert.strictEqual(res.body.type.type, 'Historical');
            done();
          });
      });
      it('Admin can delete a type', function(done) {
        request(app)
          .delete('/api/types/' + types[4]._id)
          .set('x-access-token', token1)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.message, 'Type deleted');
            done();
          });
      });
    });
  });
})();
