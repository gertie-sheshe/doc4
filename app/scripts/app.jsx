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
    Main = require('./components/LandingPage/Main.jsx'),
    Landing = require('./components/LandingPage/LandingPage.jsx'),
    NotFound = require('./components/NotFound/NotFound.jsx'),
    Dashboard = require('./components/Dashboard/Page.jsx');

    ReactDOM.render((
      <Router history={createBrowserHistory()}>
        <Route path="/" component={Main} >
          <IndexRoute component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    ), document.getElementById('ui'));
})();
