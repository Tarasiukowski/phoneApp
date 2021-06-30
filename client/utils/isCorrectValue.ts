import { isValidEmail } from './isValidEmail';

type Type = 'email' | 'code' | 'text';

export const isCorrectValue = (type: Type, value: string) => {
  switch (type) {
    case 'email':
      const { valid } = isValidEmail(value);

      return valid;
    case 'code':
      return value.length === 6;
    case 'text':
      return value.length ? true : false;
  }
};
