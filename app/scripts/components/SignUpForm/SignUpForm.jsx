(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    return (
      <div>
        <form action="post" onSubmit={this.props.handleSignUpAction}>
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
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <div className="mdl-grid">
              <div className="mdl-cell--3-col">
                <input id="roles" type="radio" name="role" value="Admin" onChange={this.props.onChange}>Admin</input>
              </div>
              <div className="mdl-cell--3-col">
                <input id="roles" type="radio" name="role" value="Staff" onChange={this.props.onChange}>Staff</input>
              </div>
              <div className="mdl-cell--3-col">
                <input id="roles" type="radio" name="role" value="Viewer" onChange={this.props.onChange}>Viewer</input>
              </div>
            </div>
            </div>
          </form>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
              <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.props.onClick}>Sign Up</button>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Cancel</button>
            </div>
          </div>
      </div>
    );
  }
});
})();
