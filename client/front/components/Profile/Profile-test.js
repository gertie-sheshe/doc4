(function() {
  'use strict';
  var React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    browserHistory = require('react-router').browserHistory,
    DocumentAction = require('../../../../app/scripts/actions/DocumentActions'),
    UserAction = require('../../../../app/scripts/actions/UserActions'),
    UserStore = require('../../../../app/scripts/stores/UserStore'),
    Profile = require('../../../../app/scripts/components/Profile/Profile.jsx');

  describe('Profile Page', function() {
    it('renders the Profile component', function() {
      var profile = enzyme.shallow( <Profile /> );
      expect(profile.find('.mdl-grid')).to.have.length(2);
    });
    it('Renders child components', function() {
      var profile = enzyme.shallow( <Profile /> );
      expect(profile.find('.mdl-grid').length).to.equal(2);
      expect(profile.find('.mdl-cell--12-col').length).to.equal(5);
      expect(profile.find('.mdl-card__actions').length).to.equal(1);
      expect(profile.find('#profile').length).to.equal(1);
    });
    it('Component has the correct states', function() {
      var profile = enzyme.shallow( <Profile /> );
      expect(profile.state().userData).to.eql('');
      expect(profile.state().first).to.eql('');
      expect(profile.state().last).to.eql('');
    });
    it('Calls user changeListener when store is updated', function() {
      sinon.spy(UserStore, 'getUser');
      enzyme.mount(<Profile />);
      UserStore.setUser({
          '_id': '56ee2dc96bac916f05e5d9b9',
         'roleId': '56ee2dc96bac916f05e5d9b7',
         'password': '$2a$08$7CI3aBv32k2/8vZ5.zqW9uVI6k4i.CFaa1hhNrNT53KpQln4andyu',
         'loggedIn': true,
         'role': 'Admin',
         'email': 'gertienyesh@gmail.com',
         'username': 'Sheshe',
         '__v': 0,
         'name': {
           'last': 'Nyenyeshi',
           'first': 'Gertrude'
       }
      });
      expect(UserStore.getUser.called).to.equal(true);
      var userData = UserStore.getUser();
      expect(userData.name.first).to.equal('Gertrude');
      expect(userData.name.last).to.equal('Nyenyeshi');
      UserStore.getUser.restore();
    });
    it('Updates states when user store is updated', function() {
      sinon.spy(UserStore, 'getUser');
      var profile = enzyme.mount(<Profile />);
      UserStore.setUser({
          '_id': '56ee2dc96bac916f05e5d9b9',
         'roleId': '56ee2dc96bac916f05e5d9b7',
         'password': '$2a$08$7CI3aBv32k2/8vZ5.zqW9uVI6k4i.CFaa1hhNrNT53KpQln4andyu',
         'loggedIn': true,
         'role': 'Admin',
         'email': 'gertienyesh@gmail.com',
         'username': 'Sheshe',
         '__v': 0,
         'name': {
           'last': 'Nyenyeshi',
           'first': 'Gertrude'
       }
      });
      expect(UserStore.getUser.called).to.equal(true);
      var userData = UserStore.getUser();
      expect(profile.state().userData).to.be.an('object');
      expect(profile.state().userData.username).to.equal('Sheshe');
      expect(profile.state().userData.email).to.equal('gertienyesh@gmail.com');
      expect(profile.state().first).to.equal('Gertrude');
      expect(profile.state().last).to.equal('Nyenyeshi');
      UserStore.getUser.restore();
    });
    it('Updates states when update store is updated', function() {
      sinon.spy(UserStore, 'getUpdatedData');
      var profile = enzyme.mount(<Profile />);
      UserStore.setUpdatedData({
          '_id': '56ee2dc96bac916f05e5d9b9',
         'roleId': '56ee2dc96bac916f05e5d9b7',
         'password': '$2a$08$7CI3aBv32k2/8vZ5.zqW9uVI6k4i.CFaa1hhNrNT53KpQln4andyu',
         'loggedIn': true,
         'role': 'Admin',
         'email': 'gertienyesh@gmail.com',
         'username': 'Sheshe',
         '__v': 0,
         'name': {
           'last': 'NyeshNyesh',
           'first': 'Gert'
       }
      });
      expect(UserStore.getUpdatedData.called).to.equal(true);
      var userData = UserStore.getUpdatedData();
      expect(profile.state().userData).to.be.an('object');
      expect(profile.state().userData.username).to.equal('Sheshe');
      expect(profile.state().userData.email).to.equal('gertienyesh@gmail.com');
      expect(profile.state().first).to.equal('Gert');
      expect(profile.state().last).to.equal('NyeshNyesh');
      UserStore.getUpdatedData.restore();
    });
    it('Calls update changeListener when store is updated', function() {
      sinon.spy(UserStore, 'getUpdatedData');
      enzyme.mount(<Profile />);
      UserStore.setUpdatedData({
          '_id': '56ee2dc96bac916f05e5d9b9',
         'roleId': '56ee2dc96bac916f05e5d9b7',
         'password': '$2a$08$7CI3aBv32k2/8vZ5.zqW9uVI6k4i.CFaa1hhNrNT53KpQln4andyu',
         'loggedIn': true,
         'role': 'Admin',
         'email': 'gertienyesh@gmail.com',
         'username': 'Sheshe',
         '__v': 0,
         'name': {
           'last': 'Nyesh',
           'first': 'Gerty'
       }
      });
      expect(UserStore.getUpdatedData.called).to.equal(true);
      var userData = UserStore.getUpdatedData();
      expect(userData.name.first).to.equal('Gerty');
      expect(userData.name.last).to.equal('Nyesh');
      UserStore.getUpdatedData.restore();
    });
  });
})();
