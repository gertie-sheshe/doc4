(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');
  var toastr = require('toastr');

  var ProfilePage = new React.createClass({
    getInitialState: function() {
      return {
        userData: '',
        last: '',
        first: ''
      };
    },
    componentWillMount: function() {
      var token = localStorage.getItem('x-access-token');
      UserStore.addChangeListener(this.getUserData, 'decode');
      UserAction.decode(token);
    },

    getUserData: function() {
      var data = UserStore.getDecodedData();
      this.setState({
        userData: data,
        last: data.name.last,
        first: data.name.first
      });
    },
    render: function() {
      return (
        <div className="mdl-grid">
        <div id="profile" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
        <div className="demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__supporting-text">
            <form id ="form-document" action="post">
              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h5>First Name: </h5>
                  {this.state.first}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <h5>Last Name: </h5>
                  {this.state.last}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <h5>Username: </h5>
                  {this.state.userData.username}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                  <h5>Email: </h5>
                  {this.state.userData.email}
                </div>
              </div>
              </form>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href={'/dashboard'} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              DASHBOARD
            </a>
          </div>
        </div>
      </div>
      </div>
      );
    }
  });
  module.exports = ProfilePage;
})();
