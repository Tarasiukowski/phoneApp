import { User, UserDocument } from '../models/user/types';

export const formatUser = <K extends keyof User>(user: UserDocument, extraKeys?: K[]) => {
  const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', ...extraKeys];
  const userData = user.toObject() as User;

  for (const key in user) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
