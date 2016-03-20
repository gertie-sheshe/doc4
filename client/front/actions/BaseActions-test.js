(function() {
  'use strict';
  var sinon = require('sinon'),
  expect = require('chai').expect,
  request = require('superagent'),
  AppDispatcher = require('../../../app/scripts/dispatcher/AppDispatcher.js'),
  BaseActions = require('../../../app/scripts/actions/BaseActions');

  describe('Base Actions', function() {
    var token = 'gerrarahia',
    actionType = 'ACTION_TYPE',
    response = {
      body: {
        '_id': '56e86b2141aa0bef3da11e58',
        'title': 'Eight',
        'content': '221B Baker Street',
        'ownerId': '56e86b2141aa0bef3da11e50',
        'owner': 'Kachuna',
        'typeId': '56e86b2141aa0bef3da11e49',
        'lastModified': '2016-03-15T20:05:53.943Z',
        'dateCreated': '2016-03-09T20:05:53.941Z',
        'accessId': '56e86b2141aa0bef3da11e4d',
        '__v': 0,
        'accessType': 'None'
      },
      status: 400
    },
    url = 'one/two',
    data = {
      '_id': '56e86b2141aa0bef3da11e58',
      'title': 'Eight',
      'content': '221B Baker Street',
      'ownerId': '56e86b2141aa0bef3da11e50',
      'owner': 'Kachuna',
      'typeId': '56e86b2141aa0bef3da11e49',
      'lastModified': '2016-03-15T20:05:53.943Z',
      'dateCreated': '2016-03-09T20:05:53.941Z',
      'accessId': '56e86b2141aa0bef3da11e4d',
      '__v': 0,
      'accessType': 'None'
    };

    beforeEach(function() {
      sinon.stub(AppDispatcher, 'dispatch').returns(true);
      sinon.stub(request.Request.prototype, 'end', function(callback) {
        callback(null, response);
      });
    });

    afterEach(function() {
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
