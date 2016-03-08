(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var Public = require('../Documents/PublicDocs.jsx');
  var localStorage = require('localStorage');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');
  var Users = require('../UserList/Users.jsx');
  var toastr = require('toastr');
  var popups = require('popups');
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
          role: '',
        },
        ownerId: '',
        ownerDocuments: [],
        userDocuments: [],
        document: {
          title: '',
          content: ''
        },
      };
    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this.getOwnerDocuments, 'owner');
      DocumentStore.addChangeListener(this.getUserDocuments, 'documents');
    },

    componentWillMount: function() {
      var token = localStorage.getItem('x-access-token');
      UserStore.addChangeListener(this.getUsers, 'users');
      UserStore.addChangeListener(this.getDecoded, 'decode');
      UserAction.decode(token);
      UserAction.userData(token);

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

    logout: function() {
      localStorage.removeItem('x-access-token');
      this.history.pushState(null, '/');
    },

    getOwnerDocuments: function() {
      var token = localStorage.getItem('x-access-token');
      var ownDocs = DocumentStore.getOwnerDocs(token, this.state.ownerId);
      this.setState({
        ownerDocuments: ownDocs
      });
    },

    getUserDocuments: function() {
      var userDocs = DocumentStore.getUserDocs();
      this.setState({
        userDocuments: userDocs
      });
    },

    getDecoded: function() {
      var decoded = UserStore.getDecodedData();
      if (decoded.message === 'You are not authenticated user') {
        toastr.error('You must be logged in bitte :)', {timeout: 3000});
        this.history.pushState(null, '/');
      } if (decoded.message === 'Failed to Authenticate. You are not logged in.') {
        window.location.assign('/');
      }
      else {
        this.setState({ownerId: decoded._id});
        var token = localStorage.getItem('x-access-token');
        DocumentAction.userDocuments(token);
        DocumentAction.ownerDocuments(token, this.state.ownerId);
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
      this.state.document[field] = value;
      this.setState({document: this.state.document});
    },

    saveDocument: function() {
      var token = localStorage.getItem('x-access-token');
      DocumentAction.createDocument(this.state.document, token);
     toastr.success('Document successfully created', {timeout: 1500});
    },

    render: function() {
      return (
        <div className="mdl-grid">
          <div id="ownerdoc" className="mdl-cell mdl-cell--8-col">
            <Documents documents={this.state.ownerDocuments} />
          </div>
          <div id="userdoc" className="mdl-cell mdl-cell--4-col">
            <Public documents={this.state.userDocuments} />
          </div>
        </div>
      );
    }
  });
  module.exports = Dashboard;
})();
