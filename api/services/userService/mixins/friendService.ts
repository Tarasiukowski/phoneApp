import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data';
import { Class, User } from '../../../interfaces';
import ConversationModel from '../../../models/conversation/conversationModel';
import { getStepsOfRemoveFriend } from '../../../data';
import { getObjectsKeysFromArray } from '../../../utils/getObjectsKeysFromArray';

export function FriendServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static friend = {
      async get(loggedUserEmail: string, ...extraKeys: (keyof User)[]) {
        const { user: loggedUser } = await (
          await UserModel.findOne('email', loggedUserEmail)
        ).get();

        if (loggedUser) {
          const { friends } = loggedUser;

          const emailsOfFriends = getObjectsKeysFromArray(friends, 'email') as string[];

          const { data: findedUsers } = await UserModel.find(
            emailsOfFriends,
            'email',
            ...extraKeys,
          );

          const formatedFriends: Partial<User>[] = findedUsers.filter((findedUser) => {
            if (findedUser) {
              const dataFriend = friends.find((friend) => friend.email === findedUser.email);

              if (dataFriend) {
                const notes = dataFriend.notes;

                return { ...findedUser, notes };
              }
            }
          });

          return { status: 200, data: formatedFriends };
        }

        return { status: 404, data: [] };
      },
      async remove(loggedUserEmail: string, friendEmail: string) {
        const { user: friend } = await (await UserModel.findOne('email', friendEmail)).get();

        if (friend) {
          const stepsOfRemoveFriend = getStepsOfRemoveFriend(loggedUserEmail, friendEmail);

          stepsOfRemoveFriend.map(async ({ filter, data, type }) => {
            const { by, valueFilter } = filter;

            await (await UserModel.findOne(by, valueFilter)).update(data, type);
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
