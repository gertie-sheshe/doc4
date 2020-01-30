import documentActionTypes from './documents.types';

export const fetchDocumentsSuccess = documents => ({
  type: documentActionTypes.FETCH_DOCUMENTS_SUCCESS,
  payload: documents,
});

export const fetchDocumentsFailure = error => ({
  type: documentActionTypes.FETCH_DOCUMENTS_FAILURE,
  payload: error,
});

export const fetchDocumentsStart = () => ({
  type: documentActionTypes.FETCH_DOCUMENTS_START,
});

export const fetchDocumentsStartAsync = token => {
  return async dispatch => {
    try {
      dispatch(fetchDocumentsStart());

      const response = await fetch('/api/documents', {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      dispatch(fetchDocumentsSuccess(responseData));
    } catch (error) {
      dispatch(fetchDocumentsFailure(error));
    }
  };
};

export const fetchOwnerDocumentsStart = () => ({
  type: documentActionTypes.FETCH_OWNER_DOCUMENTS_START,
});

export const fetchOwnerDocumentsFail = error => ({
  type: documentActionTypes.FETCH_OWNER_DOCUMENTS_FAILURE,
  payload: error,
});

export const fetchOwnerDocumentsSuccess = documents => ({
  type: documentActionTypes.FETCH_OWNER_DOCUMENTS_SUCCESS,
  payload: documents,
});

export const fetchOwnerDocumentsStartAsync = (token, id) => {
  return async dispatch => {
    try {
      dispatch(fetchOwnerDocumentsStart);

      const response = await fetch(`/api/users/${id}/documents`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      dispatch(fetchOwnerDocumentsSuccess(responseData));
    } catch (error) {
      dispatch(fetchOwnerDocumentsFail(error));
    }
  };
};

export const selectDocument = id => ({
  type: documentActionTypes.SELECT_DOCUMENT,
  payload: id,
});
