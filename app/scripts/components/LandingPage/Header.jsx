(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../stores/UserStore');
  var UserAction = require('../../actions/UserActions');
    module.exports = React.createClass({
      contextTypes: {
        router: React.PropTypes.object
      },
      getInitialState: function() {
        return {
          logout: '',
          profile: '',
          create: '',
          buttonClass: ''
        };
      },
      componentDidMount: function() {
        UserStore.addChangeListener(this.decoded, 'decode');
        // this.handleToken();
      },

      handleToken: function() {
        var token = localStorage.getItem('x-access-token');
        if(token) {
          this.setState({
            logout: 'Logout',
            profile: 'Profile',
            create: 'Create Doc',
            buttonClass: "mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect headerbutton"
          });
        }
        console.log('Current state', this.state.logout);
      },

      decoded: function() {
        var decoded = UserStore.getDecodedData();
        console.log('Listening header', decoded);
        if (decoded.message === 'You are not authenticated user') {
          toastr.error('You must be logged in bitte :)', {timeout: 3000});
          this.context.router.push('/');
          // browserHistory.push('/');
          // window.location.assign('/');
          // browserHistory.push('/');
        } if (decoded.message === 'Failed to Authenticate. You are not logged in.') {
          this.context.router.push('/');
        } if (!decoded.message && decoded) {
          this.setState({
            logout: 'Logout',
            profile: 'Profile',
            create: 'Create Doc',
            buttonClass: "mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect headerbutton"
          });
        }
      },

      profile: function() {
        this.context.router.push('/profile');
      },

      create: function() {
        this.context.router.push('/create');
      },

      home: function() {
        this.context.router.push('/');
      },

      logout: function() {
        localStorage.removeItem('x-access-token');
        var token = localStorage.getItem('x-access-token');
        if(!token) {
          this.setState({
            logout: '',
            profile: '',
            create: '',
            buttonClass: ''
          });
        }
        this.context.router.push('/');
        // browserHistory.push('/');
        // window.location.assign('/');
      },

      render: function() {
        return (
          <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
             <div className="mdl-layout__header-row">
               <a id="home" className="mdl-layout-title" onClick={this.home}>Doc4</a>
               <div className="mdl-layout-spacer"></div>
               <div className="mdl-grid">
                 <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a className={this.state.buttonClass} onClick={this.create}>
                     {this.state.create}
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                   <a className={this.state.buttonClass} onClick={this.profile}>
                     {this.state.profile}
                   </a>
                 </div>
                 <div className="mdl-cell mdl-cell--4-col mdl-cell--hide-phone mdl-cell--hide-tablet">
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
