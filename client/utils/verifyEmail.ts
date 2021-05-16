import { EMAIL_REGEX } from '../common/regex'

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
  }
  
  return {
    verify: false,
    errorMsg: `error in email - email format validation failed: ${email}`,
  };
};
