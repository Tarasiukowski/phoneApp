import * as jwt from 'jsonwebtoken';

import UserModel from '../../models/user/userModel';
import { verifyEmail } from '../../utils';
import { errorsMsgs } from '../../data';
import { By } from '../types';

class UserService {
  email: string;
  by: By;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
  }

  static async index(token: string) {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const user = await UserModel.findOne('_id', id);

      if (user) {
        const formatUser = UserModel.format(user, 'conversation');

        return {
          user: formatUser,
          status: { onBoarding: user.onBoarding, redirectTo: user.redirectTo },
        };
      }
    }

    return { user: null };
  }

  async login() {
    const { email } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (verify) {
      const user = await UserModel.findOne('email', email);

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
          expiresIn: 9999999,
        });

        const formatedUser = UserModel.format(user, 'conversation');

        return { user: formatedUser, token };
      }

      return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
    }

    return { error: true, errorMsg };
  }

  async singup(data) {
    const { email, by } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (verify) {
      const duplicateUser = await UserModel.findOne('email', email);

      if (duplicateUser) {
        return { error: true, errorMsg: errorsMsgs.USER_EXIST };
      }

      const user = await new UserModel(email, by).save(data);

      const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 9999999,
      });

      const fromatedUser = UserModel.format(user, 'conversation');

      return { user: fromatedUser, token };
    }

    return { error: true, errorMsg };
  }
}

export default UserService;
