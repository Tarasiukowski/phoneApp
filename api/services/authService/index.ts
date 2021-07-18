import * as jwt from 'jsonwebtoken';

import UserModel from '../../models/user/userModel';
import { generateCode, isValidEmail, sendMail } from '../../utils';
import { ERROR } from '../../data';
import { User, AuthType } from '../../interfaces';
import { JWT_PRIVATE_KEY } from '../../constants';

class AuthService {
  email: string;
  authType: AuthType;

  constructor(email: string, authType: AuthType) {
    this.email = email;
    this.authType = authType;
  }

  static async index(token: string, settings: { fullUser: boolean } = { fullUser: true }) {
    const { fullUser } = settings;

    if (token) {
      const { id }: any = jwt.verify(token, JWT_PRIVATE_KEY);

      const userInstance = await UserModel.findOne('_id', id);
      const { user } = userInstance.get();

      if (user) {
        const { onBoarding } = user;
        const { user: formatedUser, status } = (
          fullUser ? userInstance.format('conversations', 'groups') : userInstance.format()
        ).get();

        return {
          user: {
            value: formatedUser,
            status: { onBoarding },
          },
          status,
        };
      }

      return { user: null, status: 404 };
    }

    return { user: null, status: 200 };
  }

  async login() {
    const { email, authType } = this;

    const { valid, errorMsg } = isValidEmail(email);

    if (valid) {
      const userInstance = await UserModel.findOne('email', email);
      const { user }: any = userInstance.get();

      if (user) {
        const token = jwt.sign({ id: user._id }, JWT_PRIVATE_KEY, {
          expiresIn: 9999999,
        });

        const { user: formatedUser, status } = (
          authType === AuthType.google
            ? userInstance.format('conversations', 'groups')
            : userInstance.format()
        ).get();

        if (authType === AuthType.email) {
          const code = generateCode();
          sendMail(email, code);

          (await UserModel.findOne('email', email)).update({ key: 'code', value: code }, 'set');
        }

        return { user: formatedUser, token, status, errorMsg: null };
      }

      return { user: null, token: null, status: 404, errorMsg: ERROR.USER_NOT_EXIST };
    }

    return { user: null, token: null, status: 400, errorMsg };
  }

  async singup(extraData: Partial<User>) {
    const { email, authType } = this;

    const { valid, errorMsg } = isValidEmail(email);

    if (valid) {
      const { user: duplicatedUser } = await (await UserModel.findOne('email', email)).get();

      if (duplicatedUser) {
        return { user: null, token: null, status: 403, errorMsg: ERROR.USER_EXIST };
      }

      const { status, user } = await UserModel.create({ email, ...extraData }, { authType });

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
