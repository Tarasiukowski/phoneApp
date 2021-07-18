import { fetcher } from './fetcher';

export const logout = (onRequest: () => void, onResponse: () => void) => {
  onRequest();

  fetcher('get', '/auth/logout').then(() => {
    onResponse();
  });
};
