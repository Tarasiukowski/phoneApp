import axios, { Method } from 'axios';

export const fetcher = (method: Method, pathname: string, body?: object) =>
  axios({
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}${pathname}`,
    data: { ...body },
    withCredentials: true,
  }).then(({ data }) => data);
