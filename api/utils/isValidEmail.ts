import { ERROR, EMAIL_REGEX } from '../data';

type returnValueIsValidEmail = {
  valid: boolean;
  errorMsg: string | null;
};

export const isValidEmail = (email: string): returnValueIsValidEmail => {
  const valid = EMAIL_REGEX.test(email);

  return { valid, errorMsg: valid ? null : ERROR.EMAIL_NOT_VALID(email) };
};
