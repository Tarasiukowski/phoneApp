import { ERROR } from '../../../data';
import Conversation from '../../../models/conversation/conversationModel';
import UserModel from '../../../models/user/userModel';
import { getStepsOfAcceptInvite, getStepsOfCreateConversation } from '../../../data';

export const inviteService = {
  invite: {
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

      const emailsOfFriends = friends.map(({ email }) => email);

      if (invites.includes(invitingUserEmail)) {
        return { status: 400, errorMsg: ERROR.DUPLICATE_INVITATION };
      } else if (emailsOfFriends.includes(invitedUserEmail)) {
        return { status: 400, errorMsg: ERROR.IS_YOUR_FRIEND };
      }

      await (
        await UserModel.findOne('email', invitedUserEmail)
      ).update('invites', invitingUserEmail, 'push');

      return { status: 200, errorMsg: null };
    },
    async get(loggedUserEmail: string) {
      const { status, user: loggedUser } = await (
        await UserModel.findOne('email', loggedUserEmail)
      ).get();

      if (loggedUser) {
        const invites = loggedUser.invites;

        const { data: findedUsers } = await UserModel.findAllBy('email', invites);

        return { status, data: findedUsers };
      }

      return { status, data: ERROR.USER_NOT_EXIST };
    },
    async accept(acceptingUserEmail: string, invitingUserEmail: string) {
      const stepsOfAcceptInvite = getStepsOfAcceptInvite(acceptingUserEmail, invitingUserEmail);

      stepsOfAcceptInvite.map(async ({ email, data, type }) => {
        const { key, value } = data;

        await (await UserModel.findOne('email', email)).update(key, value, type);
      });

      const { conversation } = await Conversation.create([acceptingUserEmail, invitingUserEmail]);

      if (conversation) {
        const id = conversation.id;

        const stepsOfCreateConversation = getStepsOfCreateConversation(
          acceptingUserEmail,
          invitingUserEmail,
          id,
        );

        stepsOfCreateConversation.map(async ({ email, data, type }) => {
          const { key, value } = data;

          await (await UserModel.findOne('email', email)).update(key, value, type);
        });
      }
      return { status: 200, errorMsg: null };
    },
    async reject(rejectingUserEmail: string, invitingUserEmail: string) {
      const data = await (
        await UserModel.findOne('email', rejectingUserEmail)
      ).update('invites', invitingUserEmail, 'pull');

      return data;
    },
  },
};
