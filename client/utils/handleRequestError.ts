import { handleNotAllowedError } from './hanldeNotAllowedError';

export const handleRequestError = (err: any, cb: (msg: string) => void) => {
  const { data, status } = err.response;
  const { errorMsg } = data;

  cb(errorMsg);

  handleNotAllowedError(status);
};
