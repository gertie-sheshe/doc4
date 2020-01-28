import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import Header from './LandingPage/Header';
import Landing from './LandingPage/LandingPage.js';
// import NotFound from './components/NotFound/NotFound.js';
// import Document from './components/Documents/Document.js';
// import Create from './components/Documents/Create.js';
// import Profile from './components/Profile/Profile.js';
// import Edit from './components/Profile/Edit.js';
// import Auth from './components/Authentication/Auth.js';
// import Update from './components/Documents/Update.js';
// import Dashboard from './components/Dashboard/Dashboard.js';

class App extends Component {
  componentDidMount() {
    console.log('OLAAA', this.props);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={Landing} />
          <Route exact path="/auth" render={Auth} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
