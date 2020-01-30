import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

class Profile extends Component {
  componentDidMount = () => {
    const { currentUser } = this.props;
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
              <form action="post">
                <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>First Name: </h5>
                    {currentUser.name.first}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Last Name: </h5>
                    {currentUser.name.last}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Username: </h5>
                    {currentUser.username}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Email: </h5>
                    {currentUser.email}
                  </div>

                  <div className="mdl-cell mdl-cell--12-col">
                    <h5>Role: </h5>
                    {currentUser.role}
                  </div>
                </div>
              </form>
            </div>

            <div className="mdl-card__actions mdl-card--border">
              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => history.push('/dashboard')}
              >
                DASHBOARD
              </a>

              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => history.push('/edit')}
              >
                EDIT
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

export default connect(mapStateToProps)(Profile);
