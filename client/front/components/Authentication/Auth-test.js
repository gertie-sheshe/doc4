(function() {
  'use strict';
  var authPath = '../../../../app/scripts/components/Authentication/Auth.jsx',
    React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    UserStore = require('../../../../app/scripts/stores/UserStore'),
    Auth = require(authPath);

  describe('Authentication', function() {
    it('renders the Auth component', function() {
      var auth = enzyme.shallow(<Auth />);
      console.log(auth.debug());
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
    it('Handles Sign Up', function() {
      var auth = enzyme.mount(<Auth />);
      var instance = auth.instance();
      sinon.spy(instance, 'handleSignUp');
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
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiaW5zZXJ0aW5nIjp0cnVlLCJnZXR0ZXJzIjp7Im5hbWUiOnsiZmlyc3QiOiJKZXJlbXkiLCJsYXN0IjoiS2l0aG9tZSJ9fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwic2NvcGUiOnsiX192IjowLCJyb2xlSWQiOiI1NmU4ZmUxMDQ5MWQwYzBlNDU1MGExN2MiLCJwYXNzd29yZCI6bnVsbCwibG9nZ2VkSW4iOmZhbHNlLCJlbWFpbCI6ImplcmVteUBraXRob21lLmNvbSIsInVzZXJuYW1lIjoiSmVyZSIsIl9pZCI6IjU2ZThmZTljYWJmYTNjMWY0NWM3ZDc0NiIsIm5hbWUiOnsibGFzdCI6IktpdGhvbWUiLCJmaXJzdCI6IkplcmVteSJ9fSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicm9sZUlkIjoicmVxdWlyZSIsInBhc3N3b3JkIjoibW9kaWZ5IiwidXNlcm5hbWUiOiJyZXF1aXJlIiwiZW1haWwiOiJyZXF1aXJlIiwibmFtZS5sYXN0IjoicmVxdWlyZSIsIm5hbWUuZmlyc3QiOiJyZXF1aXJlIn0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6e30sIm1vZGlmeSI6eyJwYXNzd29yZCI6dHJ1ZX0sInJlcXVpcmUiOnsicm9sZUlkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsIm5hbWUubGFzdCI6dHJ1ZSwibmFtZS5maXJzdCI6dHJ1ZX19LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Im5hbWUiOnsiZmlyc3QiOiJKZXJlbXkiLCJsYXN0IjoiS2l0aG9tZSJ9LCJfaWQiOiI1NmU4ZmU5Y2FiZmEzYzFmNDVjN2Q3NDYiLCJ1c2VybmFtZSI6IkplcmUiLCJlbWFpbCI6ImplcmVteUBraXRob21lLmNvbSIsImxvZ2dlZEluIjpmYWxzZSwicGFzc3dvcmQiOm51bGwsInJvbGVJZCI6IjU2ZThmZTEwNDkxZDBjMGU0NTUwYTE3YyIsIl9fdiI6MH0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDU4MTEwMTA4fQ.fgzJeKQdoJb2lnQEJLp1-ER-wiMTDnddVv0R5WLl9u0"
      });
      instance.handleSignUp();
      expect(UserStore.getSignUpData.called).to.eql(true);
      expect(instance.handleSignUp.calledOnce).to.eql(true);
    });
    // it('Calls componentDidMount', function() {
    //   sinon.spy(Auth.prototype, 'componentDidMount');
    //   var auth = enzyme.mount(<Auth />);
    //   var instance = auth.instance();
    //   sinon.spy(instance, 'handleSignUp');
    //   sinon.spy(UserStore, 'getSignUpData');
    //   UserStore.setSignUpData({
    //     error: 'error'
    //   });
    //   instance.handleSignUp();
    //   expect(instance.handleSignUp.calledOnce).to.eql(true);
    //   expect(Auth.prototype.componentDidMount.calledOnce).to.eql(true);
    //   Auth.prototype.componentDidMount.restore();
    // });
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
