import { errorsMsgs, EMAIL_REGEX } from '../data';

type returnValuevalidEmail = {
  verify: boolean;
  errorMsg: string | null;
};

export const validEmail = (email: string): returnValuevalidEmail => {
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
