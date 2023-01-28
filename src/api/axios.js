import axios from 'axios';

import store from '../store';
import { refreshToken as refreshTokenDispatcher } from '../store/auth-actions';

import { api } from './constants';

export const axiosPublic = axios.create({
  baseURL: api,
});

export const axiosPrivate = axios.create({
  baseURL: api,
});
axiosPrivate.interceptors.request.use(
  async (config) => {
    const auth = store.getState().auth;

    if (auth.token) {
      const currentDate = new Date();
      if (auth.expiresAt * 1000 < currentDate.getTime()) {
        await store.dispatch(
          refreshTokenDispatcher(auth.token, auth.refreshToken)
        );
      }

      config.headers['Authorization'] = `Bearer ${store.getState().auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
