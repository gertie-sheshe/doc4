(function() {
  var React = require('react');
  var ReactDOM = require('react-dom');
  var History = require('react-router').History;
  var Documents = require('../Documents/Documents.jsx');
  var Public = require('../Documents/PublicDocs.jsx');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var RoleAction = require('../../actions/RoleAction');
  var UserStore = require('../../stores/UserStore');
  var RoleStore = require('../../stores/RoleStore');
  var Users = require('../UserList/Users.jsx');
  var toastr = require('toastr');
  var popups = require('popups');
  var NewDoc = require('../Documents/NewDoc.jsx');
  var Select = require('react-select');


  var Dashboard = new React.createClass({
    getInitialState: function() {
      return {
        document: []
      };
    },
    componentWillMount: function() {
      var pathArray = window.location.pathname.split('/')[1];
      var token = localStorage.getItem('x-access-token');
      DocumentAction.setDoc(pathArray, token);
      console.log(pathArray);
    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this.handleSelected, 'doc');
    },

    handleSelected: function() {
      var selectDoc = DocumentStore.getSelectedDoc();
      var doc = [].concat(selectDoc);
      console.log('mydoc',selectDoc);
      this.setState({
        document: doc
      });
      console.log('WOOOO', this.state.document);
    },
    render: function() {
      if(this.state.document) {
        console.log('KWA RENDEE', this.state.document);
        var data = this.state.document.map(function(doc) {
          console.log('sdkjksdf', doc);
          return (
            <div className="mdl-grid" key={doc._id}>
              <div id="ownerdoc" className="mdl-cell mdl-cell--12-col">
                <div className="mdl-cell mdl-cell--6-col">
                  <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand">
                      <h1 className="mdl-card__title-text">Title:&nbsp;  {doc.title}</h1>
                    </div>
                    <div className="mdl-card__supporting-text">
                      {doc.content}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" >
                        Edit Document
                      </a>
                      <a href={'/dashboard'}>Back</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      }
      return (
        <div>
        {data}
      </div>
      );
    }
  });
  module.exports = Dashboard;
})();
