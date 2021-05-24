export const ERROR_NOT_ALLOWED = 'error - functionality not allowed';
export const ERROR_WITHOUT_CHANGE = (param: string, type: 'singular' | 'plural') => {
  return `error - ${param} ${type === 'singular' ? 'is' : 'are'} the same`;
};
