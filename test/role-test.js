(function() {
  'use strict';
  var supertest = require('supertest');
  var expect = require('chai').expect;
  var assert = require('assert');
  var request = require('supertest');
  var app = require('../app.js');

  describe('Role tests', function() {
    var token, token1, roles;
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
              .post('/api/roles')
              .set('x-access-token', token)
              .send({
                title: 'Owner'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 403);
                assert.strictEqual(res.body.message, 'You need to be an Admin');
                done();
              });
          });
      });
      it('Roles cannot be listed to a non-admin role', function(done) {
        request(app)
          .get('/api/roles')
          .set('x-access-token', token)
          .end(function(err, res) {
            assert.strictEqual(res.status, 403);
            assert.strictEqual(res.body.message, 'You need to be an Admin to perform this');
            done();
          });
      });
      it('Admin can add a role', function(done) {
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
              .post('/api/roles')
              .set('x-access-token', token1)
              .send({
                title: 'Owner'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.message, 'Role created');
                done();
              });
          });
      });
      it('Role should be unique', function(done) {
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
              .post('/api/roles')
              .set('x-access-token', token1)
              .send({
                title: 'Owner'
              })
              .end(function(err, res) {
                assert.strictEqual(res.status, 409);
                expect(res.body.error.errmsg).to.have.a.string('E11000 duplicate key error index');
                assert.strictEqual(res.body.message, 'You cannot create duplicate roles');
                done();
              });
          });
      });
      it('Admin can see list of roles', function(done) {
        request(app)
          .get('/api/roles')
          .set('x-access-token', token1)
          .end(function(err, res) {
            roles = res.body;
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.length, 4);
            assert.strictEqual(res.body[0].title, 'Viewer');
            assert.strictEqual(res.body[1].title, 'Admin');
            assert.strictEqual(res.body[2].title, 'Staff');
            assert.strictEqual(res.body[3].title, 'Owner');
            done();
          });
      });
      it('Admin can update roles', function(done){
        request(app)
          .put('/api/roles/' + roles[3]._id)
          .set('x-access-token', token1)
          .send({
            title: 'User'
          })
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.message, 'Role successfully updated');
            assert.strictEqual(res.body.role.title, 'User');
            done();
          });
      });
      it('Admin can delete a role', function(done) {
        request(app)
          .delete('/api/roles/' + roles[3]._id)
          .set('x-access-token', token1)
          .end(function(err, res) {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.message, 'Role deleted');
            done();
          });
      });
    });
  });
})();
