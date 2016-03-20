(function() {
  'use strict';
  var sinon = require('sinon'),
  expect = require('chai').expect,
  React = require('react'),
  enzyme = require('enzyme'),
  DocConstants = require('../../../app/scripts/constants/DocConstants'),
  BaseActions = require('../../../app/scripts/actions/BaseActions'),
  UserActions = require('../../../app/scripts/actions/UserActions');

  describe('User Actions', function() {
    var token = 'gerrarahia',
    payload = {
      '_id': '56e86b2141aa0bef3da11e58',
      'title': 'Eight',
      'content': '221B Baker Street',
      'ownerId': '56e86b2141aa0bef3da11e50',
      'owner': 'Kachuna',
      'typeId': '56e86b2141aa0bef3da11e49',
      'lastModified': '2016-03-15T20:05:53.943Z',
      'dateCreated': '2016-03-09T20:05:53.941Z',
      'accessId': '56e86b2141aa0bef3da11e4d',
      '__v': 0,
      'accessType': 'None'
    },
    Id = 6;

    beforeEach(function() {
      sinon.stub(BaseActions, 'get').returns(true);
      sinon.stub(BaseActions, 'put').returns(true);
      sinon.stub(BaseActions, 'post').returns(true);
      sinon.stub(BaseActions, 'delete').returns(true);
    });

    afterEach(function() {
      BaseActions.get.restore();
      BaseActions.put.restore();
      BaseActions.post.restore();
      BaseActions.delete.restore();
    });

    describe('Tests User Actions', function() {
      it('login action', function() {
        UserActions.login(payload);
        expect(BaseActions.post.withArgs('/api/users/login', payload, DocConstants.USER_LOGIN).called).to.equal(true);
      });
      it('signup action', function() {
        UserActions.signup(payload);
        expect(BaseActions.post.withArgs('/api/users', payload, DocConstants.USER_SIGNUP).called).to.equal(true);
      });
      it('decode action', function() {
        UserActions.decode(token);
        expect(BaseActions.get.withArgs('/api/users/decode', DocConstants.USER_DECODE, token).called).to.equal(true);
      });
    });
  });
})();
