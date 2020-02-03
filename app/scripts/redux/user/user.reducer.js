const INITIAL_STATE = {
  currentUser: '',
  error: null,
  isFetching: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        error: action.payload,
      };

    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'LOG_IN_START':
      return {
        ...state,
        isFetching: true,
      };

    case 'LOG_IN_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    case 'EDIT_USER_FAIL':
      return {
        ...state,
        error: payload,
      };
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'EDIT_USER_START':
    default:
      return state;
  }
};

export default userReducer;
