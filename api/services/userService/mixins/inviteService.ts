import { ERROR } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
import UserModel from '../../../models/user/userModel';
import { Class } from '../../../interfaces';
import { getStepsOfAcceptInvite, getStepsOfCreateConversation } from '../../../data';
import { getObjectsKeysFromArray } from '../../../utils/getObjectsKeysFromArray';

export function InviteServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static invite = {
      async index(invitingUserEmail: string, invitedUserEmail: string) {
        if (invitingUserEmail === invitedUserEmail) {
          return { status: 401, errorMsg: ERROR.INVITE_TO_YOURSELF };
        }

        const { user: invitedUser } = await (
          await UserModel.findOne('email', invitedUserEmail)
        ).get();
        const { user: invitingUser } = await (
          await UserModel.findOne('email', invitingUserEmail)
        ).get();

        if (!invitedUser) {
          return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
        } else {
          const { blocklist } = invitedUser;

          if (blocklist.includes(invitingUserEmail)) {
            return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
          }
        }

        const invites = invitedUser.invites;
        const { friends = [] } = invitingUser || {};

        const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

        if (invites.includes(invitingUserEmail)) {
          return { status: 400, errorMsg: ERROR.DUPLICATE_INVITATION };
        } else if (emailsOfFriends.includes(invitedUserEmail)) {
          return { status: 400, errorMsg: ERROR.IS_YOUR_FRIEND };
        }

        await (
          await UserModel.findOne('email', invitedUserEmail)
        ).update({ key: 'invites', value: invitingUserEmail }, 'push');

        return { status: 200, errorMsg: null };
      },
      async get(loggedUserEmail: string) {
        const { status, user: loggedUser } = await (
          await UserModel.findOne('email', loggedUserEmail)
        ).get();

        if (loggedUser) {
          const invites = loggedUser.invites;

          const { data: findedUsers } = await UserModel.find(invites, 'email');

          return { status, data: findedUsers };
        }

        return { status, data: ERROR.USER_NOT_EXIST };
      },
      async accept(acceptingUserEmail: string, invitingUserEmail: string) {
        const stepsOfAcceptInvite = getStepsOfAcceptInvite(acceptingUserEmail, invitingUserEmail);

        stepsOfAcceptInvite.map(async ({ filter, data, type }) => {
          const { by, valueFilter } = filter;

          await (await UserModel.findOne(by, valueFilter)).update(data, type);
        });

        const { conversation } = await Conversation.create([acceptingUserEmail, invitingUserEmail]);

        if (conversation) {
          const id = conversation.id;

          const stepsOfCreateConversation = getStepsOfCreateConversation(
            acceptingUserEmail,
            invitingUserEmail,
            id,
          );

          stepsOfCreateConversation.map(async ({ filter, data, type }) => {
            const { by, valueFilter } = filter;

            await (await UserModel.findOne(by, valueFilter)).update(data, type);
          });
        }

        return { status: 200, errorMsg: null };
      },
      async reject(rejectingUserEmail: string, invitingUserEmail: string) {
        const data = await (
          await UserModel.findOne('email', rejectingUserEmail)
        ).update({ key: 'invites', value: invitingUserEmail }, 'pull');

        return data;
      },
    };
  };
}
