import { createSlice } from '@reduxjs/toolkit';

const tokenStorageName = 'token';
const tokenExpiresAtStorageName = 'expiresAt';
const refreshTokenStorageName = 'refreshToken';

const tokenExpiresAt = localStorage.getItem(tokenExpiresAtStorageName);
const token = (tokenExpiresAt && localStorage.getItem(tokenStorageName)) || null;

const initialState = {
  token,
  tokenExpiresAt:
    (tokenExpiresAt && new Date(tokenExpiresAt).getTime()) || null,
  isAuthenticated: !!token,
  me: null,
  refreshToken: localStorage.getItem(refreshTokenStorageName),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem(tokenStorageName, action.payload.token);
      localStorage.setItem(
        refreshTokenStorageName,
        action.payload.refreshToken
      );
      localStorage.setItem(tokenExpiresAtStorageName, action.payload.expiresAt);

      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiresAt = new Date(action.payload.expiresAt).getTime();
    },
    logout(state, action) {
      localStorage.removeItem(tokenStorageName);
      localStorage.removeItem(refreshTokenStorageName);
      localStorage.removeItem(tokenExpiresAtStorageName);

      state.isAuthenticated = false;
      state.token = '';
      state.refreshToken = '';
      state.tokenExpiresAt = null;
      state.me = null;
    },
    loadMe(state, action) {
      state.me = {
        ...action.payload,
      };
    },
  },
});

export const { login, logout, loadMe } = authSlice.actions;

export default authSlice;
