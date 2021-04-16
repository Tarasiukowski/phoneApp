import { Document, model } from 'mongoose';
import { generateCode } from '../../utils/generateCode';
import { createNumber } from '../../utils/numbers/createNumber';
import { sendMail } from '../../utils/sendMail';
import { userSchema } from './userSchema';

export const userModel = model('user', userSchema);

class User {
  email: string;
  number: string;
  code: string;
  redirectTo: string;
  by: 'Google' | undefined;
  onBoarding: boolean;

  constructor(email: string, by: 'Google' | undefined) {
    this.email = email;
    this.by = by;
    this.onBoarding = true;
    this.redirectTo = this.by === 'Google' ? '/onboarding/number' : '/onboarding/code';
    if (by !== 'Google') {
      this.code = generateCode();
    }
  }

  static format(user) {
    const { email, number } = user;

    return {
      email,
      number,
    };
  }

  static async update(data) {
    const { email } = data;

    delete data.email;

    await userModel.updateOne({ email }, { $set: { ...data } });
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
