(function() {
  'use strict';
  var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Redirect = ReactRouter.Redirect,
    IndexRoute = ReactRouter.IndexRoute,
    Route = ReactRouter.Route,
    Landing = require('./components/LandingPage/LandingPage.jsx');

    ReactDOM.render((
      <Router>
        <Route  path="/home" component={Landing}>
            <IndexRoute component={Landing} />
        </Route>
      </Router>
    ), document.getElementById('ui'));
})();
