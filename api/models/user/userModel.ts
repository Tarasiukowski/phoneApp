import { model } from 'mongoose';

import { generateCode } from '../../utils/generateCode';
import { createNumber } from '../../utils/numbers/createNumber';
import { sendMail } from '../../utils/sendMail';
import { userSchema } from './userSchema';
import { By, UserDocument } from './types';

export const userModel = model<UserDocument>('user', userSchema);

class User {
  email: string;
  number: string;
  code: string;
  redirectTo: string;
  by: By;
  onBoarding: boolean;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
    this.onBoarding = false;
    this.redirectTo = this.by === 'Google' ? '/onboarding/number' : '/onboarding/code';
    if (by !== 'Google') {
      this.code = generateCode();
    }
  }

  static format(user) {
    const { email, number, firstname, lastname } = user;

    return {
      email,
      number,
      firstname,
      lastname
    };
  }

  static async update(data) {
    const { email } = data;

    delete data.email;

    try {
      await userModel.updateOne({ email }, { $set: { ...data } });
    } catch {
      return { error: true, errorMsg: "error - cant't update user" };
    }

    return { updated: true };
  }

  static async find(key: string, value: string) {
    const user = await userModel.findOne({ [key]: value });

    return user;
  }

  async save() {
    this.number = await createNumber();

    if (this.by !== 'Google') {
      sendMail(this.email, this.code);
    }

    delete this.by;

    const user = new userModel(this).save();

    return user;
  }
}

export default User;
