import { availabilityNumber } from './availabilityNumber';

export const createNumber = async (): Promise<string | undefined> => {
  const number = () => {
    let number = '';

    for (let i = 0; i <= 6; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      if (i === 3) {
        number = number.concat(`-`);
      }

      number = number.concat(`${randomNumber}`);
    }

    return number;
  };

  const num = number();

  const availability = availabilityNumber(num);

  if (!availability) {
    createNumber();
    return
  }

  return num;
};
