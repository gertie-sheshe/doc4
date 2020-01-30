import React, { Component } from 'react';
import popups from 'popups';
import toastr from 'toastr';

class Documents extends Component {
  display = id => {
    const { history, match } = this.props;
    history.push(`${match.url}/${id}`);
  };

  render() {
    var docNode = this.props.documents.map((doc, index) => {
      return (
        <div
          className="mdl-cell mdl-cell--12-col mdl-cell--6-col-desktop"
          key={index}
        >
          <div className="demo-card-square mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title mdl-card--expand">
              <h1 className="mdl-card__title-text">{doc.title}</h1>
            </div>
            <div className="mdl-card__supporting-text">{doc.content}</div>
            <div className="mdl-card__actions mdl-card--border">
              <a
                className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                onClick={() => this.display(doc._id, doc)}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
    });
    return <div className="documents mdl-grid">{docNode}</div>;
  }
}

export default Documents;
