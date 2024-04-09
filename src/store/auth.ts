import {createEffect, createEvent, createStore, sample} from 'effector';

import {TOKENS_NAMES} from '@/api/constants';
import {signInRequest, signUpRequest, updateCredentials} from '@/api/requests/auth';
import {setCookie} from '@/utils/helpers';

import {baseRequestFailed} from './firebase';

// Stores
export const $errorMessage = createStore('');
export const $uid = createStore('');

//Events
export const clearErrorMessage = createEvent();

// Effects
export const signUpFx = createEffect(signUpRequest);
export const signInFx = createEffect(signInRequest);
export const updateCredentialsFx = createEffect(updateCredentials);

// Samples
sample({
  clock: [signUpFx.doneData, signInFx.doneData],
  fn: (payload) => {
    localStorage.setItem(TOKENS_NAMES.refresh, payload.refreshToken);
    setCookie(TOKENS_NAMES.access, payload.idToken);
    return payload.localId;
  },
  target: $uid,
});

sample({
  clock: [updateCredentialsFx.doneData],
  fn: (payload) => {
    localStorage.setItem(TOKENS_NAMES.refresh, payload.refresh_token);
    setCookie(TOKENS_NAMES.access, payload.id_token);
    return payload.user_id;
  },
  target: $uid,
});

sample({
  clock: [signUpFx.failData, signInFx.failData],
  fn: (error) => error.message,
  target: $errorMessage,
});

sample({
  clock: [signUpFx.failData, signInFx.failData],
  fn: (error) => error.message,
  target: $errorMessage,
});

sample({
  clock: baseRequestFailed,
  filter: (error) => error.code === 401,
  target: updateCredentialsFx,
});

// Resets
$errorMessage.reset(clearErrorMessage);
