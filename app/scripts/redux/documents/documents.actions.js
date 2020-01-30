import documentActionTypes from './documents.types';
import toastr from 'toastr';

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

export const createDocumentStart = () => ({
  type: documentActionTypes.CREATE_DOCUMENT_START,
});

export const createDocumentFail = error => ({
  type: documentActionTypes.CREATE_DOCUMENT_FAILURE,
  payload: error,
});

export const createDocumentSuccess = () => ({
  type: documentActionTypes.CREATE_DOCUMENT_SUCCESS,
});

export const createDocumentStartAsync = (document, token, history) => {
  return async dispatch => {
    try {
      dispatch(createDocumentStart());

      const response = await fetch('/api/documents', {
        method: 'POST',
        body: JSON.stringify(document),
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      dispatch(createDocumentSuccess());
      toastr.success('Document successfully created', { timeout: 100 });
      history.push('/dashboard');
    } catch (error) {
      dispatch(createDocumentFail(error));
    }
  };
};

export const deleteDocumentStart = () => ({
  type: documentActionTypes.DELETE_DOCUMENT_START,
});

export const deleteDocumentFail = error => ({
  type: documentActionTypes.DELETE_DOCUMENT_FAIL,
  payload: error,
});

export const deleteDocumentSuccess = () => ({
  type: documentActionTypes.DELETE_DOCUMENT_SUCCESS,
});

export const deleteDocumentStartAsync = (id, token, history) => {
  return async dispatch => {
    try {
      dispatch(deleteDocumentStart());

      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      dispatch(deleteDocumentSuccess());
      toastr.success('Document successfully deleted', { timeout: 100 });
      history.push('/dashboard');
    } catch (error) {
      dispatch(deleteDocumentFail(error));
    }
  };
};
