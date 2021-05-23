import { errorsMsgs } from '../../data';
import { updateOption } from '../../interface';
import UserModel from '../../models/user/userModel';
import { formatUser } from '../../utils';
import { By } from '../types';
import InviteService from './inviteService';

class UserService extends InviteService {
  email: string;
  by: By;

  static async update(data: any, option: updateOption) {
    const returnData = await UserModel.update(data, option);

    return returnData;
  }

  static async verifyByCode(data, option?: 'verifyNewEmail') {
    const { code, email } = data;
    const isVerifyNewEmail = option === 'verifyNewEmail';

    const findUser = await UserModel.findOne('email', email);

    if (isVerifyNewEmail ? findUser.newEmail.value : findUser.code === code) {
      if (isVerifyNewEmail) {
        const newEmail = findUser.newEmail.value;

        UserModel.update({ email, newEmail }, null, true);
      }

      return { valid: true };
    } else {
      return { valid: false, error: true, errorMsg: errorsMsgs.WRONG_VERIFICATION_CODE };
    }
  }

  static async get(data: any[], key: string) {
    const formatData = data.map(async (elem: any) => {
      const user = await UserModel.findOne(key, elem);

      if (user) {
        const formatedUser = UserModel.format(user);

        return formatedUser;
      }
    });

    return Promise.all(formatData);
  }
}

export default UserService;
