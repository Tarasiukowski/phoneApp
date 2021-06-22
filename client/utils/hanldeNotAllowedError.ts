export const handleNotAllowedError = (statusCode: number) => {
  if (statusCode === 405) {
    window.location.reload();
  }
};
