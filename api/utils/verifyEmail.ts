import { errorsMsgs, EMAIL_REGEX } from '../data';

type returnValueVerifyEmail = {
  verify: boolean;
  errorMsg: string | null;
};

export const verifyEmail = (email: string): returnValueVerifyEmail => {
  const verify = EMAIL_REGEX.test(email);

  if (verify) {
    return {
      verify: true,
      errorMsg: null,
    };
  } else {
    return {
      verify: false,
      errorMsg: errorsMsgs.EMAIL_VALIDATION(email),
    };
  }
};
