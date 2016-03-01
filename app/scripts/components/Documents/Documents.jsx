(function() {
  'use strict';
  var React = require('react');
  var popups = require('popups');
  var DocumentActions = require('../../actions/DocumentActions.js');
  var DocumentStore = require('../../stores/DocumentStore.js');
  var toastr = require('toastr');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({
  render: function() {
    var docNode = this.props.documents.map(function(doc) {
      var token = localStorage.getItem('x-access-token');
      var docContent = function() {
        popups.modal({
          title: doc.title,
          content: '<h4> ' + doc.content + '</h4>'
        });
      };
      var deleteDoc = function() {
        popups.confirm({
          content:     '<h1>Are you sure you want to delete this document?</h1>',
          labelOk:     'Yes',
          labelCancel: 'No',
          onSubmit: function() {
            var token = localStorage.getItem('x-access-token');
            DocumentActions.deleteDocument(doc._id, token);
            var result = DocumentStore.getDeleted();
            if (result === null) {
              toastr.success('You are not allowed to delete this document', {timeout: 1000});
            } else {
              toastr.success('Document has been deleted', {timeout: 1000});
            }
          },
          onClose: function() {
            console.log(':( kwi kwi');
          }
        });
      };
      return (
        <div className="mdl-cell mdl-cell--6-col">
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h1 className="mdl-card__title-text">Title:  {doc.title}</h1>
            </div>
            <div className="mdl-card__supporting-text">
              {doc.content}
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect " onClick ={docContent}>
                Read More
              </button>
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={deleteDoc}>
                Delete Document
              </a>
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Edit Document
              </a>
            </div>
          </div>
        </div>
      );

    });
    return(<div className="documents mdl-grid">{docNode}</div>)
  }
});
})();
