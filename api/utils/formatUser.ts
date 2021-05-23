import { UserDocument } from '../models/user/types';

export const formatUser = (user: UserDocument, ...extraKets: string[]) => {
  const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', ...extraKets];
  const userData = user.toObject();

  console.log(allowKeys);

  for (const key in user) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
