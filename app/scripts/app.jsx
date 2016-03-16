(function() {
  'use strict';
  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Redirect = ReactRouter.Redirect,
    IndexRoute = ReactRouter.IndexRoute,
    Route = ReactRouter.Route,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Header = require('./components/LandingPage/Header.jsx'),
    Landing = require('./components/LandingPage/LandingPage.jsx'),
    NotFound = require('./components/NotFound/NotFound.jsx'),
    Document = require('./components/Documents/Document.jsx'),
    Create = require('./components/Documents/Create.jsx'),
    Profile = require('./components/Profile/Profile.jsx'),
    Auth = require('./components/Authentication/Auth.jsx'),
    Update = require('./components/Documents/Update.jsx'),
    Dashboard = require('./components/Dashboard/Dashboard.jsx');

    ReactDOM.render((
      <Router history={createBrowserHistory()}>
        <Route path="/" component={Header} >
          <IndexRoute component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/update" component={Update} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route path="/create" component={Create} />
          <Route path="/:id" component={Document} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    ), document.getElementById('ui'));
})();
