import { Method } from 'axios';

import { fetcher } from './fetcher';

export const swrFetcher = async (url: string, method: Method) => {
  try {
    const data = await fetcher(method, url);

    return data
  } catch {
    return null
  }
};
