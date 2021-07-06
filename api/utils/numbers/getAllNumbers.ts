import { formatNumber } from './formatNumber';
import { unformat } from './unformat';
import { availabilityNumber } from './availabilityNumber';

export const getAllNumbers = async (filter?: string, lastNumber?: string): Promise<string[]> => {
  const numbers: string[] = [];
  let number = lastNumber ? unformat(lastNumber) : '0000000';
  let parseNumber = parseInt(number);
  let counter = 20;

  if (filter) {
    number = number.slice(0, number.length - filter.length) + filter;
    parseNumber = parseInt(number);

    for (let i = 0; i <= counter; i++) {
      let lengthParseNumber = parseNumber.toString().length;
      let increaseNumber = parseInt(`1${'0'.repeat(filter.length)}`);

      if (i == 0) {
        const formatedNumber = formatNumber(number);

        const availability = await availabilityNumber(formatedNumber);

        if (!lastNumber) {
          if (availability) {
            numbers.push(formatedNumber);
          } else {
            counter++;
          }
        }

        parseNumber = parseInt(number) + increaseNumber;
      } else {
        number = number.slice(0, number.length - lengthParseNumber) + `${parseNumber}`;

        if (number.length > 7) {
          return numbers;
        }

        const formatedNumber = formatNumber(number);

        const availability = availabilityNumber(formatedNumber);

        if (availability) {
          numbers.push(formatedNumber);
        } else {
          counter++;
        }

        parseNumber = parseNumber + increaseNumber;
      }
    }

    return numbers;
  }

  for (let i = 0; i <= counter; i++) {
    let lengthParseNumber = parseNumber.toString().length;

    number = number.slice(0, number.length - lengthParseNumber) + `${parseNumber}`;

    const formatedNumber = formatNumber(number);

    const availability = await availabilityNumber(formatedNumber);

    if (!(i === 0 && lastNumber) && availability) {
      numbers.push(formatedNumber);
    } else {
      counter++;
    }

    parseNumber = parseInt(number) + 1;
  }

  return numbers;
};
