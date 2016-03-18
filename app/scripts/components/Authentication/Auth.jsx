(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var SignUp = require('../SignUpForm/SignUpForm.jsx');
  var Login = require('../LoginForm/LoginForm.jsx');
  var UserStore = require('../../stores/UserStore');
  var browserHistory = require('react-router').browserHistory;
  var localStorage = require('localStorage');
  var UserAction = require('../../actions/UserActions');
  var toastr = require('toastr');

  var Dashboard = new React.createClass({

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

        panel: {
          login:"mdl-tabs__panel",
          signup:"mdl-tabs__panel is-active"
        }
      };
    },
    componentDidMount: function() {
      UserStore.addChangeListener(this.handleLogin, 'login');
      UserStore.addChangeListener(this.handleSignUp, 'signup');
    },

    handleSignUp: function() {
      var info = UserStore.getSignUpData();
      if(info.error) {
        toastr.warning('Sign up failed. This Email or Username is already in use', {timeout: 5000});
      } else {
        toastr.success('Success. Please proceed by logging in :)');
        this.setState({
          panel: {
            signup: "mdl-tabs__panel",
            login: "mdl-tabs__panel is-active"
          }
        });
      }
    },
    handleLogin: function() {
      var data = UserStore.getLoginData();
       if(data.error) {
        toastr.warning('Wrong username and password combination', {timeout: 5000});
      } else {
        localStorage.setItem('x-access-token', data.token);
        // window.location.assign('/dashboard');
        browserHistory.push('/dashboard');
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
      var email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
      event.preventDefault();
      if (details.username.length < 1 || details.firstname.length < 1 ||
        details.lastname.length < 1 || details.email.length < 1 ||
        details.password.length < 1) {
        toastr.warning('Please fill out all the fields', {timeout: 1000});
      }
      if(!email.test(details.email)) {
        toastr.warning('Please enter a valid Email address', {timeout: 1000});
      }
      if(details.password.length < 8) {
        toastr.warning('Password should be 8 characters', {timeout: 1000});
      }
       else {
        UserAction.signup(this.state.info);
      }
    },

    fetchValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.info[field] = value;
      this.state.user[field] = value;
      this.setState({user: this.state.user, info: this.state.info});
    },

    render: function() {
      return (
        <div>
        <div id="auth" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
                <h3 id="credentials">Enter Credentials</h3>
                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                  <div className="mdl-tabs__tab-bar">
                    <a href="#signup-panel" className="mdl-tabs__tab ">SIGN UP</a>
                    <a href="#login-panel" className="mdl-tabs__tab">LOGIN</a>
                  </div>
                  <div className={this.state.panel.signup} id="signup-panel">
                    <SignUp
                      onChange={this.fetchValues}
                      onSubmit={this.handleSignUpAction}
                      onClick={this.handleSignUpAction}
                      info={this.state.info} />
                 </div>
                 <div className={this.state.panel.login} id="login-panel">
                   <Login
                    onChange={this.fetchValues}
                    onSubmit={this.handleLoginAction}
                    onClick={this.handleLoginAction}/>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  });
  module.exports = Dashboard;
})();
