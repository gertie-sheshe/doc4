(function() {
  'use strict';
  var React = require('react');
  var popups = require('popups');
  var DocumentActions = require('../../actions/DocumentActions.js');
  var DocumentStore = require('../../stores/DocumentStore.js');
  var toastr = require('toastr');
  var localStorage = require('localStorage');
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
      return (
          <div className="mdl-cell--12-col" key={index}>
              <div className="mdl-cell--12-col mdl-typography--title">
                  Title:  {doc.title}
              </div>
              <div className="details mdl-cell--12-col">
                <span className="owner-details">Added by: {doc.owner} <br/></span>
                <span className="doc-content"> {doc.content} <br/></span>
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect " onClick ={docContent}>
                  Read More
                </a>
              </div>
              <hr/>
          </div>
      );

    });
    return(<div className="documents mdl-grid">{docNode}</div>)
  }
});
})();
