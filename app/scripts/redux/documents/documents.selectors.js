import { createSelector } from 'reselect';
import { selectDocument } from './documents.actions';

const selectDocuments = state => state.documents;

export const selectUserDocuments = createSelector(
  [selectDocuments],
  documents => documents.userDocuments,
);

export const selectOwnerDocuments = createSelector(
  [selectDocuments],
  documents => documents.ownerDocuments,
);

export const selectCurrentDocument = createSelector(
  [selectDocuments],
  documents => documents.selectedDoc,
);
