import { ERROR } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interfaces';
import { getStagesOfAcceptInvite, getStagesOfCreateConversation } from '../../../data';
import { getObjectsKeysFromArray } from '../../../utils/getObjectsKeysFromArray';

export function InviteServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static invite = {
      async index(from: string, to: string) {
        if (from === to) {
          return { status: 401, errorMsg: ERROR.INVITE_TO_YOURSELF };
        }

        const { user: invitedUser } = await (await UserModel.findOne('email', to)).get();
        const { user: invitingUser } = await (await UserModel.findOne('email', from)).get();

        if (!invitedUser) {
          return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
        } else {
          const { blocklist } = invitedUser;

          if (blocklist.includes(from)) {
            return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
          }
        }

        const invites = invitedUser.invites;
        const { friends = [] } = invitingUser || {};

        const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

        if (invites.includes(from)) {
          return { status: 400, errorMsg: ERROR.DUPLICATE_INVITATION };
        } else if (emailsOfFriends.includes(to)) {
          return { status: 400, errorMsg: ERROR.IS_YOUR_FRIEND };
        }

        await (
          await UserModel.findOne('email', to)
        ).update({ key: 'invites', value: from }, 'push');

        return { status: 200, errorMsg: null };
      },
      async get(email: string) {
        const { status, user } = await (await UserModel.findOne('email', email)).get();

        if (user) {
          const invites = user.invites;

          const { data: findedUsers } = await UserModel.find(invites, 'email');

          return { status, data: findedUsers };
        }

        return { status, data: ERROR.USER_NOT_EXIST };
      },
      async accept(email: string, from: string) {
        const stagesOfAcceptInvite = getStagesOfAcceptInvite(email, from);

        stagesOfAcceptInvite.map(async ({ filter, data, type }) => {
          const { by, valueFilter } = filter;

          await (await UserModel.findOne(by, valueFilter)).update(data, type);
        });

        const { conversation } = await Conversation.create([email, from]);

        if (conversation) {
          const id = conversation.id;

          const stagesOfCreateConversation = getStagesOfCreateConversation(email, from, id);

          stagesOfCreateConversation.map(async ({ filter, data, type }) => {
            const { by, valueFilter } = filter;

            await (await UserModel.findOne(by, valueFilter)).update(data, type);
          });
        }

        return { status: 200, errorMsg: null };
      },
      async reject(email: string, from: string) {
        const data = await (
          await UserModel.findOne('email', email)
        ).update({ key: 'invites', value: from }, 'pull');

        return data;
      },
    };
  };
}
