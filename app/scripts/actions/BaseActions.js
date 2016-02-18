(function() {
  'use strict';
  var AppDispatcher = require('../dispatcher/AppDispatcher');
  var request = require('superagent');

  module.exports= {
    get: function(url, actionType) {
      request
        .get(url)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    put: function(url, data, actionType) {
      request
        .put(url)
        .send(data)
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    },

    delete: function(url, data, actionType) {
      request
        .delete(url)
        .send(data || {})
        .end(function(err, result) {
          AppDispatcher.dispatch({
            actionType: actionType,
            datat: result.body
          });
        });
    },

    post: function(url, data, actionType) {
      request
        .post(url)
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
