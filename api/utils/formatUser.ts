import { UserDocument } from '../models/user/types';
import { UpdateOption, User } from 'interfaces';
import { formatModel } from '../utils';

export const formatUser = <K extends keyof User>(user: UserDocument, extraKeys: K[]) => {
  const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', ...extraKeys];
  const userData = formatModel<UpdateOption.user>(user);
  let key: keyof User;

  for (key in userData) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
