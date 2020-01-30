import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { logout } from '../../redux/user/user.actions';

class Header extends Component {
  state = {
    logout: 'launch',
    profile: 'person',
    create: 'add',
    dashboard: 'dashboard',
    buttonClass: 'mdl-button close mdl-js-button',
    sidenav: {
      link1: 'Create',
      link2: 'Profile',
      link3: 'Dashboard',
      link4: 'Logout',
    },
  };

  componentDidMount = () => {
    console.log('POOOW', this.props);
  };

  logout = () => {
    // Action to logout
    const { logout } = this.props;
    logout();
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div id="header">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <Link to="/">
                <div id="home" className="mdl-layout-title">
                  Doc4
                </div>
              </Link>
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-grid">
                <Link to="/create">
                  <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                    <div
                      id="headerbutton"
                      className={currentUser ? this.state.buttonClass : ''}
                    >
                      <div id="createdoc" className="material-icons">
                        {currentUser ? this.state.create : ''}
                      </div>
                      <div className="mdl-tooltip" htmlFor="createdoc">
                        Create
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/dashboard">
                  <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                    <div id="headerbutton" className={this.state.buttonClass}>
                      <i id="dashlink" className="material-icons">
                        {currentUser ? this.state.dashboard : ''}
                      </i>
                      <div className="mdl-tooltip" htmlFor="dashlink">
                        Dashboard
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/profile">
                  <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                    <div id="headerbutton" className={this.state.buttonClass}>
                      <i id="profilelink" className="material-icons">
                        {currentUser ? this.state.profile : ''}
                      </i>
                      <div className="mdl-tooltip" htmlFor="profilelink">
                        Profile
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/">
                  <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                    <div
                      id="logout"
                      id="headerbutton"
                      className={this.state.buttonClass}
                      onClick={this.logout}
                    >
                      <i id="logoutlink" className="material-icons">
                        {currentUser ? this.state.logout : ''}
                      </i>
                      <div className="mdl-tooltip" htmlFor="logoutlink">
                        Logout
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, { logout })(Header);
