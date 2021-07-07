import { UserDocument } from '../models/user/types';
import { User } from 'interfaces';
import { formatModel } from '../utils';

export const formatUser = <K extends keyof User>(user: UserDocument, extraKeys: K[]) => {
  const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', ...extraKeys];
  const userData = formatModel(user) as Partial<User>;
  let key: keyof User;

  for (key in userData) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
