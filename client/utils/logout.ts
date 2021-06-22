import { fetcher } from './fetcher';

export const logout = () => {
  fetcher('get', '/auth/logout').then(() => {
    window.location.reload();
  });
};
