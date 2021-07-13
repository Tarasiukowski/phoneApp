import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data';
import { Class, User } from '../../../interfaces';
import ConversationModel from '../../../models/conversation/conversationModel';
import { getStagesOfRemoveFriend } from '../../../data';
import { getObjectsKeysFromArray } from '../../../utils/getObjectsKeysFromArray';

export function FriendServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static friend = {
      async get(email: string, ...extraData: any[]) {
        const { user } = await UserModel.findOne('email', email);

        if (user) {
          const { friends } = user;

          const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

          const { data: findedUsers } = await UserModel.find(
            emailsOfFriends,
            'email',
            ...extraData,
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
      async remove(email: string, friendEmail: string) {
        const { user: friend } = await UserModel.findOne('email', friendEmail);

        if (friend) {
          const stagesOfRemoveFriend = getStagesOfRemoveFriend(email, friendEmail);

          stagesOfRemoveFriend.map(({ filter, data, type }) => {
            UserModel.update(filter, data, type);
          });

          ConversationModel.remove('users', [email, friendEmail]);

          return { status: 200, errorMsg: null };
        }

        return { status: 400, errorMsg: ERROR.USER_NOT_EXIST };
      },
    };
  };
}
