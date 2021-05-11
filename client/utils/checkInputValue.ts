import { verifyEmail } from './verifyEmail';

// FIX ME
export const checkInputValue = (type: string, value: string) => {
  switch (type) {
    case 'email':
      const data = verifyEmail(value);

      return data.verify;
    case "code":
      return value.length === 6 ? true : false
  }
};
