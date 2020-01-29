import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../redux/user/user.selectors';

import Header from './LandingPage/Header';
import Landing from './LandingPage/LandingPage.js';
// import { supportsHistory } from 'history/DOMUtils';
// import NotFound from './components/NotFound/NotFound.js';
// import Document from './components/Documents/Document.js';
// import Create from './components/Documents/Create.js';
// import Profile from './components/Profile/Profile.js';
// import Edit from './components/Profile/Edit.js';
import Auth from './Authentication/Auth';
// import Update from './components/Documents/Update.js';
// import Dashboard from './components/Dashboard/Dashboard.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.currentUser} />
        <Switch>
          <Route exact path="/" render={Landing} />
          <Route exact path="/auth" render={props => <Auth {...props} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
