import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginStartAsync } from '../../redux/user/user.actions';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { loginStartAsync, history } = this.props;
    loginStartAsync(this.state, history);
  };

  render() {
    return (
      <div className="mdl-grid">
        <form
          action="post"
          onSubmit={this.handleSubmit}
          className="mdl-cell mdl-cell--10-col mdl-cell--2-offset  mdl-cell--1-offset-phone"
        >
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              type="text"
              id="uname"
              name="username"
              required
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="uname">
              Username
            </label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input
              className="mdl-textfield__input"
              type="password"
              id="pword"
              name="password"
              required
              onChange={this.handleChange}
            />
            <label className="mdl-textfield__label" htmlFor="pword">
              Password
            </label>
          </div>
          <div>
            <button
              id="login"
              type="submit"
              className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { loginStartAsync })(LoginForm);
