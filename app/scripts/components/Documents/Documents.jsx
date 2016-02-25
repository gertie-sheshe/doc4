(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

module.exports = new React.createClass({

  render: function() {
    var renderDocuments = function(doc) {
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
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  View Updates
                </a>
              </div>
            </div>
          </div>

      );
    };
    return(<div className="mdl-grid">{this.props.documents.map(renderDocuments)}</div>)
  }
});
})();
