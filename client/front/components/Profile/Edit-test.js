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
    Edit = require('../../../../app/scripts/components/Profile/Edit.jsx');

  describe('Edit Profile Page', function() {
    it('renders the Edit Profile component', function() {
      var edit = enzyme.shallow( <Edit /> );
      expect(edit.find('.mdl-grid')).to.have.length(6);
    });
    it('Renders child components', function() {
      var edit = enzyme.shallow( <Edit /> );
      expect(edit.find('.mdl-grid').length).to.equal(6);
      expect(edit.find('.mdl-cell--12-col').length).to.equal(10);
    });
    it('Component has the correct states', function() {
      var edit = enzyme.shallow( <Edit /> );
      expect(edit.state().userData.firstname).to.eql('');
      expect(edit.state().userData.lastname).to.eql('');
      expect(edit.state().userData.username).to.eql('');
      expect(edit.state().userData.email).to.eql('');
      expect(edit.state().userData.role).to.eql('');
      expect(edit.state().userData.id).to.eql('');
    });
    it('Calls user changeListener when store is updated', function() {
      sinon.spy(UserStore, 'getUser');
      enzyme.mount(<Edit />);
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
      var profile = enzyme.mount(<Edit />);
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
      expect(profile.state().userData.username).to.equal('Sheshe');
      expect(profile.state().userData.email).to.equal('gertienyesh@gmail.com');
      expect(profile.state().userData.firstname).to.equal('Gertrude');
      expect(profile.state().userData.lastname).to.equal('Nyenyeshi');
      UserStore.getUser.restore();
    });
  });
})();
