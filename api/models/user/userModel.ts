import { model } from 'mongoose';

import { generateCode, sendMail, formatUser, getUpdateOption } from '../../utils';
import { userSchema } from './userSchema';
import { By, UserDocument } from './types';
import { errorsMsgs, getDefaultDataUser } from '../../data';
import { updateOption } from '../../interface';

export const userModel = model<UserDocument>('user', userSchema);

class User {
  email: string;
  code: string;
  by: By;
  redirectTo: string;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
    this.redirectTo = this.by === 'Google' ? '/onboarding/number' : '/onboarding/code';

    if (by !== 'Google') {
      this.code = generateCode();
      sendMail(this.email, this.code);
    }
  }

  static format(user: UserDocument, ...extraData: string[]) {
    const formatedUser = formatUser(user, extraData);

    return formatedUser;
  }

  static async update(data: any, option: updateOption = 'setField', setEmail?: boolean) {
    const { email, newEmail } = data;

    delete data.email;

    if (newEmail) {
      const findUser = await this.findOne('email', newEmail);

      if (findUser) {
        return { error: true, errorMsg: errorsMsgs.EMAIL_IN_USE };
      }
    }

    try {
      await userModel.updateOne({ email }, getUpdateOption(data, option, setEmail));

      return { updated: true, error: false };
    } catch (err) {
      return { updated: false, error: true, errorMsg: err };
    }
  }

  static async findOne(key: string, value: string) {
    try {
      const user = await userModel.findOne({ [key]: value });

      return user;
    } catch (err) {
      return null;
    }
  }

  async save(extraDataUser) {
    delete this.by;

    const defaultDataUser = await getDefaultDataUser();

    const user = new userModel({ ...this, ...extraDataUser, ...defaultDataUser }).save();

    return user;
  }
}

export default User;
