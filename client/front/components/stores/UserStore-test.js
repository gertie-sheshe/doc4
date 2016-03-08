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
      sinon.stub(UserStore, 'emitChange').returns(true);
      registerSpy = sinon.stub(AppDispatcher, 'register');
      dispatchSpy= sinon.spy(AppDispatcher, 'dispatch');
      registerSpy.onFirstCall().returnsArg(0);
    });

    after(function() {
      dispatchSpy.restore();
      registerSpy.restore();
    });

    it('Gets Log in Data', function() {
      sinon.spy(UserStore, 'setLoginData');
      var userAction = {
        actionType: 'USER_LOGIN',
        data: {
          username: 'Sheshe',
          password: 'stolen'
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
        actionType: 'USER_SIGNUP',
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
    });
    it('Gets Decoded Data', function() {
      sinon.spy(UserStore, 'setDecodedData');
      var userAction = {
        actionType: 'USER_DECODE',
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
    });

    // it('Gets User Data', function() {
    //   sinon.spy(UserStore, 'setUserData');
    //   var userAction = {
    //     actionType: 'USER_DATA',
    //     data: {}
    //   };
    //   AppDispatcher.dispatch(userAction);
    //   expect(UserStore.setUserData.called).to.equal(true);
    //   var userData = UserStore.getUserData();
    //   expect(userData).to.equal(userAction.data);
    // });
  });
})();
