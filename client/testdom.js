/* setup.js */

var jsdom = require('jsdom');
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

var exposedProperties = ['window', 'navigator', 'document'];

global.document = doc;
global.window = document.defaultView;
global.window.$ = require('jquery');
global.window.$.fn.sideNav = function() {
  return;
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
