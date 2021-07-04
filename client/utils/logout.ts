import { fetcher } from './fetcher';

export const logout = (cb: () => void) => {
  fetcher('get', '/auth/logout').then(() => {
    cb();
  });
};
