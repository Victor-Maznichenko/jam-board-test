export interface AuthData {
  email: string;
  password: string;
}

export type FirebaseError = {
  code: number;
  errors: Error[];
  message: string;
};

export interface RequestParams {
  path?: string;
  baseURL?: string;
  params?: Record<string, unknown>;
  token?: string;
  method?: FetchMethod;
  body?: Record<string, unknown> | null;
}

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
