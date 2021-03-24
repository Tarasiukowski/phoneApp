import User from '../../models/user/userModel';

export const createNumber = async (): Promise<string> => {
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

  const user = await User.find('number', num);

  if (user) {
    number();
  }

  return num;
};
