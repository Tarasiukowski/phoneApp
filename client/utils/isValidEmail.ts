import { EMAIL_REGEX, ERROR } from 'common';

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
