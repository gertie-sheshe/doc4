(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var SignUp = require('../SignUpForm/SignUpForm.jsx');
  var Login = require('../LoginForm/LoginForm.jsx');
  var UserStore = require('../../stores/UserStore');
  var UserAction = require('../../actions/UserActions');
  var toastr = require('toastr');

  var Landing = new React.createClass({
    componentDidMount: function() {

    },

    laugh: function() {
      console.log('mama');
    },

    getInitialState: function() {
      return {
        user: {
          username: '',
          password: ''
        }
      };
    },

    handleLoginAction: function(event) {
      console.log(this.state.user);
      event.preventDefault();
      UserAction.login(this.state.user);
    },

    fetchValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.user[field] = value;
      this.setState({user: this.state.user});
    },

    render: function() {
      return (
        <div className="img">
          <div id="back"></div>
          <div className='content'>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <h1>Doc 4.0 </h1>
                <h2>The place to go to create, manage and edit documents. Get started today </h2>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <button id="show-dialog" type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">GET STARTED</button>
                <dialog className="mdl-dialog">
                  <h3 class="mdl-dialog__title">Enter Credentials</h3>
                  <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                      <a href="#signup-panel" className="mdl-tabs__tab ">SIGN UP</a>
                      <a href="#login-panel" className="mdl-tabs__tab">LOGIN</a>
                    </div>
                    <div className="mdl-tabs__panel is-active" id="signup-panel">
                      <SignUp onChange={this.fetchValues} onSubmit={this.handleLoginAction}/>
                   </div>
                   <div className="mdl-tabs__panel" id="login-panel">
                     <Login onChange={this.fetchValues} onSubmit={this.handleLoginAction}/>
                  </div>
                   <div className="mdl-grid">
                     <div className="mdl-cell mdl-cell--6-col">
                       <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.handleLoginAction}>Agree</button>
                     </div>
                     <div className="mdl-cell mdl-cell--6-col">
                       <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Cancel</button>
                     </div>
                   </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
  module.exports = Landing;
})();
