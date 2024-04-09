import {buildUrl} from '@/utils/helpers';
import {getCookie} from '@/utils/helpers/cookies';

import {API_KEY, AUTH_URL, BASE_URL} from './constants';
import {RequestParams} from './types';

export const request = async ({
  baseURL = BASE_URL,
  path,
  body = null,
  params,
  token,
  method = 'GET',
}: RequestParams) => {
  // Построение URL запроса
  const url = buildUrl({baseURL, path, params});

  // Создание авторизационного заголовка
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers.credentials = 'include';
  }

  // Запрос на сервер
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const {error} = await response.json();
    throw error;
  }

  return await response.json();
};

// Запрос на сервер аутентификации
export const authRequest = ({path, body}: RequestParams) =>
  request({
    method: 'POST',
    baseURL: AUTH_URL,
    params: {
      key: API_KEY,
    },
    path,
    body,
  });

// Запрос на сервер с данными [требуется токен]
export const baseRequest = ({path, method, body, params}: RequestParams) =>
  request({
    token: getCookie('accessToken'),
    baseURL: BASE_URL,
    path,
    params,
    method,
    body,
  });

// Запрос для создания документа Firebase
export const createDocRequest = (path: string, documentId: string) =>
  baseRequest({
    path: `documents${path}`,
    method: 'POST',
    params: {documentId},
    body: null,
  });

// Запрос для обновления документа Firebase
export const updateDocRequest = (path: string, documentId: string, body: Record<string, unknown>) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'PATCH',
    body,
  });

// Запрос для получения документа Firebase
export const getDocRequest = (path: string, documentId: string) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'GET',
    body: null,
  });

export const deleteDocRequest = (path: string, documentId: string) =>
  baseRequest({
    path: `documents${path}/${documentId}`,
    method: 'DELETE',
    body: null,
  });
