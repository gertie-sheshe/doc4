(function() {
  'use strict';

  var React = require('react');
  var Dashboard = require('./Dashboard.jsx');

    module.exports = React.createClass({
      propTypes: {
        children: React.PropTypes.element.isRequired
      },
      render: function() {
        return (
          <div>
            <Dashboard />
            <div>
              {this.props.children}
            </div>
          </div>
        );
      }
    });
})();
