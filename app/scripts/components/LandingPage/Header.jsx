(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var browserHistory = require('react-router').browserHistory;
    module.exports = React.createClass({
      getInitialState: function() {
        return {
          logout: '',
          profile: '',
          create: '',
          buttonClass: ''
        };
      },
      componentDidMount: function() {
        this.handleSession();
      },

      handleSession: function() {
      var token = localStorage.getItem('x-access-token');
      if(token) {
        this.setState({
          logout: 'Logout',
          profile: 'Profile',
          create: 'Create Doc',
          buttonClass: "mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect headerbutton"
        });
      }
      },

      logout: function() {
        localStorage.removeItem('x-access-token');
        browserHistory.push('/');
        // window.location.assign('/');
      },

      render: function() {
        return (
          <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
             <div className="mdl-layout__header-row">
               <span className="mdl-layout-title">Doc4</span>
               <div className="mdl-layout-spacer"></div>
               <div className="mdl-grid">
                 <div className="mdl-cell mdl-cell--4-col">
                   <a href="/create" className={this.state.buttonClass} >
                     {this.state.create}
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--4-col">
                   <a href="/profile"  className={this.state.buttonClass} >
                     {this.state.profile}
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--4-col">
                   <a id="logout" className={this.state.buttonClass} onClick={this.logout}>
                     {this.state.logout}
                   </a>
                 </div>
               </div>
             </div>
           </header>
           <div className="mdl-layout__drawer">
             <span className="mdl-layout-title">Doc4</span>
             <nav className="mdl-navigation">
               <a className="mdl-navigation__link" href="/create">{this.state.create}</a>
               <a className="mdl-navigation__link" href="/profile">{this.state.profile}</a>
               <a className="mdl-navigation__link" onClick={this.logout}>{this.state.logout}</a>
             </nav>
           </div>
          <main className="mdl-layout__content">
            {this.props.children}
          </main>
          </div>
        </div>
        );
      }
    });
})();
