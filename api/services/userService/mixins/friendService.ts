import UserService from '../../../services/userService';
import UserModel from '../../../models/user/userModel';
import { ERROR } from '../../../data';
import { Class } from '../../../interfaces';
import ConversationModel from '../../../models/conversation/conversationModel';
import { getStagesOfRemoveFriend } from '../../../data/getStagesOfRemoveFriend';

export function FriendServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static friend = {
      async get(email: string, ...extraData: string[]) {
        const { user } = await UserModel.findOne('email', email);

        if (user) {
          const { friends } = user;

          const { data } = await UserService.formatData(friends, 'email', ...extraData);
          const formatedFriends = await data;

          return { status: 200, data: formatedFriends };
        }

        return { status: 404, data: null };
      },
      async remove(email: string, friendEmail: string) {
        const { user: friend } = await UserModel.findOne('email', friendEmail);

        if (friend) {
          getStagesOfRemoveFriend(email, friendEmail).map(({ data, option }) => {
            UserModel.update(data, option);
          });

          ConversationModel.remove('users', [email, friendEmail]);

          return { status: 200, errorMsg: null };
        }

        return { status: 404, errorMsg: ERROR.USER_NOT_EXIST };
      },
    };
  };
}
