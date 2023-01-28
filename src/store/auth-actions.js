import { axiosPublic, axiosPrivate } from '../api/axios';

import {
  login as loginDispatch,
  logout as logoutDispatch,
  loadMe,
} from './auth-slice';

import { showMessage } from '../utils';

export const login = (email, password) => async (dispatch) => {
  try {
    const tokenResponse = (
      await axiosPublic.post('users/login', {
        email,
        password,
      })
    ).data;

    dispatch(loginDispatch(tokenResponse));

    return true;
  } catch (err) {
    if (err.response?.status === 400) {
      showMessage(
        err.response.data.messages.map((x) => ({
          type: 'warning',
          title: 'Failed to login',
          message: x,
        }))
      );

      return false;
    }

    showMessage({
      type: 'danger',
      title: 'Something went wrong',
      message: err.message,
    });

    return false;
  }
};

export const register = (request) => async (dispatch) => {
  try {
    const tokenResponse = (await axiosPublic.post('users/register', request))
      .data;

    dispatch(loginDispatch(tokenResponse));

    return true;
  } catch (err) {
    if (err.response?.status === 400) {
      showMessage(
        err.response.data.messages.map((message) => ({
          type: 'warning',
          message,
        }))
      );

      return false;
    }

    showMessage({ type: 'danger', message: err.message });

    return false;
  }
};

export const getMe = () => async (dispatch) => {
  try {
    const me = (await axiosPrivate.get('users/me')).data;

    dispatch(loadMe(me));
  } catch (err) {
    dispatch(logoutDispatch());

    if (err.response?.status === 401) {
      return;
    }

    showMessage({ type: 'danger', message: err.message });
  }
};

export const refreshToken = (token, refreshToken) => async (dispatch) => {
  try {
    const tokenResponse = (
      await axiosPublic.post(
        'users/refresh',
        {
          refreshToken,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
    ).data;

    dispatch(loginDispatch(tokenResponse));
  } catch (err) {
    dispatch(logoutDispatch());

    if (err.response?.status === 400) {
      return showMessage(
        err.response.data.messages.map((message) => ({
          type: 'warning',
          message,
        }))
      );
    }

    showMessage({ type: 'danger', message: err.message });
  }
};
