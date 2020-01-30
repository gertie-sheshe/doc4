import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import popups from 'popups';
import { createStructuredSelector } from 'reselect';

import {
  selectDocument,
  deleteDocumentStartAsync,
  deleteDocumentStart,
} from '../../redux/documents/documents.actions';
import { selectCurrentDocument } from '../../redux/documents/documents.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

class Document extends Component {
  componentDidMount = () => {
    const { selectDocument, match } = this.props;
    selectDocument(match.params.id);
  };

  onBack = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  deleteDocument = () => {
    const {
      currentDoc,
      currentUser,
      deleteDocumentStartAsync,
      history,
    } = this.props;

    deleteDocumentStartAsync(currentDoc[0]._id, currentUser.token, history);
  };

  render() {
    const { currentDoc } = this.props;

    const deleteDoc = () => {
      popups.confirm({
        content: '<h6>Are you sure you want to delete this document?</h6>',
        labelOk: 'Yes',
        additionalButtonOkClass:
          'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
        additionalButtonCancelClass:
          'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect',
        labelCancel: 'No',
        onSubmit: () => {
          this.deleteDocument();
        },
        onClose: function() {
          return;
        },
      });
    };

    return currentDoc.length > 0 ? (
      <div>
        <div className="mdl-grid">
          <div id="single-doc" className="mdl-cell mdl-cell--12-col">
            <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset-desktop mdl-cell--12-col-tablet">
              <div className="demo-card-square mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title mdl-card--expand">
                  <h1 className="mdl-card__title-text">
                    Title:&nbsp; {currentDoc[0].title}
                  </h1>
                </div>
                <h6 id="docdate">
                  Added:&nbsp; {moment(currentDoc[0].dateCreated).fromNow()}
                </h6>
                <div className="mdl-card__supporting-text">
                  {currentDoc[0].content}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                    onClick={() => console.log('one')}
                  >
                    Edit
                  </a>
                  <a
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                    onClick={deleteDoc}
                  >
                    Delete
                  </a>
                  <a
                    className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                    onClick={this.onBack}
                  >
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentDoc: selectCurrentDocument,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, {
  selectDocument,
  deleteDocumentStartAsync,
})(Document);
