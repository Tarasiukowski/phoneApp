import { UserDocument } from '../models/user/types';
import { TypeModel, User } from 'interfaces';
import { formatModel } from '../utils';

export const formatUser = <K extends keyof User>(
  user: UserDocument | User | any,
  extraKeys: K[] = [],
) => {
  const allowKeys = ['image', 'email', 'number', 'fullname', 'colorImage', ...extraKeys];
  const userData = formatModel<TypeModel.user>(user);
  let key: keyof User;

  for (key in userData) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
