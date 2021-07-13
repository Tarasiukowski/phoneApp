import { model } from 'mongoose';

import { generateCode, sendMail, formatUser, getUpdateOption } from '../../utils';
import { userSchema } from './userSchema';
import { UserDocument } from './types';
import { ERROR, getDefaultDataUser } from '../../data';
import { updateType, AuthType, User } from '../../interfaces';

export const userModel = model<UserDocument>('user', userSchema);

class UserModel {
  email: string;
  code?: string;
  redirectTo: string;
  authType: AuthType;

  constructor(email: string, authType: AuthType) {
    this.email = email;
    this.authType = authType;

    if (authType !== 'Google') {
      this.code = generateCode();
      this.redirectTo = '/onboarding/code';
      sendMail(this.email, this.code);
    } else {
      this.redirectTo = '/onboarding/number';
    }
  }

  static format<U extends UserDocument, K extends keyof User>(
    user: U,
    ...extraData: K[]
  ): Partial<User> {
    const formatedUser = formatUser(user, extraData);

    return formatedUser;
  }

  static async update<K extends keyof User, U extends keyof User, T extends updateType>(
    filter: { by: K; valueFilter: User[K] },
    data: {
      key: U;
      value: User[U] extends Array<any> ? Partial<User[U][number]> | string : User[U];
    },
    type: T,
  ) {
    const { by, valueFilter } = filter;
    const { key, value } = data;

    if (type === 'newEmail') {
      const { user } = await this.findOne('email', value);

      if (user) {
        return { status: 401, errorMsg: ERROR.EMAIL_IN_USE };
      }
    }

    try {
      await userModel.updateOne({ [by]: valueFilter }, getUpdateOption(key, value, type));

      return { status: 200, errorMsg: null };
    } catch (err) {
      return { status: 400, errorMsg: err };
    }
  }

  static async find<K extends keyof User, V extends User[K]>(data: V[], key: K, ...extraData: K[]) {
    const formatedData = (await data.map(async (elem) => {
      const { user } = await UserModel.findOne(key, elem);

      if (user) {
        const formatedUser = UserModel.format(user, ...extraData);

        return formatedUser;
      }
    })) as Partial<User>[];

    return {
      data: await Promise.all(formatedData),
    };
  }

  static async findOne<K extends keyof UserDocument, V extends UserDocument[K]>(
    key: keyof UserDocument,
    value: V,
  ) {
    try {
      const user = await userModel.findOne({ [key]: value });

      return { status: 200, user };
    } catch (err) {
      return { status: 404, user: null };
    }
  }

  async save(extraData: Partial<User>) {
    delete this.authType;

    const defaultData = await getDefaultDataUser();

    const user = new userModel({ ...this, ...extraData, ...defaultData });

    try {
      user.save();

      const formatedUser = UserModel.format(user);

      return { status: 200, user: { value: formatedUser, id: user._id } };
    } catch (err) {
      return { status: 400, user: null };
    }
  }
}

export default UserModel;
