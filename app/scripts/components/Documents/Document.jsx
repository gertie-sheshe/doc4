(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');
  var moment = require('moment');
  var browserHistory = require('react-router').browserHistory;
  var Documents = require('../Documents/Documents.jsx');
  var Public = require('../Documents/PublicDocs.jsx');
  var DocumentStore = require('../../stores/DocumentStore');
  var DocumentAction = require('../../actions/DocumentActions');
  var UserAction = require('../../actions/UserActions');
  var UserStore = require('../../stores/UserStore');
  var toastr = require('toastr');
  var popups = require('popups');
  var localStorage = require('localStorage');


  var Dashboard = new React.createClass({
    contextTypes: {
      router: React.PropTypes.object
    },
    getInitialState: function() {
      return {
        document: [],
        updatedDoc: {
          title: '',
          content: '',
          access: ''
        }
      };
    },

    componentWillMount: function() {
      var pathArray = this.props.params.id;
      var token = localStorage.getItem('x-access-token');
      localStorage.setItem('document', pathArray);
      DocumentAction.setDoc(pathArray, token);
    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this.handleSelected, 'doc');
    },

    handleSelected: function() {
      var selectDoc = DocumentStore.getSelectedDoc();
      console.log('selected', selectDoc);
      var doc = [].concat(selectDoc);
      this.setState({
        document: doc
      });
    },

    back: function() {
      localStorage.removeItem('document');
      this.context.router.push('/dashboard');
      // browserHistory.push('/dashboard');
      // window.location.assign('/dashboard');
    },

    update: function() {
      this.context.router.push('/update');
    },

    render: function() {
      if(this.state.document) {
        var that = this;
        var data = this.state.document.map(function(doc) {
          var deleteDoc = function() {
            popups.confirm({
              content:     '<h6>Are you sure you want to delete this document?</h6>',
              labelOk:     'Yes',
              additionalButtonOkClass: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
              additionalButtonCancelClass: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
              labelCancel: 'No',
              onSubmit: function() {
                var id = window.location.pathname.split('/')[1];
                var token = localStorage.getItem('x-access-token');
                DocumentAction.deleteDocument(id, token);
                toastr.success('Document has been deleted', {timeout: 3000});
                that.context.router.push('/dashboard');
                // window.location.assign('/dashboard');
                // that.history.pushState(null, '/dashboard');
              },
              onClose: function() {
                return;
              }
            });
          };
          return (
            <div className="mdl-grid" key={doc._id}>
              <div id="single-doc" className="mdl-cell mdl-cell--12-col">
                <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
                  <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand">
                      <h1 className="mdl-card__title-text">Title:&nbsp;  {doc.title}</h1>
                    </div>
                      <h6 id="docdate"> Added:&nbsp; {moment(doc.dateCreated).fromNow()} </h6>
                    <div className="mdl-card__supporting-text">
                      {doc.content}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={that.update}>
                        Edit
                      </a>
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={deleteDoc}>
                           Delete
                        </a>
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={that.back}>
                           Back
                        </a>
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
