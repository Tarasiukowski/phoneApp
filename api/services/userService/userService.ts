import UserModel from '../../models/user/userModel';
import { generateCode } from '../../utils/generateCode';
import { By } from '../types';

class UserService {
  email: string;
  by: By;

  constructor(email: string, by: By) {
    this.email = email;
    this.by = by;
  }

  // FIX ME
  static async update(data: any, updateEmail?: boolean, removeField?: boolean) {
    const returnData = await UserModel.update(data, updateEmail, removeField);

    return returnData;
  }

  // FIX ME
  static async updateEmail(email: string, newEmail: string) {
    const code = generateCode();

    const findUser = await UserModel.find('email', newEmail);

    if (findUser) {
      return { error: true, errorMsg: 'error - this email is pinned to another account' };
    }

    const data = await UserService.update({ email, newEmail: { email: newEmail, code } });

    return data;
  }

  static async verifyByCode(email: string, code: string, verifyNewEmail: boolean) {
    const findUser = await UserModel.find('email', email);

    if (verifyNewEmail) {
      if (findUser.newEmail.code === code) {
        const newEmail = findUser.newEmail.email;
        const email = findUser.email;

        this.update({ email, newEmail }, true);

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
}

export default UserService;
