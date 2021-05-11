import { verifyEmail } from './verifyEmail';

export const isCorrectValue = (type: string, value: string) => {
  switch (type) {
    case 'email':
      const data = verifyEmail(value);

      return data.verify;
    case "code":
      return value.length === 6 ? true : false
  }
};
