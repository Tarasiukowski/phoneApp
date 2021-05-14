import { model } from 'mongoose';

import { generateCode } from '../../utils/generateCode';
import { createNumber } from '../../utils/numbers/createNumber';
import { sendMail } from '../../utils/sendMail';
import { userSchema } from './userSchema';
import { By, UserDocument } from './types';
import { randomColor } from '../../utils';
import { updateOption } from '../../interface';
import { errorsMsgs } from '../../data';

export const userModel = model<UserDocument>('user', userSchema);

class User {
  email: string;
  code: string;
  redirectTo: string;
  by: By;
  onBoarding: boolean;
  number: string;
  color: string;
  image: string;
  invites: [];

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
    this.onBoarding = false;
    this.color = randomColor();
    this.invites = [];
    this.redirectTo = this.by === 'Google' ? '/onboarding/number' : '/onboarding/code';
    by !== 'Google' ? (this.code = generateCode()) : null;
  }

  static format(user: UserDocument) {
    const { email, number, firstname, lastname, color, image } = user;

    return {
      image,
      email,
      number,
      firstname,
      lastname,
      color,
    };
  }

  static async update(data: any, option: updateOption = 'setField', setEmail?: boolean) {
    const { email, newEmail, fieldName, pushValue } = data;

    delete data.email;

    if (newEmail) {
      const findUser = await this.find('email', newEmail);

      if (findUser) {
        return { error: true, errorMsg: errorsMsgs.EMAIL_IN_USE };
      }
    }

    const availableOptions: any = {
      removeField: { $unset: { [fieldName]: '' } },
      setField: { $set: setEmail ? { email: newEmail } : { ...data } },
      newEmail: { $set: { newEmail: { value: newEmail, code: generateCode() } } },
      pushToField: { $push: { [fieldName]: pushValue } },
    };

    await userModel.updateOne({ email }, availableOptions[option]);

    return { updated: true };
  }

  static async find(key: string, value: string) {
    const user = await userModel.findOne({ [key]: value });

    return user;
  }

  async save(data) {
    const { image } = data

    this.number = await createNumber();

    if (this.by !== 'Google') {
      sendMail(this.email, this.code);
    }

    delete this.by;

    const user = new userModel({ ...this, image }).save();

    return user;
  }
}

export default User;
