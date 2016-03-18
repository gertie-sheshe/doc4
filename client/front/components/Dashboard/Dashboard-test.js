(function() {
  'use strict';
  var UserActions = require('../../../../app/scripts/actions/UserActions'),
    UserStore = require('../../../../app/scripts/stores/UserStore'),
    DocumentStore = require('../../../../app/scripts/stores/DocumentStore'),
    localStorage = require('localStorage'),
    browserHistory = require('react-router').browserHistory,
    React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    Dashboard = require('../../../../app/scripts/components/Dashboard/Dashboard.jsx');

  describe('Dashboard', function() {

    it('renders the Dashboard component', function() {
      var dashboard = enzyme.shallow(< Dashboard />);
      expect(dashboard.find('#ownerdoc')).to.have.length(1);
      expect(dashboard.find('#userdoc')).to.have.length(1);
    });
    it('Component has the correct states', function() {
      var dashboard = enzyme.shallow(< Dashboard />);
      expect(dashboard.state().users).to.eql([]);
      expect(dashboard.state().user.name.first).to.eql('');
      expect(dashboard.state().user.name.last).to.eql('');
      expect(dashboard.state().user.username).to.eql('');
      expect(dashboard.state().user.email).to.eql('');
      expect(dashboard.state().user.role).to.eql('');
      expect(dashboard.state().ownerId).to.eql('');
      expect(dashboard.state().ownerDocuments).to.eql([]);
      expect(dashboard.state().userDocuments).to.eql([]);
      expect(dashboard.state().document.title).to.eql('');
      expect(dashboard.state().document.content).to.eql('');
    });
    it('Calls the registered Callback', function() {
      sinon.spy(DocumentStore, 'addChangeListener');
      enzyme.mount(< Dashboard />);
      expect(DocumentStore.addChangeListener.called).to.equal(true);
      expect(DocumentStore.addChangeListener.callCount).to.equal(2);
      DocumentStore.addChangeListener.restore();
    });
    it('calls the owner changeListener', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      sinon.spy(DocumentStore, 'getOwnerDocs');
      DocumentStore.setOwnerDocs([
        {
          "_id": "56e84773a9872b4c39d61fef",
          "title": "Three",
          "content": "Winker Watson",
          "ownerId": "56e84773a9872b4c39d61feb",
          "owner": "Kidoti",
          "typeId": "56e84773a9872b4c39d61fe3",
          "lastModified": "2016-03-15T17:33:39.984Z",
          "dateCreated": "2016-03-04T17:33:39.983Z",
          "accessId": "56e84773a9872b4c39d61fe8",
          "__v": 0,
          "accessType": "None"
        }
      ]);
      expect(DocumentStore.getOwnerDocs()).to.be.an('array');
      expect(DocumentStore.getOwnerDocs.called).to.eql(true);
      expect(dashboard.state().ownerDocuments).to.be.an('array');
      DocumentStore.getOwnerDocs.restore();
    });
    it('calls the documents changeListener', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      sinon.spy(DocumentStore, 'getUserDocs');
      DocumentStore.setUserDocs([
        {
          "_id": "56e84773a9872b4c39d61fef",
          "title": "Twice",
          "content": "Locked Away",
          "ownerId": "56e84773a9872b4c39d61feb",
          "owner": "Kidoti",
          "typeId": "56e84773a9872b4c39d61fe3",
          "lastModified": "2016-03-15T17:33:39.984Z",
          "dateCreated": "2016-03-04T17:33:39.983Z",
          "accessId": "56e84773a9872b4c39d61fe8",
          "__v": 0,
          "accessType": "None"
        }
      ]);
      expect(DocumentStore.getUserDocs()).to.be.an('array');
      expect(DocumentStore.getUserDocs.called).to.eql(true);
      expect(dashboard.state().userDocuments).to.be.an('array');
      DocumentStore.getUserDocs.restore();
    });
    it('Calls the decoded changeListener', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      sinon.spy(UserStore, 'setDecodedData');
      sinon.spy(UserStore, 'getDecodedData');
      UserStore.setDecodedData({
        "_id": "56e8b497af2f13033f1d66aa",
        "roleId": "56e8b496af2f13033f1d66a7",
        "password": null,
        "loggedIn": true,
        "email": "asingwa@gmail.com",
        "username": "Kidoti",
        "__v": 0,
        "name": {
          "last": "Asingwa",
          "first": "Cynthia"
        }
      });
      expect(UserStore.getDecodedData()).to.be.a('object');
      expect(UserStore.getDecodedData.called).to.eql(true);
      expect(dashboard.state().ownerId).to.be.a('string');
      UserStore.getDecodedData.restore();
      UserStore.setDecodedData.restore();
    });
    it('sets the correct state if the store is updated with owner documents', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      DocumentStore.setOwnerDocs([
        {
          "_id": "56e84773a9872b4c39d61fef",
          "title": "Twilight",
          "content": "Winker Watson",
          "ownerId": "56e84773a9872b4c39d61feb",
          "owner": "Kidoti",
          "typeId": "56e84773a9872b4c39d61fe3",
          "lastModified": "2016-03-15T17:33:39.984Z",
          "dateCreated": "2016-03-04T17:33:39.983Z",
          "accessId": "56e84773a9872b4c39d61fe8",
          "__v": 0,
          "accessType": "None"
        }
      ]);
      expect(DocumentStore.getOwnerDocs().length).to.eql(1);
      expect(DocumentStore.getOwnerDocs()[0]).to.be.a('object');
      expect(dashboard.state().ownerDocuments[0].title).to.eql('Twilight');
      expect(dashboard.state().ownerDocuments[0].content).to.eql('Winker Watson');
    });
    it('sets the correct state if the store is updated with public documents', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      DocumentStore.setUserDocs([
        {
          "_id": "56e84773a9872b4c39d61fef",
          "title": "Zombies",
          "content": "From here to Timbuktu",
          "ownerId": "56e84773a9872b4c39d61feb",
          "owner": "Kidoti",
          "typeId": "56e84773a9872b4c39d61fe3",
          "lastModified": "2016-03-15T17:33:39.984Z",
          "dateCreated": "2016-03-04T17:33:39.983Z",
          "accessId": "56e84773a9872b4c39d61fe8",
          "__v": 0,
          "accessType": "None"
        }
      ]);
      expect(DocumentStore.getUserDocs().length).to.eql(1);
      expect(DocumentStore.getUserDocs()[0]).to.be.a('object');
      expect(dashboard.state().userDocuments[0].title).to.eql('Zombies');
      expect(dashboard.state().userDocuments[0].content).to.eql('From here to Timbuktu');
    });
    it('sets the correct state if the store is updated with valid decoded data', function() {
      var dashboard = enzyme.mount(< Dashboard />);
      UserStore.setDecodedData({
        "_id": "56e8b497af2f13033f1d66aa",
        "roleId": "56e8b496af2f13033f1d66a7",
        "password": null,
        "loggedIn": true,
        "email": "asingwa@gmail.com",
        "username": "Kidoti",
        "__v": 0,
        "name": {
          "last": "Asingwa",
          "first": "Cynthia"
        }
      });
      expect(UserStore.getDecodedData()._id).to.eql('56e8b497af2f13033f1d66aa');
      expect(UserStore.getDecodedData()).to.be.a('object');
      expect(dashboard.state().ownerId).to.be.a('string');
    });
    it('sets the correct state if the store is updated with an error decoded data', function() {
      sinon.stub(browserHistory, 'push').returns(true);
      var dashboard = enzyme.mount(< Dashboard />);
      UserStore.setDecodedData({
        "message": "You are not authenticated user",
      });
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });
    it('sets the correct state if the store is updated with an error decoded data', function() {
      sinon.stub(browserHistory, 'push').returns(true);
      var dashboard = enzyme.mount(< Dashboard />);
      UserStore.setDecodedData({
        "message": "Failed to Authenticate. You are not logged in.",
      });
      expect(browserHistory.push.called).to.eql(true);
      browserHistory.push.restore();
    });
  });
})();
