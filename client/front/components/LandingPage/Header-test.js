(function() {
  'use strict';
  var React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  browserHistory = require('react-router').browserHistory,
  Header = require('../../../../app/scripts/components/LandingPage/Header.jsx');

  describe('Header', function() {

    it('renders the Landing component', function() {
      var header = enzyme.shallow(<Header />);
      expect(header.find('.mdl-layout__header')).to.have.length(1);
    });
    it('Renders accurate content', function() {
      expect(enzyme.shallow(<Header />).text()).to.have.string('Title');
    });
    it('Renders child components', function() {
      var header = enzyme.shallow(<Header />);
      // console.log(header.debug());
      expect(header.find('.mdl-layout__header')).to.have.length(1);
      expect(header.find('.mdl-layout-spacer')).to.have.length(1);
      expect(header.find('.mdl-layout__drawer')).to.have.length(1);
      expect(header.find('.mdl-navigation')).to.have.length(1);
    });
    it('Component has the correct states', function() {
      var header = enzyme.shallow(<Header />);
      expect(header.state().logout).to.eql('');
      expect(header.state().profile).to.eql('');
      expect(header.state().create).to.eql('');
      expect(header.state().buttonClass).to.eql('');
    });
    it('calls componentDidMount', function() {
    sinon.spy(Header.prototype, 'componentDidMount');
    enzyme.mount(<Header />);
    expect(Header.prototype.componentDidMount.calledOnce).to.equal(true);
    Header.prototype.componentDidMount.restore();
    });
    it('Calls logout function', function() {
      var header = enzyme.mount(<Header />);
      var instance = header.instance();
      sinon.stub(browserHistory, 'push').returns(true);
      header.find('#logout').simulate('click');
      expect(browserHistory.push.called).to.equal(true);
      browserHistory.push.restore();
    });
  });
})();
