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
  }
  
  return {
    verify: false,
    errorMsg: `error in email - email format validation failed: ${email}`,
  };
};
