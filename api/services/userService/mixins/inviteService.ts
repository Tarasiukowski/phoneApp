import { ERROR } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interfaces';
import { getStagesOfRemoveInvite } from '../../../data/getStagesOfAcceptInvite';
import { getStagesOfCreateConversation } from '../../../data/stages/getStagesOfCreateConversation';
import { getObjectsKeysFromArray } from '../../../utils/getObjectsKeysFromArray';

export function InviteServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static invite = {
      async index(from: string, to: string) {
        if (from === to) {
          return { status: 401, errorMsg: ERROR.INVITE_TO_YOURSELF };
        }

        const { user: invitedUser } = await UserModel.findOne('email', to);
        const { user: invitingUser } = await UserModel.findOne('email', from);

        if (!invitedUser) {
          return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
        }

        const invites = invitedUser.invites;
        const friends = invitingUser.friends;

        const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

        if (invites.includes(from)) {
          return { status: 409, errorMsg: ERROR.DUPLICATE_INVITATION };
        } else if (emailsOfFriends.includes(to)) {
          return { status: 409, errorMsg: ERROR.IS_YOUR_FRIEND };
        }

        UserModel.update({ email: to, field: 'invites', value: from }, 'pushToField');

        return { status: 200, errorMsg: null };
      },

      async accept(email: string, from: string) {
        getStagesOfRemoveInvite(email, from).map(({ data, option }) => {
          UserModel.update(data, option);
        });

        const { conversation } = await new Conversation([email, from]).create();

        getStagesOfCreateConversation(email, from, conversation.id).map(({ data, option }) => {
          UserModel.update(data, option);
        });

        return { status: 200, errorMsg: null };
      },

      async reject(email: string, from: string) {
        const data = await UserModel.update({ email, field: 'invites', value: from }, 'pull');

        return data;
      },
    };
  };
}
