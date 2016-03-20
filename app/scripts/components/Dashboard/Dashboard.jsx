(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var browserHistory = require('react-router').browserHistory;
  var Documents = require('../Documents/Documents.jsx');
  var Public = require('../Documents/PublicDocs.jsx');
  var localStorage = require('localStorage');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');
  var toastr = require('toastr');
  var popups = require('popups');

  var Dashboard = new React.createClass({
    contextTypes: {
      router: React.PropTypes.object
    },
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
      localStorage.removeItem('document');
      var token = localStorage.getItem('x-access-token');
      UserStore.addChangeListener(this.getDecoded, 'decode');
      UserAction.decode(token);
      UserAction.userData(token);

    },

    getOwnerDocuments: function() {
      var ownDocs = DocumentStore.getOwnerDocs();
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
      if (decoded.error === 'You are not authenticated user') {
        toastr.error('You must be logged in bitte :)', {timeout: 3000});
        // this.context.router.push('/');
        browserHistory.push('/');
        // window.location.assign('/');
      } if (decoded.error === 'Failed to Authenticate. You are not logged in.') {
        // this.context.router.push('/');
        // window.location.assign('/');
        browserHistory.push('/');
      }
      else {
        this.setState({ownerId: decoded._id});
        var token = localStorage.getItem('x-access-token');
        DocumentAction.userDocuments(token);
        DocumentAction.ownerDocuments(token, this.state.ownerId);
      }
    },

    fetchInputValues: function(event) {
      var field = event.target.name;
      var value = event.target.value;
      this.state.document[field] = value;
      this.setState({document: this.state.document});
    },

    render: function() {
      return (
        <div className="mdl-grid">
          <div id="ownerdoc" className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
            <Documents documents={this.state.ownerDocuments} />
          </div>
          <div id="userdoc" className="mdl-cell mdl-cell--12-col mdl-cell--4-col-desktop">
            <h6 id="public-doc"><strong>Public Documents</strong></h6>
            <hr/>
            <Public documents={this.state.userDocuments} />
          </div>
        </div>
      );
    }
  });
  module.exports = Dashboard;
})();
