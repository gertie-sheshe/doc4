import { filterSelectedDocument } from './document.utils';

const INITIAL_STATE = {
  userDocuments: [],
  ownerDocuments: [],
  selectedDoc: [],
  isFetching: null,
  error: null,
};

const documentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_DOCUMENTS_START':
    case 'FETCH_OWNER_DOCUMENTS_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_OWNER_DOCUMENTS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'FETCH_OWNER_DOCUMENTS_SUCCESS':
      return {
        ...state,
        ownerDocuments: action.payload,
      };
    case 'FETCH_DOCUMENTS_SUCCESS':
      return {
        ...state,
        userDocuments: action.payload,
      };
    case 'FETCH_DOCUMENTS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        ownerDocuments: [],
        userDocuments: [],
        selectedDoc: [],
        error: null,
      };
    case 'SELECT_DOCUMENT':
      return {
        ...state,
        selectedDoc: filterSelectedDocument(
          state.ownerDocuments,
          action.payload,
        ),
      };
    case 'CREATE_DOCUMENT_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'CREATE_DOCUMENT_SUCCESS':
      return {
        ...state,
        isFetching: null,
      };
    case 'CREATE_DOCUMENT_FAIL':
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case 'DELETE_DOCUMENT_START':
      return state;

    case 'DELETE_DOCUMENT_SUCCESS':
      return state;

    case 'DELETE_DOCUMENT_FAIL':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default documentReducer;
