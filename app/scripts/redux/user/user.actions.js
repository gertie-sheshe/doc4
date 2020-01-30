import userActionTypes from './user.types';

export const signUpSuccess = user => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = error => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signUpStart = () => ({
  type: userActionTypes.SIGN_UP_START,
});

export const signUpStartAsync = (user, history) => {
  return async dispatch => {
    try {
      dispatch(signUpStart());
      const response = await fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const jsonDATA = await response.json();

      dispatch(signUpSuccess(jsonDATA));
      history.push('/dashboard');
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
};

export const loginSuccess = user => ({
  type: userActionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const loginStart = () => ({
  type: userActionTypes.LOG_IN_START,
});

export const loginFailure = error => ({
  type: userActionTypes.LOG_IN_FAILURE,
  payload: error,
});

export const loginStartAsync = (user, history) => {
  return async dispatch => {
    try {
      dispatch(loginStart());
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      console.log('AUTH', response);

      dispatch(loginSuccess(responseData));
      history.push('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};

export const logout = () => ({
  type: userActionTypes.LOG_OUT_SUCCESS,
});
