(function() {
  'use strict';
  var sinon = require('sinon'),
  expect = require('chai').expect,
  React = require('react'),
  enzyme = require('enzyme'),
  DocConstants = require('../../../app/scripts/constants/DocConstants'),
  BaseActions = require('../../../app/scripts/actions/BaseActions'),
  DocumentActions = require('../../../app/scripts/actions/DocumentActions');

  describe('Document Actions', function() {
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
    id = '56e86b2141aa0bef3da11e58';

    before(function() {
      sinon.stub(BaseActions, 'get').returns(true);
      sinon.stub(BaseActions, 'put').returns(true);
      sinon.stub(BaseActions, 'post').returns(true);
      sinon.stub(BaseActions, 'delete').returns(true);
    });

    after(function() {
      BaseActions.get.restore();
      BaseActions.put.restore();
      BaseActions.post.restore();
      BaseActions.delete.restore();
    });

    describe('Tests User Actions', function() {
      it('Public documents action', function() {
        DocumentActions.userDocuments(token);
        expect(BaseActions.get.withArgs('/api/documents', DocConstants.GET_DOCS, token).called).to.equal(true);
      });

      it('Delete document action', function() {
        DocumentActions.deleteDocument(id, token);
        expect(BaseActions.delete.withArgs('/api/documents/' + id, DocConstants.DELETE_DOC, token).called).to.equal(true);
        expect(BaseActions.delete.withArgs('/api/documents/' + id, DocConstants.DELETE_DOC, token).calledOnce).to.equal(true);
      });

      it('Owner documents action', function() {
        DocumentActions.ownerDocuments(token, id);
        expect(BaseActions.get.withArgs('/api/users/' + id + '/documents', DocConstants.OWNER_DOCS, token).called).to.equal(true);
      });

      it('Get document action', function() {
        DocumentActions.setDoc(id, token);
        expect(BaseActions.get.withArgs('/api/documents/' + id, DocConstants.ONE_DOCS, token).called).to.equal(true);
      });

      it('Update document action', function() {
        DocumentActions.updateDoc(id, payload, token);
        expect(BaseActions.put.withArgs('/api/documents/' + id, payload, DocConstants.UPDATE_DOC, token).called).to.equal(true);
      });
    });
  });
})();
