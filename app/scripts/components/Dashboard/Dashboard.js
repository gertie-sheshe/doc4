import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchDocumentsStartAsync,
  fetchOwnerDocumentsStartAsync,
} from '../../redux/documents/documents.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectUserDocuments,
  selectOwnerDocuments,
} from '../../redux/documents/documents.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import Documents from '../Documents/Documents';
import Public from '../Documents/PublicDocs.js';

class Dashboard extends Component {
  componentDidMount() {
    const {
      fetchDocumentsStartAsync,
      fetchOwnerDocumentsStartAsync,
      currentUser,
    } = this.props;

    fetchDocumentsStartAsync(currentUser.token);
    fetchOwnerDocumentsStartAsync(currentUser.token, currentUser._id);
  }

  render() {
    const { userDocuments, ownerDocuments, history, match } = this.props;

    return (
      <div className="mdl-grid">
        <div
          id="ownerdoc"
          className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop"
        >
          <Documents
            documents={ownerDocuments}
            history={history}
            match={match}
          />
        </div>
        <div
          id="userdoc"
          className="mdl-cell mdl-cell--12-col mdl-cell--4-col-desktop"
        >
          <h6 id="public-doc">
            <strong>Public Documents</strong>
          </h6>
          <hr />
          <Public documents={userDocuments} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userDocuments: selectUserDocuments,
  ownerDocuments: selectOwnerDocuments,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, {
  fetchDocumentsStartAsync,
  fetchOwnerDocumentsStartAsync,
})(Dashboard);
