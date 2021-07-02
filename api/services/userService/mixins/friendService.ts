import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data';
import { Class } from '../../../interfaces';
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

          const formatedFriends = await (
            await findedUsers
          ).map((findedUser) => {
            const notes = friends.find((friend) => friend.email === findedUser.email).notes;

            return { ...findedUser, notes };
          });

          return { status: 200, data: formatedFriends };
        }

        return { status: 404, data: null };
      },
      async remove(email: string, friendEmail: string) {
        const { user: friend } = await UserModel.findOne('email', friendEmail);

        if (friend) {
          const stagesOfRemoveFriend = getStagesOfRemoveFriend(email, friendEmail);

          stagesOfRemoveFriend.map(({ key, data, type }) => {
            UserModel.update(key, data, type);
          });

          ConversationModel.remove('users', [email, friendEmail]);

          return { status: 200, errorMsg: null };
        }

        return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
      },
    };
  };
}
