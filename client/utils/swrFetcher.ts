import { Method } from 'axios';

import { fetcher } from './fetcher';

export const swrFetcher = async (url: string, method: Method, email: string) => {
  const data = await fetcher(method, url, email ? { email } : undefined);

  return data;
};
