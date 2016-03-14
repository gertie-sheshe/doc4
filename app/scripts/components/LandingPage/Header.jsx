(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var History = require('react-router').History;
    module.exports = React.createClass({
      mixins: [History],
      getInitialState: function() {
        return {
          link: '',
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
          link: 'Logout',
          buttonClass: "mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect"
        });
      } else {
        // window.location.assign('/dashboard');
      }
      },

      logout: function() {
        localStorage.removeItem('x-access-token');
        window.location.assign('/');
        // this.history.pushState(null, '/');
      },

      render: function() {
        return (
          <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
             <div className="mdl-layout__header-row">
               <span className="mdl-layout-title">Title</span>
               <div className="mdl-layout-spacer"></div>
                 <a id="logout" className={this.state.buttonClass} onClick={this.logout}>
                    {this.state.link}
                 </a>
             </div>
           </header>
           <div className="mdl-layout__drawer">
             <span className="mdl-layout-title">Title</span>
             <nav className="mdl-navigation">
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
               <a className="mdl-navigation__link" href="">Link</a>
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
