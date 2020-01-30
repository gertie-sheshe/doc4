import userActionTypes from './user.types';
import toastr from 'toastr';

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

export const editUserStart = () => ({
  type: userActionTypes.EDIT_USER_START,
});

export const editUserFail = error => ({
  type: userActionTypes.EDIT_USER_FAIL,
  payload: error,
});

export const editUserSuccess = () => ({
  type: userActionTypes.EDIT_USER_SUCCESS,
});

export const editUserStartAsync = (token, id, user, history) => {
  return async dispatch => {
    try {
      dispatch(editUserStart());

      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      history.push('/dashboard');
      toastr.success('User successfully updated', { timeout: 100 });
    } catch (error) {
      dispatch(editUserFail(error));
    }
  };
};
