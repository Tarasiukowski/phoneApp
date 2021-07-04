import { createNumber } from './createNumber';

export const randomNumbers = async (): Promise<string[]> => {
  const numbers: string[] = [];

  for (let i = 0; i <= 20; i++) {
    const number = await createNumber();

    if (number) {
      numbers.push(number);
    }
  }

  return numbers;
};
