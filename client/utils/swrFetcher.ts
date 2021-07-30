import { Method } from 'axios';

import { fetcher } from './fetcher';

export const swrFetcher = async (url: string, method: Method, body?: Object) => {
  try {
    const data = await fetcher(method, url, body && {});

    return data;
  } catch {
    return null;
  }
};
