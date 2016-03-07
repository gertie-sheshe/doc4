(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var request = require('superagent');

  module.exports= {
    get: function(url, actionType, token) {
      request
        .get(url)
        .set('x-access-token', token)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    getUser: function(url, token) {
      request
        .get(url)
        .set('x-access-token', token)
        .end(function(err, result) {
          return result;
        });
    },

    put: function(url, data, actionType, token) {
      console.log('put request', data);
      request
        .put(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, result) {
          console.log('PUT', result);
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    delete: function(url, actionType, token) {
      request
        .delete(url)
        .set('x-access-token', token)
        .end(function(err, result) {
          console.log('CONFUSION', result.body);
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    post: function(url, data, actionType, token) {
      request
        .post(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    }
  };
})();
