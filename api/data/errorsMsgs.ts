export const errorsMsgs = {
  USER_EXIST: 'error - user with that email address exists',
  USER_NOT_EXIST: "error - user with this e-mail does't exist",
  EMAIL_IN_USE: 'error - this email is pinned to another account',
  WRONG_VERIFICATION_CODE: 'error - wrong verification code',
  INVITE_TO_YOURSELF: 'error - you cannot send yourself an invitation',
  FUNCTIONALITY_NOT_ALLOWED: 'error - functionality not allowed',
  DUPLICATE_INVITATION: 'error - invitation has already been sent',
  IS_YOUR_FRIEND: 'this user is already your friend',
  EMAIL_VALIDATION: (email) => `error in email - email format validation failed: ${email}`,
};
