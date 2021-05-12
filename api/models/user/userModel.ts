import { model } from 'mongoose';

import { generateCode } from '../../utils/generateCode';
import { createNumber } from '../../utils/numbers/createNumber';
import { sendMail } from '../../utils/sendMail';
import { userSchema } from './userSchema';
import { By, UserDocument } from './types';
import { randomColor } from '../../utils';

export const userModel = model<UserDocument>('user', userSchema);

class User {
  email: string;
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

  static format(user: UserDocument) {
    const { email, number, firstname, lastname, color } = user;

    return {
      email,
      number,
      firstname,
      lastname,
      color,
    };
  }

  static async update(data: any, options: any) {
    const { email, newEmail, fieldName } = data;
    const { updateEmail, removeField } = options
      ? options
      : { updateEmail: false, removeField: false };

    delete data.email;

    try {
      await userModel.updateOne(
        { email },
        removeField
          ? { $unset: { [fieldName]: '' } }
          : {
              $set: updateEmail
                ? { email: newEmail }
                : newEmail
                ? { newEmail: { value: newEmail, code: generateCode() } }
                : { ...data },
            },
      );
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
    const number = await createNumber();
    const color = randomColor();

    if (this.by !== 'Google') {
      sendMail(this.email, this.code);
    }

    delete this.by;

    const user = new userModel({ ...this, color, invites: [], number }).save();

    return user;
  }
}

export default User;
