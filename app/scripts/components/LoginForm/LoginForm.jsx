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
              <input className="mdl-textfield__input" type="text" id="uname" name="username" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="uname">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="password" id="pword" name="password" onChange={this.props.onChange}/>
              <label className="mdl-textfield__label" htmlFor="pword">Password</label>
          </div>
          </form>
      </div>
    );
  }
});
})();
