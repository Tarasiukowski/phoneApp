export const handleNotAllowedError = (statusCode: number) => {
  const notAllowedStatusCode = 405;

  if (statusCode === notAllowedStatusCode) {
    window.location.reload();
  }
};
