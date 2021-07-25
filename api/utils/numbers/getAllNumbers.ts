import { formatNumber } from './formatNumber';
import { unformat } from './unformat';
import { availabilityNumber } from './availabilityNumber';

export const getAllNumbers = async (startWith?: string, include?: string): Promise<string[]> => {
  const numbers: string[] = [];
  let number = startWith ? unformat(startWith) : '0000000';
  let parseNumber = parseInt(number);
  let counter = 20;

  if (include) {
    number = number.slice(0, number.length - include.length) + include;
    parseNumber = parseInt(number);

    for (let i = 0; i <= counter; i++) {
      let lengthParseNumber = parseNumber.toString().length;
      let increaseNumber = parseInt(`1${'0'.repeat(include.length)}`);

      if (i == 0) {
        const formatedNumber = formatNumber(number);

        const availability = await availabilityNumber(formatedNumber);

        if (!startWith) {
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

    if (!(i === 0 && startWith) && availability) {
      numbers.push(formatedNumber);
    } else {
      counter++;
    }

    parseNumber = parseInt(number) + 1;
  }

  return numbers;
};
