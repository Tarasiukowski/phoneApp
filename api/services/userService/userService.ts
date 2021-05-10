import * as jwt from 'jsonwebtoken';

import UserModel from '../../models/user/userModel';
import { verifyEmail } from '../../utils';
import { By } from './types';

class UserService {
  email: string;
  by: By;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
  }

  static async update(data: any, updateEmail?: boolean) {
    const returnData = await UserModel.update(data, updateEmail);

    return returnData;
  }

  static async loginByToken(token: string) {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const user = await UserModel.find('_id', id);

      const formatUser = UserModel.format(user);

      return {
        user: formatUser,
        status: { onBoarding: user.onBoarding, redirectTo: user.redirectTo },
      };
    }

    return { user: null };
  }

  static async verifyByCode(email: string, code: string, verifyNewEmail: boolean) {
    const findUser = await UserModel.find('email', email);

    if (verifyNewEmail) {
      if (findUser.newEmail.code === code) {
        const newEmail = findUser.newEmail.email
        const email = findUser.email
        
        this.update({ email, newEmail }, true)
        
        return { valid: true };
      } else {
        return { valid: false, error: true, errorMsg: 'Wrong verification code.' };
      }
    }

    if (findUser.code === code) {
      return { valid: true };
    } else {
      return { valid: false, error: true, errorMsg: 'Wrong verification code.' };
    }
  }

  async login() {
    const { email } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (!verify) {
      return { errorMsg };
    }

    const user = await UserModel.find('email', email);

    if (user) {
      const { _id } = user;

      const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 9999999,
      });

      const formatUser = UserModel.format(user);

      return { user: formatUser, token };
    }

    return { error: true, errorMsg: 'user with such email does not exist' };
  }

  async singup() {
    const { email } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (!verify) {
      return { error: true, errorMsg };
    }

    const findUser = await UserModel.find('email', email);

    if (findUser) {
      return { error: true, errorMsg: 'user with that email address exists' };
    }

    const user = await new UserModel(email, this.by).save();

    const { _id } = user;

    const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 9999999,
    });

    const fromatUser = UserModel.format(user);

    return { user: fromatUser, token };
  }
}

export default UserService;
