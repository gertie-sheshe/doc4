(function() {
  'use strict';
  var React = require('react'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    enzyme = require('enzyme'),
    Landing = require('../../../../app/scripts/components/LandingPage/LandingPage.jsx');

  describe('Landing', function() {
    it('renders the Landing component', function() {
      var landing = enzyme.shallow(< Landing />);
      expect(landing.find('.mdl-button')).to.have.length(1);
    });
    it('Renders accurate content', function() {
      expect(enzyme.shallow(< Landing />).text()).to.have.string('Doc 4.0');
      expect(enzyme.shallow(< Landing />).text()).to.have.string('The place to go to create, manage and edit documents. Get started today ');
    });
  });
})();
