export const ERROR = {
  NOT_ALLOWED: 'error - functionality not allowed',
  EMAIL_NOT_VALID: (email: string) => `error in email - email format validation failed: ${email}`,
  WITHOUT_CHANGE: (param: string, type: 'singular' | 'plural') => {
    return `error - ${param} ${type === 'singular' ? 'is' : 'are'} the same`;
  },
  IS_NOT_FRIEND: (email: string) => `error - this user is not your friend ${email}`,
};
