(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var localStorage = require('localStorage');
  var LinkedStateMixin = require('react-addons-linked-state-mixin');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var browserHistory = require('react-router').browserHistory;
  var UserStore = require('../../stores/UserStore');
  var toastr = require('toastr');

  var Edit = new React.createClass({
    mixins: [LinkedStateMixin],
    contextTypes: {
      router: React.PropTypes.object
    },
    getInitialState: function() {
      return {
        userData: {
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          role: '',
          id: ''
        }
      };
    },
    componentWillMount: function() {
      var id = localStorage.getItem('user');
      var token = localStorage.getItem('x-access-token');
      if(!token) {
        browserHistory.push('/');
        toastr.error('You must be logged in bitte :)', {timeout: 3000});
      }
      UserAction.getUser(token, id);
    },

    componentDidMount: function() {
      var token = localStorage.getItem('x-access-token');
      UserStore.addChangeListener(this.getUserData, 'user');
      // UserAction.decode(token);
    },

    getUserData: function() {
      // var data = UserStore.getDecodedData();
      var data = UserStore.getUser();
      this.setState({
        userData: {
          firstname: data.name.first,
          lastname: data.name.last,
          email:data.email,
          username: data.username,
          role: data.role,
        },
        id: ''
      });
    },


    fetchInputValues: function(event) {
      event.preventDefault();
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.userData[field] = value;
      this.setState({userData: this.state.userData, id: this.state.userData._id});
    },

    update: function() {
      var id = localStorage.getItem('user');
      var token = localStorage.getItem('x-access-token');
      UserAction.update(token, id, this.state.userData);
      toastr.success('Profile Updated', {timeout: 1000});
      // window.location.assign('/profile');
      this.context.router.push('/profile');
    },

    profile: function() {
      this.context.router.push('/profile');
    },

    render: function() {
      return (
        <div className="mdl-grid">
        <div id="profile" className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
        <div className="demo-card-square mdl-card mdl-shadow--2dp">
          <div className="mdl-card__supporting-text">

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>First Name: </h6>
                  <input id="inputfname" className="mdl-textfield__input mdl-cell mdl-cell--12-col" type="text" value={this.state.userData.firstname} name="firstname" onInput={this.fetchInputValues} />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>Last Name: </h6>
                  <input id="inputlname" className="mdl-textfield__input mdl-cell mdl-cell--12-col" type="text" value={this.state.userData.lastname} name="lastname" onInput={this.fetchInputValues} />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>User Name: </h6>
                  <input id="inputuname" className="mdl-textfield__input mdl-cell mdl-cell--12-col" type="text" value={this.state.userData.username} name="username" onInput={this.fetchInputValues} />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>Email: </h6>
                  <input id="inputemail" className="mdl-textfield__input mdl-cell mdl-cell--12-col" type="text" value={this.state.userData.email} name="email" onInput={this.fetchInputValues} />
                </div>
              </div>

              <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                  <h6>Role </h6>
                  <input id="inputrole" className="mdl-textfield__input mdl-cell mdl-cell--12-col" type="text" value={this.state.userData.role} name="role" onInput={this.fetchInputValues} />
                </div>
              </div>

          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.update}>
              UPDATE
            </a>
            <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.profile}>
              BACK
            </a>
          </div>
        </div>
      </div>
      </div>
      );
    }
  });
  module.exports = Edit;
})();
