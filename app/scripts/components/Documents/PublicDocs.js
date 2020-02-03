import React, { Component } from 'react';
import popups from 'popups';

class PublicDocument extends Component {
  render() {
    var docNode = this.props.documents.map(function(doc, index) {
      var docContent = function() {
        popups.modal({
          title: doc.title,
          content: {
            tag: 'div.mdl-card__supporting-text',
            html: 'Public content',
          },
        });
      };
      return (
        <div className="mdl-cell--12-col" key={index}>
          <div className="mdl-cell--12-col mdl-typography--title">
            {doc.title}
          </div>
          <div className="details mdl-cell--12-col">
            <span className="owner-details">
              Added by: {doc.owner} <br />
            </span>

            <a
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect "
              onClick={docContent}
            >
              Read
            </a>
          </div>
          <hr />
        </div>
      );
    });
    return <div className="documents mdl-grid">{docNode}</div>;
  }
}

export default PublicDocument;
