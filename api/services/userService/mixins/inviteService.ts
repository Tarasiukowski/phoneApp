import { errorsMsgs } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
import UserModel from '../../../models/user/userModel';
import { By } from '../../types';
import { Class } from '../../../interface';

export function InviteServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    email: string;
    by: By;

    static async invite(from: string, to: string) {
      if (from === to) {
        return { error: true, errorMsg: errorsMsgs.INVITE_TO_YOURSELF };
      }

      const invitedUser = await UserModel.findOne('email', to);
      const invitingUser = await UserModel.findOne('email', from);

      if (!invitedUser) {
        return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
      }

      const invites = invitedUser.invites;
      const friends = invitingUser.friends;

      if (invites.includes(from)) {
        return { error: true, errorMsg: errorsMsgs.DUPLICATE_INVITATION };
      } else if (friends.includes(to)) {
        return { error: true, errorMsg: errorsMsgs.IS_YOUR_FRIEND };
      }

      const data = await UserModel.update(
        { email: to, field: 'invites', value: from },
        'pushToField',
      );

      return data;
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

      return data;
    }

    static async rejectInvite(email: string, from: string) {
      const data = await UserModel.update({ email, field: 'invites', value: from }, 'pull');

      return data;
    }
  };
}
