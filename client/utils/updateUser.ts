import { fetcher } from './fetcher';

// FIX ME
export const updateUser = (...args: any[]) => {
  let passData = {};

  args[0].map((arg: any) => {
    passData = { ...passData, ...arg };
  });

  const data = fetcher('put', 'user/update', passData);

  return data;
};
