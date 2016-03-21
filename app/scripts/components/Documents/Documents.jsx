(function() {
  'use strict';
  var React = require('react');
  var popups = require('popups');
  var localStorage = require('localStorage');
  var browserHistory = require('react-router').browserHistory;
  var DocumentActions = require('../../actions/DocumentActions.js');
  var DocumentStore = require('../../stores/DocumentStore.js');
  var toastr = require('toastr');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillMount: function() {
    var token = localStorage.getItem('x-access-token');
    if(!token) {
      browserHistory.push('/');
      toastr.error('You must be logged in bitte :)', {timeout: 3000});
    }
  },
  display: function(id) {
    this.context.router.push('/' + id);
  },
  render: function() {
    var that = this;
    var docNode = this.props.documents.map(function(doc, index) {
      return (
        <div className="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop" key={index}>
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h1 className="mdl-card__title-text">{doc.title}</h1>
            </div>
            <div className="mdl-card__supporting-text">
              {doc.content}
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={that.display.bind(that, doc._id)}>
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
