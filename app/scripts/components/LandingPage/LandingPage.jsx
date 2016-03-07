(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var SignUp = require('../SignUpForm/SignUpForm.jsx');
  var Login = require('../LoginForm/LoginForm.jsx');
  var UserStore = require('../../stores/UserStore');
  var History = require('react-router').History;
  var UserAction = require('../../actions/UserActions');
  var toastr = require('toastr');
  var Select = require('react-select');

  var Landing = new React.createClass({
    mixins: [History],

    getInitialState: function() {
      return {
        user: {
          username: '',
          password: ''
        },

        info: {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          role: ''
        },

        lo : '',

        roles: [
          {
            value: 'Admin', label: 'Admin'
          }, {
            value: 'Viewer', label: 'Viewer'
          }, {
            value: 'Staff', label: 'Staff'
          }
        ]
      };
    },

    componentDidMount: function() {
      UserStore.addChangeListener(this.handleLogin, 'login');
      UserStore.addChangeListener(this.handleSignUp, 'signup');
      // this.dialog();
    },

    handleSignUp: function() {
      var info = UserStore.getSignUpData();
      console.log('BUUG', info);
      if(info.error) {
        toastr.warning('Sign up failed. This Email or Username is already in use', {timeout: 5000});
      } else {
        toastr.success('Success');
      }
    },

    dialog: function() {
      var landingDialog = document.querySelector('#landing-dialog');
      console.log('dialog', landingDialog);
      var showDialogButton = document.querySelector('#show-dialog');
      if (!landingDialog.showModal) {
        dialogPolyfill.registerDialog(landingDialog);
      }
      showDialogButton.addEventListener('click', function() {
        landingDialog.showModal();
      });
      landingDialog.querySelector('.close').addEventListener('click', function() {
        landingDialog.close();
      });
    },

    handleRoleSelect: function(value) {
      console.log('HAIJAJAJA', this.state);
      console.log('VIOLIIN', value);
      var s = value;
      console.log('Pia hii?', s);
      if(value) {
        var name = value;
        this.setState({
          lo: s
        }, this.handleRoleSelect);
      }
    },

    handleLogin: function() {
      var data = UserStore.getLoginData();
       if(data.error) {
        toastr.warning('Wrong username and password combination', {timeout: 5000});
      } else {
        //local storage token
        localStorage.setItem('x-access-token', data.token);
        console.log('We have logged in');
        // toastr.success('Success');
        // this.history.pushState(null, '/dashboard');
          window.location.assign('/dashboard');
      }
    },

    handleLoginAction: function(event) {
      var details = this.state.user;
      event.preventDefault();
      if (details.username.length < 1  || details.password.length < 1 ) {
        toastr.warning('Please fill out all the fields', {timeout: 100});
      } else {
        UserAction.login(this.state.user);
      }
    },

    handleSignUpAction: function(event) {
      var details = this.state.info;
      event.preventDefault();
      if (details.username.length < 1 || details.firstname.length < 1 ||
        details.lastname.length < 1 || details.email.length < 1 ||
        details.password.length < 1) {
        toastr.warning('Please fill out all the fields', {timeout: 1000});
      }
       else {
        UserAction.signup(this.state.info);
      }
    },

    fetchValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.info[field] = value;
      this.state.user[field] = value;
      this.setState({user: this.state.user, info: this.state.info});
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
                <dialog id="landing-dialog" className="mdl-dialog">
                  <h3 class="mdl-dialog__title">Enter Credentials</h3>
                  <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                      <a href="#signup-panel" className="mdl-tabs__tab ">SIGN UP</a>
                      <a href="#login-panel" className="mdl-tabs__tab">LOGIN</a>
                    </div>
                    <div className="mdl-tabs__panel is-active" id="signup-panel">
                      <SignUp
                        onChange={this.fetchValues}
                        onSubmit={this.handleSignUpAction}
                        onClick={this.handleSignUpAction}
                        roles={this.state.roles}
                        info={this.state.info}
                        select={this.handleRoleSelect}/>
                   </div>
                   <div className="mdl-tabs__panel" id="login-panel">
                     <Login
                      onChange={this.fetchValues}
                      onSubmit={this.handleLoginAction}
                      onClick={this.handleLoginAction}/>
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
