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
          console.log('BASI KWA DISPATCHER NDIO HAO SISI', result);
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

    post: function(url, data, actionType, token) {
      request
        .post(url)
        .set('x-access-token', token)
        .send(data)
        .end(function(err, result) {
          console.log('DATA', data);
          console.log('DATA', result.body);
          AppDispatcher.dispatch({
            actionType: actionType,
            data: result.body
          });
        });
    }
  };
})();
