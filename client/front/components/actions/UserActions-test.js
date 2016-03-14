// (function() {
//   'use strict';
//   var sinon = require('sinon'),
//   expect = require('chai').expect,
//   React = require('react'),
//   enzyme = require('enzyme'),
//   DocConstants = require('../../../../app/scripts/constants/DocConstants'),
//   BaseActions = require('../../../../app/scripts/actions/BaseActions'),
//   UserActions = require('../../../../app/scripts/actions/UserActions');
//
//   describe('User Actions', function() {
//     var token = 'gerrarahia',
//     payload = {},
//     Id = 6;
//
//     beforeEach(function() {
//       sinon.stub(BaseActions, 'get').returns(true);
//       sinon.stub(BaseActions, 'put').returns(true);
//       sinon.stub(BaseActions, 'post').returns(true);
//       sinon.stub(BaseActions, 'delete').returns(true);
//     });
//
//     afterEach(function() {
//       BaseActions.get.restore();
//       BaseActions.put.restore();
//       BaseActions.post.restore();
//       BaseActions.delete.restore();
//     });
//
//     describe('Tests User Actions', function() {
//       it('login action', function() {
//         UserActions.login(payload);
//         expect(BaseActions.post.withArgs('/api/users/login', payload, DocConstants.USER_LOGIN).called).to.equal(true);
//       });
//       it('signup action', function() {
//         UserActions.signup(payload);
//         expect(BaseActions.post.withArgs('/api/users', payload, DocConstants.USER_SIGNUP).called).to.equal(true);
//       });
//       it('decode action', function() {
//         UserActions.decode(token);
//         expect(BaseActions.get.withArgs('/api/users/decode', DocConstants.USER_DECODE, token).called).to.equal(true);
//       });
//     });
//   });
// })();
