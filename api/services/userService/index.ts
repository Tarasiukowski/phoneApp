import { errorsMsgs } from '../../data';
import { updateOption } from '../../interface';
import UserModel from '../../models/user/userModel';
import { By } from '../types';

class UserService {
  email: string;
  by: By;

  static async update(data: any, option: updateOption) {
    const returnData = await UserModel.update(data, option);

    return returnData;
  }

  static async invite(from: string, to: string) {
    if (from === to) {
      return { error: true, errorMsg: errorsMsgs.INVITE_TO_YOURSELF };
    }

    const findUser = await UserModel.find('email', to);

    if (!findUser) {
      return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
    }

    UserModel.update({ email: to, fieldName: "invites", pushValue: from }, "pushToField")

    return { error: false };
  }

  static async verifyByCode(data, option?: 'verifyNewEmail') {
    const { code, email } = data;
    const isVerifyNewEmail = option === 'verifyNewEmail';

    const findUser = await UserModel.find('email', email);

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
}

export default UserService;
