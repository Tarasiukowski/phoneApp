import { model } from 'mongoose';

import { generateCode, sendMail, formatUser, getUpdateOption } from '../../utils';
import { userSchema } from './userSchema';
import { By, UserDocument } from './types';
import { ERROR, getDefaultDataUser } from '../../data';
import { updateOption } from '../../interfaces';

export const userModel = model<UserDocument>('user', userSchema);

class UserModel {
  email: string;
  code: string;
  by: By;
  redirectTo: string;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;

    if (by !== 'Google') {
      this.code = generateCode();
      this.redirectTo = '/onboarding/code';
      sendMail(this.email, this.code);
    } else {
      this.redirectTo = '/onboarding/number';
    }
  }

  static format(user: UserDocument, ...extraData: string[]) {
    const formatedUser = formatUser(user, extraData);

    return formatedUser;
  }

  static async update(data: any, option: updateOption = 'setField') {
    const { email, newEmail } = data;

    delete data.email;

    if (newEmail) {
      const { user } = await this.findOne('email', newEmail);

      if (user) {
        return { status: 401, errorMsg: ERROR.EMAIL_IN_USE };
      }
    }

    try {
      await userModel.updateOne({ email }, getUpdateOption(data, option));

      return { status: 200, errorMsg: null };
    } catch (err) {
      return { status: 409, errorMsg: err };
    }
  }

  static async find(data: any[], key: string, ...extraData: string[]) {
    const formatedData = await data.map(async (elem) => {
      const { user } = await UserModel.findOne(key, elem);

      if (user) {
        const formatedUser = UserModel.format(user, ...extraData);

        return formatedUser;
      }
    });

    return {
      data: Promise.all(formatedData),
    };
  }

  static async findOne(key: string, value: string) {
    try {
      const user = await userModel.findOne({ [key]: value });

      return { status: 200, user };
    } catch (err) {
      return { status: 404, user: null };
    }
  }

  async save(extraData) {
    delete this.by;

    const defaultData = await getDefaultDataUser();

    const user = new userModel({ ...this, ...extraData, ...defaultData });

    try {
      user.save();

      const formatedUser = UserModel.format(user, 'conversations', 'groups');

      return { status: 200, user: { value: formatedUser, id: user._id } };
    } catch (err) {
      return { status: 409, user: null };
    }
  }
}

export default UserModel;
