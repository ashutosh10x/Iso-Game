import { LOGIN, LOGOUT, BACKEND_ERROR, RESET_ERRORS } from './types';

export function login(userData) {
  const url = '/api/login';
  return (dispatch, getState, { api, setAuthorizationToken }) => {
    return api
      .post(url, userData)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setAuthorizationToken(response.data);
          dispatch({
            type: LOGIN,
            payload: response.data,
          });
          dispatch(resetErrors());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: BACKEND_ERROR,
          payload:
            error.response.data.error ||
            'Something went wrong.Please try again.',
        });
        return Promise.reject(error);
      });
  };
}

export function logout(userData) {
  const url = `/api/logout`;
  return (dispatch, getState, { api, setAuthorizationToken }) => {
    return api
      .post(url, userData)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setAuthorizationToken();
          dispatch({
            type: LOGOUT,
          });
          // browserHistory.push({
          //   pathname: '/',
          //   search:
          //     typeof window !== 'undefined' && window && window.location.search,
          // })
        }
      })
      .catch((error) => {
        const errorMessage = 'Something went wrong.Please try again.';
        const errorObjectWithMessage = {
          ...error,
          errorMessage,
        };
      });
  };
}

export function resetErrors() {
  return {
    type: RESET_ERRORS,
  };
}
