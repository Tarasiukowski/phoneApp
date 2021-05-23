import { errorsMsgs } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
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

    UserModel.update({ email: to, field: 'invites', value: from }, 'pushToField');

    return { error: false };
  }

  static async acceptInvite(email: string, from: string) {
    UserModel.update({ email, field: 'invites', value: from }, 'pull');
    UserModel.update({ email, field: 'friends', value: from }, 'pushToField');
    UserModel.update({ email: from, field: 'friends', value: email }, 'pushToField');

    const data = new Conversation([email, from]).create();

    if (data.succes) {
      UserModel.update(
        {
          email,
          field: 'conversations',
          value: { with: from, id: (await data.conversation)._id },
        },
        'pushToField',
      );
      UserModel.update(
        {
          email: from,
          field: 'conversations',
          value: { with: email, id: (await data.conversation)._id },
        },
        'pushToField',
      );
    }
    return { error: false };
  }

  static async rejectInvite(email: string, from: string) {
    UserModel.update({ email, field: 'invites', value: from }, 'pull');

    return { error: false };
  }
}

export default InviteService;
