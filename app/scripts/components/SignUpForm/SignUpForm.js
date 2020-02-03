import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signUpStartAsync } from '../../redux/user/user.actions';

class SignUpForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    role: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { signUpStartAsync, history } = this.props;

    console.log('STATE', this.state);
    signUpStartAsync(this.state, history);
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="mdl-grid">
        <form
          action="post"
          onSubmit={this.handleSubmit}
          className="mdl-grid mdl-cell mdl-cell--10-col mdl-cell--2-offset mdl-cell--1-offset-phone"
        >
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              required
              type="text"
              id="fname"
              name="firstname"
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="fname">
              First Name
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              required
              type="text"
              id="lname"
              name="lastname"
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="lname">
              Last Name
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              required
              type="text"
              id="uname"
              name="username"
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="uname">
              Username
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              required
              type="email"
              id="email"
              name="email"
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              required
              type="password"
              id="pword"
              name="password"
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="pword" required>
              Password
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <div className="mdl-grid">
              <h6>Select Role: </h6>
              <div className="mdl-cell--12-col radio">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    onInput={this.handleChange}
                  />
                  <span>Admin</span>
                </label>
              </div>
              <div className="mdl-cell--12-col radio">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Staff"
                    onInput={this.handleChange}
                  />
                  <span>Staff</span>
                </label>
              </div>
              <div className="mdl-cell--12-col radio">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Viewer"
                    defaultChecked
                    onInput={this.handleChange}
                  />
                  <span>Viewer</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mdl-cell--12-col">
            <button
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { signUpStartAsync })(SignUpForm);
