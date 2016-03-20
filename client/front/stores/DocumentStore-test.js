(function() {
  'use strict';
  var AppDispatcher = require('../../../app/scripts/dispatcher/AppDispatcher');
  var DocumentStore = require('../../../app/scripts/stores/DocumentStore');
  var emitChange = require('../../../app/scripts/stores/DocumentStore').setUserDocs;
  var constants = require('../../../app/scripts/constants/DocConstants');
  var sinon = require('sinon');
  var expect = require('chai').expect;

  describe('User Store Tests', function() {
    var registerSpy, dispatchSpy;

    before(function() {
      sinon.stub(DocumentStore, 'emitChange').returns(true);
      registerSpy = sinon.stub(AppDispatcher, 'register').returns(true);
      dispatchSpy= sinon.spy(AppDispatcher, 'dispatch');
      registerSpy.onFirstCall().returnsArg(0);
    });

    after(function() {
      dispatchSpy.restore();
      registerSpy.restore();
    });

    it('Get User Docs', function() {
      sinon.spy(DocumentStore, 'setUserDocs');
      var userAction = {
        actionType: constants.GET_DOCS,
        data: {
          title: 'Sheshe',
          content: 'stolen'
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(DocumentStore.setUserDocs.called).to.equal(true);
      var docData = DocumentStore.getUserDocs();
      expect(docData).to.equal(userAction.data);
      DocumentStore.setUserDocs.restore();
    });

    it('Get Owner Docs', function() {
      sinon.spy(DocumentStore, 'setOwnerDocs');
      var userAction = {
        actionType: constants.OWNER_DOCS,
        data: 'I forgot'
      };
      AppDispatcher.dispatch(userAction);
      expect(DocumentStore.setOwnerDocs.called).to.equal(true);
      var docData = DocumentStore.getOwnerDocs();
      expect(docData).to.equal(userAction.data);
      DocumentStore.setOwnerDocs.restore();
    });

    it('Delete a Doc', function() {
      sinon.spy(DocumentStore, 'deleteDoc');
      var userAction = {
        actionType: constants.DELETE_DOC,
        data: {
          message: 'Document has been deleted',
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(DocumentStore.deleteDoc.called).to.equal(true);
      var docData = DocumentStore.getDeleted();
      expect(docData.message).to.equal(userAction.data.message);
    });

    it('Update a Doc', function() {
      sinon.spy(DocumentStore, 'setUpdatedDoc');
      var userAction = {
        actionType: 'UPDATE_DOC',
        data: {
          title: 'Updated',
          content: 'I am updated'
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(DocumentStore.setUpdatedDoc.called).to.equal(true);
      var docData = DocumentStore.getUpdatedDoc();
      expect(docData).to.equal(userAction.data);
    });
  });
})();
