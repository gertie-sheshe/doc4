(function() {
  'use strict';
  var React = require('react'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  enzyme = require('enzyme'),
  UserStore = require('../../../../app/scripts/stores/UserStore'),
  browserHistory = require('react-router').browserHistory,
  Header = require('../../../../app/scripts/components/LandingPage/Header.jsx');

  describe('Header', function() {

    it('renders the Header component', function() {
      var header = enzyme.shallow(<Header />);
      expect(header.find('.mdl-layout__header')).to.have.length(1);
    });
    it('Renders accurate content', function() {
      expect(enzyme.shallow(<Header />).text()).to.have.string('Doc4');
    });
    it('Renders child components', function() {
      var header = enzyme.shallow(<Header />);
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
    it('calls decoded changeListener', function() {
    enzyme.mount(<Header />);
    sinon.spy(UserStore, 'getDecodedData');
    UserStore.setDecodedData({
      '_id': '56e8b497af2f13033f1d66aa',
      'roleId': '56e8b496af2f13033f1d66a7',
      'password': null,
      'loggedIn': true,
      'email': 'asingwa@gmail.com',
      'username': 'Kidoti',
      '__v': 0,
      'name': {
        'last': 'Asingwa',
        'first': 'Cynthia'
      }
    });
    expect(UserStore.getDecodedData.called).to.equal(true);
    var decodedData = UserStore.getDecodedData();
    expect(decodedData.username).to.equal('Kidoti');
    expect(decodedData.name.first).to.equal('Cynthia');
    expect(decodedData.name.last).to.equal('Asingwa');
    UserStore.getDecodedData.restore();
    });
    it('Calls logout function on click', function() {
      var header = enzyme.mount(<Header />);
      var instance = header.instance();
      sinon.stub(browserHistory, 'push').returns(true);
      header.find('#logout').simulate('click');
      expect(browserHistory.push.called).to.equal(true);
      browserHistory.push.restore();
    });
  });
})();
