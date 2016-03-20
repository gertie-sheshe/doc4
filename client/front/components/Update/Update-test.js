(function() {
  'use strict';
  var DocumentAction = require('../../../../app/scripts/actions/DocumentActions'),
    DocumentStore = require('../../../../app/scripts/stores/DocumentStore'),
    localStorage = require('localStorage'),
    browserHistory = require('react-router').browserHistory,
    React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    Update = require('../../../../app/scripts/components/Documents/Update.jsx');

  describe('Update', function() {

    it('renders the Update component', function() {
      var update = enzyme.mount(<Update />);
      expect(update.find('.mdl-grid')).to.have.length(2);
    });
    it('Component has the correct states', function() {
      var update = enzyme.shallow(< Update />);
      expect(update.state().document).to.eql([]);
      expect(update.state().title).to.eql('');
      expect(update.state().content).to.eql('');
    });
    it('Calls Component Will Mount', function() {
      sinon.spy(Update.prototype, 'componentWillMount');
      enzyme.mount(<Update />);
      expect(Update.prototype.componentWillMount.called).to.equal(true);
      Update.prototype.componentWillMount.restore();
    });
    it('Calls Component Did Mount', function() {
      sinon.spy(Update.prototype, 'componentDidMount');
      enzyme.mount(<Update />);
      expect(Update.prototype.componentDidMount.called).to.equal(true);
      Update.prototype.componentDidMount.restore();
    });
    it('test onclick', function() {
      var auth = enzyme.mount(<Update />);
      var instance = auth.instance();
      sinon.stub(browserHistory, 'push').returns(true);
      sinon.stub(DocumentAction, 'updateDoc').returns(true);
      auth.find('#updatedoc').simulate('click');
      expect(DocumentAction.updateDoc.called).to.equal(true);
      expect(browserHistory.push.called).to.equal(true);
      browserHistory.push.restore();
      DocumentAction.updateDoc.restore();
    });

    it('Correctly handles Field Change', function() {
     var update = enzyme.mount(<Update />);
     var event = {
       target: {
         name: 'title',
         value: 'Global'
       },
       preventDefault: function() {}
     };
     var instance = update.instance();
     sinon.spy(instance, 'fetchInputValues');
     instance.fetchInputValues(event);
     expect(update.state().updatedDoc[event.target.name]).to.eql(event.target.value);
     instance.fetchInputValues.restore();
   });
  });
})();
