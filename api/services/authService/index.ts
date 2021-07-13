import * as jwt from 'jsonwebtoken';

import UserModel from '../../models/user/userModel';
import { generateCode, isValidEmail, sendMail } from '../../utils';
import { ERROR } from '../../data';
import { By } from '../types';
import { User } from '../../interfaces';
import { JWT_PRIVATE_KEY } from '../../constants';

class AuthService {
  email: string;
  by: By;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
  }

  static async index(token: string, fullUser?: boolean) {
    if (token) {
      const { id }: any = jwt.verify(token, JWT_PRIVATE_KEY);

      const { user, status } = await UserModel.findOne('_id', id);

      if (user) {
        let formatedUser: Partial<User>;

        if (fullUser) {
          formatedUser = UserModel.format(user, 'conversations', 'groups');
        } else {
          formatedUser = UserModel.format(user);
        }

        return {
          user: {
            value: formatedUser,
            status: { onBoarding: user.onBoarding, redirectTo: user.redirectTo },
          },
          status,
        };
      }

      return { user: null, status: 404 };
    }

    return { user: null, status: 200 };
  }

  async login() {
    const { email, by } = this;

    const { valid, errorMsg } = isValidEmail(email);

    if (valid) {
      const { status, user } = await UserModel.findOne('email', email);

      if (user) {
        const token = jwt.sign({ id: user._id }, JWT_PRIVATE_KEY, {
          expiresIn: 9999999,
        });

        let formatedUser;

        if (by === 'Google') {
          formatedUser = UserModel.format(user, 'conversations', 'groups');
        } else {
          const code = generateCode();
          sendMail(email, code);

          UserModel.update(
            { by: 'email', valueFilter: email },
            { key: 'code', value: code },
            'set',
          );

          formatedUser = UserModel.format(user);
        }

        return { user: formatedUser, token, status, errorMsg: null };
      }

      return { user: null, token: null, status: 404, errorMsg: ERROR.USER_NOT_EXIST };
    }

    return { user: null, token: null, status: 400, errorMsg };
  }

  async singup(data: Partial<User>) {
    const { email, by } = this;

    const { valid, errorMsg } = isValidEmail(email);

    if (valid) {
      const { user: duplicatedUser } = await UserModel.findOne('email', email);

      if (duplicatedUser) {
        return { user: null, token: null, status: 403, errorMsg: ERROR.USER_EXIST };
      }

      const { status, user } = await new UserModel(email, by).save(data);

      if (user) {
        const token = jwt.sign({ id: user.id }, JWT_PRIVATE_KEY, {
          expiresIn: 9999999,
        });

        return { user: user.value, token, status, errorMsg: null };
      }
    }

    return { user: null, token: null, status: 400, errorMsg };
  }
}

export default AuthService;
