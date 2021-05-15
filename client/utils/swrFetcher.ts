import { fetcher } from './fetcher';

export const swrFetcher = async (url: string, email: string) => {
  const data = await fetcher('POST', url, {
    email,
  });

  return data;
};
