(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var RoleAction = require('../../actions/RoleAction');
  var UserStore = require('../../stores/UserStore');
  var RoleStore = require('../../stores/RoleStore');
  var Users = require('../UserList/Users.jsx');
  var toastr = require('toastr');
  var popups = require('popups');
  var async = require('async');
  var NewDoc = require('../Documents/NewDoc.jsx');
  var Select = require('react-select');


  var Dashboard = new React.createClass({
    mixins: [History],

    getInitialState: function() {
      return {
        users: [],
        user: {
          name: {
            first: '',
            last: ''
          },
          username: '',
          email: '',
          role: ''
        },
        documents: [],
        document: {
          title: '',
          content: ''
        },
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
      UserAction.decode(token);
      UserAction.userData(token);
      RoleAction.getUserRole(token);
      UserStore.addChangeListener(this.getDecoded, 'decode');
      UserStore.addChangeListener(this.getUsers, 'users');
      DocumentStore.addChangeListener(this.getDocuments, 'documents');
      this.dialogInit();
      this.profileInit();

      //DocumentStore.addChangeListener(this.Change, 'owner');
    },

    dialogInit: function() {
      var docDialog = document.querySelector('#doc-dialog');
      var docDialogButton = document.querySelector('#show-doc-dialog');
      if (!docDialog.showModal) {
        dialogPolyfill.registerDialog(docDialog);
      }
      docDialogButton.addEventListener('click', function() {
        docDialog.showModal();
      });
      docDialog.querySelector('.close').addEventListener('click', function() {
        docDialog.close();
      });
    },

    profileInit: function() {
      var profDialog = document.querySelector('.prof-dialog');
      var profDialogButton = document.querySelector('.show-prof-dialog');
      if (!profDialog.showModal) {
        dialogPolyfill.registerDialog(profDialog);
      }
      profDialogButton.addEventListener('click', function() {
        profDialog.showModal();
      });
      profDialog.querySelector('.close').addEventListener('click', function() {
        profDialog.close();
      });
    },

    getDecoded: function() {
      var token = localStorage.getItem('x-access-token');
      var decode = UserStore.getDecodedData();
      var roleResult = RoleStore.getRole();
      if (decode.message === 'You are not authenticated user') {
        console.log('AS IN!!!!');
        toastr.error('You must be logged in bitte :)', {timeout: 3000});
        this.history.pushState(null, '/');
      }
      DocumentAction.userDocuments(token);
      DocumentAction.ownerDocuments(token, decode._id);

      console.log('roleresult', roleResult);
      this.setState({
        user: {
          name: {
            first: decode.name.first,
            last: decode.name.last
          },
          username: decode.username,
          email: decode.email,
          role: roleResult
        }
      });
    },

    logout: function() {
      localStorage.removeItem('x-access-token');
      this.history.pushState(null, '/');
    },

    getDocuments: function() {
      var userDocuments = DocumentStore.getUserDocs();
      this.setState({
        documents: userDocuments
      });
    },

    Change: function(value) {
      var roleResult = RoleStore.getRole();
      console.log('Haha', roleResult);
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

    fetchInputValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      console.log(value);
      this.state.document[field] = value;
      // this.state.user[field] = value;
      this.setState({document: this.state.document});
    },

    saveDocument: function() {
      var token = localStorage.getItem('x-access-token');
      DocumentAction.createDocument(this.state.document, token);
     toastr.success('Document successfully created', {timeout: 1500});
    },

    render: function() {
      return (
        <div id="drawer" className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
          mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">doc 4.0</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              <button id="show-doc-dialog" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
                <i className="material-icons">add</i>
              </button>
              <dialog id="doc-dialog" className="mdl-dialog">
                <NewDoc onChange={this.fetchInputValues} saveDoc={this.saveDocument}/>
              </dialog>
              <button  className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored show-prof-dialog">
                <i className="material-icons">person</i>
              </button>
              <dialog className="mdl-dialog prof-dialog">
                <p>{this.state.user.name.first}</p>
                <p>{this.state.user.name.last}</p>
                <p>{this.state.user.username}</p>
                <p>{this.state.user.email}</p>
                <p>{this.state.user.role}</p>
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--6-col">
                      <button type="button" className="mdl-button close mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Close</button>
                    </div>
                  </div>
              </dialog>
              <button id="show-doc-dialog" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored" onClick={this.logout}>
                <i className="material-icons">launch</i>
              </button>
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
          <div id="dash-heading" className="mdl-grid">
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
          <Documents click={this.onClick} documents={this.state.documents} />
        </main>
    </div>
      );
    }
  });
  module.exports = Dashboard;
})();
