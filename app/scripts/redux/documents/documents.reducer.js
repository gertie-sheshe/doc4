const INITIAL_STATE = {
  userDocuments: [],
  ownerDocuments: [],
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
    default:
      return state;
  }
};

export default documentReducer;
