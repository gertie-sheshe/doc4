(function() {
  'use strict';
  var documentsPath = '../../../../app/scripts/components/Documents/Documents.jsx',
  localStorage = require('localStorage'),
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Documents = require(documentsPath);

  describe('Documents', function() {
    var doc = [{
    "_id": "56e86b2141aa0bef3da11e58",
    "title": "Eight",
    "content": "221B Baker Street",
    "ownerId": "56e86b2141aa0bef3da11e50",
    "owner": "Kachuna",
    "typeId": "56e86b2141aa0bef3da11e49",
    "lastModified": "2016-03-15T20:05:53.943Z",
    "dateCreated": "2016-03-09T20:05:53.941Z",
    "accessId": "56e86b2141aa0bef3da11e4d",
    "__v": 0,
    "accessType": "None"
  },
  {
      "_id": "56e86b2141aa0bef3da11e56",
      "title": "Dennis the Menace",
      "content": "Mischievous Dennis Mitchell makes the life of neighbor George Wilson miserable with his overactive energy and inadvertent troublemaking. Because his parents must leave town for work and cannot find a baby sitter for Dennis, they ask George and his wife,  Martha (Joan Plowright), to take care of him. But when burglar Switchblade Sam (Christopher Lloyd) breaks in to steal George's gold coin collection, he takes Dennis as a hostage, and crusty George must save the boy.",
      "ownerId": "56e86b2141aa0bef3da11e4e",
      "owner": "Sheshe",
      "typeId": "56e86b2141aa0bef3da11e49",
      "lastModified": "2016-03-15T20:05:53.943Z",
      "dateCreated": "2016-03-15T20:05:53.943Z",
      "accessId": "56e86b2141aa0bef3da11e4d",
      "__v": 0,
      "accessType": "None"
    }];
    it('renders the Documents component', function() {
      var documents = enzyme.shallow(<Documents documents = {doc} />);
      expect(documents.find('.mdl-grid')).to.have.length(1);
      expect(documents.find('.mdl-card__title-text')).to.have.length(2);
      expect(documents.find('.mdl-card__title')).to.have.length(2);
    });
  });
})();
