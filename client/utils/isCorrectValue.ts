import { validEmail } from './validEmail';

type Type = 'email' | 'code' | 'text';

export const isCorrectValue = (type: Type, value: string) => {
  switch (type) {
    case 'email':
      const data = validEmail(value);

      return data.verify;
    case 'code':
      return value.length === 6 ? true : false;
    case 'text':
      return value.length ? true : false;
  }
};
