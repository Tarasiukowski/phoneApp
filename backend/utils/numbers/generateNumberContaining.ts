import { formatNumber } from './formatNumber';

export const generateNumberContaining = (filter: string, startNumber?: string): string[] => {
  let numbers: string[] = [];
  let number = startNumber ? startNumber : '0000000';
  let containNumber = parseInt(filter);
  let lengthContainNumber = containNumber.toString().length;
  let parseNumber = parseInt(number) + Math.pow(10, lengthContainNumber);

  for (let i = 0; i < 20; i++) {
    if (filter.length === 7) {
      return [formatNumber(filter)];
    } else {
      let lengthAddNumber = containNumber.toString().length;
      let lengthParseNumber = parseNumber.toString().length;

      if (startNumber) {
        number = number.slice(0, number.length - lengthParseNumber) + `${parseNumber}`;

        parseNumber += lengthContainNumber > 1 ? Math.pow(10, lengthContainNumber) : 10;

        if (number === `9${filter}`) {
          return (numbers = [...numbers, formatNumber(number)]);
        }

        numbers.push(formatNumber(number));
      } else {
        number = number.slice(0, number.length - lengthAddNumber) + `${containNumber}`;
        containNumber += lengthContainNumber > 1 ? Math.pow(10, lengthContainNumber) : 10;

        if (number === `9${filter}`) {
          return (numbers = [...numbers, formatNumber(number)]);
        }

        numbers.push(formatNumber(number));
      }
    }
  }

  return numbers;
};
