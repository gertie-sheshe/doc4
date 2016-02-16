(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var SignUp = require('../SignUpForm/SignUpForm.jsx');
  var Login = require('../LoginForm/LoginForm.jsx');

  var Landing = new React.createClass({
    render: function() {
      return (
        <div className="img">
          <div id="back"></div>
          <div className='content'>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <h1>Doc 4.0 </h1>
                <h2>The place to go to create, manage and edit documents. Get started today </h2>
              </div>
            </div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">
                <button id="show-dialog" type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">GET STARTED</button>
                <dialog className="mdl-dialog">
                  <h3 class="mdl-dialog__title">Enter Credentials</h3>
                  <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                      <a href="#signup-panel" className="mdl-tabs__tab is-active">SIGN UP</a>
                      <a href="#login-panel" className="mdl-tabs__tab">LOGIN</a>
                    </div>
                    <div className="mdl-tabs__panel is-active" id="signup-panel">
                      <SignUp />
                   </div>
                   <div className="mdl-tabs__panel" id="login-panel">
                     <Login />
                  </div>
                   <div className="mdl-grid">
                     <div className="mdl-cell mdl-cell--6-col">
                       <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Agree</button>
                     </div>
                     <div className="mdl-cell mdl-cell--6-col">
                       <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Cancel</button>
                     </div>
                   </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });
  module.exports = Landing;
})();
