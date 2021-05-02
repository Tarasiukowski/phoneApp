import axios, { Method } from 'axios';

export const fetcher = (method: Method, pathname: string, body?: object) => {
  return axios({
    method,
    url: `http://localhost:7000/${pathname}`,
    data: { ...body },
    withCredentials: true,
  }).then(({ data }) => data);
};
