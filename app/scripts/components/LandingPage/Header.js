import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = {
    logout: '',
    profile: '',
    create: '',
    dashboard: '',
    buttonClass: '',
    sidenav: {
      link1: 'Home',
      link2: 'About',
      link3: 'Contact Us',
      link4: 'Social',
    },
  };

  componentDidMount() {
    const { user } = this.props;

    console.log('OLAAA PROOOPS', user);

    if (user) {
      this.setState({
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
      });
    }
  }

  logout() {
    // Action to logout
  }

  render() {
    return (
      <div>
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
                    <div id="headerbutton" className={this.state.buttonClass}>
                      <div id="createdoc" className="material-icons">
                        {this.state.create}
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
                        {this.state.dashboard}
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
                        {this.state.profile}
                      </i>
                      <div className="mdl-tooltip" htmlFor="profilelink">
                        Profile
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/logout">
                  <div className="mdl-cell mdl-cell--3-col mdl-cell--hide-phone mdl-cell--hide-tablet">
                    <div
                      id="logout"
                      id="headerbutton"
                      className={this.state.buttonClass}
                      onClick={this.logout}
                    >
                      <i id="logoutlink" className="material-icons">
                        {this.state.logout}
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

export default Header;
