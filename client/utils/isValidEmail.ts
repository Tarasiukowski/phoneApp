import { EMAIL_REGEX } from '../common/regex';
import { ERROR } from '../common/errors';

type returnValueValidEmail = {
  valid: boolean;
  errorMsg: string | null;
};

export const isValidEmail = (email: string): returnValueValidEmail => {
  const valid = EMAIL_REGEX.test(email);

  return {
    valid,
    errorMsg: valid ? null : ERROR.EMAIL_NOT_VALID(email),
  };
};
