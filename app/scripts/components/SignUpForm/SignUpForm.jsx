(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({
  render: function() {
    return (
      <div>
        <form action="post" onSubmit={this.props.handleLoginAction}>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="fname" name="firstname" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" for="fname">First Name</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="lname" name="lastname" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" for="lname">Last Name</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="uname" name="username" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" for="uname">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input className="mdl-textfield__input" type="text" id="email" name="email" oChange={this.props.onChange}/>
            <label className="mdl-textfield__label" for="email">Email</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
            <input className="mdl-textfield__input" type="password" id="pword" name="password" onChange={this.props.onChange}/>
            <label className="mdl-textfield__label" for="pword" required="true">Password</label>
          </div>
          </form>
      </div>
    );
  }
});
})();
