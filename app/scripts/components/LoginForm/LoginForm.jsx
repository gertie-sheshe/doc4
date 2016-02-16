(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({
  render: function() {
    return (
      <div>
        <form action="#">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="text" id="uname" />
              <label className="mdl-textfield__label" for="uname">Username</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="password" id="pword" />
              <label className="mdl-textfield__label" for="pword">Password</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--8-col">
              <input className="mdl-textfield__input" type="password" id="confirm" />
              <label className="mdl-textfield__label" for="confirm">Confirm Password</label>
          </div>
          </form>
      </div>
    );
  }
});
})();
