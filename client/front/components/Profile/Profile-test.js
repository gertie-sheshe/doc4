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
      expect(profile.find('.mdl-cell--12-col').length).to.equal(4);
      expect(profile.find('.mdl-card__actions').length).to.equal(1);
      expect(profile.find('#profile').length).to.equal(1);
    });
    it('Component has the correct states', function() {
      var profile = enzyme.shallow( <Profile /> );
      expect(profile.state().userData).to.eql('');
      expect(profile.state().first).to.eql('');
      expect(profile.state().last).to.eql('');
    });
    it('Change listener called when store is updated', function() {
      sinon.spy(UserStore, 'getDecodedData');
      UserStore.setDecodedData({
        username: 'Sheshe',
        name: {
          first: 'Gertrude',
          last: 'Nyesh'
        },
        email: 'email@email.com'
      });
      expect(UserStore.getDecodedData.called).to.equal(true);
      UserStore.getDecodedData.restore();
    });
  });
})();
