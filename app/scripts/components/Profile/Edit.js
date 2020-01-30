import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { editUserStartAsync } from '../../redux/user/user.actions';

class Edit extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    role: '',
  };
  componentDidMount = () => {
    console.log('PROOOOPS', this.props);
    const { currentUser, editUserStartAsync } = this.props;

    this.setState({
      firstname: currentUser.name.first,
      lastname: currentUser.name.last,
      email: currentUser.email,
      username: currentUser.username,
      role: currentUser.role,
    });
  };

  updateProfile = () => {
    const { editUserStartAsync, currentUser, history } = this.props;

    editUserStartAsync(currentUser.token, currentUser._id, this.state, history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { history, currentUser } = this.props;
    return (
      <div className="mdl-grid">
        <div
          id="profile"
          className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet"
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__supporting-text">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>First Name: </h6>
                  <input
                    id="inputfname"
                    className="mdl-textfield__input mdl-cell mdl-cell--12-col"
                    type="text"
                    value={this.state.firstname}
                    name="firstname"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>Last Name: </h6>
                  <input
                    id="inputlname"
                    className="mdl-textfield__input mdl-cell mdl-cell--12-col"
                    type="text"
                    value={this.state.lastname}
                    name="lastname"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>User Name: </h6>
                  <input
                    id="inputuname"
                    className="mdl-textfield__input mdl-cell mdl-cell--12-col"
                    type="text"
                    value={this.state.username}
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>Email: </h6>
                  <input
                    id="inputemail"
                    className="mdl-textfield__input mdl-cell mdl-cell--12-col"
                    type="text"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mdl-card__actions mdl-card--border">
              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={this.updateProfile}
              >
                UPDATE
              </a>

              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => history.push('/profile')}
              >
                BACK
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { editUserStartAsync })(Edit);
