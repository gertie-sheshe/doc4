(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    return (
      <div className="mdl-grid">
        <form action="post" onSubmit={this.props.onClick} className="mdl-grid mdl-cell mdl-cell--10-col mdl-cell--2-offset mdl-cell--1-offset-phone">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="fname" name="firstname" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="fname">First Name</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="lname" name="lastname" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="lname">Last Name</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="uname" name="username" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="uname">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input className="mdl-textfield__input" type="text" id="email" name="email" onChange={this.props.onChange}/>
            <label className="mdl-textfield__label" htmlFor="email">Email</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input className="mdl-textfield__input" type="password" id="pword" name="password" onChange={this.props.onChange}/>
            <label className="mdl-textfield__label" htmlFor="pword" required="true">Password</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <div className="mdl-grid">
              <h6>Select Role: </h6>
              <div className="mdl-cell--12-col radio">
                <input id="admin" type="radio" name="role" value="Admin" onChange={this.props.onChange}/>
                <label htmlFor="admin">&nbsp; Admin</label>
              </div>
              <div className="mdl-cell--12-col radio">
                <input id="staff" type="radio" name="role" value="Staff" onChange={this.props.onChange}/>
                  <label htmlFor="staff">&nbsp; Staff </label>
              </div>
              <div className="mdl-cell--12-col radio">
                <input id="viewer" type="radio" defaultChecked name="role" value="Viewer" onChange={this.props.onChange}/>
                  <label htmlFor="viewer">&nbsp; Viewer</label>
              </div>
            </div>
            </div>
            <div className="mdl-cell--12-col">
                <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" >Sign Up</button>
            </div>
          </form>
      </div>
    );
  }
});
})();
