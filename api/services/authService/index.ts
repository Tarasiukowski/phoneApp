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
      const { id }: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const { user, status } = await UserModel.findOne('_id', id);

      if (user) {
        const formatedUser = UserModel.format(user, 'conversations', 'groups');

        return {
          user: {
            value: formatedUser,
            status: { onBoarding: user.onBoarding, redirectTo: user.redirectTo },
          },
          status,
        };
      }

      return { user: null, status: 404 }
    }

    return { user: null, status: 401 };
  }

  async login() {
    const { email } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (verify) {
      const { status, user } = await UserModel.findOne('email', email);

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
          expiresIn: 9999999,
        });

        const formatedUser = UserModel.format(user, 'conversations', 'groups');

        return { user: formatedUser, token, status, errorMsg: null };
      }

      return { user: null, token: null, status: 404, errorMsg: errorsMsgs.USER_NOT_EXIST };
    }

    return { user: null, token: null, status: 401, errorMsg };
  }

  async singup(data) {
    const { email, by } = this;

    const { verify, errorMsg } = verifyEmail(email);

    if (verify) {
      const { user: duplicateUser } = await UserModel.findOne('email', email);

      if (duplicateUser) {
        return { user: null, token: null, status: 403, errorMsg: errorsMsgs.USER_EXIST };
      }

      const { status, user } = await new UserModel(email, by).save(data);

      const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 9999999,
      });

      return { user: user.value, token, status, errorMsg: null };
    }

    return { user: null, token: null, status: 401, errorMsg };
  }
}

export default UserService;
