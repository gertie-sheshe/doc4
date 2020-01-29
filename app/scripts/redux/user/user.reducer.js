const INITIAL_STATE = {
  currentUser: '',
  error: null,
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
    default:
      return state;
  }
};

export default userReducer;
