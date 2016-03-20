(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    return (
      <div className="mdl-grid">
        <form action="post" className="mdl-cell mdl-cell--10-col mdl-cell--2-offset  mdl-cell--1-offset-phone">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="uname" name="username" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="uname">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="password" id="pword" name="password" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="pword">Password</label>
          </div>
          </form>
          <div className="mdl-cell--9-col mdl-cell--2-offset mdl-cell--1-offset-phone">
              <button id="login" type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.onClick}>Log In</button>
          </div>
      </div>
    );
  }
});
})();
