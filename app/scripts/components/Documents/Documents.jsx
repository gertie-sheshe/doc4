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
  render: function() {
    var docNode = this.props.documents.map(function(doc, index) {
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
              <a href={'/' + doc._id} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Read More
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
