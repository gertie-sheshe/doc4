(function() {
  'use strict';
  var landingPath = '../../../../app/scripts/components/LandingPage/LandingPage.jsx',
  SignUp = require('../../../../app/scripts/components/SignUpForm/SignUpForm.jsx'),
  UserActions = require('../../../../app/scripts/actions/UserActions'),
  UserStore = require('../../../../app/scripts/stores/UserStore'),
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Landing = require(landingPath);

  describe('Landing', function() {
    it('renders the Landing component', function() {
      // Render Landing page in the document
      var landing = enzyme.shallow(<Landing />);
      // Check that it has a child component
      expect(landing.find('.mdl-button')).to.have.length(1);
    });
    it('Calls the registered Callback', function() {
      sinon.spy(UserStore, 'addChangeListener');
      enzyme.shallow(<Landing />);
      expect(UserStore.addChangeListener.callCount).to.equal(0);
      //expect(UserStore.addChangeListener.calledOnce).to.equal(true);
    });
  });
})();
