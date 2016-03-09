(function() {
  'use strict';
  var documentPath = '../../../../app/scripts/components/Documents/Document.jsx',
  UserActions = require('../../../../app/scripts/actions/UserActions'),
  UserStore = require('../../../../app/scripts/stores/UserStore'),
  DocumentStore = require('../../../../app/scripts/stores/DocumentStore'),
  localStorage = require('localStorage'),
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Document = require(documentPath);

  describe('Document', function() {
    it('renders the Document component', function() {
      var document = enzyme.mount(<Document />);
      console.log(document.debug());
      // expect(document.find('.mdl-grid')).to.have.length(1);
    });
    // it('Component has the correct states', function() {
    //   var dashboard = enzyme.shallow(<Dashboard />);
    //   expect(dashboard.state().users).to.eql([]);
    //   expect(dashboard.state().user.name.first).to.eql('');
    //   expect(dashboard.state().user.name.last).to.eql('');
    //   expect(dashboard.state().user.username).to.eql('');
    //   expect(dashboard.state().user.email).to.eql('');
    //   expect(dashboard.state().user.role).to.eql('');
    //   expect(dashboard.state().ownerId).to.eql('');
    //   expect(dashboard.state().ownerDocuments).to.eql([]);
    //   expect(dashboard.state().userDocuments).to.eql([]);
    //   expect(dashboard.state().document.title).to.eql('');
    //   expect(dashboard.state().document.content).to.eql('');
    // });
    // it('Calls the registered Callback', function() {
    //   sinon.spy(DocumentStore, 'addChangeListener');
    //   enzyme.mount(<Dashboard />);
    //   sinon.spy(localStorage, 'getItem');
    //   expect(DocumentStore.addChangeListener.called).to.equal(true);
    //   expect(DocumentStore.addChangeListener.callCount).to.equal(2);
    //   DocumentStore.addChangeListener.restore();
    // });
    // it('calls the own changeListener', function() {
    //   sinon.spy(DocumentStore, 'setOwnerDocs');
    //   enzyme.mount(<Dashboard />);
    //   DocumentStore.setOwnerDocs([{ownerDocs: {message: 'No Documents found'}}]);
    //   expect(DocumentStore.setOwnerDocs.called).to.eql(true);
    //   DocumentStore.setOwnerDocs.restore();
    // });
    // it('calls the user changeListener', function() {
    //   sinon.spy(DocumentStore, 'setUserDocs');
    //   enzyme.mount(<Dashboard />);
    //   DocumentStore.setUserDocs([{userDocs: {message: 'No Documents found'}}]);
    //   expect(DocumentStore.setUserDocs.called).to.eql(true);
    //   DocumentStore.setUserDocs.restore();
    // });
    // it('sets the correct state if the store is updated with owner documents', function() {
    // var dashboard = enzyme.mount(<Dashboard />);
    // DocumentStore.setOwnerDocs([{title: 'No Documents found', content: 'U la la'}]);
    // expect(DocumentStore.getOwnerDocs().length).to.eql(1);
    // expect(DocumentStore.getOwnerDocs()[0]).to.be.a('object');
    // expect(dashboard.state().ownerDocuments[0].title).to.eql('No Documents found');
    // expect(dashboard.state().ownerDocuments[0].content).to.eql('U la la');
    // // expect(dashboard.state().ownerDocuments).to.eq(true);
    // });
    // it('sets the correct state if the store is updated with public documents', function() {
    // var dashboard = enzyme.mount(<Dashboard />);
    // DocumentStore.setUserDocs([{title: 'Checkpoint four', content: 'Why you not getting complete?'}]);
    // expect(DocumentStore.getUserDocs().length).to.eql(1);
    // expect(DocumentStore.getUserDocs()[0]).to.be.a('object');
    // expect(dashboard.state().userDocuments[0].title).to.eql('Checkpoint four');
    // expect(dashboard.state().userDocuments[0].content).to.eql('Why you not getting complete?');
    // // expect(dashboard.state().ownerDocuments).to.eq(true);
    // });
  });
})();
