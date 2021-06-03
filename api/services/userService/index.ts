import { errorsMsgs } from '../../data';
import UserModel from '../../models/user/userModel';
import { By } from '../types';
import { FriendServiceMixin, InviteServiceMixin } from './mixins';

class UserService extends InviteServiceMixin(FriendServiceMixin(class {})) {
  email: string;
  by: By;

  static async update(data: any) {
    const { newEmail } = data;

    const returnedData = await UserModel.update(data, newEmail ? 'newEmail' : undefined);

    return returnedData;
  }

  static async verify(data, option?: 'verifyNewEmail') {
    const { code, email } = data;
    const isVerifyNewEmail = option === 'verifyNewEmail';

    const { status, user } = await UserModel.findOne('email', email);

    if (isVerifyNewEmail ? user.newEmail.value : user.code === code) {
      if (isVerifyNewEmail) {
        const newEmail = user.newEmail.value;

        UserModel.update({ email, newEmail }, 'setEmail');
      }

      return { valid: true, status, errorMsg: null };
    }

    return { valid: false, status, errorMsg: errorsMsgs.WRONG_VERIFICATION_CODE };
  }

  static async formatData(data: string[], key: string) {
    const formatData = data.map(async (elem) => {
      const { user } = await UserModel.findOne(key, elem);

      if (user) {
        const formatedUser = UserModel.format(user);

        return formatedUser;
      }
    });

    return {
      data: Promise.all(formatData),
    };
  }
}

export default UserService;
