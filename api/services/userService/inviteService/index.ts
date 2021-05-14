import { errorsMsgs } from '../../../data';
import UserModel from '../../../models/user/userModel';
import { By } from '../../types';

class InviteService {
  email: string;
  by: By;

  static async invite(from: any, to: string) {
    if (from === to) {
      return { error: true, errorMsg: errorsMsgs.INVITE_TO_YOURSELF };
    }

    const findUser = await UserModel.find('email', to);

    if (!findUser) {
      return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
    }

    const invites = findUser.invites

    if(invites.includes(from)) {
      return { error: true, errorMsg: errorsMsgs.DUPLICATE_INVITATION }
    }

    UserModel.update({ email: to, fieldName: 'invites', pushValue: from }, 'pushToField');

    return { error: false };
  }

  static async getInvites(email: string) {
    const invites = await (await UserModel.find('email', email)).invites;

    const formatInvites = invites.map(async (email: any) => {
      const user = await UserModel.find('email', email);

      if (user) {
        const { email, firstname, lastname, color, image, number } = user;

        return { email, firstname, lastname, color, image, number };
      }
    });

    return Promise.all(formatInvites)
  }
}

export default InviteService;
