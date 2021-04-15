import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/user/userModel';
import { verifyEmail } from '../utils';

class UserService {
  email: string;
  by: 'Google' | undefined;

  constructor(email: string, by: 'Google' | undefined) {
    this.email = email;
    this.by = by;
  }

  static update(data: any, res: Response) {
    UserModel.update(data);

    return { updated: true };
  }

  static async verify(token: string) {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const user = await UserModel.find('_id', id);

      const formatUser = UserModel.format(user);

      return { user: formatUser };
    }

    return { user: null };
  }

  static async verifyByCode(email: string, code: string, res: Response) {
    const findUser: any = await UserModel.find('email', email);

    if (findUser.code === code) {
      res.send({ valid: true });
    } else {
      res.send({ valid: false, errorMsg: 'Wrong verification code.' });
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

    return { errorMsg: 'user with such email does not exist' };
  }

  async singup() {
    const { email } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (!verify) {
      return { errorMsg };
    }

    const findUser = await UserModel.find('email', email);

    if (findUser) {
      return { errorMsg: 'user with that email address exists' };
    }

    const user = await new UserModel(email, this.email).save();

    const { _id } = user;

    const token = jwt.sign({ id: _id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: 9999999,
    });

    const fromatUser = UserModel.format(user);

    return { user: fromatUser, token };
  }
}

export default UserService;
