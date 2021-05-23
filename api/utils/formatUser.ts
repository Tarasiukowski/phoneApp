import { UserDocument } from '../models/user/types';

const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', 'conversations'];

export const formatUser = (user: UserDocument) => {
  const userData = user.toObject();

  for (const key in user) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
