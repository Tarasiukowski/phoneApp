import { handleNotAllowedError } from './hanldeNotAllowedError';

type Error = {
  response: {
    data: {
      errorMsg: string;
    };
    status: number;
  };
};

export const handleRequestError = (error: Error, cb: (msg: string) => void) => {
  const { data, status } = error.response;
  const { errorMsg } = data;

  cb(errorMsg);

  handleNotAllowedError(status);
};
