import { formatNumber } from './formatNumber';
import { unformat } from './unformat';

export const allNumbers = (filter?: string, lastNumber?: string): string[] => {
  const numbers: string[] = [];
  let number = lastNumber ? unformat(lastNumber) : '0000000';
  let parseNumber = parseInt(number);

  if (filter) {
    number = number.slice(0, number.length - filter.length) + filter;
    parseNumber = parseInt(number);

    for (let i = 0; i <= 20; i++) {
      let lengthParseNumber = parseNumber.toString().length;
      let increaseNumber = parseInt(`1${'0'.repeat(filter.length)}`);

      if (i == 0) {
        const formatedNumber = formatNumber(number);

        numbers.push(formatedNumber);

        parseNumber = parseInt(number) + increaseNumber;
      } else {
        number = number.slice(0, number.length - lengthParseNumber) + `${parseNumber}`;

        if (number.length > 7) {
          return numbers;
        }

        const formatedNumber = formatNumber(number);

        numbers.push(formatedNumber);

        parseNumber = parseNumber + increaseNumber;
      }
    }

    return numbers;
  }

  for (let i = 0; i <= 20; i++) {
    let lengthParseNumber = parseNumber.toString().length;

    number = number.slice(0, number.length - lengthParseNumber) + `${parseNumber}`;

    const formatedNumber = formatNumber(number);

    numbers.push(formatedNumber);

    parseNumber = parseInt(number) + 1;
  }

  return numbers;
};
