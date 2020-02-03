import React, { Component } from 'react';
import M from 'materialize-css';

import SignUpForm from '../SignUpForm/SignUpForm.js';
import LoginForm from '../LoginForm/LoginForm';

class Auth extends Component {
  componentDidMount() {
    M.Tabs.init(this.Auth);
  }
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
              <div className="row">
                <div className="col s12">
                  <ul
                    ref={Tabs => {
                      this.Auth = Tabs;
                    }}
                    className="tabs"
                  >
                    <li className="tab col s6">
                      <a href="#login_panel">LOGIN</a>
                    </li>
                    <li className="tab col s6">
                      <a className="active" href="#signup_panel">
                        SIGNUP
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="login_panel" className="col s12">
                  <LoginForm history={this.props.history} />
                </div>
                <div id="signup_panel" className="col s12">
                  <SignUpForm history={this.props.history} />
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
