(function() {
  'use strict';
  var React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    browserHistory = require('react-router').browserHistory,
    UserStore = require('../../../../app/scripts/stores/UserStore'),
    Auth = require('../../../../app/scripts/components/Authentication/Auth.jsx');

  describe('Authentication', function() {
    it('renders the Auth component', function() {
      var auth = enzyme.shallow(<Auth />);
      expect(auth.find('#signup-panel')).to.have.length(1);
      expect(auth.find('#login-panel')).to.have.length(1);
    });
    it('Component has the correct states', function() {
      var auth = enzyme.shallow(<Auth/>);
      expect(auth.state().user.username).to.eql('');
      expect(auth.state().user.password).to.eql('');
      expect(auth.state().info.firstname).to.eql('');
      expect(auth.state().info.lastname).to.eql('');
      expect(auth.state().info.email).to.eql('');
      expect(auth.state().info.username).to.eql('');
      expect(auth.state().info.password).to.eql('');
      expect(auth.state().info.role).to.eql('');
      expect(auth.state().panel.login).to.eql('mdl-tabs__panel');
      expect(auth.state().panel.signup).to.eql('mdl-tabs__panel is-active');

    });
    it('Calls componentDidMount', function() {
      sinon.spy(Auth.prototype, 'componentDidMount');
      var auth = enzyme.mount(<Auth/>);
      expect(Auth.prototype.componentDidMount.calledOnce).to.eql(true);
      Auth.prototype.componentDidMount.restore();
    });

    it('Calls user signup change listener', function() {
      var auth = enzyme.mount(<Auth />);
      sinon.spy(UserStore, 'getSignUpData');
      UserStore.setSignUpData({
        "user": {
          "__v": 0,
          "roleId": "56e8fe10491d0c0e4550a17c",
          "password": null,
          "loggedIn": false,
          "email": "jeremy@kithome.com",
          "username": "Jere",
          "_id": "56e8fe9cabfa3c1f45c7d746",
          "name": {
            "last": "Kithome",
            "first": "Jeremy"
          }
        },
        "token": "eyJ0eXAiOiJK"
      });
      expect(UserStore.getSignUpData.called).to.eql(true);
      UserStore.getSignUpData.restore();
    });

    it('Responds correctly with error', function() {
      var auth = enzyme.mount(<Auth />);
      sinon.spy(UserStore, 'getSignUpData');
      UserStore.setSignUpData({
        "error": "Sign up failed. This Email or Username is already in use"
      });
      expect(UserStore.getSignUpData.called).to.eql(true);
    });

    it('calls the user login change listener', function() {
        sinon.spy(UserStore, 'getLoginData');
        sinon.stub(browserHistory, 'push').returns(true);
        enzyme.mount(<Auth />); // Mount the component
        UserStore.setLoginData({
          id: 'weurhkja',
          token: 'blahblah'});
        expect(UserStore.getLoginData.called).to.eql(true);
        browserHistory.push.restore();
        UserStore.getLoginData.restore();
      });

    it('calls the user login change listener', function() {
        sinon.spy(UserStore, 'getLoginData');
        sinon.stub(browserHistory, 'push').returns(true);
        enzyme.mount(<Auth />); // Mount the component
        UserStore.setLoginData({
          "error": "Sorry. Wrong username and password combination"
        });
        expect(UserStore.getLoginData.called).to.eql(true);
        browserHistory.push.restore();
        UserStore.getLoginData.restore();
      });

    it('should correctly handle field change', function() {
      var auth = enzyme.mount(<Auth />);
      var event = {
        target: {
          name: 'username',
          value: 'password'
        },
        preventDefault: function() {}
      };
      var instance = auth.instance();
      sinon.spy(instance, 'fetchValues');
      instance.fetchValues(event);
      expect(auth.state().user[event.target.name]).to.eql(event.target.value);
      instance.fetchValues.restore();
    });
  });
})();
