import UserService from '../../../services/userService';
import UserModel from '../../../models/user/userModel';
import { errorsMsgs } from '../../../data';
import { Class } from '../../../interface';
import ConversationModel from '../../../models/conversation/conversationModel';

export function FriendServiceMixin<Base extends Class>(base: Base) {
  return class extends base {
    static friend = {
      async get(email: string) {
        const user = UserModel.findOne('email', email);

        if (user) {
          const { friends } = await user;

          const formatedFriends = await UserService.formatData(friends, 'email');

          return formatedFriends;
        }

        return null;
      },
      async remove(email: string, friendEmail: string) {
        const friend = await UserModel.findOne('email', friendEmail);

        if (friend) {
          UserModel.update({ email, field: 'friends', value: friendEmail }, 'pull');
          UserModel.update({ email: friendEmail, field: 'friends', value: email }, 'pull');

          ConversationModel.remove('users', [email, friendEmail]);

          return { error: false };
        }

        return { error: true, errorMsg: errorsMsgs.USER_NOT_EXIST };
      },
    };
  };
}
