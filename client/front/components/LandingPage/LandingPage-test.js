(function() {
  'use strict';
  var landingPath = '../../../../app/scripts/components/LandingPage/LandingPage.jsx',
  SignUp = require('../../../../app/scripts/components/SignUpForm/SignUpForm.jsx'),
  Login = require('../../../../app/scripts/components/LoginForm/LoginForm.jsx'),
  UserActions = require('../../../../app/scripts/actions/UserActions'),
  UserStore = require('../../../../app/scripts/stores/UserStore'),
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Landing = require(landingPath);

  describe('Landing', function() {

    it('renders the Landing component', function() {
      var landing = enzyme.shallow(<Landing />);
      // console.log(landing.debug());
      expect(landing.find('.mdl-button')).to.have.length(1);
    });
    it('Renders accurate content', function() {
      expect(enzyme.shallow(<Landing />).text()).to.have.string('Doc 4.0');
      expect(enzyme.shallow(<Landing />).text()).to.have.string('The place to go to create, manage and edit documents. Get started today ');
    });
    it('Renders child components', function() {
      var landing = enzyme.shallow(<Landing />);
      // console.log(landing.debug());
      expect(landing.find('.content').length).to.equal(1);
      expect(landing.find('#signup-panel').length).to.equal(1);
      expect(landing.find('#login-panel').length).to.equal(1);
    });
    it('Calls the registered Callback', function() {
      sinon.spy(UserStore, 'addChangeListener');
      var landing = enzyme.mount(<Landing />);
      expect(UserStore.addChangeListener.called).to.equal(true);
      expect(UserStore.addChangeListener.callCount).to.equal(2);
      UserStore.addChangeListener.restore();
    });
    it('Component has the correct states', function() {
      var landing = enzyme.shallow(<Landing />);
      expect(landing.state().user.username).to.eql('');
      expect(landing.state().user.password).to.eql('');
      expect(landing.state().info.firstname).to.eql('');
      expect(landing.state().info.lastname).to.eql('');
      expect(landing.state().info.email).to.eql('');
      expect(landing.state().info.password).to.eql('');
      expect(landing.state().info.role).to.eql('');
    });
    it('calls componentDidMount', function() {
    sinon.spy(Landing.prototype, 'componentDidMount');
    enzyme.mount(<Landing />);
    expect(Landing.prototype.componentDidMount.calledOnce).to.equal(true);
    Landing.prototype.componentDidMount.restore();
    });
  });
})();
