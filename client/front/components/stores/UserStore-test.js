(function() {
  'use strict';
  var AppDispatcher = require('../../../../app/scripts/dispatcher/AppDispatcher');
  var UserStore = require('../../../../app/scripts/stores/UserStore');
  var constants = require('../../../../app/scripts/constants/DocConstants');
  var sinon = require('sinon');
  var expect = require('chai').expect;

  describe('User Store Tests', function() {
    var registerSpy, dispatchSpy;

    before(function() {
      sinon.stub(UserStore, 'emitChange', function() {
        return true;
      });
      registerSpy = sinon.stub(AppDispatcher, 'register');
      sinon.spy(AppDispatcher, 'dispatch');
      registerSpy.onFirstCall().returnsArg(0);
    });

    after(function() {
      AppDispatcher.dispatch.restore();
      AppDispatcher.register.restore();
      registerSpy.restore();
    });

    it('Gets Log in Data', function() {
      sinon.spy(UserStore, 'setLoginData');
      var userAction = {
        actionType: constants.USER_LOGIN,
        data: {
          "user": {
            "_id": "56e85ec9ba37aa0a3d3a76c0",
            "roleId": "56e85ec9ba37aa0a3d3a76be",
            "password": null,
            "loggedIn": true,
            "email": "gertienyesh@gmail.com",
            "username": "Sheshe",
            "__v": 0,
            "name": {
              "last": "Nyenyeshi",
              "first": "Gertrude"
            }
          },
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InJvbGVJZCI6ImluaXQiLCJwYXNzd29yZCI6Im1vZGlmeSIsInVzZXJuYW1lIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsIm5hbWUubGFzdCI6ImluaXQiLCJuYW1lLmZpcnN0IjoiaW5pdCIsIl9fdiI6ImluaXQiLCJsb2dnZWRJbiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsIm5hbWUuZmlyc3QiOnRydWUsIm5hbWUubGFzdCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJsb2dnZWRJbiI6dHJ1ZSwicm9sZUlkIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnsicGFzc3dvcmQiOnRydWV9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsibmFtZSI6eyJmaXJzdCI6IkdlcnRydWRlIiwibGFzdCI6Ik55ZW55ZXNoaSJ9LCJfX3YiOjAsInVzZXJuYW1lIjoiU2hlc2hlIiwiZW1haWwiOiJnZXJ0aWVueWVzaEBnbWFpbC5jb20iLCJsb2dnZWRJbiI6dHJ1ZSwicGFzc3dvcmQiOm51bGwsInJvbGVJZCI6IjU2ZTg1ZWM5YmEzN2FhMGEzZDNhNzZiZSIsIl9pZCI6IjU2ZTg1ZWM5YmEzN2FhMGEzZDNhNzZjMCJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1ODA2OTM4Nn0.kOVPycs3p-egGlZlZm0pf4YKp1SF9JzKodbgDcO5a3c"
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(UserStore.setLoginData.called).to.equal(true);
      var loggedData = UserStore.getLoginData();
      expect(loggedData).to.equal(userAction.data);
    });
    it('Gets Sign Up Data', function() {
      sinon.spy(UserStore, 'setSignUpData');
      var userAction = {
        actionType: constants.USER_SIGNUP,
        data: {
          firstname: 'Gertrude',
          lastname: 'Nyenyeshi',
          email: 'email@email.com',
          username: 'Sheshe',
          password: 'stolen',
          role: 'Viewer'
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(UserStore.setSignUpData.called).to.equal(true);
      var signedData = UserStore.getSignUpData();
      expect(signedData).to.equal(userAction.data);
      UserStore.setSignUpData.restore();
    });
    it('Gets Decoded Data', function() {
      sinon.spy(UserStore, 'setDecodedData');
      var userAction = {
        actionType: constants.USER_DECODE,
        data: {
          firstname: 'Gertrude',
          lastname: 'Nyenyeshi',
          email: 'email@email.com',
          username: 'Sheshe',
          password: 'stolen',
          role: 'Viewer'
        }
      };
      AppDispatcher.dispatch(userAction);
      expect(UserStore.setDecodedData.called).to.equal(true);
      var decodedData = UserStore.getDecodedData();
      expect(decodedData).to.equal(userAction.data);
      UserStore.setDecodedData.restore();
    });
  });
})();
