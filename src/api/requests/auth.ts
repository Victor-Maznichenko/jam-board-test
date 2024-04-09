import {API_KEY, TOKEN_URL, TOKENS_NAMES} from '../constants';
import {authRequest, request} from '../request';

export const signUpRequest = (body: Record<string, unknown>) =>
  authRequest({
    path: 'accounts:signUp',
    body: {
      ...body,
      returnSecureToken: true,
    },
  });

export const signInRequest = (body: Record<string, unknown>) =>
  authRequest({
    path: 'accounts:signInWithPassword',
    body: {
      ...body,
      returnSecureToken: true,
    },
  });

export const updateCredentials = () =>
  request({
    method: 'POST',
    baseURL: TOKEN_URL,
    path: 'token',
    params: {
      key: API_KEY,
    },
    body: {
      grant_type: TOKENS_NAMES.refresh,
      refresh_token: localStorage.getItem(TOKENS_NAMES.refresh),
    },
  });
