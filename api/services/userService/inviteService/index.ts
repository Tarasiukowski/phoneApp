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

    const findUser = await UserModel.findOne('email', to);
    const user = await UserModel.findOne('email', from);

    if (!findUser) {
      return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
    }

    const invites = findUser.invites;

    if (invites.includes(from)) {
      return { error: true, errorMsg: errorsMsgs.DUPLICATE_INVITATION };
    }

    const friends = user.friends;

    if (friends.includes(to)) {
      return { error: true, errorMsg: errorsMsgs.IS_YOUR_FRIEND };
    }

    UserModel.update({ email: to, fieldName: 'invites', pushValue: from }, 'pushToField');

    return { error: false };
  }

  static async acceptInvite(email: string, from: string) {
    UserModel.update({ email, fieldName: 'invites', removeValue: from }, 'pull');
    UserModel.update({ email, fieldName: 'friends', pushValue: from }, 'pushToField');
    UserModel.update({ email: from, fieldName: 'friends', pushValue: email }, 'pushToField');

    return { error: false };
  }

  static async rejectInvite(email: string, from: string) {
    UserModel.update({ email, fieldName: 'invites', removeValue: from }, 'pull');

    return { error: false };
  }
}

export default InviteService;
