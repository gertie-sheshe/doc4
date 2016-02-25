(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');
  var Users = require('../UserList/Users.jsx');
  var toastr = require('toastr');
  var Select = require('react-select');


  var Dashboard = new React.createClass({
    mixins: [History],

    getInitialState: function() {
      return {
        users: [],
        documents: [],
        options: [
          {
          value: 'My Documents', label: 'My Documents'
          },
          {
            value: 'Public Documents', label: 'Public Documents'
          }
        ]
      };
    },

    componentDidMount: function() {
      var token = localStorage.getItem('x-access-token');
      console.log(token);
      UserAction.decode(token);
      UserAction.userData(token);
      UserStore.addChangeListener(this.getDecoded, 'decode');
      UserStore.addChangeListener(this.getUsers, 'users');
      DocumentStore.addChangeListener(this.getDocuments, 'documents');
      //DocumentStore.addChangeListener(this.Change, 'owner');
    },

    getDecoded: function() {
      var token = localStorage.getItem('x-access-token');
      var decode = UserStore.getDecodedData();
      DocumentAction.userDocuments(token);
      DocumentAction.ownerDocuments(token,decode._id);
      console.log('DECODE', decode);
      if (decode.message === 'You are not authenticated') {
        toastr.error('What\'s the password?', {timeout: 3000});
        this.history.pushState(null, '/');
      }
    },

    getDocuments: function() {
      var userDocuments = DocumentStore.getUserDocs();
      this.setState({
        documents: userDocuments
      });
    },

    Change: function(value) {
      if (value === 'My Documents') {
        var userDocuments = DocumentStore.getOwnerDocs();
        if(userDocuments.message) {
          toastr.warning('You do not have any Documents');
        }
        if (userDocuments.length) {
          this.setState({
            documents: userDocuments
          });
        }
      }
      if (value === 'Public Documents') {
        var userDocs = DocumentStore.getUserDocs();
        this.setState({
          documents: userDocs
        });
      }
    },

    getUsers: function() {
      var updatedUsers = UserStore.getUserData();
      this.setState({
        users: updatedUsers
      });
    },
    render: function() {
      return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
          mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">doc 4.0</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <button id="show-dialog" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="material-icons">add</i>
              </button>
              <dialog className="mdl-dialog">
                Hello
              </dialog>
              <div id="profile" className="icon material-icons">person</div>
              <div className="mdl-tooltip" htmlFor="profile">
                My Profile
              </div>
              <div id="logout" className="icon material-icons">launch</div>
              <div className="mdl-tooltip" htmlFor="logout">
                Logout
              </div>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">users</span>
          <nav className="mdl-navigation">
            <ul className="demo-list-icon mdl-list">
            <Users users={this.state.users}/>
            </ul>
           </nav>
         </div>
        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--8-col">
              <h2>Documents</h2>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <Select
                name="option_id"
                placeholder="View Which Documents"
                options={this.state.options}
                onChange={this.Change} />
            </div>
          </div>
          <hr />
          <Documents documents={this.state.documents}/>
        </main>
    </div>
      );
    }
  });
  module.exports = Dashboard;
})();
