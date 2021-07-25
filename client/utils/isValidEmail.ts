import { EMAIL_REGEX, ERROR_MESSAGES } from 'common';

type returnValueValidEmail = {
  valid: boolean;
  errorMsg: string | null;
};

export const isValidEmail = (email: string): returnValueValidEmail => {
  const valid = EMAIL_REGEX.test(email);

  return {
    valid,
    errorMsg: valid ? null : ERROR_MESSAGES.EMAIL_NOT_VALID(email),
  };
};
