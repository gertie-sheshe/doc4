import React, { Component } from 'react';

import SignUpForm from '../SignUpForm/SignUpForm.js';
import LoginForm from '../LoginForm/LoginForm';

class Auth extends Component {
  render() {
    return (
      <div>
        <div
          id="auth"
          className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet"
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
              <h3 id="credentials">Enter Credentials</h3>
              <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                <div className="mdl-tabs__tab-bar">
                  <a href="#signup-panel" className="mdl-tabs__tab ">
                    SIGN UP
                  </a>
                  <a href="#login-panel" className="mdl-tabs__tab">
                    LOGIN
                  </a>
                </div>
                <div className="mdl-tabs__panel" id="signup-panel">
                  <SignUpForm history={this.props.history} />
                </div>
                <div className="mdl-tabs__panel is-active" id="login-panel">
                  <LoginForm history={this.props.history} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
