(function() {
  'use strict';
  var sinon = require('sinon'),
  expect = require('chai').expect,
  request = require('superagent'),
  AppDispatcher = require('../../../../app/scripts/dispatcher/AppDispatcher.js'),
  BaseActions = require('../../../../app/scripts/actions/BaseActions');

  describe('Base Actions', function() {
    var token = 'gerrarahia',
    actionType = 'ACTION_TYPE',
    response = {
      body: 'This is me',
      status: 400
    },
    url = 'one/two',
    data = {};

    before(function() {
      sinon.stub(AppDispatcher, 'dispatch');
      sinon.stub(request.Request.prototype, 'end', function(callback) {
        callback(null, response);
      });
    });

    after(function() {
      AppDispatcher.dispatch.restore();
      request.Request.prototype.end.restore();
    });

    describe('REQUEST Methods', function() {
      it('GET request', function() {
        BaseActions.get(url, actionType, token);
        expect(AppDispatcher.dispatch.withArgs({
          actionType: actionType,
          data: response.body
        }).called).to.equal(true);
      });
      it('POST request', function() {
        BaseActions.post(url, data, actionType, token);
        expect(AppDispatcher.dispatch.withArgs({
          actionType: actionType,
          data: response.body
        }));
      });
      it('PUT request', function() {
        BaseActions.put(url, data, actionType, token);
        expect(AppDispatcher.dispatch.withArgs({
          actionType: actionType,
          data: response.body
        }));
      });
      it('DELETE request', function() {
        BaseActions.delete(url, actionType, token);
        expect(AppDispatcher.dispatch.withArgs({
          actionType: actionType,
          data: response.body
        }));
      });
    });
  });
})();
