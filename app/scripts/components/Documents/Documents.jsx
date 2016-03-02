(function() {
  'use strict';
  var React = require('react');
  var popups = require('popups');
  var DocumentActions = require('../../actions/DocumentActions.js');
  var DocumentStore = require('../../stores/DocumentStore.js');
  var toastr = require('toastr');
  var ReactDOM = require('react-dom');
  var Modal = require('react-modal');

module.exports = new React.createClass({
  getInitialState: function() {
  return { modalIsOpen: false };
  },

  openModal: function() {
    console.log(this.state.modalIsOpen);
    this.setState({modalIsOpen: true});
    console.log(this.state.modalIsOpen);
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  render: function() {
    var open = this.openModal;
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
          placeholder: '>>>',
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

      var editDoc = function() {
        var cont = doc.content;
        popups.modal({
          content: '<div className="dropper-form aligned">Edit Document</div> ' +
          '<div class="dropper-form-group">' +
          '<label for="doctitle">Title</label>' +
          '<input type="text" value=' + doc.title + ' name="" id="title">' +
          '</div>' +
          '<div class="dropper-form-group">' +
          '<label for="doccontent">Content</label>' +
          '<input type="text" value=' + cont + ' name="" id="content">' +
          '</div>',
          labelOk:     'Yes',
          labelCancel: 'No',
        });
      };
      return (
        <div className="mdl-cell mdl-cell--6-col" key={index}>
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h1 className="mdl-card__title-text">Title:&nbsp;  {doc.title}</h1>
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
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={editDoc}>
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
