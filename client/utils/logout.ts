import { fetcher } from './fetcher';

export const logout = async (
  errorCb: (msg: string) => void,
) => {
  const { error, msg } = await fetcher('get', 'auth/logout');

  if (error) {
    errorCb(msg);
    return;
  }

  window.location.reload();
};
