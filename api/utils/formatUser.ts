import { UserDocument } from '../models/user/types';

export const formatUser = (user: UserDocument, extraKeys?: string[]) => {
  const allowKeys = [
    'image',
    'email',
    'number',
    'fullname',
    'colorImage',
    ...extraKeys,
  ];
  const userData = user.toObject();

  for (const key in user) {
    if (!allowKeys.includes(key)) {
      delete userData[key];
    }
  }

  return userData;
};
