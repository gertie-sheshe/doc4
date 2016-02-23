(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');


  var Dashboard = new React.createClass({
    mixins: [History],

    log: function() {
      console.log('Clicked');
    },

    componentDidMount: function() {
      var token = localStorage.getItem('x-access-token');
      console.log(token);
      UserAction.decode(token);
      UserStore.addChangeListener(this.getDecoded);
    },

    getDecoded: function() {
      var decode = UserStore.getDecodedData();
      console.log('DECODE', decode);
      if (decode.message === 'Not Authenticated') {
        toastr.error('What\'s the password?', {timeout: 3000});
        this.history.pushState(null, '/');
      }
    },
    render: function() {
      return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
          mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">doc 4.0</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <div id="add" className="icon material-icons">add</div>
              <div className="mdl-tooltip" htmlFor="add">
                Create Document
              </div>
              <div id="profile" className="icon material-icons">person</div>
              <div className="mdl-tooltip" htmlFor="profile">
                My Profile
              </div>
              <div id="logout" className="icon material-icons">launch</div>
              <div className="mdl-tooltip" htmlFor="logout">
                Logout
              </div>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">users</span>
          <nav className="mdl-navigation">
            <ul className="demo-list-icon mdl-list">
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Bryan Cranston
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Aaron Paul
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Gertie Sheshe
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Joan Ngatia
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Bob Odenkirk
                </span>
              </li>
              <li className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  Bob Odenkirk
                </span>
              </li>
            </ul>
           </nav>
         </div>
        <main className="mdl-layout__content">
          <h2>My Documents</h2>
          <Documents/>
        </main>
    </div>
      );
    }
  });
  module.exports = Dashboard;
})();
