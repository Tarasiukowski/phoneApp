import { errorsMsgs } from '../data';

type returnValueVerifyEmail = {
  verify: boolean;
  errorMsg: string | null;
};

export const verifyEmail = (email: string): returnValueVerifyEmail => {
  const verify = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

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
