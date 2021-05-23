import { fetcher } from './fetcher';

export const logout = () => {
  fetcher('get', 'auth/logout');

  window.location.reload();
};
