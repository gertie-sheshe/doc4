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
      sinon.stub(browserHistory, 'push').returns(true);
      UserStore.setSignUpData({
          '__v': 0,
          'roleId': '56e8fe10491d0c0e4550a17c',
          'password': null,
          'loggedIn': true,
          'email': 'jere@kithome.com',
          'username': 'JereKith',
          '_id': '56e8fe9cabfa3c1f45c7d746',
          'name': {
            'last': 'Kithome',
            'first': 'Jeremy'
          },
          'token': 'eyJ0eXAiOiJK'
        });
      expect(UserStore.getSignUpData.called).to.eql(true);
      expect(browserHistory.push.called).to.equal(true);
      var signupData = UserStore.getSignUpData();
      expect(signupData.username).to.equal('JereKith');
      expect(signupData.name.first).to.equal('Jeremy');
      expect(signupData.name.last).to.equal('Kithome');
      expect(signupData.email).to.equal('jere@kithome.com');
      UserStore.getSignUpData.restore();
      browserHistory.push.restore();
    });

    it('Responds correctly with error', function() {
      var auth = enzyme.mount(<Auth />);
      sinon.spy(UserStore, 'getSignUpData');
      UserStore.setSignUpData({
        'error': 'Sign up failed. This Email or Username is already in use'
      });
      expect(UserStore.getSignUpData.called).to.eql(true);
      var signupData = UserStore.getSignUpData();
      expect(signupData.error).to.equal('Sign up failed. This Email or Username is already in use');
      UserStore.getSignUpData.restore();
    });

    it('calls the user login change listener', function() {
        sinon.spy(UserStore, 'getLoginData');
        sinon.stub(browserHistory, 'push').returns(true);
        enzyme.mount(<Auth />);
        UserStore.setLoginData({
          'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InJvbGVJZCI6ImluaXQiLCJyb2xlIjoiaW5pdCIsInBhc3N3b3JkIjoibW9kaWZ5IiwidXNlcm5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZS5sYXN0IjoiaW5pdCIsIm5hbWUuZmlyc3QiOiJpbml0IiwiX192IjoiaW5pdCIsImxvZ2dlZEluIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwibmFtZS5maXJzdCI6dHJ1ZSwibmFtZS5sYXN0Ijp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsInJvbGUiOnRydWUsImxvZ2dlZEluIjp0cnVlLCJyb2xlSWQiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6eyJwYXNzd29yZCI6dHJ1ZX0sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJuYW1lIjp7ImZpcnN0IjoiR2VydHJ1ZGUiLCJsYXN0IjoiTnllbnllc2hpIn0sIl9fdiI6MCwidXNlcm5hbWUiOiJTaGVzaGUiLCJlbWFpbCI6ImdlcnRpZW55ZXNoQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImxvZ2dlZEluIjp0cnVlLCJwYXNzd29yZCI6bnVsbCwicm9sZUlkIjoiNTZlZTJkYzk2YmFjOTE2ZjA1ZTVkOWI3IiwiX2lkIjoiNTZlZTJkYzk2YmFjOTE2ZjA1ZTVkOWI5In0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDU4NDYwNTAzfQ.bP4jdO4JMBhqucvfq11OEaRMBPP6dkntxjdeJH37qpA',
          '_id': '56ee2dc96bac916f05e5d9b9',
          'roleId': '56ee2dc96bac916f05e5d9b7',
          'password': null,
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
        expect(UserStore.getLoginData.called).to.eql(true);
        expect(browserHistory.push.called).to.eql(true);
        var loginData = UserStore.getLoginData();
        expect(loginData._id).to.eql('56ee2dc96bac916f05e5d9b9');
        expect(loginData.roleId).to.eql('56ee2dc96bac916f05e5d9b7');
        expect(loginData.username).to.eql('Sheshe');
        expect(loginData.name.last).to.eql('Nyenyeshi');
        browserHistory.push.restore();
        UserStore.getLoginData.restore();
      });

    it('calls the user login change listener with error', function() {
        sinon.spy(UserStore, 'getLoginData');
        sinon.stub(browserHistory, 'push').returns(true);
        enzyme.mount(<Auth />);
        UserStore.setLoginData({
          'error': 'Sorry. Wrong username and password combination'
        });
        expect(UserStore.getLoginData.called).to.eql(true);
        var loginData = UserStore.getLoginData();
        expect(loginData.error).to.eql('Sorry. Wrong username and password combination');
        browserHistory.push.restore();
        UserStore.getLoginData.restore();
      });

    it('should correctly handle field change', function() {
      var auth = enzyme.mount(<Auth />);
      var event = {
        target: {
          name: 'username',
          value: 'Gerty'
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
