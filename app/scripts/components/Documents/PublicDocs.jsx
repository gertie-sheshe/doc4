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
    var docNode = this.props.documents.map(function(doc, index) {
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

          <li className="mdl-list__item mdl-list__item--three-line" key={index}>
            <span className="mdl-list__item-primary-content">
              <i className="material-icons mdl-list__item-avatar">description</i>
              <span>Title:  {doc.title}</span>
              <span className="mdl-list__item-text-body">
                <span className="doc-content"> {doc.content} </span>
                <br/>
                <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect " onClick ={docContent}>
                  Read More
                </button>
                Added by: Gertrude Nyenyeshi Date Added: 2 days ago
              </span>
              <hr/>
            </span>
          </li>
      );

    });
    return(<div className="documents mdl-grid"><ul className="demo-list-three mdl-list">{docNode}</ul></div>)
  }
});
})();
