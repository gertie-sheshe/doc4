(function() {
  'use strict';
  var UserActions = require('../../../../app/scripts/actions/UserActions'),
  UserStore = require('../../../../app/scripts/stores/UserStore'),
  DocumentStore = require('../../../../app/scripts/stores/DocumentStore'),
  localStorage = require('localStorage'),
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Document = require('../../../../app/scripts/components/Documents/Document.jsx');

  describe('Document', function() {

    var doc = [{
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
    }];
    it('renders the Document component', function() {
      var document = enzyme.mount(<Document params={{id: '56e86b2141aa0bef3da11e58'}}/>);
    });
    it('Component has the correct states', function() {
      var document = enzyme.shallow(<Document params={{id: '76868'}} documents = {doc} />);
      expect(document.state().document).to.eql([]);
      expect(document.state().updatedDoc.title).to.eql('');
      expect(document.state().updatedDoc.content).to.eql('');
      expect(document.state().updatedDoc.access).to.eql('');
    });
    it('Calls the selected doc changelistener', function() {
      sinon.spy(DocumentStore, 'getSelectedDoc');
      enzyme.mount(<Document params={{id: '76868'}} />);
      DocumentStore.setSelectedDoc({
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
      });
      expect(DocumentStore.getSelectedDoc.called).to.equal(true);
      var selectedDoc = DocumentStore.getSelectedDoc();
      expect(selectedDoc._id).to.equal('56e86b2141aa0bef3da11e58')
      expect(selectedDoc.title).to.equal('Eight')
      expect(selectedDoc.content).to.equal('221B Baker Street')
      DocumentStore.getSelectedDoc.restore();
    });
  });
})();
