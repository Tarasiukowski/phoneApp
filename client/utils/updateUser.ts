import { fetcher } from './fetcher';

export const updateUser = (...args: any[]) => {
  let passData = {};

  args[0].map((arg: any) => {
    passData = { ...passData, ...arg };
  });

  fetcher('put', 'user/update', passData);
};
