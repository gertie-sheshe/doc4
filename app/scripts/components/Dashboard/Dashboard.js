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
import { Link, Redirect } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    const {
      fetchDocumentsStartAsync,
      fetchOwnerDocumentsStartAsync,
      currentUser,
    } = this.props;

    if (currentUser) {
      fetchDocumentsStartAsync(currentUser.token);
      fetchOwnerDocumentsStartAsync(currentUser.token, currentUser._id);
    }
  }

  render() {
    const {
      userDocuments,
      ownerDocuments,
      history,
      match,
      currentUser,
    } = this.props;

    if (!currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="mdl-grid">
        <div
          id="ownerdoc"
          className="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop"
        >
          <ul id="ownerdocs" className="collection without-header">
            <li className="collection-header">
              <h4 id="doctitle">Documents</h4>
            </li>
            <Documents
              documents={ownerDocuments}
              history={history}
              match={match}
            />
          </ul>
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
