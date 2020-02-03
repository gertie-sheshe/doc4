import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../redux/user/user.selectors';

import Header from './LandingPage/Header';
import Landing from './LandingPage/LandingPage.js';
// import NotFound from './components/NotFound/NotFound.js';
import Document from './Documents/Document';
import Create from './Documents/Create';
import Profile from './Profile/Profile.js';
import Edit from './Profile/Edit';
import Auth from './Authentication/Auth';
import Update from './Documents/Update.js';
import Dashboard from './Dashboard/Dashboard.js';

class App extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={Landing} />
          <Route exact path="/auth" render={props => <Auth {...props} />} />
          <Route
            exact
            path="/dashboard"
            render={props => <Dashboard {...props} />}
          />
          <Route
            exact
            path="/dashboard/:id"
            render={props => <Document {...props} />}
          />
          <Route
            exact
            path="/create"
            render={props =>
              currentUser ? <Create {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/update"
            render={props =>
              currentUser ? <Update {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/edit"
            render={props =>
              currentUser ? <Edit {...props} /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/profile"
            render={props =>
              currentUser ? <Profile {...props} /> : <Redirect to="/" />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
