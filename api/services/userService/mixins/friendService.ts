import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data';
import { Class, User } from '../../../interfaces';
import ConversationModel from '../../../models/conversation/conversationModel';
import { getStepsOfRemoveFriend } from '../../../data';

export function FriendServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static friend = {
      async get(loggedUserEmail: string, ...extraKeys: (keyof User)[]) {
        const { user: loggedUser } = await (
          await UserModel.findOne('email', loggedUserEmail)
        ).get();

        if (loggedUser) {
          const { friends } = loggedUser;

          const emailsOfFriends = friends.map(({ email }) => email);

          const { data: findedUsers } = await UserModel.findAllBy(
            'email',
            emailsOfFriends,
            ...extraKeys,
          );

          return { status: 200, data: findedUsers };
        }

        return { status: 404, data: [] };
      },
      async remove(loggedUserEmail: string, friendEmail: string) {
        const { user: friend } = await (await UserModel.findOne('email', friendEmail)).get();

        if (friend) {
          const stepsOfRemoveFriend = getStepsOfRemoveFriend(loggedUserEmail, friendEmail);

          stepsOfRemoveFriend.map(async ({ email, data, type }) => {
            const { key, value } = data;

            await (await UserModel.findOne('email', email)).update(key, value, type);
          });

          const { conversations } = friend;

          const conversation = conversations.find(
            (conversation) => conversation.with === loggedUserEmail,
          )!;

          (await ConversationModel.findById(conversation.id)).remove();

          return { status: 200, errorMsg: null };
        }

        return { status: 400, errorMsg: ERROR.USER_NOT_EXIST };
      },
    };
  };
}
