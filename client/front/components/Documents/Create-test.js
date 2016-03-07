(function() {
  'use strict';
  var createPath = '../../../../app/scripts/components/Documents/Create.jsx',
  React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  Create = require(createPath);

  describe('Create Document', function() {

    it('renders the Landing component', function() {
      var create = enzyme.shallow(<Create />);
      console.log(create.debug());
      expect(create.find('.mdl-grid')).to.have.length(1);
    });
    // it('Renders accurate content', function() {
    //   expect(enzyme.shallow(<Landing />).text()).to.have.string('Doc 4.0');
    //   expect(enzyme.shallow(<Landing />).text()).to.have.string('The place to go to create, manage and edit documents. Get started today ');
    // });
    it('Renders child components', function() {
      var create = enzyme.shallow(<Create />);
      // console.log(landing.debug());
      expect(create.find('.mdl-card').length).to.equal(1);
      expect(create.find('.mdl-textfield').length).to.equal(2);
      expect(create.find('.mdl-button').length).to.equal(2);
      expect(create.find('#form-document').length).to.equal(1);
    });
    it('Component has the correct states', function() {
      var create = enzyme.shallow(<Create />);
      expect(create.state().document.title).to.eql('');
      expect(create.state().document.content).to.eql('');
    });
    it('Correctly handles Field Change', function() {
     var create = enzyme.mount(<Create />);
     var event = {
       target: {
         name: 'title',
         value: 'Global'
       },
       preventDefault: function() {}
     };
     var instance = create.instance();
     sinon.spy(instance, 'fetchInputValues');
     instance.fetchInputValues(event);
     expect(create.state().document[event.target.name]).to.eql(event.target.value);
     instance.fetchInputValues.restore();
   });

    // it('test onclick', function() {
    //   var create = enzyme.mount(<Create />);
    //   var instance = create.instance();
    //   sinon.stub(instance, 'saveDocument').returns(true);
    //   create.find('#createdoc').simulate('click');
    //   expect(instance.saveDocument.called).to.equal(true);
    // });
  });
})();
