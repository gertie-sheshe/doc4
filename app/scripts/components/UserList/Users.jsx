(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({
  render: function() {
    var renderUser = function(user) {
      return (
        <li className="mdl-list__item" key={user._id}>
          <span className="mdl-list__item-primary-content">
            <i className="material-icons mdl-list__item-icon">person</i>
            {user.username}
          </span>
        </li>
      );
    };
    return(<div>{this.props.users.map(renderUser)}</div>)
  }
});
})();
