export const unformat = (number: string): string => {
  const unformatNumber = number.slice(0, 3) + number.slice(4, number.length);

  return unformatNumber;
};
