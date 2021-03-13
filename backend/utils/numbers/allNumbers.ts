import User from '../../models/user/userModel';
import { formatNumber } from './formatNumber';
import { unformat } from './unformat';

export const allNumbers = async (lastNumber?: string, counter?: number): Promise<string[]> => {
  const numbers: string[] = [];
  let number = lastNumber ? unformat(lastNumber) : '0000000';
  let parseNumber = parseInt(number) + 1;
  let numberOfRepetitions = parseNumber + (counter ? counter : 20)

  for (let i = parseNumber ; i <= numberOfRepetitions; i++) {
    const formattedNumber = formatNumber(number);
    const user = await User.find('number', formattedNumber);

    if (!user) {
      numbers.push(formattedNumber);
    } else {
      numberOfRepetitions++
    }

    number = number.slice(0, number.length - i.toString().length) + `${i}`;
  }

  return numbers;
};
