import UserModel from '../../models/user/userModel';
import { By } from '../types';

class UserService {
  email: string;
  by: By;

  static async update(data: any, options: any) {
    const returnData = await UserModel.update(data, options);

    return returnData;
  }

  static async invite(from: string, to: string) {
    if (from === to) {
      return { error: true, errorMsg: 'error - you cannot send yourself an invitation' };
    }

    const findUser = await UserModel.find('email', to);

    if (!findUser) {
      return { error: true, errorMsg: "error - user with this e-mail does't exist" };
    }

    return { error: false };
  }

  static async verifyByCode(data, options: any) {
    const { code, email } = data;
    const { verifyNewEmail } = options ? options : { verifyNewEmail: false };

    const findUser = await UserModel.find('email', email);

    if (verifyNewEmail ? findUser.newEmail.value : findUser.code === code) {
      if (verifyNewEmail) {
        const newEmail = findUser.newEmail.value;
        const email = findUser.email;

        this.update({ email, newEmail }, { updateEmail: true });
      }

      return { valid: true };
    } else {
      return { valid: false, error: true, errorMsg: 'Wrong verification code.' };
    }
  }
}

export default UserService;
