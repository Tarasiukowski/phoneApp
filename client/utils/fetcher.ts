import axios, { Method } from 'axios';

import { API_URL } from '../constants';

export const fetcher = (method: Method, pathname: string, body?: object) =>
  axios({
    method,
    url: `${API_URL}${pathname}`,
    data: { ...body },
    withCredentials: true,
  }).then(({ data }) => data);
