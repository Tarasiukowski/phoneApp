import { fetcher } from '../fetcher';

export const getRandomNumbers = () => fetcher('get', '/generate/randomNumbers');

export const getAllNumbers = (body: { include: string; startWith?: string }) =>
  fetcher('post', '/generate/allNumbers', body);
